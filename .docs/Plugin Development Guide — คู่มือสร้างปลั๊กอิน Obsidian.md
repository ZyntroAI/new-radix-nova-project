title: Plugin Development Guide
aliases:
 
- "คู่มือพัฒนาปลั๊กอิน Obsidian"
- "Build Your First Obsidian Plugin"
slug: plugin-development-guide
icon: 🔌
color: cyan
type: guide
status: active
priority: high
tags:
- type/guide
- topic/obsidian
- topic/plugin-development
- topic/typescript
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Obsidian & FastAPI]]"
related:
- "[[Obsidian & FastAPI]]"
- "[[API]]"
- "[[Settings Tab + API Fetch]]"
 
 
 
🔌 Plugin Development Guide — คู่มือสร้างปลั๊กอิน Obsidian
 
เริ่มต้นจากศูนย์ → เขียน → ทดสอบ → เผยแพร่ ครบทุกขั้นตอน ✅
 
 
 
📋 สิ่งที่ต้องเตรียมก่อนเริ่ม
 
- ✅ Node.js v18+ & npm/yarn
- ✅ Git
- ✅ โค้ดตัวแก้ไข: VS Code แนะนำเป็นอย่างยิ่ง
- ✅ ความรู้พื้นฐาน: TypeScript + JavaScript
 
 
 
🚀 ขั้นที่ 1: เริ่มต้นโปรเจกต์
 
🔹 ใช้เทมเพลตทางการ
 
bash
  
# คลอนเทมเพลต
git clone https://github.com/obsidianmd/obsidian-sample-plugin.git my-first-plugin
cd my-first-plugin

# ติดตั้งแพ็กเกจ
npm install

# เปิดใน VS Code
code .
 
 
🔹 โครงสร้างไฟล์
 
plaintext
  
my-first-plugin/
├── manifest.json     # ข้อมูลปลั๊กอิน
├── main.ts           # โค้ดหลัก จุดเริ่มต้น
├── settings.ts       # หน้าการตั้งค่า (แยกออกมาแนะนำ)
├── tsconfig.json     # การตั้งค่า TypeScript
├── .gitignore
└── versions.json
 
 
 
 
🔹 ขั้นที่ 2: เขียนปลั๊กอินตัวแรก —  main.ts 
 
typescript
  
import { Plugin, Notice } from "obsidian";
import { MyPluginSettingTab } from "./settings";
import { MyPluginSettings, DEFAULT_SETTINGS } from "./types";

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    console.log("✅ ปลั๊กอินโหลดสำเร็จ");
    await this.loadSettings();

    // เพิ่มแท็บการตั้งค่า
    this.addSettingTab(new MyPluginSettingTab(this.app, this));

    // เพิ่มคำสั่ง: แสดงข้อความต้อนรับ
    this.addCommand({
      id: "show-greeting",
      name: "👋 แสดงข้อความต้อนรับ",
      callback: () => {
        new Notice("สวัสดีจากปลั๊กอินแรกของคุณ! 🎉");
      },
    });
  }

  onunload() {
    console.log("👋 ปลั๊กอินปิดการทำงาน");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
 
 
 
 
🔹 ขั้นที่ 3: ตั้งค่า  manifest.json 
 
json
  
{
  "id": "my-first-plugin",
  "name": "ปลั๊กอินตัวแรกของฉัน",
  "version": "1.0.0",
  "minAppVersion": "1.4.0",
  "description": "ปลั๊กอินตัวอย่างสำหรับคู่มือ",
  "author": "ชื่อของคุณ",
  "isDesktopOnly": false
}
 
 
 
 
🔹 ขั้นที่ 4: ทดสอบใน Vault ของคุณ
 
✅ วิธีที่ 1: ลิงก์โฟลเดอร์ (แนะนำ)
 
bash
  
# ในโฟลเดอร์ปลั๊กอิน
npm run build

# คัดลอกหรือสร้าง Symbolic Link ไปที่:
# /path/to/your/vault/.obsidian/plugins/my-first-plugin
 
 
- เปิด Obsidian → การตั้งค่า → ปลั๊กอินที่ไม่ได้เผยแพร่ → เปิดใช้งาน ✅
- ใช้คำสั่ง:  Ctrl/Cmd + P  → พิมพ์ชื่อคำสั่ง → Enter
 
✅ วิธีที่ 2: ใช้ Dev Mode
 
- การตั้งค่า → ที่มองเห็น → เปิด Developer Mode
- ไปที่ ปลั๊กอิน → ที่มุมขวาบน → Reload Unchanged Plugins
 
💡 รัน  npm run dev  เพื่อคอมพลีตอัตโนมัติเมื่อแก้ไขโค้ด — ประหยัดเวลามาก ✅
 
 
 
📖 ส่วนประกอบสำคัญที่ควรรู้
 
ส่วน หน้าที่ ไฟล์อ้างอิง 
 Plugin.onload()  ทำงานเมื่อเปิดใช้ปลั๊กอิน  main.ts  
 Plugin.onunload()  ทำงานเมื่อปิดปลั๊กอิน  main.ts  
 this.addCommand()  เพิ่มคำสั่งที่เรียกผ่าน Command Palette  main.ts  
 this.addSettingTab()  เพิ่มหน้าการตั้งค่า  settings.ts  
 this.loadData()/saveData()  บันทึก/โหลดข้อมูลของปลั๊กอิน  main.ts  
 new Notice()  แสดงข้อความแจ้งเตือนผู้ใช้ ทุกไฟล์ 
 this.app.vault  เข้าถึงไฟล์และโฟลเดอร์ใน Vault API Reference 
 this.app.workspace  จัดการหน้าต่าง แท็บ และเอกสารปัจจุบัน API Reference 
 
 
 
📂 โครงสร้างแยกส่วน (เมื่อโปรเจกต์โตขึ้น)
 
plaintext
  
src/
├── main.ts
├── types.ts          # ประเภทข้อมูล
├── settings.ts       # หน้าการตั้งค่า
├── api-client.ts     # เรียกใช้ API
├── commands.ts       # รวบรวมคำสั่ง
├── ui/               # คอมโพเนนต์หน้าตา
│   └── modal.ts
└── utils/            # ฟังก์ชันช่วย
    └── helpers.ts
 
 
 
 
⚠️ ข้อควรระวัง & แนวทางปฏิบัติที่ดี
 
✅ ควรทำ ❌ ไม่ควรทำ 
อ่านค่า  this.settings  เสมอ — ไม่ Hardcode ค่า แก้ไขไฟล์ใน Vault โดยไม่ขออนุญาต/แจ้งผู้ใช้ 
ใช้  new Notice()  หรือ Console.log เพื่อบอกสถานะ ทำให้ปลั๊กอินทำงานเบื้องหลังโดยไม่แจ้ง 
ตรวจสอบว่ามี API Key ก่อนเรียกใช้งาน — ถามใน Settings เขียน API Key หรือข้อมูลลับลงในโค้ดโดยตรง 
ใช้  try/catch  ครอบการเรียก API และจัดการข้อผิดพลาด ไม่จัดการข้อผิดพลาด — ปล่อยให้แครช 
อัปเดต  manifest.json  ทุกครั้งที่เปลี่ยนเวอร์ชัน เปลี่ยนชื่อ ID ปลั๊กอินหลังเผยแพร่แล้ว 
 
 
 
🚀 เผยแพร่ปลั๊กอินสู่สาธารณะ
 
1. อัปโหลดโค้ดขึ้น GitHub — สาธารณะ
2. สร้าง Release พร้อมไฟล์:  main.js ,  manifest.json ,  versions.json 
3. ส่ง Pull Request ไปที่ obsidian-releases เพื่อเพิ่มลงในรายการปลั๊กอินทางการ
 
💡 ถ้าแค่ใช้เองในทีม — ไม่ต้องส่งขึ้นรีโปทางการ แค่แจกไฟล์  .zip  ให้ Import ใน Obsidian ได้เลย ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Settings Tab + API Fetch]] — ตัวอย่างเต็ม: การตั้งค่า + ดึงข้อมูลจาก API
- [[Obsidian & FastAPI]] — เชื่อมต่อกับ Backend FastAPI
- [[API]] — เอกสาร Endpoints ที่เรียกใช้
- [[Home-MOC]] — กลับสู่หน้าหลัก
 
 
 
✅ สรุปสั้นๆ: เตรียมเครื่อง → โคลนเทมเพลต → เขียนโค้ดใน  main.ts  → ทดสอบใน Vault → Build → เผยแพร่ — ขอให้สนุกกับการสร้างปลั๊กอินครับ 😊