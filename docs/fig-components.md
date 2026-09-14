# 🧩 FIG Components Registry — nova

> ทะเบียนรวม Fig ทุกเวอร์ชันในโปรเจกต์ nova (`ZyntroAI/new-radix-nova-project`)
> รวม 2 เวอร์ชันตามที่พบจริง: **v1** (`.jsx`) และ **v2** (`.tsx`) พร้อมไฟล์ประกอบทั้งหมด

## สรุปเวอร์ชัน

| เวอร์ชัน | ไฟล์ | ชนิด | สถานะ |
| --- | --- | --- | --- |
| v1 | `components/FIG.v1.jsx` | JSX (legacy) | เก็บไว้เป็น reference |
| v2 | `components/FIG.tsx` | TypeScript (ปัจจุบัน) | canonical |

v2 คือเวอร์ชันปัจจุบัน (ระบุ v2.0.0 ใน comment ของทุกไฟล์) — v1 เก็บไว้เทียบพฤติกรรมเดิม

## ไฟล์ทั้งหมดของ Fig

| ไฟล์ | หน้าที่ |
| --- | --- |
| `components/FIG.tsx` | คอมโพเนนต์ UI หลักของ Fig (v2) |
| `components/FIG.v1.jsx` | คอมโพเนนต์ Fig เวอร์ชันแรก (reference) |
| `components/FigPanel.tsx` | แผงสนทนาด้านข้าง (panel) ของ Fig |
| `lib/fig-context.tsx` | React context — config, messages, theme, sendMessage |
| `lib/api/fig.ts` | สตรีมคำตอบจาก FIG API (`fetchFIGStream`, SSE) |
| `lib/security.ts` | ตรวจ/ล้างข้อมูลก่อนส่งออก (`sanitizeInput`, `validateConfig`, `isValidLength`, `generateId`) |
| `types/fig.ts` | ประเภทข้อมูลกลาง (`FIGConfig`, `Message`, `FIGContextValue`, `StreamChunk`, `FIGMode`, `FIGTheme`) |
| `scripts/fig.test.ts` | ชุดทดสอบรันได้จริง (security + api) |

## API surface (types/fig.ts)

- `FIGTheme = 'light' | 'dark' | 'system'`
- `FIGMode = 'interactive' | 'builder' | 'preview'`
- `FIGConfig = { apiKey, baseURL, projectId, mode }`
- `FIGContextValue` — `config`, `messages`, `sendMessage`, `isLoading`, `isStreaming`, `error`, `clearHistory`, `theme`, `setTheme`

## ความปลอดภัย (lib/security.ts)

- `sanitizeInput()` — ลบ `<script>` (loop จนกว่าจะนิ่ง), escape `& < > " '`, trim, จำกัด `MAX_INPUT_LENGTH = 8000`
- `validateConfig()` — บังคับ `apiKey` ยาว ≥ `MIN_API_KEY_LENGTH = 16` และ `baseURL` เป็น URL จริง (ไม่รับ `https://` ลอย ๆ)

## ทดสอบ

```bash
node --experimental-strip-types scripts/fig.test.ts
# หรือ
pnpm dlx tsx scripts/fig.test.ts
```

## หมายเหตุ

- v1 (`FIG.v1.jsx`) ไม่มี types/security แยก — v2 ย้าย logic เหล่านั้นไป `types/fig.ts` และ `lib/security.ts`
- `lib/api/fig.ts` อ้างอิง `@/types/fig` โดยตรง (ใช้ path alias ของ Next.js)

---
_Last verified: 2026-09-14_
