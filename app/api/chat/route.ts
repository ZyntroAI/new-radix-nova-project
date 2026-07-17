// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createClient as createInferenceClient } from "@azure-rest/ai-inference";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const endpoint = process.env.AZURE_AI_ENDPOINT!;
const apiKey = process.env.AZURE_AI_KEY!;

export async function POST(req: Request) {
  const { prompt, userId } = await req.json();

  const client = createInferenceClient(endpoint, new AzureKeyCredential(apiKey));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    },
  });

  const aiReply = response.body?.choices?.[0]?.message?.content ?? "";

  // Save to Supabase
  await supabase.from("ai_chat_logs").insert({
    user_id: userId,
    prompt,
    response: aiReply,
  });

  return NextResponse.json({ reply: aiReply });
}
