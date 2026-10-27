title: Settings Tab + API Fetch
aliases:
 
- "การสร้างแท็บการตั้งค่าและดึงข้อมูลจาก API"
- "Obsidian Plugin Settings & API Integration"
slug: settings-api-fetch
icon: ⚙️
color: orange
type: guide
status: active
priority: high
tags:
- type/guide
- topic/obsidian
- topic/plugin-development
- topic/api
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Plugin Development Guide]]"
related:
- "[[Plugin Development Guide]]"
- "[[API]]"
- "[[Obsidian & FastAPI]]"
 
 
 
⚙️ Settings Tab + API Fetch — การสร้างแท็บการตั้งค่าและดึงข้อมูลจาก API
 
คู่มือแบบเต็ม: ตั้งค่า → บันทึก → เรียก API → จัดการผลลัพธ์ — พร้อมโค้ดทุกไฟล์ ✅
 
 
 
📂 โครงสร้างไฟล์
 
plaintext
  
your-plugin/
├── main.ts          # จุดเริ่มต้นปลั๊กอิน
├── types.ts         # ประเภทข้อมูลและค่าเริ่มต้น
├── settings.ts      # แท็บการตั้งค่า
├── api-client.ts    # ตัวจัดการเรียก API
├── manifest.json    # ข้อมูลปลั๊กอิน
└── tsconfig.json
 
 
 
 
🔹 ขั้นที่ 1: กำหนดประเภทและค่าเริ่มต้น —  types.ts 
 
typescript
  
export interface MyPluginSettings {
  apiBaseUrl: string;
  apiKey: string;
  autoSync: boolean;
  syncInterval: number;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
  apiBaseUrl: "https://api.example.com/v1",
  apiKey: "",
  autoSync: false,
  syncInterval: 300,
};
 
 
 
 
🔹 ขั้นที่ 2: สร้างแท็บการตั้งค่า —  settings.ts 
 
typescript
  
import { PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";
import { MyPluginSettings } from "./types";

export class MyPluginSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "⚙️ การตั้งค่า — API Sync Plugin" });

    // API Base URL
    new Setting(containerEl)
      .setName("API Base URL")
      .setDesc("ที่อยู่พื้นฐานของ API (เช่น https://api.example.com/v1)")
      .addText((text) =>
        text
          .setPlaceholder("https://api.example.com/v1")
          .setValue(this.plugin.settings.apiBaseUrl)
          .onChange(async (value) => {
            this.plugin.settings.apiBaseUrl = value.trim();
            await this.plugin.saveSettings();
          })
      );

    // API Key
    new Setting(containerEl)
      .setName("🔑 API Key")
      .setDesc("รหัสเข้าใช้งาน API — เก็บเป็นความลับ")
      .addText((text) =>
        text
          .setPlaceholder("sk-xxxxxxxxxxxxxxxx")
          .setValue(this.plugin.settings.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.apiKey = value.trim();
            await this.plugin.saveSettings();
          })
      );

    // Auto Sync Toggle
    new Setting(containerEl)
      .setName("🔄 ซิงค์ข้อมูลอัตโนมัติ")
      .setDesc("ดึงข้อมูลจาก API ตามช่วงเวลาที่กำหนด")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.autoSync)
          .onChange(async (value) => {
            this.plugin.settings.autoSync = value;
            await this.plugin.saveSettings();
            this.plugin.toggleAutoSync(value);
          })
      );

    // Sync Interval
    new Setting(containerEl)
      .setName("⏱️ ช่วงเวลาซิงค์")
      .setDesc("ดึงข้อมูลซ้ำทุกกี่วินาที (ขั้นต่ำ 60 วินาที)")
      .addText((text) =>
        text
          .setPlaceholder("300")
          .setValue(String(this.plugin.settings.syncInterval))
          .onChange(async (value) => {
            const num = Math.max(60, parseInt(value) || 300);
            this.plugin.settings.syncInterval = num;
            await this.plugin.saveSettings();
          })
      );
  }
}
 
 
 
 
🔹 ขั้นที่ 3: ตัวจัดการเรียก API —  api-client.ts 
 
typescript
  
import { request, Notice } from "obsidian";
import type { MyPluginSettings } from "./types";

export class APIClient {
  private settings: MyPluginSettings;

  constructor(settings: MyPluginSettings) {
    this.settings = settings;
  }

  updateSettings(settings: MyPluginSettings): void {
    this.settings = settings;
  }

  async fetchData<T>(endpoint: string): Promise<T | null> {
    if (!this.settings.apiKey) {
      new Notice("⚠️ กรุณาตั้งค่า API Key ก่อนในหน้า Settings", 4000);
      return null;
    }

    if (!this.settings.apiBaseUrl) {
      new Notice("⚠️ กรุณาตั้งค่า API Base URL ก่อน", 4000);
      return null;
    }

    const url = `${this.settings.apiBaseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    try {
      const response = await request({
        url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.settings.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      return JSON.parse(response) as T;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      new Notice(`❌ เรียก API ไม่สำเร็จ: ${msg}`, 5000);
      console.error("[API Client Error]", url, error);
      return null;
    }
  }

  async postData<T, R>(endpoint: string, data: T): Promise<R | null> {
    if (!this.settings.apiKey || !this.settings.apiBaseUrl) return null;

    const url = `${this.settings.apiBaseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    try {
      const response = await request({
        url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.settings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return JSON.parse(response) as R;
    } catch (error) {
      console.error("[API POST Error]", error);
      return null;
    }
  }

  async getUserProfile() {
    return this.fetchData<{ id: string; name: string; email: string }>("user/profile");
  }
}
 
 
 
 
🔹 ขั้นที่ 4: รวมทุกอย่าง —  main.ts 
 
typescript
  
import { Plugin, Notice } from "obsidian";
import { MyPluginSettings, DEFAULT_SETTINGS } from "./types";
import { MyPluginSettingTab } from "./settings";
import { APIClient } from "./api-client";

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;
  apiClient: APIClient;
  private syncTimer: number | null = null;

  async onload() {
    console.log("✅ Plugin loaded");
    await this.loadSettings();

    this.apiClient = new APIClient(this.settings);
    this.addSettingTab(new MyPluginSettingTab(this.app, this));

    // Command: ดึงข้อมูลด้วยตนเอง
    this.addCommand({
      id: "fetch-api-data",
      name: "📥 ดึงข้อมูลจาก API",
      callback: async () => {
        new Notice("⏳ กำลังดึงข้อมูล...");
        const data = await this.apiClient.getUserProfile();
        if (data) {
          new Notice(`✅ สวัสดี, ${data.name}`);
          console.log("📦 Data:", data);
        }
      },
    });

    // เริ่ม Auto Sync ถ้าเปิดไว้
    if (this.settings.autoSync) {
      this.startAutoSync();
    }
  }

  onunload() {
    this.stopAutoSync();
    console.log("👋 Plugin unloaded");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.apiClient.updateSettings(this.settings);
  }

  startAutoSync(): void {
    this.stopAutoSync();
    this.syncTimer = window.setInterval(async () => {
      console.log("🔄 Auto-sync: Fetching data...");
      await this.apiClient.getUserProfile();
    }, this.settings.syncInterval * 1000);
  }

  stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  toggleAutoSync(enable: boolean): void {
    enable ? this.startAutoSync() : this.stopAutoSync();
  }
}
 
 
 
 
✅ วิธีทดสอบ
 
1. รัน  npm run dev  เพื่อคอมพลีตอัตโนมัติ
2. คัดลอกไฟล์ไปที่  .obsidian/plugins/your-plugin-name/ 
3. เปิดใช้ปลั๊กอิน → ไปที่ Settings → กรอก API URL และ Key
4. ใช้คำสั่ง:  ดึงข้อมูลจาก API  ผ่าน Command Palette ( Ctrl+P )
 
 
 
⚠️ ข้อควรระวัง & Best Practices
 
✅ ควรทำ ❌ ไม่ควรทำ 
ตรวจสอบค่าก่อนเรียก API — แจ้งผู้ใช้ถ้าขาดข้อมูล เรียก API โดยไม่มีการตรวจสอบ API Key ก่อน 
ใช้  trim()  เมื่อรับค่าจากช่องกรอกข้อความ ส่งค่าว่างหรือช่องว่างไปยัง API 
จัดการ Error และแจ้งผู้ใช้ด้วย  new Notice()  ปล่อยให้ Error หายไปโดยไม่บอกอะไรผู้ใช้ 
ใช้  replace()  จัดการ  /  ที่ซ้ำซ้อนใน URL ต่อกันตรงๆ เกิด URL ผิด เช่น  api.example.com/v1//endpoint  
หยุด Timer ใน  onunload()  เสมอ ปล่อยให้ Timer ทำงานต่อหลังปิดปลั๊กอิน 
จำกัดค่า syncInterval ขั้นต่ำ ไม่ให้สั้นเกินไป อนุญาตให้ตั้งค่า 1 วินาที → Flood API 
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Plugin Development Guide]] — คู่มือเริ่มต้นพัฒนาปลั๊กอิน
- [[API]] — เอกสาร Endpoints และรูปแบบข้อมูล
- [[Obsidian & FastAPI]] — การเชื่อมต่อกับ Backend FastAPI
- [[Best Practices]] — มาตรฐานและแนวทางปฏิบัติที่ดีที่สุด
 
 
 
✅ สรุปสั้นๆ: แยกส่วนชัดเจน —  types.ts  (โครงสร้าง) →  settings.ts  (UI) →  api-client.ts  (ตรรกะ) →  main.ts  (จัดการทั้งหมด) — แก้ไขที่ไหนก็ทำได้ที่ไฟล์นั้นโดยไม่ต้องยุ่งกับส่วนอื่นครับ 😊