📖 INSTALL.md — คู่มือการติดตั้งแบบละเอียด
 
โปรเจกต์: new-radix-nova-project
เวอร์ชัน: 1.0.0
อัปเดตล่าสุด: 25 ตุลาคม 2026
 
 
 
📑 สารบัญ
 
- 1. ข้อกำหนดเบื้องต้น
- 2. ติดตั้งเครื่องมือที่จำเป็น
- 3. ดาวน์โหลดโปรเจกต์
- 4. ติดตั้ง Dependencies
- 5. ตั้งค่า Environment Variables
- 6. รันโปรเจกต์ในโหมด Development
- 7. Build และรันในโหมด Production
- 8. การ Deploy ไปยัง Vercel
- 9. การตรวจสอบและแก้ไขปัญหา
 
 
 
1. ข้อกำหนดเบื้องต้น
 
เครื่องมือ เวอร์ชันขั้นต่ำ หมายเหตุ 
Node.js 18.x หรือสูงกว่า แนะนำ v20 LTS[__LINK_ICON] 
Git เวอร์ชันล่าสุด สำหรับโคลน repo[__LINK_ICON] 
ตัวจัดการแพ็กเกจ pnpm 8+ หรือ npm 9+ แนะนำ pnpm เพราะมี  pnpm-lock.yaml  ในโปรเจกต์[__LINK_ICON] 
ระบบปฏิบัติการ Windows 10+, macOS 12+, หรือ Linux รองรับทุกระบบที่รัน Node.js ได้ 
 
💡 ตรวจสอบเวอร์ชันที่มีอยู่:
 
bash  
node --version
git --version
pnpm --version   # หรือ npm --version
 
 
 
 
2. ติดตั้งเครื่องมือที่จำเป็น
 
🪟 Windows
 
แนะนำใช้ WSL2 หรือ Git Bash สำหรับรันคำสั่ง
 
- ดาวน์โหลด Node.js: https://nodejs.org/ (เลือก LTS)
- ดาวน์โหลด Git: https://git-scm.com/download/win
- ติดตั้ง pnpm (แนะนำ):
powershell  
npm install -g pnpm
 
 
🍎 macOS
 
ใช้ Homebrew:
 
bash  
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node git
npm install -g pnpm
 
 
🐧 Ubuntu/Debian
 
bash  
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
npm install -g pnpm
 
 
 
 
3. ดาวน์โหลดโปรเจกต์
 
วิธีที่ 1: Clone ด้วย Git (แนะนำ)
 
bash  
git clone https://github.com/ZyntroAI/new-radix-nova-project.git
cd new-radix-nova-project
 
 
วิธีที่ 2: ดาวน์โหลด ZIP
 
1. ไปที่ https://github.com/ZyntroAI/new-radix-nova-project
2. กดปุ่ม Code → Download ZIP
3. แตกไฟล์แล้วเปิดโฟลเดอร์ใน Terminal/Command Prompt
 
 
 
4. ติดตั้ง Dependencies
 
โปรเจกต์นี้แนะนำใช้ pnpm เพราะมีไฟล์  pnpm-lock.yaml 
 
✅ ใช้ pnpm (แนะนำ)
 
bash  
pnpm install
 
 
หรือใช้ npm
 
bash  
npm install
 
 
⏳ รอจนเสร็จ — อาจใช้เวลา 1–3 นาที ขึ้นอยู่กับความเร็วอินเทอร์เน็ต
 
 
 
5. ตั้งค่า Environment Variables
 
โปรเจกต์มี API routes สำหรับ AI/chat จึงต้องตั้งค่าคีย์ API ก่อนใช้งาน 
 
5.1 สร้างไฟล์  .env 
 
คัดลอกไฟล์  .env.example  (สร้างหากยังไม่มี):
 
env  
# ──────────────────────────────
# 🔐 AI Provider Configuration
# ──────────────────────────────

# OpenAI (สำหรับ /api/ai endpoint)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Anthropic Claude (สำหรับ /api/chat endpoint)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx

# ──────────────────────────────
# ⚙️ Application Settings
# ──────────────────────────────
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
 
 
5.2 คำอธิบายตัวแปร
 
ตัวแปร ความจำเป็น คำอธิบาย 
 OPENAI_API_KEY  ต้องมีถ้าใช้ OpenAI รับได้ที่ https://platform.openai.com/api-keys 
 ANTHROPIC_API_KEY  ต้องมีถ้าใช้ Claude รับได้ที่ https://console.anthropic.com/keys 
 NEXT_PUBLIC_APP_URL  แนะนำตั้งค่า URL ของแอป ตัวอย่าง:  http://localhost:3000  
 
⚠️ สำคัญ: อย่าเคยส่งไฟล์  .env  ขึ้น GitHub — มีชื่ออยู่ใน  .gitignore  แล้ว ✅ 
 
 
 
6. รันโปรเจกต์ในโหมด Development
 
bash  
pnpm dev
# หรือ
npm run dev
 
 
- แอปจะทำงานที่: http://localhost:3000
- กด  Ctrl + C  เพื่อหยุดการทำงาน
 
💡 หากพอร์ต 3000 ถูกใช้งานอยู่:
 
bash  
pnpm dev -p 3001
# หรือ
npm run dev -- -p 3001
```[[__LINK_ICON]](https://docs.zynd.ai/v2/get-started/prerequisites.html?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI1MWIzNjJmMDJlODVmODgxLTRmMGEyZmFiZmZkOWIwZjQifQ%3D%3D&inline_doc_id=51b362f02e85f881-4f0a2fabffd9b0f4)
 
 
 
 
7. Build และรันในโหมด Production
 
Build
 
bash  
pnpm build
# หรือ
npm run build
 
 
รัน Production Server
 
bash  
pnpm start
# หรือ
npm run start
 
 
ตรวจสอบโค้ดก่อน Commit (แนะนำ)
 
bash  
pnpm run typecheck
pnpm run lint
pnpm run format
# หรือทั้งหมดในคำสั่งเดียว
pnpm run typecheck && pnpm run lint && pnpm run format
```[[__LINK_ICON]](https://docs.zynd.ai/v2/get-started/prerequisites.html?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI1MWIzNjJmMDJlODVmODgxLTRmMGEyZmFiZmZkOWIwZjQifQ%3D%3D&inline_doc_id=51b362f02e85f881-4f0a2fabffd9b0f4)

---

## 8. การ Deploy ไปยัง Vercel

โปรเจกต์นี้ **ปรับแต่งสำหรับ Vercel โดยตรง**[[__LINK_ICON]](https://docs.zynd.ai/v2/get-started/prerequisites.html?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI1MWIzNjJmMDJlODVmODgxLTRmMGEyZmFiZmZkOWIwZjQifQ%3D%3D&inline_doc_id=51b362f02e85f881-4f0a2fabffd9b0f4)

### ขั้นตอน
1. Push โค้ดไปยัง GitHub
2. เข้า https://vercel.com/new
3. เชื่อมต่อบัญชี GitHub → เลือกโปรเจกต์ `new-radix-nova-project`
4. ตั้งค่า Environment Variables เหมือนในไฟล์ `.env`
5. กด **Deploy** — เสร็จสิ้น! 🎉

> ทุกครั้งที่ push ไปยัง main → Vercel จะ build และ deploy อัตโนมัติ

---

## 9. การตรวจสอบและแก้ไขปัญหา

### ❌ ปัญหา: ติดตั้ง dependencies ไม่ได้
**วิธีแก้:**
```bash
# ลบแคชและติดตั้งใหม่
pnpm store prune
rm -rf node_modules
rm pnpm-lock.yaml  # หรือ package-lock.json
pnpm install
```[[__LINK_ICON]](https://docs.zynd.ai/v2/get-started/prerequisites.html?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI1MWIzNjJmMDJlODVmODgxLTRmMGEyZmFiZmZkOWIwZjQifQ%3D%3D&inline_doc_id=51b362f02e85f881-4f0a2fabffd9b0f4)

### ❌ ปัญหา: พอร์ต 3000 ถูกใช้งาน
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
 
 
แล้วใช้พอร์ตอื่น:  pnpm dev -p 3001  
 
❌ ปัญหา: TypeScript Error
 
bash  
pnpm run typecheck
 
 
ตรวจสอบข้อความแจ้งเตือนและแก้ไขตามนั้น 
 
❌ ปัญหา: API/AI route ไม่ทำงาน
 
- ตรวจสอบว่าตั้งค่า  OPENAI_API_KEY  หรือ  ANTHROPIC_API_KEY  ถูกต้องในไฟล์  .env 
- ตรวจสอบยอดคงเหลือ/เครดิตในบัญชีผู้ให้บริการ AI 
 
 
 
✅ ตรวจสอบความสมบูรณ์
 
ติดตั้ง Node.js 18+ แล้ว
Clone โปรเจกต์สำเร็จ
รัน  pnpm install  ไม่มี error
สร้างและตั้งค่าไฟล์  .env  เรียบร้อย
รัน  pnpm dev  และเข้า http://localhost:3000 ได้
รัน  pnpm build  ผ่านโดยไม่มี error
 
 
 
ต้องการเพิ่มเติมส่วนไหนไหมครับ — เช่น คู่มือการตั้งค่ากับ Docker, คู่มือการพัฒนา, หรือคู่มือการ Deploy ไปที่อื่นๆ 😊