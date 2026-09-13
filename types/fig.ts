// types/fig.ts — ประเภทข้อมูลกลางของ FIG (v2.0.0)
// NOTE: `timestamp` ใช้ ISO string (JSON-safe) แทน Date

export type FIGTheme = 'light' | 'dark' | 'system';
export type FIGMode = 'interactive' | 'builder' | 'preview';
export type FIGRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: FIGRole;
  content: string;
  /** ISO 8601 timestamp, e.g. new Date().toISOString() */
  timestamp: string;
}

export interface FIGConfig {
  apiKey: string;
  baseURL: string;
  projectId: string;
  mode: FIGMode;
}

export interface StreamChunk {
  content: string;
  done?: boolean;
}

export interface FIGContextValue {
  config: FIGConfig;
  messages: Message[];
  sendMessage: (msg: string) => Promise<void>;
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  clearHistory: () => void;
  theme: FIGTheme;
  setTheme: (t: FIGTheme) => void;
}
