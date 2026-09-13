'use client';

// lib/fig-context.tsx — Context + state + streaming (v2.0.0)

import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { FIGConfig, FIGContextValue, FIGMode, FIGTheme, Message } from '@/types/fig';
import { fetchFIGStream } from '@/lib/api/fig';
import { generateId, sanitizeInput, validateConfig } from '@/lib/security';
import { useLocalStorage } from '@/hooks/use-local-storage';

const DEFAULT_BASE_URL = 'https://api.hellofig.io/v1';
const HISTORY_KEY = 'fig_chat_history';

const FIGContext = createContext<FIGContextValue | null>(null);

export interface FIGProviderProps {
  children: React.ReactNode;
  apiKey: string;
  projectId: string;
  baseURL?: string;
  defaultMode?: FIGMode;
  defaultTheme?: FIGTheme;
  persistHistory?: boolean;
}

export function FIGProvider({
  children,
  apiKey,
  projectId,
  baseURL = DEFAULT_BASE_URL,
  defaultMode = 'interactive',
  defaultTheme = 'system',
  persistHistory = true,
}: FIGProviderProps) {
  const config = useMemo<FIGConfig>(
    () => ({ apiKey, baseURL, projectId, mode: defaultMode }),
    [apiKey, baseURL, projectId, defaultMode],
  );
  const configValid = useMemo(() => validateConfig({ apiKey, baseURL }), [apiKey, baseURL]);

  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const [savedHistory, setSavedHistory] = useLocalStorage<Message[]>(HISTORY_KEY, []);
  const [messages, setMessages] = useState<Message[]>(persistHistory ? savedHistory : []);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<FIGTheme>(defaultTheme);
  const abortRef = useRef<AbortController | null>(null);

  // เก็บประวัติลง localStorage ทุกครั้งที่ข้อความเปลี่ยน
  useEffect(() => {
    if (persistHistory) setSavedHistory(messages);
  }, [messages, persistHistory, setSavedHistory]);

  // ยกเลิกคำขอที่ค้างเมื่อ unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setSavedHistory([]);
    setError(null);
  }, [setSavedHistory]);

  const sendMessage = useCallback(
    async (raw: string) => {
      if (!configValid) {
        setError('คอนฟิกไม่ถูกต้อง — ตรวจสอบ API key และ API URL');
        return;
      }

      const content = sanitizeInput(raw);
      if (!content) return;

      // ยกเลิกคำขอเดิมก่อนเริ่มใหม่
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setMessages((prev) => [
        ...prev,
        { id: generateId(), role: 'user', content, timestamp: new Date().toISOString() },
      ]);
      setIsLoading(true);
      setIsStreaming(true);
      setError(null);

      const assistantId = generateId();
      let buffer = '';
      let started = false;

      try {
        for await (const chunk of fetchFIGStream(configRef.current, content, controller.signal)) {
          if (chunk.content) {
            buffer += chunk.content;
            if (!started) {
              started = true;
              setMessages((prev) => [
                ...prev,
                {
                  id: assistantId,
                  role: 'assistant',
                  content: buffer,
                  timestamp: new Date().toISOString(),
                },
              ]);
            } else {
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: buffer } : m)),
              );
            }
          }
          if (chunk.done) break;
        }
      } catch (err) {
        const e = err as Error;
        if (e.name !== 'AbortError') setError(e.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [configValid],
  );

  const value = useMemo<FIGContextValue>(
    () => ({
      config,
      messages,
      sendMessage,
      isLoading,
      isStreaming,
      error,
      clearHistory,
      theme,
      setTheme,
    }),
    [config, messages, sendMessage, isLoading, isStreaming, error, clearHistory, theme],
  );

  return <FIGContext.Provider value={value}>{children}</FIGContext.Provider>;
}

export function useFIG(): FIGContextValue {
  const ctx = useContext(FIGContext);
  if (!ctx) throw new Error('useFIG ต้องถูกเรียกภายใน <FIGProvider>');
  return ctx;
}
