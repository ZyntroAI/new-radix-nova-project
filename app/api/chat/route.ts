// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { chatStream, ChatMessage } from '@/lib/ai-providers';

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatStream(messages, { model })) {
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
