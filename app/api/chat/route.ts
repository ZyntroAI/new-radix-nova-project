// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { chatStream, ChatMessage, AIModel } from '@/lib/ai-providers';

const ALLOWED_MODELS: readonly AIModel[] = [
  'openai/gpt-4o',
  'openai/gpt-4o-mini',
  'anthropic/claude-3-5-sonnet',
  'google/gemini-2.0-flash',
] as const;

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json();

    const selectedModel: AIModel | undefined =
      typeof model === 'string' && (ALLOWED_MODELS as readonly string[]).includes(model)
        ? (model as AIModel)
        : undefined;

    if (!selectedModel) {
      return NextResponse.json({ error: 'Invalid model' }, { status: 400 });
    }
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatStream(messages, { model: selectedModel })) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(
                `data: ${JSON.stringify({ text: chunk.text })}\n\n`
              ));
            }
            if (chunk.done) controller.close();
          }
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
