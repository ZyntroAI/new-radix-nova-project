'use client';

// components/FigPanel.tsx — ตัวห่อสำหรับวางใน layout
// อ่านค่า env, ตรวจคอนฟิก, แล้วเรนเดอร์ FIG ก็ต่อเมื่อคอนฟิกใช้ได้
// ถ้าคอนฟิกไม่ครบ จะเรนเดอร์ null (ไม่ทำให้หน้าแอปพัง)

import { FIG } from '@/components/FIG';
import { FIGProvider } from '@/lib/fig-context';
import { validateConfig } from '@/lib/security';

const API_KEY = process.env.NEXT_PUBLIC_FIG_KEY ?? '';
const BASE_URL = process.env.NEXT_PUBLIC_FIG_API_URL ?? 'https://api.hellofig.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_FIG_PROJECT_ID ?? 'proj-123';

export function FigPanel() {
  const configValid = validateConfig({ apiKey: API_KEY, baseURL: BASE_URL });

  if (!configValid) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[FIG] คอนฟิกไม่ครบ — ต้องตั้ง NEXT_PUBLIC_FIG_KEY (ยาว >= 16 ตัวอักษร) และ NEXT_PUBLIC_FIG_API_URL',
      );
    }
    return null;
  }

  return (
    <FIGProvider
      apiKey={API_KEY}
      baseURL={BASE_URL}
      projectId={PROJECT_ID}
      persistHistory
      defaultMode="interactive"
    >
      <FIG triggerText="💬 AI ช่วยเหลือ" position="bottom-right" placeholder="พิมพ์คำสั่ง..." />
    </FIGProvider>
  );
}
