// hooks/use-ai-chat.ts
'use client';

import { useState, useCallback, useRef } from 'react';
import { chatStream, ChatMessage, AIModel } from '@/lib/ai-providers';

export interface UseAIChatOptions {
  initialMessages?: ChatMessage[];
  defaultModel?: AIModel;
  systemPrompt?: string;
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const { initialMessages = [], defaultModel, systemPrompt } = options;
  
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(defaultModel);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Send message
  const sendMessage = useCallback(async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content };
    const assistantMsg: ChatMessage = { role: 'assistant', content: '' };
    
    const messagesToSend = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...messages, userMsg]
      : [...messages, userMsg];

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      for await (const chunk of chatStream(messagesToSend, {
        model: selectedModel as AIModel,
      })) {
        if (controller.signal.aborted) break;
        setMessages(prev => {
          const updated = [...prev];
          const last = updated.length - 1;
          updated[last] = { ...updated[last], content: prev[last].content + chunk.text };
          return updated;
        });
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: '⚠️ Error: ' + (err as Error).message,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  }, [input, isLoading, messages, selectedModel, systemPrompt]);

  // Stop generation
  const stopGeneration = useCallback(() => {
    abortController?.abort();
    setIsLoading(false);
    setAbortController(null);
  }, [abortController]);

  // Clear chat
  const clearChat = useCallback(() => {
    stopGeneration();
    setMessages([]);
    setInput('');
  }, [stopGeneration]);

  // Retry last response
  const retryLast = useCallback(async () => {
    if (messages.length < 2 || isLoading) return;
    stopGeneration();
    const lastUserIndex = [...messages].reverse().findIndex(m => m.role === 'user');
    if (lastUserIndex === -1) return;
    const actualIndex = messages.length - 1 - lastUserIndex;
    const lastMessage = messages[actualIndex];
    setMessages(prev => prev.slice(0, actualIndex + 1));
    await sendMessage(lastMessage.content);
  }, [messages, isLoading, stopGeneration, sendMessage]);

  return {
    // State
    messages,
    input,
    setInput,
    isLoading,
    selectedModel,
    setSelectedModel,
    
    // Actions
    sendMessage,
    stopGeneration,
    clearChat,
    retryLast,
    
    // Refs
    endRef,
  };
}
