// hooks/use-model-selector.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AIModel, getAvailableModels, getDefaultModel } from '@/lib/ai-providers';

export interface ModelOption {
  id: AIModel;
  name: string;
  provider: string;
  description?: string;
}

const METADATA: Record<AIModel, Omit<ModelOption, 'id'>> = {
  'openai/gpt-4o': { name: 'GPT-4o', provider: 'OpenAI', description: 'Most capable model' },
  'openai/gpt-4o-mini': { name: 'GPT-4o Mini', provider: 'OpenAI', description: 'Fast & affordable' },
  'anthropic/claude-3-5-sonnet': { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Long context' },
  'google/gemini-2.0-flash': { name: 'Gemini 2.0 Flash', provider: 'Google', description: 'Fast multimodal' },
};

export function useModelSelector() {
  const [models, setModels] = useState<ModelOption[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadModels = useCallback(async () => {
    setIsLoading(true);
    try {
      // Try API first, fall back to local
      let available: AIModel[] = [];
      try {
        const res = await fetch('/api/models');
        if (res.ok) {
          const data = await res.json();
          available = data.models?.map((m: { id: string }) => m.id as AIModel) || [];
        }
      } catch {
        available = getAvailableModels();
      }
      
      const list = available.map(id => ({ id, ...METADATA[id] }));
      setModels(list);
      
      if (!selectedModel) {
        const defaultModel = getDefaultModel();
        setSelectedModel(available.includes(defaultModel) ? defaultModel : available[0]);
      }
    } catch {
      console.warn('No AI models available');
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel]);

  useEffect(() => { loadModels(); }, [loadModels]);

  return {
    models,
    selectedModel,
    setSelectedModel,
    isLoading,
    refetch: loadModels,
  };
}
