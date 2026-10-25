// lib/ai-providers.ts
'use server';

import { createStreamableValue } from 'ai/rsc';

// ──────────────────────────────────────
// 📋 Types
// ──────────────────────────────────────
export type AIModel = 'openai/gpt-4o' | 'openai/gpt-4o-mini' | 'anthropic/claude-3-5-sonnet' | 'google/gemini-2.0-flash';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamResponse {
  text: string;
  done: boolean;
}

export interface ProviderConfig {
  apiKey: string;
  baseUrl?: string;
  defaultModel: string;
  models: AIModel[];
}

export interface ChatOptions {
  model?: AIModel;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

// ──────────────────────────────────────
// ⚙️ Provider Configurations
// ──────────────────────────────────────
const providers: Record<string, ProviderConfig> = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'openai/gpt-4o-mini',
    models: ['openai/gpt-4o', 'openai/gpt-4o-mini'],
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    baseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'anthropic/claude-3-5-sonnet',
    models: ['anthropic/claude-3-5-sonnet'],
  },
  google: {
    apiKey: process.env.GOOGLE_GENERATIVE_AI_KEY || '',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'google/gemini-2.0-flash',
    models: ['google/gemini-2.0-flash'],
  },
};

// ──────────────────────────────────────
// 🔧 Internal Helpers
// ──────────────────────────────────────
function parseModelString(model: AIModel) {
  const [provider, ...modelParts] = model.split('/');
  return { provider, modelId: modelParts.join('/') };
}

function getProvider(model: AIModel): ProviderConfig {
  const { provider } = parseModelString(model);
  const config = providers[provider];
  if (!config) throw new Error(`Unknown provider: ${provider}`);
  if (!config.apiKey) throw new Error(`Missing API key for provider: ${provider}`);
  return config;
}

// ──────────────────────────────────────
// 📤 Public API — List Models
// ──────────────────────────────────────
export function getAvailableModels(): AIModel[] {
  const available: AIModel[] = [];
  for (const [name, config] of Object.entries(providers)) {
    if (config.apiKey) available.push(...config.models);
  }
  return available;
}

export function getDefaultModel(): AIModel {
  for (const config of Object.values(providers)) {
    if (config.apiKey) return config.defaultModel;
  }
  throw new Error('No AI provider configured. Check your environment variables.');
}

// ──────────────────────────────────────
// 🚀 Core — Non-Streaming Chat
// ──────────────────────────────────────
export async function chatComplete(
  messages: ChatMessage[],
  options: ChatOptions = {},
): Promise<string> {
  const model = options.model || getDefaultModel();
  const temperature = options.temperature ?? 0.7;
  const maxTokens = options.maxTokens ?? 1024;

  const config = getProvider(model);
  const { provider, modelId } = parseModelString(model);

  if (provider === 'openai') {
    const res = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'OpenAI API error');
    return data.choices[0].message.content;
  }

  if (provider === 'anthropic') {
    const systemMsg = messages.find(m => m.role === 'system')?.content;
    const userMsgs = messages.filter(m => m.role !== 'system');
    const res = await fetch(`${config.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        system: systemMsg,
        messages: userMsgs.map(m => ({ role: m.role, content: m.content })),
        temperature,
        max_tokens: maxTokens,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Anthropic API error');
    return data.content[0].text;
  }

  if (provider === 'google') {
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const res = await fetch(`${config.baseUrl}/models/${modelId}:generateContent?key=${config.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature, maxOutputTokens: maxTokens },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Google API error');
    return data.candidates[0].content.parts[0].text;
  }

  throw new Error(`Provider ${provider} not implemented`);
}

// ──────────────────────────────────────
// ⚡ Streaming Chat (Recommended!)
// ──────────────────────────────────────
export async function* chatStream(
  messages: ChatMessage[],
  options: ChatOptions = {},
): AsyncGenerator<StreamResponse, void, unknown> {
  const model = options.model || getDefaultModel();
  const temperature = options.temperature ?? 0.7;
  const maxTokens = options.maxTokens ?? 1024;

  const config = getProvider(model);
  const { provider, modelId } = parseModelString(model);

  let url: string, body: any, headers: Record<string, string>;

  if (provider === 'openai') {
    url = `${config.baseUrl}/chat/completions`;
    headers = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    };
    body = { model: modelId, messages, temperature, max_tokens: maxTokens, stream: true };
  } else if (provider === 'anthropic') {
    url = `${config.baseUrl}/messages`;
    headers = {
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    };
    const systemMsg = messages.find(m => m.role === 'system')?.content;
    const userMsgs = messages.filter(m => m.role !== 'system');
    body = {
      model: modelId,
      system: systemMsg,
      messages: userMsgs,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    };
  } else if (provider === 'google') {
    url = `${config.baseUrl}/models/${modelId}:streamGenerateContent?key=${config.apiKey}&alt=sse`;
    headers = { 'Content-Type': 'application/json' };
    body = {
      contents: messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature, maxOutputTokens: maxTokens },
    };
  } else {
    throw new Error(`Provider ${provider} not supported for streaming`);
  }

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  if (!res.body) throw new Error('No response body');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        try {
          if (provider === 'openai' && line.startsWith('data: ')) {
            if (line === 'data: [DONE]') continue;
            const data = JSON.parse(line.slice(6));
            const text = data.choices?.[0]?.delta?.content || '';
            if (text) yield { text, done: false };
          } else if (provider === 'anthropic') {
            if (line.startsWith('event:')) continue;
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'content_block_delta') {
                yield { text: data.delta.text, done: false };
              }
            }
          } else if (provider === 'google') {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (text) yield { text, done: false };
            }
          }
        } catch {
          // Skip malformed lines silently
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  yield { text: '', done: true };
}
