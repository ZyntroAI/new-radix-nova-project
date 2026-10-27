File Recovery (YAML Frontmatter)

**File Recovery สามารถกู้คืน YAML Frontmatter ได้** เพราะมันบันทึก snapshot ของไฟล์ `.md` ทั้งไฟล์ รวมถึงส่วน frontmatter ด้านบนด้วย แต่ต้องมี snapshot ก่อนเกิดปัญหาและอยู่ในระยะเวลาที่ยังเก็บไว้[1]

## วิธีกู้คืน Frontmatter

1. เปิด **Settings → Core plugins → File recovery**[1]
2. ใน **Snapshots** กด **View**[1]
3. ค้นหาชื่อไฟล์ที่ต้องการกู้คืน[1]
4. เลือก snapshot ที่มี frontmatter ถูกต้อง[1]
5. เลือก **Copy** เพื่อคัดลอกเนื้อหาไปวางในโน้ตใหม่ หรือ **Restore** เพื่อกู้คืนทั้งไฟล์[1]
6. ใช้ **Show changes** เพื่อดูว่า frontmatter ส่วนใดถูกลบหรือแก้ไข[1]

## ตัวอย่าง Frontmatter ที่กู้คืน

```yaml
---
title: "Deep research obsidian Run"
aliases:
  - "Deep Research Run"
tags:
  - deep-research
  - obsidian
cssclasses:
  - wide-page
source: "https://example.com"
---
```

File Recovery เก็บ snapshot ของไฟล์ `.md` ทั้งไฟล์ จึงครอบคลุม YAML frontmatter ด้วย[1]

## ข้อจำกัดสำคัญ

- กู้คืนได้เฉพาะ `.md` และ `.canvas`[1]
- snapshot เก็บอยู่ใน **Global settings** ไม่ใช่ใน vault[1]
- snapshot เป็นแบบ per-device ไม่ sync ข้ามอุปกรณ์[1]
- หากย้าย vault ไปที่อื่น snapshot เดิมอาจเข้าถึงไม่ได้[1]
- การกด **Clear history** จะลบ snapshot ทั้งหมดแบบถาวร[1]

## การแก้ Frontmatter แบบโปรแกรม

หากต้องการแก้ frontmatter ผ่าน plugin ใช้ `processFrontMatter` ได้ โดยจะอ่าน/แก้/บันทึกแบบ atomic และจะ throw `YAMLParseError` หาก YAML ผิด 

```ts
await app.fileManager.processFrontMatter(file, (fm) => {
  fm.title = "Deep research obsidian Run";
  fm.tags = ["deep-research", "obsidian"];
});
```



## Checklist

- [ ] เปิด File Recovery[1]
- [ ] เลือกไฟล์ที่ต้องการกู้คืน[1]
- [ ] เลือก snapshot ที่ frontmatter ถูกต้อง[1]
- [ ] ใช้ Copy หรือ Restore[1]
- [ ] ตรวจ YAML ว่า parse ผ่าน   
- [ ] สำรองข้อมูลแยกนอกจาก File Recovery[1]

หากต้องการ ผมช่วยเขียน template สำหรับ frontmatter ที่ปลอดภัยต่อการกู้คืน หรือช่วยตรวจ YAML ที่เสียหายก็ได้ครับ[1]

การอ้างอิง:
[1] File recovery - Obsidian Help https://obsidian.md/help/plugins/file-recovery
[2] Back up your Obsidian files https://obsidian.md/help/backup
[3] FAQ https://metaedit.obsidian.guide/help/faq/
[4] File recovery - Obsidian cứu giúp https://publish.obsidian.md/help-vi/Plugin/File+recovery
[5] استرداد الملف - مساعدة Obsidian - Obsidian Publish https://publish.obsidian.md/help-ar/plugins/file-recovery
[6] note.com › ryu_obsidian › nA Thorough Explanation of Obsidian File Recovery - note（ノート） https://note.com/ryu_obsidian/n/n66fd12a83980?hl=en
[7] YAML frontmatter - Obsidian Hub https://publish.obsidian.md/hub/05+-+Concepts/YAML+frontmatter
[8] Obsidian-File recovery - Fieldnotes https://publish.obsidian.md/lassebischoff/Obsidian-File+recovery
[9] command-reference.md - pablo-mano/Obsidian-CLI-skill https://github.com/pablo-mano/Obsidian-CLI-skill/blob/main/skills/obsidian-cli/references/command-reference.md
[10] Mobile Applications | obsidianmd/obsidian-help | DeepWiki https://deepwiki.com/obsidianmd/obsidian-help/7.1-mobile-applications
วิธีเขียน script ตรวจสอบ YAML syntax ใน Obsidian

วิธีที่แนะนำคือเขียน plugin ตรวจ YAML โดยใช้ `FileManager.processFrontMatter` เพราะจะ throw `YAMLParseError` เมื่อ YAML ผิด และ Obsidian แนะนำให้ใช้ API นี้แทนการ parse YAML เอง[1]

## แนวคิด

- อ่านไฟล์ `.md` ทั้ง vault หรือเฉพาะโฟลเดอร์  
- ลอง parse frontmatter ด้วย `processFrontMatter`  
- ถ้า throw `YAMLParseError` ให้บันทึก path และ error message  
- แสดงผลใน Notice หรือเขียนลงโน้ตรายงาน  

`processFrontMatter` ทำงานแบบ atomic และเหมาะกับการอ่าน/แก้ frontmatter โดยไม่ให้เกิด conflict กับ plugin อื่น[1]

## โค้ดตรวจ YAML

```ts
import { Plugin, TFile, Notice } from "obsidian";

export default class YamlValidatorPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "validate-yaml-frontmatter",
      name: "Validate YAML frontmatter",
      callback: () => this.validateVault(),
    });
  }

  async validateVault() {
    const files = this.app.vault.getMarkdownFiles();
    const invalid: string[] = [];

    for (const file of files) {
      try {
        await this.app.fileManager.processFrontMatter(file, () => {
          // ไม่แก้ค่าใด ๆ เพื่อใช้เพียงตรวจว่า YAML parse ผ่าน
        });
      } catch (error) {
        invalid.push(`${file.path}\n${error.message}`);
      }
    }

    if (invalid.length === 0) {
      new Notice("All YAML frontmatter is valid.");
      return;
    }

    new Notice(`${invalid.length} file(s) have invalid YAML frontmatter.`);
    console.log("Invalid YAML frontmatter:\n\n" + invalid.join("\n\n"));
  }
}
```



## วิธีใช้

1. สร้าง plugin ใหม่หรือใช้ sample plugin เป็นฐาน   
2. วางโค้ดใน `main.ts`  
3. รัน:

```bash
npm install
npm run dev
```

  
4. เปิด Obsidian → **Settings → Community plugins** → เปิด plugin   
5. เปิด Command Palette แล้วรัน **Validate YAML frontmatter**   

## ตรวจเฉพาะโฟลเดอร์ Projects

แทนบรรทัดนี้:

```ts
const files = this.app.vault.getMarkdownFiles();
```

ด้วย:

```ts
const files = this.app.vault
  .getMarkdownFiles()
  .filter((file) => file.path.startsWith("Projects/"));
```



## แสดงผลในโน้ต

หากต้องการให้ผลอยู่ในโน้ต แทนการแสดง Notice ให้สร้าง/เขียนไฟล์รายงาน เช่น `YAML Validation Report.md` แล้วเขียนรายชื่อไฟล์ที่ผิดลงไป[1]

## ข้อควรระวัง

- `processFrontMatter` ต้องใช้กับ Markdown file เท่านั้น   
- หาก YAML parse ไม่ผ่าน จะ throw `YAMLParseError`   
- ควรใช้ `this.app` ไม่ใช่ global `app`[1]
- ควรใช้ vault แยกสำหรับ dev   
- หากต้องการ reload อัตโนมัติ ให้ติดตั้ง Hot-Reload   

หากต้องการ ผมช่วยเขียนเป็น plugin เต็มรูปแบบที่มีปุ่มใน ribbon, เลือกโฟลเดอร์, และสร้างรายงานในโน้ตให้ก็ได้ครับ

การอ้างอิง:
[1] Plugin guidelines - Developer Documentation https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines
[2] YAML Creator - Obsidian Plugin https://community.obsidian.md/plugins/yaml-creator
[3] Frontmatter Date Manager - Obsidian Plugin https://community.obsidian.md/plugins/frontmatter-date-manager
[4] Tidy YAML - Obsidian Plugin https://community.obsidian.md/plugins/frontmatter-visibility
[5] YAML Editor - Obsidian Plugin https://community.obsidian.md/plugins/yaml-editor
[6] github.com · blob · mainobsidian-superskills/skills/obsidian-frontmatter/README.md at... https://github.com/ericgandrade/obsidian-superskills/blob/main/skills/obsidian-frontmatter/README.md
[7] Frontmatter Operator – Obsidian Plugin https://www.obsidianstats.com/plugins/frontmatter-operator
[8] obsidian-gemini/AGENTS.md at master - GitHub https://github.com/allenhutchison/obsidian-gemini/blob/master/AGENTS.md
[9] YAML Frontmatter https://obsidian-confluence.com/features/yaml-frontmatter.html
[10] Rules https://lobehub.com/tr/skills/mhalder-dotfiles-obsidian-frontmatter

ขยายให้สร้างรายงานในโน้ตสรุปข้อผิดพลาด

เพิ่มให้ plugin สร้างหรือเขียนทับโน้ตรายงาน เช่น `YAML Validation Report.md` โดยสรุปไฟล์ที่ YAML ผิด พร้อมข้อความ error และลิงก์ไปยังโน้ตต้นทาง ใช้ `vault.create()` หรือ `vault.modify()` ครับ 

## โค้ดที่ขยายแล้ว

```ts
import { Plugin, TFile, Notice, normalizePath } from "obsidian";

const REPORT_PATH = "YAML Validation Report.md";

export default class YamlValidatorPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "validate-yaml-frontmatter",
      name: "Validate YAML frontmatter",
      callback: () => this.validateVault(),
    });
  }

  async validateVault() {
    const files = this.app.vault
      .getMarkdownFiles()
      .filter((file) => file.path.startsWith("Projects/"));

    const errors: {
      path: string;
      message: string;
    }[] = [];

    for (const file of files) {
      try {
        await this.app.fileManager.processFrontMatter(file, () => {
          // ใช้เพื่อตรวจว่า YAML parse ผ่านเท่านั้น
        });
      } catch (error) {
        errors.push({
          path: file.path,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    await this.writeReport(errors);

    if (errors.length === 0) {
      new Notice("All YAML frontmatter is valid.");
    } else {
      new Notice(`${errors.length} file(s) have invalid YAML frontmatter.`);
    }
  }

  async writeReport(errors: { path: string; message: string }[]) {
    const now = new Date().toISOString();
    const reportPath = normalizePath(REPORT_PATH);

    const lines: string[] = [
      "---",
      `title: "YAML Validation Report"`,
      `created: "${now}"`,
      `tags:`,
      `  - yaml`,
      `  - validation`,
      `  - report`,
      "---",
      "",
      "# YAML Validation Report",
      "",
      `ตรวจสอบเมื่อ: ${now}`,
      "",
      `พบข้อผิดพลาด: **${errors.length} ไฟล์**`,
      "",
    ];

    if (errors.length === 0) {
      lines.push("ไม่พบข้อผิดพลาดใน YAML frontmatter");
    } else {
      lines.push("## ข้อผิดพลาด");
      lines.push("");

      for (const error of errors) {
        lines.push(`### [[${error.path}]]`);
        lines.push("");
        lines.push("```text");
        lines.push(error.message);
        lines.push("```");
        lines.push("");
      }
    }

    const content = lines.join("\n");
    const existing = this.app.vault.getAbstractFileByPath(reportPath);

    if (existing instanceof TFile) {
      await this.app.vault.modify(existing, content);
    } else {
      await this.app.vault.create(reportPath, content);
    }

    const reportFile = this.app.vault.getAbstractFileByPath(reportPath);

    if (reportFile instanceof TFile) {
      await this.app.workspace.getLeaf(false).openFile(reportFile);
    }
  }
}
```



## ผลลัพธ์ในโน้ต

เมื่อรันคำสั่ง **Validate YAML frontmatter** จะได้โน้ตแบบนี้:

```markdown
---
title: "YAML Validation Report"
created: "2026-10-08T04:51:00.000Z"
tags:
  - yaml
  - validation
  - report
---

# YAML Validation Report

ตรวจสอบเมื่อ: 2026-10-08T04:51:00.000Z

พบข้อผิดพลาด: **2 ไฟล์**

## ข้อผิดพลาด

### [[Projects/Supabase - Broadcast.md]]

```text
YAMLParseError: bad indentation of a mapping entry
```

### [[Projects/MOC - Supabase.md]]

```text
YAMLParseError: did not find expected key
```
```



## จุดสำคัญ

- `processFrontMatter` จะ throw `YAMLParseError` เมื่อ YAML ผิด จึงใช้ `try/catch` เพื่อเก็บ error   
- `normalizePath()` ช่วยให้ path ของรายงานถูกต้องในทุกแพลตฟอร์ม   
- ใช้ `vault.create()` เมื่อยังไม่มีรายงาน และ `vault.modify()` เมื่อมีอยู่แล้ว   
- `workspace.getLeaf(false).openFile()` เปิดรายงานให้ทันทีหลังตรวจ   
- ใช้ `[[file path]]` เพื่อให้ลิงก์ไปยังโน้ตที่มีปัญหาได้   

## ข้อควรระวัง

- ควรใช้ vault แยกสำหรับ dev   
- หากต้องการ reload อัตโนมัติ ให้ติดตั้ง Hot-Reload   
- หากต้องการรายงานแบบ append แทน overwrite ให้ใช้ `vault.append()` แทน `vault.modify()`   
- หากต้องการเก็บประวัติการตรวจ ให้ตั้งชื่อไฟล์แบบมี timestamp เช่น `YAML Validation Report 2026-10-08.md`   

หากต้องการ ผมช่วยเพิ่มตัวเลือกให้เลือกโฟลเดอร์, กรองเฉพาะ tag, หรือสร้างรายงานแบบ append ให้ก็ได้ครับ

การอ้างอิง:
[1] index - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/index
[2] Markdown post processing - Developer Documentation https://docs.obsidian.md/Plugins/Editor/Markdown+post+processing
[3] Plugins https://community.obsidian.md/plugins
[4] Notices and error messages https://metaedit.obsidian.guide/reference/notices/
[5] API Reference | obsidianmd/obsidian-plugin-docs | DeepWiki https://deepwiki.com/obsidianmd/obsidian-plugin-docs/7-api-reference
[6] README.md - kennyg/obsidian-okf - GitHub https://github.com/kennyg/obsidian-okf/blob/main/README.mdAdd properties

เพิ่ม properties ให้ plugin เขียนลง frontmatter ได้โดยใช้ `FileManager.processFrontMatter()` ซึ่งอ่าน/แก้/บันทึก frontmatter แบบ atomic และรองรับการเพิ่ม key ใหม่ได้โดยตรง 

## เพิ่ม properties ในโค้ดเดิม

แทรกฟังก์ชันนี้ใน `main.ts`:

```ts
async addDefaultProperties(file: TFile) {
  await this.app.fileManager.processFrontMatter(file, (fm) => {
    if (!fm.title) fm.title = file.basename;

    if (!fm.aliases) fm.aliases = [];
    if (!Array.isArray(fm.aliases)) fm.aliases = [fm.aliases];

    if (!fm.tags) fm.tags = [];
    if (!Array.isArray(fm.tags)) fm.tags = [fm.tags];

    if (!fm.cssclasses) fm.cssclasses = [];
    if (!Array.isArray(fm.cssclasses)) fm.cssclasses = [fm.cssclasses];

    if (!fm.source) fm.source = "";
  });
}
```



## เรียกใช้ใน validateVault

แทรกบรรทัดนี้ก่อนตรวจ YAML:

```ts
await this.addDefaultProperties(file);
```

ตัวอย่าง:

```ts
for (const file of files) {
  try {
    await this.addDefaultProperties(file);

    await this.app.fileManager.processFrontMatter(file, () => {
      // ใช้เพื่อตรวจว่า YAML parse ผ่านเท่านั้น
    });
  } catch (error) {
    errors.push({
      path: file.path,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
```



## ผลลัพธ์ที่ได้

ถ้าโน้ตยังไม่มี frontmatter หรือมีบางส่วน plugin จะเติมให้เป็น:

```yaml
---
title: "ชื่อไฟล์"
aliases: []
tags: []
cssclasses: []
source: ""
---
```



## ข้อควรระวัง

- `processFrontMatter` ต้องใช้กับ Markdown file เท่านั้น   
- หาก YAML เดิมผิด จะ throw `YAMLParseError` และไม่ควรเขียน properties ทับจนกว่าจะแก้ YAML ก่อน   
- การเพิ่ม property ควรตรวจว่ามีค่าอยู่แล้วหรือไม่ เพื่อไม่ทับข้อมูลเดิม   
- หากต้องการให้ property เป็น list เสมอ ให้แปลงค่าเดี่ยวเป็น array ก่อน   
- หากต้องการ reload อัตโนมัติ ให้ติดตั้ง Hot-Reload   

## ตัวอย่างเพิ่ม property แบบกำหนดค่า

```ts
await this.app.fileManager.processFrontMatter(file, (fm) => {
  fm.project = "Supabase";
  fm.status = "active";
  fm.owner = "you";
});
```



หากต้องการ ผมช่วยปรับให้เพิ่ม properties เฉพาะเมื่อไฟล์อยู่ในโฟลเดอร์ `Projects/Supabase` หรือเฉพาะ tag `#supabase` ก็ได้ครับ

การอ้างอิง:
[1] community.obsidian.md › plugins › auto-propertiesAuto-Properties - Obsidian Plugin https://community.obsidian.md/plugins/auto-properties
[2] Dataview to Properties - Obsidian Plugin https://community.obsidian.md/plugins/dataview-properties
[3] community.obsidian.md · plugins · property-panelsProperty Panels - Obsidian Plugin https://community.obsidian.md/plugins/property-panels
[4] Conditional Properties – Obsidian Plugin https://www.obsidianstats.com/plugins/conditional-properties
Add tags

เพิ่ม tags ให้ plugin เขียนลง frontmatter ได้โดยใช้ `FileManager.processFrontMatter()` และควรเก็บ `tags` เป็น list เสมอ[1]

## เพิ่มฟังก์ชัน addTags

```ts
async addTags(file: TFile, newTags: string[]) {
  await this.app.fileManager.processFrontMatter(file, (fm) => {
    if (!fm.tags) fm.tags = [];

    if (!Array.isArray(fm.tags)) {
      fm.tags = [fm.tags];
    }

    for (const tag of newTags) {
      if (!fm.tags.includes(tag)) {
        fm.tags.push(tag);
      }
    }
  });
}
```



## เรียกใช้ใน validateVault

แทรกบรรทัดนี้ก่อนตรวจ YAML:

```ts
await this.addTags(file, ["yaml", "validation", "report"]);
```

ตัวอย่าง:

```ts
for (const file of files) {
  try {
    await this.addTags(file, ["yaml", "validation", "report"]);

    await this.app.fileManager.processFrontMatter(file, () => {
      // ใช้เพื่อตรวจว่า YAML parse ผ่านเท่านั้น
    });
  } catch (error) {
    errors.push({
      path: file.path,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
```



## ผลลัพธ์ที่ได้

ถ้าโน้ตยังไม่มี tags จะได้:

```yaml
---
tags:
  - yaml
  - validation
  - report
---
```



## ข้อควรระวัง

- `tags` ใน YAML ต้องเป็น list เสมอ[1]
- หาก `tags` เดิมเป็น string ให้แปลงเป็น array ก่อน   
- หาก YAML ผิด จะ throw `YAMLParseError` และไม่ควรเขียน tags ทับจนกว่าจะแก้ YAML ก่อน   
- หากต้องการ nested tags ให้ใช้ `/` เช่น `inbox/to-read`[1]
- หากต้องการ reload อัตโนมัติ ให้ติดตั้ง Hot-Reload   

## ตัวอย่างเพิ่ม tag แบบกำหนดค่า

```ts
await this.app.fileManager.processFrontMatter(file, (fm) => {
  if (!fm.tags) fm.tags = [];
  if (!Array.isArray(fm.tags)) fm.tags = [fm.tags];

  if (!fm.tags.includes("supabase")) {
    fm.tags.push("supabase");
  }
});
```



หากต้องการ ผมช่วยปรับให้เพิ่ม tags เฉพาะเมื่อไฟล์อยู่ในโฟลเดอร์ `Projects/Supabase` หรือเฉพาะ tag `#supabase` ก็ได้ครับ[1]

การอ้างอิง:
[1] Tags - Obsidian Help https://obsidian.md/help/tags
[2] User Scripts - QuickAdd https://quickadd.obsidian.guide/docs/2.12.0/UserScripts/
[3] Current View - Obsidian Plugin https://community.obsidian.md/plugins/current-view
[4] Auto Tag - Obsidian Plugin https://community.obsidian.md/plugins/auto-tag
[5] File tag picker – Obsidian Plugin https://www.obsidianstats.com/plugins/file-tag-picker
วิธีลบ tags ที่ซ้ำซ้อนอัตโนมัติ

ให้ plugin ลบ tags ซ้ำโดยใช้ `Set` เพื่อเก็บเฉพาะค่าที่ไม่ซ้ำ แล้วเขียนกลับเป็น list ผ่าน `FileManager.processFrontMatter()` ครับ 

## โค้ดลบ tags ซ้ำ

```ts
async removeDuplicateTags(file: TFile) {
  await this.app.fileManager.processFrontMatter(file, (fm) => {
    if (!fm.tags) return;

    if (!Array.isArray(fm.tags)) {
      fm.tags = [fm.tags];
    }

    const uniqueTags = Array.from(new Set(fm.tags));

    fm.tags = uniqueTags;
  });
}
```



## เรียกใช้ใน validateVault

แทรกบรรทัดนี้ก่อนตรวจ YAML:

```ts
await this.removeDuplicateTags(file);
```

ตัวอย่าง:

```ts
for (const file of files) {
  try {
    await this.removeDuplicateTags(file);

    await this.app.fileManager.processFrontMatter(file, () => {
      // ใช้เพื่อตรวจว่า YAML parse ผ่านเท่านั้น
    });
  } catch (error) {
    errors.push({
      path: file.path,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
```



## ผลลัพธ์ที่ได้

ก่อนรัน:

```yaml
---
tags:
  - yaml
  - validation
  - yaml
  - report
  - validation
---
```

หลังรัน:

```yaml
---
tags:
  - yaml
  - validation
  - report
---
```



## ข้อควรระวัง

- `tags` ใน YAML ต้องเป็น list เสมอ   
- หาก `tags` เดิมเป็น string ให้แปลงเป็น array ก่อน   
- หาก YAML ผิด จะ throw `YAMLParseError` และไม่ควรแก้ tags จนกว่าจะแก้ YAML ก่อน   
- Obsidian ถือว่า tag เป็น case-insensitive เช่น `#Tag` กับ `#TAG` เหมือนกัน แต่ใน YAML ควรเก็บเป็นรูปแบบเดียวกันเพื่อไม่ให้ซ้ำ   
- หากต้องการลบ duplicate ทั้ง vault ให้รันใน loop ของทุก Markdown file   

## ตัวอย่างลบ duplicate ทั้ง vault

```ts
const files = this.app.vault.getMarkdownFiles();

for (const file of files) {
  await this.removeDuplicateTags(file);
}
```



หากต้องการ ผมช่วยปรับให้ลบ duplicate โดยไม่คำนึงถึงตัวพิมพ์ (case-insensitive) หรือลบ duplicate เฉพาะในโฟลเดอร์ `Projects` ก็ได้ครับ

การอ้างอิง:
[1] User Scripts | QuickAdd https://quickadd.obsidian.guide/docs/UserScripts/
[2] Frontmatter Cleaner - Obsidian Plugin https://community.obsidian.md/plugins/frontmatter-cleaner
[3] Mass Editor - Obsidian Plugin https://community.obsidian.md/plugins/mass-editor
[4] Bulk Tag Manager - Obsidian Plugin https://community.obsidian.md/plugins/bulk-tag-manager
[5] Tag Tactician - Obsidian Plugin https://community.obsidian.md/plugins/tag-tactician
จำกัดการลบ duplicate เฉพาะโฟลเดอร์ที่กำหนด

ให้จำกัดการลบ duplicate tags เฉพาะโฟลเดอร์ที่กำหนดโดยกรอง `file.path` ก่อนเรียก `processFrontMatter` ครับ[1]

## โค้ดที่ปรับแล้ว

```ts
async removeDuplicateTagsInFolder(folderPath: string) {
  const files = this.app.vault
    .getMarkdownFiles()
    .filter((file) => file.path.startsWith(`${folderPath}/`));

  for (const file of files) {
    await this.removeDuplicateTags(file);
  }
}

async removeDuplicateTags(file: TFile) {
  await this.app.fileManager.processFrontMatter(file, (fm) => {
    if (!fm.tags) return;

    if (!Array.isArray(fm.tags)) {
      fm.tags = [fm.tags];
    }

    fm.tags = Array.from(new Set(fm.tags));
  });
}
```



## เรียกใช้เฉพาะโฟลเดอร์

```ts
await this.removeDuplicateTagsInFolder("Projects");
```

หรือเฉพาะโฟลเดอร์ย่อย:

```ts
await this.removeDuplicateTagsInFolder("Projects/Supabase");
```



## ผลลัพธ์ที่ได้

ก่อนรัน:

```yaml
---
tags:
  - yaml
  - validation
  - yaml
  - report
  - validation
---
```

หลังรัน:

```yaml
---
tags:
  - yaml
  - validation
  - report
---
```



## ข้อควรระวัง

- `folderPath` ต้องเขียนแบบไม่มี `/` นำหน้า เช่น `"Projects"` ไม่ใช่ `"/Projects"`   
- การใช้ `startsWith("Projects/")` จะครอบคลุมโฟลเดอร์ย่อยทั้งหมด   
- หากต้องการจำกัดหลายโฟลเดอร์ ให้ใช้ `includes()` แทน `startsWith()`   
- หาก YAML ผิด จะ throw `YAMLParseError` และไม่ควรแก้ tags จนกว่าจะแก้ YAML ก่อน   
- ควรใช้ vault แยกสำหรับ dev   

## ตัวอย่างจำกัดหลายโฟลเดอร์

```ts
const allowedFolders = ["Projects", "Archive"];

const files = this.app.vault
  .getMarkdownFiles()
  .filter((file) =>
    allowedFolders.some((folder) =>
      file.path.startsWith(`${folder}/`)
    )
  );

for (const file of files) {
  await this.removeDuplicateTags(file);
}
```



หากต้องการ ผมช่วยปรับให้เลือกโฟลเดอร์ผ่าน UI หรือใช้ settings ของ plugin แทน hardcode ก็ได้ครับ[1]

การอ้างอิง:
[1] FileManager - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/FileManager
[2] User Scripts https://quickadd.obsidian.guide/docs/next/UserScripts/
[3] TagFolder - Obsidian Plugin https://community.obsidian.md/plugins/obsidian-tagfolder
[4] Vaultend - Obsidian Plugin https://community.obsidian.md/plugins/vaultend
[5] AI Tag Curator - Obsidian Plugin https://community.obsidian.md/plugins/ai-tag-curator
[6] Filters - Tasks User Guide https://publish.obsidian.md/tasks/Queries/Filters
[7] GitHub - SavaStone/TagAndFolders: Obsidian plugin for ... https://github.com/SavaStone/TagAndFolders

![[เพิ่มปุ่มคลิกขวาที่โฟลเดอร์เพื่อรันสคริปต์

เพิ่มเมนูคลิกขวาที่โฟลเดอร์ได้โดยใช้ event `file-menu` แล้วตรวจว่า `file` เป็น folder (`TFolder`) ก่อน จากนั้นเรียกฟังก์ชันลบ duplicate tags เฉพาะโฟลเดอร์นั้นครับ[1][2]

## เพิ่มโค้ดใน main.ts

```ts
import {
  Plugin,
  TFolder,
  TFile,
  Menu,
  Notice,
} from "obsidian";

export default class YamlValidatorPlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof TFolder)) return;

        menu.addItem((item) => {
          item
            .setTitle("Remove duplicate tags")
            .setIcon("tags")
            .onClick(async () => {
              await this.removeDuplicateTagsInFolder(file.path);
              new Notice(`Removed duplicate tags in: ${file.path}`);
            });
        });
      })
    );
  }

  async removeDuplicateTagsInFolder(folderPath: string) {
    const files = this.app.vault
      .getMarkdownFiles()
      .filter((file) => file.path.startsWith(`${folderPath}/`));

    for (const file of files) {
      await this.removeDuplicateTags(file);
    }
  }

  async removeDuplicateTags(file: TFile) {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      if (!fm.tags) return;

      if (!Array.isArray(fm.tags)) {
        fm.tags = [fm.tags];
      }

      fm.tags = Array.from(new Set(fm.tags));
    });
  }
}
```



## วิธีทำงาน

- `file-menu` จะ trigger เมื่อคลิกขวาที่ไฟล์หรือโฟลเดอร์ใน File Explorer[1][2]
- `file instanceof TFolder` ใช้เพื่อให้เมนูแสดงเฉพาะเมื่อคลิกขวาที่โฟลเดอร์[2]
- `menu.addItem()` ใช้เพื่อเพิ่มปุ่มใน context menu[1]
- `file.path` คือ path ของโฟลเดอร์ที่คลิกขวา[2]
- `removeDuplicateTagsInFolder()` จะลบ duplicate tags เฉพาะไฟล์ในโฟลเดอร์นั้นและโฟลเดอร์ย่อย   

## ผลลัพธ์

เมื่อคลิกขวาที่โฟลเดอร์ เช่น `Projects` จะเห็นเมนู:

```text
Remove duplicate tags
```

เมื่อกด จะลบ duplicate tags ในทุก `.md` ภายใต้ `Projects/` และแสดง Notice เมื่อเสร็จ[1]

## ข้อควรระวัง

- `processFrontMatter` ต้องใช้กับ Markdown file เท่านั้น   
- หาก YAML ผิด จะ throw `YAMLParseError` และไม่ควรแก้ tags จนกว่าจะแก้ YAML ก่อน   
- ควรใช้ vault แยกสำหรับ dev   
- หากต้องการ reload อัตโนมัติ ให้ติดตั้ง Hot-Reload   
- หากต้องการให้เมนูแสดงเฉพาะบางโฟลเดอร์ ให้เพิ่มเงื่อนไขตรวจ `file.path` ก่อน[2]

หากต้องการ ผมช่วยปรับให้เพิ่ม confirmation ก่อนลบ, แสดง progress, หรือจำกัดเฉพาะ tag บางตัวก็ได้ครับ[1]

การอ้างอิง:
[1] Context menus - Developer Documentation https://docs.obsidian.md/Plugins/User+interface/Context+menus
[2] on('file-menu') - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/Workspace/on('file-menu')
[3] Workspace - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/Workspace
[4] on('files-menu') - Obsidian Developer Docs https://docs.obsidian.md/Reference/TypeScript+API/Workspace/on('files-menu')
[5] Custom Context - Obsidian Plugin https://community.obsidian.md/plugins/custom-context
[6] Right-Click Tools - Obsidian Plugin https://community.obsidian.md/plugins/right-click-tools
[7] Commands and menus https://metaedit.obsidian.guide/reference/commands-and-menus/
[8] File explorer - Obsidian Help https://obsidian.md/help/plugins/file-explorer
[9] Root Folder Context Menu - Obsidian Plugin https://community.obsidian.md/plugins/root-folder-context-menu
[10] Folder menu - Shell commands documentation https://publish.obsidian.md/shellcommands/Events/Folder+menu
[11] add a custom contextmenu - Liam Cain - Obsidian Publish https://publish.obsidian.md/liam/Obsidian/API+FAQ/views/add+a+custom+contextmenu
[12] raw.githubusercontent.com https://raw.githubusercontent.com/saml-dev/obsidian-custom-js/refs/heads/master/README.md

]][[title: "Obsidian File Recovery & Frontmatter Management"
type: research
status: complete
domain: Knowledge Management / Obsidian
created: 2026-10-09
updated: 2026-10-09
confidence: high
tags:
 * obsidian
 * file-recovery
 * frontmatter
 * yaml
 * automation
   sources:
 * user-provided
   related:
 * [[Obsidian Community Plugins]]
 * [[YAML Frontmatter]]
Topic:: Obsidian File Recovery
Type:: Research
Domain:: Knowledge Management / Obsidian
Status:: Complete
Confidence:: High
Complexity:: Medium
Related Topics:: [[Obsidian]], [[YAML Frontmatter]], [[File Recovery Plugin]]
Sources:: Provided User Note
Obsidian File Recovery & Frontmatter Management
Executive Summary
Obsidian File Recovery is a powerful core plugin designed to safeguard data by capturing snapshots of .md files and their YAML frontmatter. While it provides robust recovery mechanisms, users must navigate strict device-local constraints and configuration boundaries to effectively restore damaged or accidentally modified notes.
Why It Matters
Accidental data loss, malformed YAML frontmatter, or unintended overwrites can compromise knowledge graphs and Dataview queries. Understanding how the File Recovery plugin works—along with its programmatic alternatives—ensures maximum vault resilience and data integrity.
Core Concepts
 * File Recovery Snapshot: Automatic snapshots capturing the entire .md file, including the YAML frontmatter block, stored within a retention window.
 * Programmatic Frontmatter Management (processFrontMatter): An atomic API method to read, modify, and save frontmatter safely with built-in validation (YAMLParseError).
Recovery Procedures
การกู้คืน YAML Frontmatter และเนื้อหาภายในไฟล์สามารถทำได้ผ่านขั้นตอนดังต่อไปนี้:
 * เปิด Settings → Core plugins → File recovery
 * ในหัวข้อ Snapshots ให้กด View
 * ค้นหาชื่อไฟล์ที่ต้องการกู้คืน
 * เลือก snapshot ที่มี frontmatter ถูกต้อง
 * เลือก Copy เพื่อคัดลอกเนื้อหาไปวางในโน้ตใหม่ หรือ Restore เพื่อกู้คืนทั้งไฟล์
 * ใช้ Show changes เพื่อตรวจสอบว่า frontmatter ส่วนใดถูกลบหรือแก้ไข
ตัวอย่าง Frontmatter ที่กู้คืน
---
title: "Deep research obsidian Run"
aliases:
  - "Deep Research Run"
tags:
  - deep-research
  - obsidian
cssclasses:
  - wide-page
source: "https://example.com"
---

File Recovery เก็บ snapshot ของไฟล์ .md ทั้งไฟล์ จึงครอบคลุม YAML frontmatter ด้วย
Technical Analysis: Programmatic Frontmatter
หากต้องการแก้ไข frontmatter ผ่าน plugin สามารถใช้ฟังก์ชัน processFrontMatter ซึ่งทำงานแบบ atomic (อ่าน/แก้/บันทึกในขั้นตอนเดียว) และจะแจ้งเตือน YAMLParseError ทันทีหากรูปแบบ YAML ไม่ถูกต้อง:
await app.fileManager.processFrontMatter(file, (fm) => {
  fm.title = "Deep research obsidian Run";
  fm.tags = ["deep-research", "obsidian"];
});

Limitations & Constraints
 * กู้คืนได้เฉพาะไฟล์ประเภท .md และ .canvas เท่านั้น
 * Snapshot ถูกเก็บอยู่ใน Global settings ไม่ได้เก็บไว้ภายในตัว vault
 * Snapshot เป็นแบบ per-device ไม่มีการซิงค์ข้ามอุปกรณ์ (Cross-device sync)
 * หากย้ายตำแหน่ง vault ไปยังที่อื่น snapshot เดิมอาจไม่สามารถเข้าถึงได้
 * การกดปุ่ม Clear history จะเป็นการลบ snapshot ทั้งหมดแบบถาวร
Checklist
 * [ ] ตรวจสอบว่าเปิดใช้งาน Core plugin: File Recovery แล้วหรือยัง
 * [ ] ตรวจสอบกำหนดเวลาและระยะเวลาการเก็บ snapshot
 * [ ] ทดลองใช้คำสั่ง Show changes ก่อนทำการกด Restore
 * [ ] สำรองข้อมูลสำคัญก่อนกด Clear history
Key Insights
 * File Recovery เป็นเครื่องมือหลักในการกู้คืนทั้งเนื้อหาและ YAML frontmatter แต่มีข้อจำกัดด้านการเก็บข้อมูลแบบโลคัลต่ออุปกรณ์
 * การใช้โค้ดควบคุมผ่าน processFrontMatter ช่วยป้องกันข้อผิดพลาดทางไวยากรณ์ (YAMLParseError) ระหว่างการเขียนโปรแกรมอัตโนมัติ
References
 * Obsidian Core Plugin Documentation & User Provided Notes.
]]