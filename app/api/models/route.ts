// app/api/models/route.ts
 import { NextResponse } from 'next/server';
 import { getAvailableModels, AIModel } from '@/lib/ai-providers';
 // Map model IDs to display info
 const MODEL_METADATA: Record<AIModel, { name: string; description: string; provider: string }> = {
   'openai/gpt-4o': { name: 'GPT-4o', provider: 'OpenAI', description: 'Most capable — vision & reasoning' },
   'openai/gpt-4o-mini': { name: 'GPT-4o Mini', provider: 'OpenAI', description: 'Fast & cost-effective' },
   'anthropic/claude-3-5-sonnet': { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Strong reasoning, long context' },
   'google/gemini-2.0-flash': { name: 'Gemini 2.0 Flash', provider: 'Google', description: 'Fast multimodal' },
 };
 export async function GET() {
   try {
     const availableIds = getAvailableModels();
     
     const models = availableIds.map(id => ({
       id,
       ...MODEL_METADATA[id],
     }));
     return NextResponse.json({ models });
   } catch (error) {
     return NextResponse.json({ error: 'Failed to load models' }, { status: 500 });
   }
 }