// hooks/use-streaming-text.ts
'use client';

import { useState, useCallback, useRef } from 'react';

interface StreamChunk {
  text: string;
  done?: boolean;
}

export function useStreamingText() {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const abortRef = useRef(false);

  const start = useCallback(async (response: Response) => {
    if (!response.body) throw new Error('No response body');
    
    abortRef.current = false;
    setText('');
    setIsStreaming(true);
    setIsDone(false);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        if (abortRef.current) break;
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim().startsWith('data: '));
        
        for (const line of lines) {
          try {
            const data: StreamChunk = JSON.parse(line.slice(6));
            if (data.text) setText(prev => prev + data.text);
            if (data.done) setIsDone(true);
          } catch { /* skip */ }
        }
      }
    } finally {
      setIsStreaming(false);
      reader.releaseLock();
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current = true;
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    cancel();
    setText('');
    setIsDone(false);
  }, [cancel]);

  return { text, isStreaming, isDone, start, cancel, reset };
}
