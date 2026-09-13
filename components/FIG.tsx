'use client';

// components/FIG.tsx — กล่องสนทนา FIG (v2.0.0)
// ใช้ Radix Dialog primitive ตรง ๆ + UI components ของโปรเจกต์

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useFIG } from '@/lib/fig-context';
import { MAX_INPUT_LENGTH } from '@/lib/security';

export type FIGPosition = 'bottom-right' | 'bottom-left' | 'top-right';

const POSITION_CLASS: Record<FIGPosition, string> = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-right': 'top-4 right-4',
};

export interface FIGProps {
  className?: string;
  triggerText?: string;
  position?: FIGPosition;
  placeholder?: string;
  title?: string;
}

export const FIG = React.forwardRef<HTMLDivElement, FIGProps>(function FIG(
  {
    className,
    triggerText = 'เปิด AI',
    position = 'bottom-right',
    placeholder = 'พิมพ์คำสั่ง...',
    title = 'FIG AI',
  },
  ref,
) {
  const { messages, sendMessage, isLoading, isStreaming, error, clearHistory } = useFIG();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // เลื่อนลงล่างสุดแบบสมูทเมื่อข้อความเปลี่ยน
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || isLoading) return;
    setInput('');
    void sendMessage(value);
  };

  const remaining = MAX_INPUT_LENGTH - input.length;

  return (
    <div ref={ref} className={cn('z-50', className)}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <Button className={cn('fixed shadow-lg', POSITION_CLASS[position])}>{triggerText}</Button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l bg-background shadow-xl outline-none">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <DialogPrimitive.Title className="text-sm font-semibold">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-xs text-muted-foreground">
                  {isStreaming ? 'กำลังสตรีมคำตอบ...' : 'พร้อมช่วยเหลือ'}
                </DialogPrimitive.Description>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  disabled={messages.length === 0}
                >
                  ล้าง
                </Button>
                <DialogPrimitive.Close asChild>
                  <Button variant="ghost" size="sm" aria-label="ปิด">
                    ✕
                  </Button>
                </DialogPrimitive.Close>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-3 p-4">
                {messages.length === 0 ? (
                  <p className="py-10 text-center text-sm text-muted-foreground">เริ่มการสนทนา...</p>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words',
                          m.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground',
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))
                )}

                {isLoading && !isStreaming && (
                  <p className="animate-pulse text-sm text-muted-foreground">กำลังตอบ...</p>
                )}

                {error && (
                  <p
                    role="alert"
                    className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  >
                    ผิดพลาด: {error}
                  </p>
                )}

                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1 border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder}
                  disabled={isLoading}
                  maxLength={MAX_INPUT_LENGTH}
                  aria-label="ข้อความ"
                />
                <Button type="submit" disabled={isLoading || input.trim().length === 0}>
                  {isLoading ? '...' : 'ส่ง'}
                </Button>
              </div>
              <span
                className={cn(
                  'self-end text-[11px] tabular-nums',
                  remaining < 200 ? 'text-destructive' : 'text-muted-foreground',
                )}
              >
                {input.length}/{MAX_INPUT_LENGTH}
              </span>
            </form>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
});

FIG.displayName = 'FIG';
