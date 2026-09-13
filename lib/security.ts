// lib/security.ts — ตรวจสอบ/ล้างข้อมูลก่อนส่งออก (v2.0.0)

export const MAX_INPUT_LENGTH = 8000;
export const MIN_API_KEY_LENGTH = 16;

const HTML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * ล้างอักขระอันตรายออกจากข้อความผู้ใช้ก่อนส่งไป API
 * - ลบ `<script>...</script>`
 * - escape `& < > " '`
 * - trim + จำกัดความยาว
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  let sanitized = input;
  let previous: string;
  do {
    previous = sanitized;
    sanitized = sanitized.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  } while (sanitized !== previous);

  return sanitized
    .replace(/[&<>"']/g, (m) => HTML_ESCAPE[m] ?? m)
    .trim()
    .slice(0, MAX_INPUT_LENGTH);
}

/** ตรวจว่าข้อความไม่ว่างและไม่เกินความยาวที่กำหนด */
export function isValidLength(input: string, max: number = MAX_INPUT_LENGTH): boolean {
  return typeof input === 'string' && input.trim().length > 0 && input.length <= max;
}

/**
 * ตรวจคอนฟิก: apiKey ต้องยาวพอ และ baseURL ต้องเป็น http(s) ที่ parse ได้
 * (ใช้ URL parser แทน regex เพื่อกัน URL ปลอมอย่าง "https://" ลอย ๆ)
 */
export function validateConfig(cfg: { apiKey?: string; baseURL?: string }): boolean {
  const apiKey = cfg?.apiKey;
  const baseURL = cfg?.baseURL;

  if (typeof apiKey !== 'string' || apiKey.length < MIN_API_KEY_LENGTH) return false;
  if (typeof baseURL !== 'string' || baseURL.length === 0) return false;

  try {
    const url = new URL(baseURL);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/** สร้าง id ที่ไม่ชนกัน — ใช้ crypto.randomUUID ถ้ามี */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
