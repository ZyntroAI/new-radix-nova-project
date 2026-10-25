// components/model-selector.tsx
'use client';

import * as React from 'react';
import { ChevronDown, Check, Sparkles, Brain, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

// ──────────────────────────────────────
// 📋 Types
// ──────────────────────────────────────
export interface ModelOption {
  id: string;           // e.g., "openai/gpt-4o-mini"
  name: string;         // e.g., "GPT-4o Mini"
  provider: string;     // e.g., "OpenAI"
  description?: string; // Short capability summary
  icon?: React.ReactNode;
}

interface ModelSelectorProps {
  value?: string;
  onChange: (modelId: string) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
}

// ──────────────────────────────────────
// 📦 Built-in Model Definitions
// ──────────────────────────────────────
export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Most capable model — vision & reasoning',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Fast & cost-effective daily tasks',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'anthropic/claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Strong reasoning & long context',
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: 'google/gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    description: 'Fast multimodal — great for speed',
    icon: <Cloud className="w-4 h-4" />,
  },
];

// ──────────────────────────────────────
// 🎯 Component
// ──────────────────────────────────────
export function ModelSelector({
  value,
  onChange,
  className,
  disabled = false,
  label = 'AI Model',
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [models, setModels] = React.useState<ModelOption[]>(MODEL_OPTIONS);
  const [isLoading, setIsLoading] = React.useState(false);

  // Get selected model info
  const selectedModel = React.useMemo(
    () => models.find(m => m.id === value),
    [models, value]
  );

  // Group models by provider
  const groupedModels = React.useMemo(() => {
    return models.reduce((groups, model) => {
      if (!groups[model.provider]) groups[model.provider] = [];
      groups[model.provider].push(model);
      return groups;
    }, {} as Record<string, ModelOption[]>);
  }, [models]);

  // Optional: Fetch available models from API
  React.useEffect(() => {
    async function loadModels() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/models');
        if (res.ok) {
          const data = await res.json();
          if (data.models?.length) setModels(data.models);
        }
      } catch {
        // Fallback to built-in models if API fails — silent fail
      } finally {
        setIsLoading(false);
      }
    }
    loadModels();
  }, []);

  return (
    <div className={cn('relative', className)}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 rounded-lg border text-sm',
          'bg-white dark:bg-slate-800',
          'border-slate-200 dark:border-slate-700',
          'text-slate-900 dark:text-slate-100',
          'hover:border-slate-300 dark:hover:border-slate-600',
          'focus:outline-none focus:ring-2 focus:ring-sky-500/50',
          'transition-colors duration-150',
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {isLoading ? (
            <span className="text-slate-400">Loading models…</span>
          ) : selectedModel ? (
            <>
              {selectedModel.icon}
              <span className="truncate">{selectedModel.name}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                {selectedModel.provider}
              </span>
            </>
          ) : (
            <span className="text-slate-400">Select a model…</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Click-outside Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div
            className={cn(
              'absolute z-50 top-full left-0 right-0 mt-1 py-2 rounded-lg border shadow-xl',
              'bg-white dark:bg-slate-800',
              'border-slate-200 dark:border-slate-700'
            )}
          >
            {Object.entries(groupedModels).map(([provider, providerModels]) => (
              <div key={provider}>
                {/* Provider Header */}
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {provider}
                </div>

                {/* Model Options */}
                {providerModels.map(model => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      onChange(model.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 text-sm text-left',
                      'hover:bg-slate-50 dark:hover:bg-slate-700/50',
                      'focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-700/50'
                    )}
                  >
                    {/* Icon */}
                    <span className="flex-shrink-0 text-slate-500 dark:text-slate-400">
                      {model.icon || <Sparkles className="w-4 h-4" />}
                    </span>

                    {/* Model Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {model.name}
                      </div>
                      {model.description && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {model.description}
                        </div>
                      )}
                    </div>

                    {/* Checkmark for Selected */}
                    {value === model.id && (
                      <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
