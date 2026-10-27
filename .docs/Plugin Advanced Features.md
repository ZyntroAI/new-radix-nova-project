title: Plugin Advanced Features
aliases:
 
- "ฟีเจอร์ขั้นสูงปลั๊กอิน"
- "Save to File + Custom View + Multi Endpoints"
slug: plugin-advanced-features
icon: 🚀
color: purple
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
parent: "[[Settings Tab + API Fetch]]"
related:
- "[[Settings Tab + API Fetch]]"
- "[[API]]"
- "[[Plugin Development Guide]]"
 
 
 
🚀 ฟีเจอร์ขั้นสูง — บันทึกไฟล์ · หน้าตาแบบกำหนดเอง · หลาย Endpoint
 
ต่อจากคู่มือก่อนหน้า — เพิ่ม 3 ฟีเจอร์ครบถ้วน พร้อมโค้ดและคำอธิบาย ✅
 
 
 
📂 อัปเดตโครงสร้างไฟล์
 
plaintext
  
your-plugin/
├── main.ts           # ← อัปเดต
├── types.ts          # ← อัปเดต
├── settings.ts
├── api-client.ts     # ← อัปเดต
├── custom-view.ts    # ← ใหม่: หน้าต่างแสดงผล
└── file-utils.ts     # ← ใหม่: ช่วยจัดการไฟล์
 
 
 
 
🔹 ส่วนที่ 1: รองรับหลาย Endpoint —  types.ts  +  api-client.ts 
 
✅ อัปเดต  types.ts 
 
typescript
  
export interface MyPluginSettings {
  apiBaseUrl: string;
  apiKey: string;
  autoSync: boolean;
  syncInterval: number;
  defaultFolder: string; // โฟลเดอร์บันทึกไฟล์
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
  apiBaseUrl: "https://api.example.com/v1",
  apiKey: "",
  autoSync: false,
  syncInterval: 300,
  defaultFolder: "API Results",
};

// 🔹 ประเภท Endpoint
export interface EndpointConfig {
  id: string;
  name: string;
  path: string;
  method: "GET" | "POST";
  description?: string;
}

// รูปแบบผลลัพธ์ API
export interface ApiResult<T = unknown> {
  success: boolean;
  data: T | null;
  error?: string;
  timestamp: string;
  endpoint: string;
}

// รายการ Endpoints ที่รองรับ
export const AVAILABLE_ENDPOINTS: EndpointConfig[] = [
  { id: "profile", name: "ข้อมูลผู้ใช้", path: "/user/profile", method: "GET", description: "ดึงโปรไฟล์ปัจจุบัน" },
  { id: "notes", name: "รายการบันทึก", path: "/notes", method: "GET", description: "ดึงรายการบันทึกทั้งหมด" },
  { id: "projects", name: "โครงการ", path: "/projects", method: "GET", description: "ดึงรายการโครงการ" },
];
 
 
✅ อัปเดต  api-client.ts 
 
typescript
  
import { request, Notice } from "obsidian";
import type { MyPluginSettings, ApiResult, EndpointConfig } from "./types";

export class APIClient {
  private settings: MyPluginSettings;

  constructor(settings: MyPluginSettings) {
    this.settings = settings;
  }

  updateSettings(settings: MyPluginSettings): void {
    this.settings = settings;
  }

  private buildUrl(path: string): string {
    const base = this.settings.apiBaseUrl.replace(/\/+$/, "");
    const endpoint = path.replace(/^\/+/, "");
    return `${base}/${endpoint}`;
  }

  async fetchEndpoint<T>(config: EndpointConfig, body?: unknown): Promise<ApiResult<T>> {
    if (!this.settings.apiKey) {
      new Notice("⚠️ กรุณาตั้งค่า API Key ก่อน", 4000);
      return {
        success: false,
        data: null,
        error: "Missing API Key",
        timestamp: new Date().toISOString(),
        endpoint: config.path,
      };
    }

    const url = this.buildUrl(config.path);

    try {
      const response = await request({
        url,
        method: config.method,
        headers: {
          Authorization: `Bearer ${this.settings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      return {
        success: true,
        data: JSON.parse(response) as T,
        timestamp: new Date().toISOString(),
        endpoint: config.path,
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[API Error] ${config.path}:`, error);
      return {
        success: false,
        data: null,
        error: msg,
        timestamp: new Date().toISOString(),
        endpoint: config.path,
      };
    }
  }

  // ดึงข้อมูลพร้อมกันหลาย Endpoint
  async fetchMultiple(endpoints: EndpointConfig[]): Promise<Map<string, ApiResult>> {
    const results = new Map<string, ApiResult>();
    const promises = endpoints.map(async (ep) => {
      const result = await this.fetchEndpoint(ep);
      results.set(ep.id, result);
    });
    await Promise.all(promises);
    return results;
  }
}
 
 
 
 
🔹 ส่วนที่ 2: บันทึกผลลัพธ์ลงไฟล์ —  file-utils.ts 
 
typescript
  
import { Notice, TFile } from "obsidian";
import type { ApiResult, EndpointConfig } from "./types";

export class FileManager {
  private app: App;
  private defaultFolder: string;

  constructor(app: App, defaultFolder: string) {
    this.app = app;
    this.defaultFolder = defaultFolder;
  }

  updateDefaultFolder(path: string): void {
    this.defaultFolder = path || "API Results";
  }

  // สร้างโฟลเดอร์ถ้ายังไม่มี
  private async ensureFolder(folderPath: string): Promise<void> {
    const exists = await this.app.vault.adapter.exists(folderPath);
    if (!exists) {
      await this.app.vault.createFolder(folderPath);
    }
  }

  // แปลงผลลัพธ์เป็น Markdown
  resultToMarkdown(endpoint: EndpointConfig, result: ApiResult): string {
    const timestamp = new Date(result.timestamp).toLocaleString("th-TH");
    
    let content = `---
title: "${endpoint.name} — ${timestamp}"
endpoint: ${result.endpoint}
timestamp: ${result.timestamp}
status: ${result.success ? "success" : "failed"}
tags: [api-result, ${endpoint.id}]
---

# 📄 ${endpoint.name}

- **Endpoint:** \`${result.endpoint}\`
- **เวลา:** ${timestamp}
- **สถานะ:** ${result.success ? "✅ สำเร็จ" : "❌ ไม่สำเร็จ"}

---

## 📦 ผลลัพธ์

`;

    if (result.success && result.data) {
      content += "```json\n" + JSON.stringify(result.data, null, 2) + "\n```\n";
    } else {
      content += `**ข้อผิดพลาด:** ${result.error || "ไม่ทราบสาเหตุ"}\n`;
    }

    return content;
  }

  // บันทึกไฟล์เดียว
  async saveResult(endpoint: EndpointConfig, result: ApiResult): Promise<TFile | null> {
    try {
      await this.ensureFolder(this.defaultFolder);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const fileName = `${this.defaultFolder}/${endpoint.name} — ${timestamp}.md`;
      const content = this.resultToMarkdown(endpoint, result);
      
      const file = await this.app.vault.create(fileName, content);
      new Notice(`✅ บันทึกแล้ว: ${file.basename}`);
      return file;
    } catch (error) {
      new Notice(`❌ บันทึกไม่สำเร็จ: ${error}`);
      console.error("[File Save Error]", error);
      return null;
    }
  }

  // บันทึกหลายผลลัพธ์รวมในไฟล์เดียว
  async saveMultipleResults(results: Map<string, { config: EndpointConfig; result: ApiResult }>): Promise<TFile | null> {
    try {
      await this.ensureFolder(this.defaultFolder);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const fileName = `${this.defaultFolder}/API Sync — ${timestamp}.md`;

      let content = `---
title: "API Sync — ${new Date().toLocaleString("th-TH")}"
timestamp: ${new Date().toISOString()}
endpoints: ${results.size}
tags: [api-sync, multi-endpoint]
---

# 📥 ผลลัพธ์การซิงค์ข้อมูล

เวลาทำงาน: ${new Date().toLocaleString("th-TH")}
จำนวน Endpoint: ${results.size} รายการ

---

`;
      results.forEach((item, key) => {
        content += `## 📌 ${item.config.name}\n\n`;
        content += `- **Endpoint:** \`${item.result.endpoint}\`\n`;
        content += `- **สถานะ:** ${item.result.success ? "✅ สำเร็จ" : "❌ ไม่สำเร็จ"}\n\n`;
        if (item.result.success && item.result.data) {
          content += "```json\n" + JSON.stringify(item.result.data, null, 2) + "\n```\n\n";
        } else {
          content += `**ผิดพลาด:** ${item.result.error}\n\n`;
        }
      });

      const file = await this.app.vault.create(fileName, content);
      new Notice(`✅ บันทึกทั้งหมดแล้ว: ${file.basename}`);
      return file;
    } catch (error) {
      new Notice(`❌ บันทึกไม่สำเร็จ: ${error}`);
      return null;
    }
  }
}
 
 
 
 
🔹 ส่วนที่ 3: หน้าต่างแสดงผลแบบกำหนดเอง —  custom-view.ts 
 
typescript
  
import { ItemView, WorkspaceLeaf, Notice } from "obsidian";
import type { ApiResult, EndpointConfig } from "./types";

export const VIEW_TYPE_API_RESULTS = "api-results-view";

export class ApiResultsView extends ItemView {
  private results: Map<string, { config: EndpointConfig; result: ApiResult }> = new Map();

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_API_RESULTS;
  }

  getDisplayText(): string {
    return "📊 API Results";
  }

  getIcon(): string {
    return "database";
  }

  // เพิ่มผลลัพธ์และแสดง
  addResult(config: EndpointConfig, result: ApiResult): void {
    this.results.set(config.id, { config, result });
    this.render();
  }

  // ตั้งค่าผลลัพธ์ทั้งหมด
  setResults(results: Map<string, { config: EndpointConfig; result: ApiResult }>): void {
    this.results = results;
    this.render();
  }

  // ล้างผลลัพธ์
  clear(): void {
    this.results.clear();
    this.render();
  }

  render(): void {
    const container = this.containerEl.children[1];
    container.empty();

    // ส่วนหัว
    container.createEl("h2", { text: "📊 ผลลัพธ์จาก API" });
    
    if (this.results.size === 0) {
      container.createEl("p", { 
        text: "ยังไม่มีผลลัพธ์ — เรียกใช้คำสั่งเพื่อดึงข้อมูล",
        cls: "api-empty-state"
      });
      return;
    }

    // แสดงแต่ละรายการ
    this.results.forEach((item) => {
      const card = container.createDiv({ cls: "api-result-card" });
      
      // หัวการ์ด
      const header = card.createDiv({ cls: "api-card-header" });
      header.createEl("h3", { text: item.config.name });
      
      const statusBadge = header.createSpan({ 
        cls: `api-status-badge ${item.result.success ? "success" : "error"}` 
      });
      statusBadge.textContent = item.result.success ? "✅ สำเร็จ" : "❌ ผิดพลาด";

      // ข้อมูลทั่วไป
      card.createEl("p", {}, (el) => {
        el.innerHTML = `<strong>Endpoint:</strong> <code>${item.result.endpoint}</code><br>
        <strong>เวลา:</strong> ${new Date(item.result.timestamp).toLocaleString("th-TH")}`;
      });

      // เนื้อหาผลลัพธ์
      if (item.result.success && item.result.data) {
        const pre = card.createEl("pre", { cls: "api-json-output" });
        pre.createEl("code", { 
          text: JSON.stringify(item.result.data, null, 2) 
        });
      } else {
        card.createEl("div", { 
          text: `⚠️ ${item.result.error || "ไม่ทราบสาเหตุ"}`,
          cls: "api-error-message"
        });
      }
    });

    // ปุ่มด้านล่าง
    const actions = container.createDiv({ cls: "api-view-actions" });
    actions.createEl("button", { text: "🗑️ ล้างผลลัพธ์" }).onclick = () => this.clear();
  }

  async onload(): Promise<void> {
    this.render();
  }
}
 
 
 
 
🔹 ส่วนที่ 4: รวมทั้งหมดเข้ากับปลั๊กอิน — อัปเดต  main.ts 
 
typescript
  
import { Plugin, Notice, addIcon } from "obsidian";
import { MyPluginSettings, DEFAULT_SETTINGS, AVAILABLE_ENDPOINTS } from "./types";
import { MyPluginSettingTab } from "./settings";
import { APIClient } from "./api-client";
import { FileManager } from "./file-utils";
import { ApiResultsView, VIEW_TYPE_API_RESULTS } from "./custom-view";

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;
  apiClient: APIClient;
  fileManager: FileManager;

  async onload() {
    console.log("✅ Plugin loaded — Advanced Features");
    await this.loadSettings();

    // เริ่มต้นบริการต่างๆ
    this.apiClient = new APIClient(this.settings);
    this.fileManager = new FileManager(this.app, this.settings.defaultFolder);

    // ลงทะเบียน View แบบกำหนดเอง
    this.registerView(
      VIEW_TYPE_API_RESULTS,
      (leaf) => new ApiResultsView(leaf)
    );

    // เพิ่มแท็บการตั้งค่า
    this.addSettingTab(new MyPluginSettingTab(this.app, this));

    // ===== คำสั่ง: เปิดหน้าผลลัพธ์ =====
    this.addCommand({
      id: "open-api-results-view",
      name: "📊 เปิดหน้าผลลัพธ์ API",
      callback: () => this.openResultsView(),
    });

    // ===== คำสั่ง: ดึงข้อมูลจากทุก Endpoint =====
    this.addCommand({
      id: "fetch-all-endpoints",
      name: "📥 ดึงข้อมูลจากทุก Endpoint",
      callback: async () => {
        new Notice("⏳ กำลังดึงข้อมูล...");
        
        const resultsMap = new Map<string, { config: typeof AVAILABLE_ENDPOINTS[0]; result: any }>();
        
        for (const ep of AVAILABLE_ENDPOINTS) {
          const result = await this.apiClient.fetchEndpoint(ep);
          resultsMap.set(ep.id, { config: ep, result });
        }
        
        // แสดงใน View
        const view = await this.openResultsView();
        if (view) view.setResults(resultsMap);
        
        new Notice(`✅ เสร็จสิ้น — ${resultsMap.size} รายการ`);
      },
    });

    // ===== คำสั่ง: ดึง + บันทึกทั้งหมด =====
    this.addCommand({
      id: "fetch-and-save-all",
      name: "💾 ดึงและบันทึกผลลัพธ์ทั้งหมด",
      callback: async () => {
        new Notice("⏳ กำลังดึงและบันทึก...");
        
        const resultsMap = new Map<string, { config: typeof AVAILABLE_ENDPOINTS[0]; result: any }>();
        
        for (const ep of AVAILABLE_ENDPOINTS) {
          const result = await this.apiClient.fetchEndpoint(ep);
          resultsMap.set(ep.id, { config: ep, result });
        }
        
        // บันทึกลงไฟล์
        await this.fileManager.saveMultipleResults(resultsMap);
        
        // แสดงใน View
        const view = await this.openResultsView();
        if (view) view.setResults(resultsMap);
      },
    });

    // ===== คำสั่ง: ดึงรายการเดียว =====
    AVAILABLE_ENDPOINTS.forEach((ep) => {
      this.addCommand({
        id: `fetch-${ep.id}`,
        name: `📥 ดึง: ${ep.name}`,
        callback: async () => {
          new Notice(`⏳ กำลังดึง: ${ep.name}`);
          const result = await this.apiClient.fetchEndpoint(ep);
          
          const view = await this.openResultsView();
          if (view) view.addResult(ep, result);
          
          // ถ้าสำเร็จ ให้ถามว่าต้องการบันทึกไหม
          if (result.success) {
            new Notice(`✅ สำเร็จ — ต้องการบันทึกไหม? ใช้คำสั่ง: บันทึกผลลัพธ์ล่าสุด`);
          }
        },
      });
    });
  }

  onunload() {
    console.log("👋 Plugin unloaded");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.apiClient.updateSettings(this.settings);
    this.fileManager.updateDefaultFolder(this.settings.defaultFolder);
  }

  // เปิด/กลับไปที่แท็บผลลัพธ์
  async openResultsView(): Promise<ApiResultsView | null> {
    const existingLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_API_RESULTS)[0];
    
    if (existingLeaf) {
      this.app.workspace.revealLeaf(existingLeaf);
      return existingLeaf.view as ApiResultsView;
    }

    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return null;

    await leaf.setViewState({ type: VIEW_TYPE_API_RESULTS, active: true });