// hooks/use-copy-to-clipboard.ts
'use client';

import { useState, useCallback } from 'react';

export function useCopyToClipboard(timeoutMs = 2000) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), timeoutMs);
    } catch (err) {
      setError(err as Error);
    }
  }, [timeoutMs]);

  return { copy, copied, error };
}
