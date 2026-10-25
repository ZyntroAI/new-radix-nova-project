🤖 AGENTS.md / CLAUDE.md — คำแนะนำสำหรับ AI Agents
 
โปรเจกต์: new-radix-nova-project
อัปเดตล่าสุด: 25 ตุลาคม 2026
วัตถุประสงค์: คู่มือสำหรับ AI coding assistants เพื่อเข้าใจโครงสร้าง กฎ และแนวทางการพัฒนาของโปรเจกต์นี้อย่างถูกต้อง
 
 
 
📑 สารบัญ
 
- 1. ภาพรวมโปรเจกต์
- 2. โครงสร้างโฟลเดอร์
- 3. กฎและข้อกำหนดทางเทคนิค
- 4. สไตล์การเขียนโค้ด
- 5. สิ่งที่ต้องรู้ก่อนแก้ไขโค้ด
- 6. Environment Variables & ความลับ
- 7. Pull Request & Commit Guidelines
- 8. คำสั่งที่ใช้บ่อย
 
 
 
1. ภาพรวมโปรเจกต์
 
รายการ ข้อมูล 
ชื่อโปรเจกต์ new-radix-nova-project 
Framework Next.js 14+ (App Router) 
ภาษา TypeScript เท่านั้น — ห้ามใช้ JavaScript ใหม่ 
UI Library Radix UI + shadcn/ui + Tailwind CSS 
State Management Zustand (client-side เท่านั้น) 
Package Manager pnpm เป็นหลัก รองรับ npm 
Node.js 18+ LTS 
จุดประสงค์ AI-assisted UI scaffold พร้อม API routes สำหรับแชท/AI 
 
 
 
2. โครงสร้างโฟลเดอร์
 
plaintext  
new-radix-nova-project/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Server-side เท่านั้น)
│   │   ├── ai/route.ts          # AI endpoint
│   │   └── chat/route.ts        # Chat endpoint
│   ├── layout.tsx               # Root Layout — import ThemeProvider
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles + Tailwind base
├── components/                  # UI Components — Radix/shadcn style
│   └── theme-provider.tsx       # Dark/light theme provider
├── lib/                         # Shared utilities — pure TypeScript
├── src/store/                   # Zustand stores
│   └── kpi.ts                   # Example KPI store
├── public/                      # Static assets
├── backend/                     # Backend-only services
├── .docs/, docs/                # Documentation — อย่าแก้ไขโดยไม่จำเป็น
├── workflows/                   # CI/CD GitHub Actions
├── .env.example                 # Environment template — ไม่มีค่าจริง
├── .env.local                   # ✅ ไม่มีใน Git — สำหรับความลับส่วนตัว
├── tsconfig.json                # TypeScript config — strict mode
├── tailwind.config.ts           # Tailwind config
├── next.config.mjs              # Next.js config
└── package.json                 # Dependencies & scripts
 
 
 
 
3. กฎและข้อกำหนดทางเทคนิค
 
✅ ต้องปฏิบัติ
 
- ใช้ TypeScript เท่านั้น: สร้างไฟล์ใหม่เป็น  .ts  หรือ  .tsx  เสมอ
- App Router Convention: ใช้  page.tsx ,  layout.tsx ,  loading.tsx ,  error.tsx  ตามมาตรฐาน Next.js
- Server vs Client Components:
- ใส่  'use client'  เฉพาะเมื่อจำเป็น (ใช้ state, effect, browser API)
- ค่าเริ่มต้นคือ Server Component
- API Routes: เขียนที่  app/api/*/route.ts  เท่านั้น — ใช้ HTTP method ที่ตรงกัน ( GET ,  POST  ฯลฯ)
- Environment Variables:
- Server-side: ไม่มี prefix — อ่านได้เฉพาะใน API routes/Server components
- Client-side: ต้องขึ้นต้นด้วย  NEXT_PUBLIC_  — ห้ามใส่ความลับที่นี่
- Imports: ใช้  @/  alias ชี้ไปที่ root ( @/components ,  @/lib )
 
❌ ห้ามทำ
 
- ❌ ห้าม commit ความลับ: API keys, passwords, tokens — เก็บใน  .env.local  เท่านั้น
- ❌ ห้ามแก้ไข  pnpm-lock.yaml  ด้วยตนเอง: ให้ pnpm จัดการอัตโนมัติ
- ❌ ห้ามปิด TypeScript errors: แก้ไขโค้ดให้ถูกต้องแทนที่จะใช้  // @ts-ignore 
- ❌ ห้ามใช้  any  โดยไม่จำเป็น: ใช้  unknown  พร้อม type check หรือสร้าง Interface แทน
- ❌ ห้ามฝัง API key ฝั่ง Client: Server-side routes เท่านั้นที่สามารถเรียกใช้ API keys ได้
- ❌ ห้าม push โดยไม่รัน checks: ต้องผ่าน  typecheck  +  lint  ก่อน
 
 
 
4. สไตล์การเขียนโค้ด
 
📝 การตั้งชื่อ
 
ประเภท รูปแบบ ตัวอย่าง 
ไฟล์ Component PascalCase  UserProfile.tsx  
ไฟล์ Utility camelCase  formatDate.ts  
Interface/Type PascalCase  interface User { ... }  
ตัวแปร/ฟังก์ชัน camelCase  const userName = ""  
ค่าคงที่ UPPER_SNAKE_CASE  const MAX_RETRIES = 3  
Folder kebab-case หรือ lowercase  user-settings/  
 
🎨 Code Style
 
typescript  
// ✅ มี Type annotation ที่ชัดเจน
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

// ✅ ใช้ Type Return ที่ชัดเจน
async function sendMessage(content: string): Promise<ChatMessage> {
  // ...
}

// ✅ ใช้ Tailwind classes — ไม่สร้าง CSS แยก
<div className="flex items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
 
 
🔍 คำสั่งตรวจสอบ
 
bash  
pnpm run typecheck   # ต้องผ่านโดยไม่มี error
pnpm run lint        # ต้องผ่าน
pnpm run format      # จัดรูปแบบโค้ด
 
 
 
 
5. สิ่งที่ต้องรู้ก่อนแก้ไขโค้ด
 
5.1 ถ้าเพิ่ม API Route ใหม่
 
- สร้างที่:  app/api/[your-endpoint]/route.ts 
- ตัวอย่างโครงสร้าง:
 
typescript  
// app/api/example/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // ตรวจสอบข้อมูลนำเข้า
    return Response.json({ success: true, data: body });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
 
 
5.2 ถ้าเพิ่ม Component ใหม่
 
- วางที่:  components/ 
- ถ้าเป็น Client Component: ขึ้นต้นด้วย  'use client'  ที่บรรทัดแรก
- ใช้ Radix components + Tailwind classes
 
5.3 ถ้าแก้ไข/เพิ่ม Environment Variable
 
- อัปเดต  .env.example  ด้วยชื่อตัวแปรและคำอธิบาย — ไม่ต้องใส่ค่าจริง
- อัปเดต  lib/env.ts  (ถ้ามี) เพื่อให้มี type safety
- แจ้งใน PR description ว่าต้องเพิ่มตัวแปรไหน
 
 
 
6. Environment Variables & ความลับ
 
✅ สิ่งที่ต้องบอกผู้ใช้เสมอ
 
-  .env.local  เป็นไฟล์ส่วนตัว — ไม่เคยอยู่ใน Git
-  .env.example  คือแม่แบบ — มีเฉพาะชื่อตัวแปร ไม่มีค่าจริง
- ถ้าโค้ดอ้างถึงตัวแปรใหม่ → อัปเดต  .env.example  ด้วย
- ตัวแปรที่ไม่มี  NEXT_PUBLIC_  prefix จะเป็น  undefined  ที่ฝั่ง Browser — อย่าใช้ที่นั่น
 
🔑 เมื่อต้องใช้ API Key ภายนอก
 
- ฝั่ง Client: ❌ ห้ามใช้โดยตรง
- ผ่าน API Route เท่านั้น: Client → API Route (Server) → External API
- ตัวอย่างรูปแบบ:
 
plaintext  
Client Component → POST /api/ai → route.ts (อ่าน OPENAI_API_KEY จาก process.env) → OpenAI API
 
 
 
 
7. Pull Request & Commit Guidelines
 
📌 ข้อความ Commit
 
ใช้รูปแบบนี้:
 
plaintext  
type(scope): short description

- feat: คุณสมบัติใหม่
- fix: แก้ไขบั๊ก
- docs: อัปเดตเอกสาร
- refactor: ปรับปรุงโค้ดไม่เปลี่ยนฟังก์ชัน
- chore: อัปเดต deps, config ฯลฯ
 
 
ตัวอย่าง:  feat(chat): add message loading state 
 
✅ ก่อนส่ง PR
 
รัน  pnpm run typecheck  — ผ่าน
รัน  pnpm run lint  — ผ่าน
รัน  pnpm run build  — ไม่มี error
อัปเดตเอกสารที่เกี่ยวข้อง (README, SETUP.md ฯลฯ)
ไม่มีความลับในโค้ด
อัปเดต  .env.example  ถ้ามีตัวแปรใหม่
 
 
 
8. คำสั่งที่ใช้บ่อย
 
bash  
# ติดตั้ง
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# ตรวจสอบ
pnpm run typecheck
pnpm run lint
pnpm run format

# ตรวจสอบความปลอดภัย deps
pnpm audit
 
 
 
 
🧠 คำแนะนำเพิ่มเติมสำหรับ AI Assistants
 
💡 เมื่อตอบผู้ใช้:
 
- อ้างอิงไฟล์และ path ให้ชัดเจน
- แยกความแตกต่างระหว่าง Server กับ Client ให้ชัดเจน
- เตือนผู้ใช้เมื่อต้องตั้งค่า Environment Variable ใหม่
- แนะนำ  .env.example  เมื่อมีตัวแปรใหม่
- หลีกเลี่ยงการสร้างไฟล์  .js  ใหม่ — แปลงเป็น  .ts/.tsx  แทน
- เมื่อไม่แน่ใจ ให้ถามผู้ใช้ ไม่ใช่เดา
 
⚠️ เมื่อพูดถึงความลับ:
 
- ไม่เคยถามหรือแสดงค่า API key จริง
- บอกเฉพาะว่าต้องตั้งค่าที่ไหนและอย่างไรเท่านั้น
- เตือนเสมอว่า "อย่า commit ไฟล์ .env.local"
 
 
 
ต้องการปรับเพิ่มกฎหรือแนวทางสำหรับ AI Agents ไหมครับ? 😊