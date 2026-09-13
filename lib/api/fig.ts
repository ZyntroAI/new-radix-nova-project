// lib/api/fig.ts — สตรีมคำตอบจาก FIG API (v2.0.0)
// รองรับ AbortSignal เพื่อยกเลิกคำขอที่ค้างอยู่ได้

import type { FIGConfig, StreamChunk } from '@/types/fig';

/** แกะข้อความ delta จาก SSE payload (รองรับหลายรูปแบบผู้ให้บริการ) */
function extractDelta(payload: string): string {
  try {
    const json = JSON.parse(payload);
    return (
      json?.choices?.[0]?.delta?.content ??
      json?.choices?.[0]?.message?.content ??
      json?.delta?.content ??
      json?.content ??
      ''
    );
  } catch {
    return '';
  }
}

/** แกะบรรทัด `data:` จาก SSE block */
function dataLineOf(block: string): string | null {
  const line = block.split('\n').find((l) => l.startsWith('data:'));
  return line ? line.slice(5).trim() : null;
}

/**
 * สตรีมคำตอบเป็น async generator
 * @throws Error เมื่อ HTTP ไม่ใช่ 2xx หรือสตรีมถูก abort (AbortError)
 */
export async function* fetchFIGStream(
  config: FIGConfig,
  prompt: string,
  signal?: AbortSignal,
): AsyncGenerator<StreamChunk, void, unknown> {
  const url = `${config.baseURL.replace(/\/+$/, '')}/chat/completions`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
    },
    body: JSON.stringify({
      project_id: config.projectId,
      mode: config.mode,
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    }),
    signal,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`FIG API error ${res.status}${detail ? `: ${detail.slice(0, 200)}` : ''}`);
  }

  if (!res.body) {
    yield { content: '', done: true };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const blocks = buffer.split('\n\n');
      buffer = blocks.pop() ?? '';

      for (const block of blocks) {
        const data = dataLineOf(block);
        if (data === null) continue;
        if (data === '[DONE]') {
          yield { content: '', done: true };
          return;
        }
        const delta = extractDelta(data);
        if (delta) yield { content: delta };
      }
    }

    // เศษ block สุดท้ายที่ไม่มี \n\n ปิดท้าย
    const tail = dataLineOf(buffer);
    if (tail && tail !== '[DONE]') {
      const delta = extractDelta(tail);
      if (delta) yield { content: delta };
    }

    yield { content: '', done: true };
  } finally {
    reader.releaseLock?.();
  }
}
