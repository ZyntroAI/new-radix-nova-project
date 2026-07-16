// app/api/ai/route.ts
import { NextResponse } from "next/server";
import { AzureKeyCredential } from "@azure/core-auth";
import { createClient } from "@supabase/supabase-js";
import { getLongRunningPoller } from "@azure-rest/ai-inference";
import { createClient as createInferenceClient } from "@azure-rest/ai-inference";
import { parseSseEventStream } from "@azure/core-sse";

// Securely load env vars
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const endpoint = process.env.AZURE_AI_ENDPOINT!;
const apiKey = process.env.AZURE_AI_KEY!;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Authenticate with Azure
    const client = createInferenceClient(endpoint, new AzureKeyCredential(apiKey));

    // Send prompt to Azure AI model
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4", // or llama/mistral depending on your Azure setup
        stream: true,   // enable streaming
      },
    });

    if (response.status !== "200") {
      return NextResponse.json({ error: "Azure AI request failed" }, { status: 500 });
    }

    // Stream response back to client
    const reader = response.body?.getReader();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }

        for await (const event of parseSseEventStream(reader)) {
          if (event.type === "message") {
            controller.enqueue(encoder.encode(event.data));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
