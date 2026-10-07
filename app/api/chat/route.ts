// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createClient as createInferenceClient } from "@azure-rest/ai-inference";

export const dynamic = "force-dynamic"; // never cache a chat response
// export const runtime = "edge"; // optional: both deps support Edge → lower latency

// Fail fast at boot if env is missing (instead of a cryptic runtime error)
for (const k of ["AZURE_AI_ENDPOINT", "AZURE_AI_KEY", "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_SUPABASE_URL"]) {
  if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } } // server-side: no session storage
);

const azureClient = createInferenceClient(
  process.env.AZURE_AI_ENDPOINT!,
  new AzureKeyCredential(process.env.AZURE_AI_KEY!)
);

const MAX_PROMPT_CHARS = 4000;
const AI_TIMEOUT_MS = 30_000;

export async function POST(req: Request) {
  try {
    // 1. Auth: derive the user from a verified Supabase JWT — ignore client userId entirely
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !data.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = data.user.id;

    // 2. Validate + bound the input
    const body = await req.json().catch(() => null);
    const prompt = body?.prompt;
    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }
    if (prompt.length > MAX_PROMPT_CHARS) {
      return NextResponse.json({ error: "prompt too long" }, { status: 413 });
    }

    // 3. Call Azure with a timeout and an explicit cost cap
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
    let response;
    try {
      response = await azureClient.path("/chat/completions").post({
        body: {
          messages: [{ role: "user", content: prompt }],
          model: process.env.AZURE_AI_MODEL ?? "gpt-4",
          max_tokens: 1024, // per-call cost ceiling — tune to your use case
          temperature: 0.3,
        },
        requestOptions: { signal: controller.signal },
      });
    } finally {
      clearTimeout(timeout);
    }

    if (response.status !== "200") {
      console.error("[chat] Azure error:", response.status, response.body);
      return NextResponse.json({ error: "AI request failed" }, { status: 502 });
    }

    const aiReply = response.body?.choices?.[0]?.message?.content ?? "";

    // 4. Log, but never let a logging failure break the response
    try {
      const { error: dbErr } = await supabase.from("ai_chat_logs").insert({
        user_id: userId,
        prompt,
        response: aiReply,
      });
      if (dbErr) console.error("[chat] log insert failed:", dbErr);
    } catch (e) {
      console.error("[chat] log insert threw:", e);
    }

    return NextResponse.json(
      { reply: aiReply },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[chat] unhandled error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

const { data } = await supabase.auth.getSession();
await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.session?.access_token}`,
  },
  body: JSON.stringify({ prompt }),
});
