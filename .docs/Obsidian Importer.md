EN

Obsidian: Importer

Obsidian’s official Importer plugin is a free tool that helps you convert data from other note-taking apps or file formats into Markdown files used by Obsidian, placing them directly into your vault. It is developed by the Obsidian team and supports desktop and mobile.

Supported formats and sources

· Note-taking apps: Notion, Microsoft OneNote, Evernote, Apple Notes, Apple Journal, Google Keep, Bear, Craft, Roam Research, Logseq, etc.
· General files: HTML, CSV, Textbundle, Markdown (.md, .txt), etc.

Installation and usage

1. Install the plugin: Open Obsidian Settings → Community plugins → Browse, search for Importer, then install and enable it.
2. Open the importer: Use the command palette (Ctrl/Cmd + P) and run Importer: Open importer, or click the import icon in the left sidebar.
3. Choose a source and import: Select the source app or format, follow the wizard to export your data, configure the options, and click import.

Key features: templates and configuration

The Importer’s strength is its template system. You can customize note titles, properties, and content before importing.

· Available variables: {{title}}, {{content}}, {{date}}, {{folder}}, etc.
· CSV special handling: Each column can be used as a variable, e.g. {{source["Column name"]}}. The first column generates the note name by default.

Common issues and tips

· Textbundle limitation: On Mac, you can only import one Textbundle file at a time. It is recommended to zip multiple files into a .zip and then import.
· Evernote tags and stacks: You can preserve notebook stack structure by renaming .enex files, e.g. Stack1@@@NotebookA.
· Duplicate imports: The plugin records imported items. If you delete files and import again, they may be skipped. Try turning off “incremental import”.
· Back up before importing: Back up your Obsidian vault before importing to prevent accidental data overwrites.

If you have a specific migration need, for example importing from a particular app, let me know and I can provide more detailed steps.

---

TH

Obsidian: Importer

ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian เป็นเครื่องมือฟรีที่ช่วยแปลงข้อมูลจากแอปจดบันทึกอื่นหรือรูปแบบไฟล์ต่าง ๆ ให้เป็นไฟล์ Markdown ที่ Obsidian ใช้งาน และนำไปวางใน vault โดยตรง พัฒนาโดยทีม Obsidian และรองรับทั้งเดสก์ท็อปและมือถือ

รูปแบบและแหล่งที่รองรับ

· แอปจดบันทึก: Notion, Microsoft OneNote, Evernote, Apple Notes, Apple Journal, Google Keep, Bear, Craft, Roam Research, Logseq ฯลฯ
· ไฟล์ทั่วไป: HTML, CSV, Textbundle, Markdown (.md, .txt) ฯลฯ

การติดตั้งและใช้งาน

1. ติดตั้งปลั๊กอิน: เปิด Obsidian Settings → Community plugins → Browse ค้นหา Importer จากนั้นติดตั้งและเปิดใช้งาน
2. เปิด importer: ใช้ command palette (Ctrl/Cmd + P) แล้วรัน Importer: Open importer หรือคลิกไอคอน import ที่แถบด้านซ้าย
3. เลือกแหล่งและนำเข้า: เลือกแอปหรือรูปแบบต้นทาง ทำตามตัวช่วยเพื่อ export ข้อมูล ตั้งค่าตัวเลือก แล้วคลิก import

ฟีเจอร์หลัก: เทมเพลตและการตั้งค่า

จุดแข็งของ Importer คือ ระบบเทมเพลต คุณสามารถปรับแต่งชื่อโน้ต properties และเนื้อหาก่อนนำเข้าได้

· ตัวแปรที่ใช้ได้: {{title}}, {{content}}, {{date}}, {{folder}} ฯลฯ
· การจัดการ CSV: แต่ละคอลัมน์ใช้เป็นตัวแปรได้ เช่น {{source["ชื่อคอลัมน์"]}} และคอลัมน์แรกจะสร้างชื่อโน้ตโดยค่าเริ่มต้น

ปัญหาที่พบบ่อยและคำแนะนำ

· ข้อจำกัดของ Textbundle: บน Mac สามารถนำเข้าไฟล์ Textbundle ได้ครั้งละหนึ่งไฟล์เท่านั้น แนะนำให้บีบอัดหลายไฟล์เป็น .zip แล้วนำเข้า
· แท็กและ stack ของ Evernote: สามารถรักษาโครงสร้าง notebook stack ได้โดยเปลี่ยนชื่อไฟล์ .enex เช่น Stack1@@@NotebookA
· การนำเข้าซ้ำ: ปลั๊กอินจะบันทึกรายการที่นำเข้าแล้ว หากคุณลบไฟล์แล้วนำเข้าอีกครั้ง รายการเหล่านั้นอาจถูกข้าม ลองปิดตัวเลือก “incremental import”
· สำรองข้อมูลก่อนนำเข้า: ควรสำรอง vault ก่อนนำเข้า เพื่อป้องกันข้อมูลถูกเขียนทับโดยไม่ตั้งใจ

หากคุณมีความต้องการย้ายข้อมูลเฉพาะ เช่น จากแอปใดแอปหนึ่ง แจ้งได้เลย แล้วจะให้ขั้นตอนที่ละเอียดขึ้นGood news — Obsidian's official Importer plugin now supports direct Airtable import via the Airtable API, which preserves tables, records, and relationships better than a plain CSV export. Here's how to do it.

---

Method 1: Direct Airtable Import (Recommended)

This method uses the Airtable API and requires a Personal Access Token. It creates one note per record, a folder per table, and a Base file that recreates your table views.

Step 1: Create an Airtable Personal Access Token

1. Sign in to Airtable and go to Personal access tokens in your account settings.
2. Select Create new token, name it (e.g., "Obsidian").
3. Under Scopes, add data.records:read and schema.bases:read.
4. Under Access, add the bases you want to import, or select all bases in a workspace.
5. Select Create token, then Copy it. Airtable only shows the token once — store it safely.

Step 2: Import into Obsidian

1. Open Settings → Community plugins → install and enable Importer.
2. Open the Importer via the command palette or ribbon icon.
3. Under File format, choose Airtable.
4. Under Airtable Personal Access Token, click Link… to add a new secret. For the ID, name it airtable, and for the Secret, paste your token.
5. Click Load to browse your bases, then select the tables to import.
6. Review and adjust import settings, then select Import to configure how fields become note properties.
7. Select Continue to preview the generated template, then Import and wait for completion.

Key Import Settings

· Convert formulas — Choose whether formula, lookup, rollup, and count fields are rewritten as Base formulas, fall back to Airtable's computed values, or imported as plain values.
· Property mapping — Map Airtable fields to Obsidian properties in the configuration step.

---

Method 2: CSV Export (Fallback / Simple)

If you prefer not to use an API token, or just need a quick one-off import, you can export from Airtable as CSV and use the Importer's CSV mode.

1. In Airtable, open the Grid view of your table.
2. Click the view name → Download CSV.
3. In Obsidian, open the Importer and choose CSV (.csv) as the file format.
4. Select your CSV file, configure field mapping, preview, and import.

⚠️ Note: CSV export flattens linked records and loses Airtable's relational structure. For data with linked tables, the direct Airtable import (Method 1) is strongly recommended.

---

Additional Option: Python Script

For advanced automation, there is a community Python script called Airtable2Obsidian that transforms Airtable records into Obsidian-ready Markdown files, translating Airtable tags to Obsidian tags and converting links between records.

---

Summary

Method Preserves Relationships Requires API Token Best For
Direct Airtable import ✅ Yes ✅ Yes Full bases with linked tables
CSV export ❌ No ❌ No Simple, one-off tables
Python script ✅ Yes ✅ Yes Custom automation

If you tell me which base or table you're working with, I can walk you through the field mapping configuration in more detail.Obsidian's official Importer plugin now supports direct Apple Journal import via its HTML export feature, converting your journal entries into durable Markdown files. Here's how to do it.

---

Method 1: Official Importer Plugin (Recommended)

This is the simplest and most reliable method, using the built-in Apple Journal (HTML Export) option.

Step 1: Export your data from Apple Journal

On iPhone:

1. Open the Journal app.
2. Choose a journal or tap All Entries.
3. Tap the More button (three dots at the top).
4. Tap Export, then select Export.
5. Choose a location, then tap Selected.

On Mac (Tahoe):

1. Open the Journal app.
2. Go to File → Export, then select Export.

The export creates a folder named AppleJournalEntries containing an Entries/ subfolder with HTML files and a Resources/ subfolder with media files.

Step 2: Import into Obsidian

1. Open Settings → Community Plugins and install/enable Importer.
2. Open the Importer via the command palette or ribbon icon.
3. Under File format, choose Apple Journal (HTML Export).
4. Under Files to import, select the exported AppleJournalEntries folder (or individual files from the Entries subfolder).
5. Review and adjust import settings, then select Import to preview the template.
6. Select Import again and wait for the import to complete.

Template Customization

The Importer uses a template system, allowing you to configure how entries are imported. You can customize note titles, properties, and content using variables like {{title}}, {{content}}, {{date}}, and {{folder}}.

---

Method 2: Community Scripts & Tools (Advanced)

If you need more control or want to convert media files, several community options exist:

· Python script (Nomiracle/apple-journal-export): Exports Apple Journal to structured Markdown + media files.
· Apple Journal CLI (omarshahine/apple-journal-cli): A terminal tool for reading/writing journal entries with Markdown/JSON export, YAML frontmatter, and media support.
· Markway for Obsidian: A plugin that syncs Markdown notes with Apple Journal via the Markway app (macOS only).

---

Summary

Method Media Support Best For
Official Importer ✅ Yes (via Resources folder) Most users, simple migration
Python script ✅ Yes Custom automation, batch processing
CLI tool ✅ Yes Terminal users, scripting
Markway ✅ Yes Ongoing sync, macOS users

If you tell me which method you'd like to try or if you run into any issues during export, I can walk you through it in more detail.

---

TH

ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian รองรับการนำเข้าจาก Apple Journal โดยตรง ผ่านฟีเจอร์ HTML Export โดยแปลงบันทึกของคุณเป็นไฟล์ Markdown ที่ใช้งานได้อย่างถาวร

---

วิธีที่ 1: ปลั๊กอิน Importer อย่างเป็นทางการ (แนะนำ)

วิธีนี้ง่ายและเชื่อถือได้มากที่สุด โดยใช้ตัวเลือก Apple Journal (HTML Export) ที่มีในตัว

ขั้นตอนที่ 1: ส่งออกข้อมูลจาก Apple Journal

บน iPhone:

1. เปิดแอป Journal
2. เลือก journal หรือแตะ All Entries
3. แตะปุ่ม More (จุดสามจุดด้านบน)
4. แตะ Export จากนั้นเลือก Export
5. เลือกตำแหน่ง แล้วแตะ Selected

บน Mac (Tahoe):

1. เปิดแอป Journal
2. ไปที่ File → Export แล้วเลือก Export

การส่งออกจะสร้างโฟลเดอร์ชื่อ AppleJournalEntries ประกอบด้วยโฟลเดอร์ย่อย Entries/ ที่มีไฟล์ HTML และ Resources/ ที่มีไฟล์มีเดีย

ขั้นตอนที่ 2: นำเข้า Obsidian

1. เปิด Settings → Community Plugins ติดตั้งและเปิดใช้งาน Importer
2. เปิด Importer ผ่าน command palette หรือไอคอน ribbon
3. ที่ File format เลือก Apple Journal (HTML Export)
4. ที่ Files to import เลือกโฟลเดอร์ AppleJournalEntries ที่ส่งออกมา (หรือไฟล์แต่ละไฟล์จากโฟลเดอร์ Entries)
5. ตรวจสอบและปรับการตั้งค่า แล้วเลือก Import เพื่อดูตัวอย่างเทมเพลต
6. เลือก Import อีกครั้งและรอให้การนำเข้าเสร็จสมบูรณ์

การปรับแต่งเทมเพลต

Importer ใช้ระบบเทมเพลต ช่วยให้คุณกำหนดค่าวิธีนำเข้าบันทึกได้ คุณสามารถปรับแต่งชื่อเรื่อง properties และเนื้อหาโดยใช้ตัวแปรเช่น {{title}}, {{content}}, {{date}} และ {{folder}}

---

วิธีที่ 2: สคริปต์และเครื่องมือจากชุมชน (ขั้นสูง)

หากต้องการควบคุมมากขึ้นหรือแปลงไฟล์มีเดีย มีตัวเลือกจากชุมชนหลายอย่าง:

· สคริปต์ Python (Nomiracle/apple-journal-export): ส่งออก Apple Journal เป็น Markdown + ไฟล์มีเดียแบบมีโครงสร้าง
· Apple Journal CLI (omarshahine/apple-journal-cli): เครื่องมือเทอร์มินัลสำหรับอ่าน/เขียนบันทึก พร้อมส่งออก Markdown/JSON, YAML frontmatter และรองรับมีเดีย
· Markway for Obsidian: ปลั๊กอินที่ซิงค์ Markdown กับ Apple Journal ผ่านแอป Markway (macOS เท่านั้น)

---

สรุป

วิธี รองรับมีเดีย เหมาะสำหรับ
Importer อย่างเป็นทางการ ✅ ได้ (ผ่านโฟลเดอร์ Resources) ผู้ใช้ทั่วไป, การย้ายข้อมูลง่าย
สคริปต์ Python ✅ ได้ ระบบอัตโนมัติ, ประมวลผลเป็นชุด
เครื่องมือ CLI ✅ ได้ ผู้ใช้เทอร์มินัล, การเขียนสคริปต์
Markway ✅ ได้ การซิงค์ต่อเนื่อง, ผู้ใช้ macOS

หากคุณต้องการลองวิธีใดหรือพบปัญหาระหว่างการส่งออก แจ้งได้เลย แล้วจะให้คำแนะนำโดยละเอียดเพิ่มเติมObsidian's official Importer plugin supports direct Apple Notes import on macOS, converting your notes into durable Markdown files with support for tables, images, drawings, scans, PDFs, and iOS 17 links. Here's how to do it.

---

Method 1: Official Importer Plugin (Recommended)

This is the simplest and most reliable method, reading directly from your local Apple Notes container once you grant read permission.

Step 1: Install the Importer plugin

1. Open Obsidian Settings → Community plugins and click Browse.
2. Search for Importer, then click Install and Enable.

Step 2: Import Apple Notes data

1. Open the Importer via the command palette (Cmd+P) or the ribbon icon.
2. Under File format, select Apple Notes.
3. Click Import.
4. A popup titled Select the "group.com.apple.notes" folder to allow Obsidian to read Apple Notes data will appear — click Open to grant read permission.
5. Review the generated template and preview examples from your notes.
6. Click Import and wait for the import to complete.

Supported Content

The Importer supports nearly all Apple Notes content types, including tables, images, drawings, scans, PDFs, and links introduced in iOS 17.

⚠️ Important Limitations

· macOS only: The Importer currently supports Apple Notes migration only on macOS. It is not yet available on iOS.
· Password-protected notes: Notes locked with a password are encrypted by Apple and will be skipped during import. You must unlock them before importing.
· Scans: Apple stores scans in different formats depending on how they were created. Older scans export as a series of uncropped images, newer scans usually export as cropped images, and iOS 17 edited scans usually export as PDFs.

Template Customization

Before importing, the Importer shows a preview generated from your Apple Notes selection. You can edit the generated template, properties, and note name, or choose a Markdown template from your vault. See Importer templates for the full list of variables (e.g., {{body}}, {{title}}, {{date}}, {{folder}}).

---

Method 2: Third-Party Export Tools (Fallback / Advanced)

Apple does not provide a native export option for Apple Notes. If you need more control, prefer a GUI tool, or want to preserve folder structures with attachments, several third-party tools exist.

Exporter (Mac App Store)

A popular paid Mac app by Chintan Ghate. It exports all your Apple Notes to Markdown or HTML locally, preserving creation/modification dates and folder structure. Select Markdown as the output format and export — then copy the resulting folder into your Obsidian vault.

AppleScript Exporter (Free)

The flkcgn/applenotes-exporter script exports a selected Apple Notes folder to clean Markdown using Pandoc, removes HTML tags, and replaces embedded base64 images with Markdown image placeholders. Requires Pandoc (brew install pandoc).

notes-exporter (Free)

storizzi/notes-exporter exports Apple Notes to HTML, plain text, Markdown, PDF, and DOCX including images and attachments, using Shortcuts.app on macOS.

icloud-md / obsidian-apple-notes (Cross-platform Sync)

The coddingtonbear/obsidian-apple-notes plugin syncs a folder in your Obsidian vault with Apple Notes bidirectionally, from any OS (Linux, Windows, macOS), using icloud-md.

---

Summary

Method Preserves Attachments Preserves Folder Structure Platform Best For
Official Importer ✅ Yes ✅ Yes macOS only Most users, full migration
Exporter (Mac App) ✅ Yes ✅ Yes macOS GUI users, paid but polished
AppleScript Exporter ⚠️ Placeholders only ✅ Yes macOS Free, scriptable
notes-exporter ✅ Yes ✅ Yes macOS Free, multiple formats
icloud-md sync ✅ Yes ✅ Yes Cross-platform Ongoing bidirectional sync

If you tell me which method you'd like to try or run into any issues during import, I can walk you through it in more detail.

---

TH

ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian รองรับการนำเข้าจาก Apple Notes โดยตรงบน macOS โดยแปลงบันทึกของคุณเป็นไฟล์ Markdown ที่ใช้งานได้อย่างถาวร พร้อมรองรับตาราง รูปภาพ ภาพวาด สแกน PDF และลิงก์ที่เปิดตัวใน iOS 17

---

วิธีที่ 1: ปลั๊กอิน Importer อย่างเป็นทางการ (แนะนำ)

วิธีนี้ง่ายและเชื่อถือได้มากที่สุด โดยอ่านจากที่เก็บ Apple Notes ในเครื่องคุณโดยตรงหลังจากให้สิทธิ์การอ่าน

ขั้นตอนที่ 1: ติดตั้งปลั๊กอิน Importer

1. เปิด Obsidian Settings → Community plugins แล้วคลิก Browse
2. ค้นหา Importer จากนั้นคลิก Install และ Enable

ขั้นตอนที่ 2: นำเข้าข้อมูล Apple Notes

1. เปิด Importer ผ่าน command palette (Cmd+P) หรือไอคอน ribbon
2. ที่ File format เลือก Apple Notes
3. คลิก Import
4. จะมีป๊อปอัปชื่อ Select the "group.com.apple.notes" folder to allow Obsidian to read Apple Notes data — คลิก Open เพื่อให้สิทธิ์การอ่าน
5. ตรวจสอบเทมเพลตและตัวอย่างจากบันทึกของคุณ
6. คลิก Import และรอให้การนำเข้าเสร็จสมบูรณ์

เนื้อหาที่รองรับ

Importer รองรับเนื้อหาเกือบทุกประเภทของ Apple Notes รวมถึงตาราง รูปภาพ ภาพวาด สแกน PDF และลิงก์ที่เปิดตัวใน iOS 17

⚠️ ข้อจำกัดที่สำคัญ

· macOS เท่านั้น: Importer รองรับการย้ายข้อมูลจาก Apple Notes เฉพาะบน macOS เท่านั้น ยังไม่พร้อมใช้งานบน iOS
· บันทึกที่ป้องกันด้วยรหัสผ่าน: บันทึกที่ล็อกด้วยรหัสผ่านจะถูกเข้ารหัสโดย Apple และจะถูกข้ามระหว่างการนำเข้า ต้องปลดล็อกก่อนนำเข้า
· การสแกน: Apple จัดเก็บสแกนในรูปแบบต่างๆ ขึ้นอยู่กับวิธีสร้าง สแกนเก่าจะส่งออกเป็นชุดภาพที่ยังไม่ครอบตัด สแกนใหม่มักส่งออกเป็นภาพที่ครอบตัดแล้ว และสแกนที่แก้ไขด้วย iOS 17 มักส่งออกเป็น PDF

การปรับแต่งเทมเพลต

ก่อนนำเข้า Importer จะแสดงตัวอย่างที่สร้างจากเลือก Apple Notes ของคุณ คุณสามารถแก้ไขเทมเพลต properties และชื่อบันทึก หรือเลือกเทมเพลต Markdown จาก vault ได้ ดู Importer templates สำหรับตัวแปรทั้งหมด (เช่น {{body}}, {{title}}, {{date}}, {{folder}})

---

วิธีที่ 2: เครื่องมือส่งออกจากบุคคลที่สาม (สำรอง / ขั้นสูง)

Apple ไม่มีตัวเลือกส่งออกในตัวสำหรับ Apple Notes หากต้องการควบคุมมากขึ้น ชอบใช้ GUI หรือต้องการรักษาโครงสร้างโฟลเดอร์พร้อมไฟล์แนบ มีเครื่องมือจากบุคคลที่สามหลายอย่าง

Exporter (Mac App Store)

แอป Mac แบบเสียเงินยอดนิยมโดย Chintan Ghate ส่งออก Apple Notes ทั้งหมดเป็น Markdown หรือ HTML ในเครื่อง โดยรักษาวันที่สร้าง/แก้ไขและโครงสร้างโฟลเดอร์ เลือก Markdown เป็นรูปแบบผลลัพธ์แล้วส่งออก จากนั้นคัดลอกโฟลเดอร์ผลลัพธ์เข้า vault ของ Obsidian

AppleScript Exporter (ฟรี)

สคริปต์ flkcgn/applenotes-exporter ส่งออกโฟลเดอร์ Apple Notes ที่เลือกเป็น Markdown ที่สะอาดโดยใช้ Pandoc ลบแท็ก HTML และแทนที่ภาพ base64 ที่ฝังด้วยตัวยึดตำแหน่งภาพ Markdown ต้องติดตั้ง Pandoc (brew install pandoc)

notes-exporter (ฟรี)

storizzi/notes-exporter ส่งออก Apple Notes เป็น HTML, plain text, Markdown, PDF และ DOCX รวมถึงรูปภาพและไฟล์แนบ โดยใช้ Shortcuts.app บน macOS

icloud-md / obsidian-apple-notes (ซิงค์ข้ามแพลตฟอร์ม)

ปลั๊กอิน coddingtonbear/obsidian-apple-notes ซิงค์โฟลเดอร์ใน vault ของ Obsidian กับ Apple Notes แบบสองทิศทาง จาก OS ใดก็ได้ (Linux, Windows, macOS) โดยใช้ icloud-md

---

สรุป

วิธี รักษาไฟล์แนบ รักษาโครงสร้างโฟลเดอร์ แพลตฟอร์ม เหมาะสำหรับ
Importer อย่างเป็นทางการ ✅ ได้ ✅ ได้ macOS เท่านั้น ผู้ใช้ทั่วไป, การย้ายข้อมูลเต็มรูปแบบ
Exporter (Mac App) ✅ ได้ ✅ ได้ macOS ผู้ใช้ GUI, เสียเงินแต่ขัดเงา
AppleScript Exporter ⚠️ ตัวยึดตำแหน่งเท่านั้น ✅ ได้ macOS ฟรี, เขียนสคริปต์ได้
notes-exporter ✅ ได้ ✅ ได้ macOS ฟรี, หลายรูปแบบ
icloud-md sync ✅ ได้ ✅ ได้ ข้ามแพลตฟอร์ม ซิงค์สองทิศทางต่อเนื่อง

หากคุณต้องการลองวิธีใดหรือพบปัญหาระหว่างการนำเข้า แจ้งได้เลย แล้วจะให้คำแนะนำโดยละเอียดเพิ่มเติมObsidian's official Importer plugin supports direct Bear import via Bear's .bear2bk backup format (macOS) or ApplicationData.zip export (iOS), converting your notes, tags, and attachments into durable Markdown files. Here's how to do it.

---

Method 1: Official Importer Plugin (Recommended)

This is the simplest and most reliable method, using Bear's built-in backup export.

Step 1: Export your data from Bear

On macOS:

1. Open Bear.
2. Go to File → Backup notes.
3. Choose a location for your backup file.
4. Click Export notes.
5. You should now have one .bear2bk file that contains all your notes.

On iOS:

1. Open Bear.
2. Go to Settings → Advanced → Share Application Data.
3. Choose a location for your backup file.
4. You should now have one ApplicationData.zip file that contains all your notes.

Step 2: Import into Obsidian

1. Open Settings → Community Plugins and install/enable Importer.
2. Open the Importer via the command palette or ribbon icon.
3. Under File format, choose Bear (.bear2bk, .zip).
4. Select the location of your Bear backup file.
5. Select Import to review the generated template and preview examples from your notes.
6. Select Import again and wait for the import to finish.

Import Settings

The Bear importer provides two configuration options that affect how notes are processed:

Setting Type Default Description
flattenTags boolean false Split nested tags on / during import (e.g., #project/work/urgent becomes three separate tags: project, work, urgent)
storeId boolean false Store Bear note identifiers in YAML front matter. Useful if note identifiers are referenced outside of note-to-note linking

How the Importer Works

The Bear importer uses a two-pass architecture to handle internal links that reference notes by ID rather than filename:

1. First pass: Extracts Markdown notes and assets, processes metadata (creation/modification times, archived/trashed status), converts tags, and organizes notes into folders based on status (active, archived, trashed).
2. Second pass: Resolves bear://x-callback-url/open-note?id=XXXXX links into Obsidian-compatible file links.

It preserves note creation and modification times, archived and trashed state, tags, and attachments.

Template Customization

Use Importer templates to fully configure how your Bear data is imported. The following variables are available:

Variable Description
{{body}} Markdown body without properties (no frontmatter)
{{content}} Complete Markdown before the selected template is applied
{{ctime}} Source creation time as an ISO 8601 timestamp
{{date}} Current date and time when the template is rendered
{{folder}} Final vault-relative parent folder
{{mtime}} Source modification time as an ISO 8601 timestamp
{{noteName}} Final resolved note name after removing invalid characters
{{path}} Final vault-relative path, including the .md extension
{{title}} Original note title before sanitization and deduplication

---

Method 2: Bear's Native Markdown Export (Fallback)

If you prefer not to use the backup format, Bear can export notes directly to Markdown.

Supported Export Formats

The free version of Bear can export notes to:

· .txt — Plain Text
· .md — Markdown
· .textbundle — TextBundle V2 (Markdown)
· .bearnote — Bear Note
· .rtf — Rich Text Format

With Bear Pro, you can also export to .html, .docx, .jpg, and .ePub.

How to Export

· Single note: Tap the ⋯ button in the upper right of a note, then select the export option.
· Multiple notes (macOS): Hold ⌘ and click to select multiple notes, then go to File → Export notes… (⇧⌘S).
· Multiple notes (iOS): Swipe right in the note list with two fingers, tap to select multiple notes, tap the more icon (⫶), and select Export….
· All notes: Click the Notes section in the sidebar, press ⌘A to select all, then File → Export notes….

After exporting, copy the .md files directly into your Obsidian vault folder. Obsidian will recognize them automatically.

---

Method 3: Community Tools (Advanced)

Notes Exporter (Mac App Store)

A paid Mac app by anton that exports Apple Notes, Bear, and Logseq notes as Markdown. It produces rich YAML frontmatter with fields like source_url (deep link back to Bear), tags, created, modified, word_count, and attachment_count. The companion Notes Exporter Obsidian plugin adds native app integration, including "Open in Bear" context menu options and a sync status panel.

obsidian-bear-markdown-export (GitHub)

A plugin by epszaw that moves Markdown files from a custom directory to the Obsidian vault, organizing notes by their first tag.

AppleScript Exporter (Free)

Various community AppleScripts exist for automating Bear exports. See the Bear community forums for details.

---

Summary

Method Preserves Attachments Preserves Tags Preserves Timestamps Platform Best For
Official Importer ✅ Yes ✅ Yes ✅ Yes macOS + iOS Most users, full migration
Bear Markdown Export ⚠️ Manual ⚠️ Partial ❌ No macOS + iOS Quick one-off exports
Notes Exporter ✅ Yes ✅ Yes ✅ Yes macOS Rich metadata, ongoing sync
obsidian-bear-markdown-export ✅ Yes ✅ Yes ❌ No macOS Tag-based organization

If you tell me which method you'd like to try or run into any issues during export, I can walk you through it in more detail.

---

TH

ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian รองรับการนำเข้าจาก Bear โดยตรง ผ่านรูปแบบแบ็คอัป .bear2bk (macOS) หรือ ApplicationData.zip (iOS) โดยแปลงบันทึก แท็ก และไฟล์แนบของคุณเป็นไฟล์ Markdown ที่ใช้งานได้อย่างถาวร

---

วิธีที่ 1: ปลั๊กอิน Importer อย่างเป็นทางการ (แนะนำ)

วิธีนี้ง่ายและเชื่อถือได้มากที่สุด โดยใช้การส่งออกแบ็คอัปที่มีในตัวของ Bear

ขั้นตอนที่ 1: ส่งออกข้อมูลจาก Bear

บน macOS:

1. เปิด Bear
2. ไปที่ File → Backup notes
3. เลือกตำแหน่งสำหรับไฟล์แบ็คอัป
4. คลิก Export notes
5. คุณจะได้ไฟล์ .bear2bk หนึ่งไฟล์ที่มีบันทึกทั้งหมด

บน iOS:

1. เปิด Bear
2. ไปที่ Settings → Advanced → Share Application Data
3. เลือกตำแหน่งสำหรับไฟล์แบ็คอัป
4. คุณจะได้ไฟล์ ApplicationData.zip หนึ่งไฟล์ที่มีบันทึกทั้งหมด

ขั้นตอนที่ 2: นำเข้า Obsidian

1. เปิด Settings → Community Plugins ติดตั้งและเปิดใช้งาน Importer
2. เปิด Importer ผ่าน command palette หรือไอคอน ribbon
3. ที่ File format เลือก Bear (.bear2bk, .zip)
4. เลือกตำแหน่งไฟล์แบ็คอัป Bear ของคุณ
5. เลือก Import เพื่อตรวจสอบเทมเพลตและดูตัวอย่างจากบันทึกของคุณ
6. เลือก Import อีกครั้งและรอให้การนำเข้าเสร็จสมบูรณ์

การตั้งค่าการนำเข้า

ตัวนำเข้า Bear มีตัวเลือกการตั้งค่าสองอย่างที่ส่งผลต่อการประมวลผลบันทึก:

การตั้งค่า ประเภท ค่าเริ่มต้น คำอธิบาย
flattenTags boolean false แยกแท็กซ้อนบน / ระหว่างการนำเข้า (เช่น #project/work/urgent กลายเป็นสามแท็กแยก: project, work, urgent)
storeId boolean false เก็บ ID บันทึกของ Bear ใน YAML front matter มีประโยชน์หากมีการอ้างอิง ID บันทึกภายนอกการเชื่อมโยงระหว่างบันทึก

วิธีการทำงานของ Importer

ตัวนำเข้า Bear ใช้ สถาปัตยกรรมสองรอบ เพื่อจัดการลิงก์ภายในที่อ้างอิงบันทึกด้วย ID แทนชื่อไฟล์:

1. รอบแรก: แยกบันทึก Markdown และไฟล์แนบ ประมวลผลข้อมูลเมตา (เวลาสร้าง/แก้ไข สถานะ archived/trashed) แปลงแท็ก และจัดระเบียบบันทึกเป็นโฟลเดอร์ตามสถานะ (active, archived, trashed)
2. รอบที่สอง: แปลงลิงก์ bear://x-callback-url/open-note?id=XXXXX เป็นลิงก์ไฟล์ที่เข้ากันได้กับ Obsidian

Importer รักษาเวลาสร้างและแก้ไขบันทึก สถานะ archived และ trashed แท็ก และไฟล์แนบ

การปรับแต่งเทมเพลต

ใช้ Importer templates เพื่อกำหนดค่าวิธีนำเข้าข้อมูล Bear ของคุณอย่างเต็มที่ ตัวแปรต่อไปนี้พร้อมใช้งาน:

ตัวแปร คำอธิบาย
{{body}} เนื้อหา Markdown โดยไม่มี properties (ไม่มี frontmatter)
{{content}} Markdown ที่สมบูรณ์ก่อนใช้เทมเพลตที่เลือก
{{ctime}} เวลาสร้างต้นทางเป็น ISO 8601 timestamp
{{date}} วันที่และเวลาปัจจุบันเมื่อเรนเดอร์เทมเพลต
{{folder}} โฟลเดอร์แม่สุดท้ายที่สัมพันธ์กับ vault
{{mtime}} เวลาแก้ไขต้นทางเป็น ISO 8601 timestamp
{{noteName}} ชื่อบันทึกสุดท้ายหลังลบอักขระที่ไม่ถูกต้อง
{{path}} พาธสุดท้ายที่สัมพันธ์กับ vault รวมนามสกุล .md
{{title}} ชื่อบันทึกต้นฉบับก่อน sanitization และ deduplication

---

วิธีที่ 2: การส่งออก Markdown ของ Bear (สำรอง)

หากไม่ต้องการใช้รูปแบบแบ็คอัป Bear สามารถส่งออกบันทึกเป็น Markdown ได้โดยตรง

รูปแบบที่รองรับ

Bear เวอร์ชันฟรีสามารถส่งออกบันทึกเป็น:

· .txt — Plain Text
· .md — Markdown
· .textbundle — TextBundle V2 (Markdown)
· .bearnote — Bear Note
· .rtf — Rich Text Format

ด้วย Bear Pro คุณยังสามารถส่งออกเป็น .html, .docx, .jpg และ .ePub ได้

วิธีการส่งออก

· บันทึกเดียว: แตะปุ่ม ⋯ ที่มุมขวาบนของบันทึก แล้วเลือกตัวเลือกการส่งออก
· หลายบันทึก (macOS): กด ⌘ ค้างแล้วคลิกเพื่อเลือกหลายบันทึก จากนั้นไปที่ File → Export notes… (⇧⌘S)
· หลายบันทึก (iOS): ปัดขวาในรายการบันทึกด้วยสองนิ้ว แตะเพื่อเลือกหลายบันทึก แตะไอคอน more (⫶) แล้วเลือก Export…
· ทั้งหมด: คลิกส่วน Notes ในแถบด้านข้าง กด ⌘A เพื่อเลือกทั้งหมด แล้ว File → Export notes…

หลังจากส่งออกแล้ว ให้คัดลอกไฟล์ .md เข้าโฟลเดอร์ vault ของ Obsidian โดยตรง Obsidian จะรู้จักโดยอัตโนมัติ

---

วิธีที่ 3: เครื่องมือจากชุมชน (ขั้นสูง)

Notes Exporter (Mac App Store)

แอป Mac แบบเสียเงินโดย anton ที่ส่งออก Apple Notes, Bear และ Logseq เป็น Markdown สร้าง YAML frontmatter ที่สมบูรณ์พร้อมฟิลด์เช่น source_url (deep link กลับไปยัง Bear), tags, created, modified, word_count และ attachment_count ปลั๊กอิน Notes Exporter สำหรับ Obsidian เพิ่มการผสานรวมแอปพื้นเมือง รวมถึงตัวเลือก "Open in Bear" ในเมนูบริบทและแผงสถานะการซิงค์

obsidian-bear-markdown-export (GitHub)

ปลั๊กอินโดย epszaw ที่ย้ายไฟล์ Markdown จากไดเรกทอรีที่กำหนดไปยัง vault ของ Obsidian โดยจัดระเบียบบันทึกตามแท็กแรก

AppleScript Exporter (ฟรี)

มี AppleScript จากชุมชนหลายตัวสำหรับการส่งออก Bear อัตโนมัติ ดูรายละเอียดได้ที่ฟอรัมชุมชน Bear

---

สรุป

วิธี รักษาไฟล์แนบ รักษาแท็ก รักษาเวลาประทับ แพลตฟอร์ม เหมาะสำหรับ
Importer อย่างเป็นทางการ ✅ ได้ ✅ ได้ ✅ ได้ macOS + iOS ผู้ใช้ทั่วไป, การย้ายข้อมูลเต็มรูปแบบ
Bear Markdown Export ⚠️ ด้วยตนเอง ⚠️ บางส่วน ❌ ไม่ macOS + iOS การส่งออกครั้งเดียวอย่างรวดเร็ว
Notes Exporter ✅ ได้ ✅ ได้ ✅ ได้ macOS ข้อมูลเมตาที่สมบูรณ์, การซิงค์ต่อเนื่อง
obsidian-bear-markdown-export ✅ ได้ ✅ ได้ ❌ ไม่ macOS การจัดระเบียบตามแท็ก

หากคุณต้องการลองวิธีใดหรือพบปัญหาระหว่างการส่งออก แจ้งได้เลย แล้วจะให้คำแนะนำโดยละเอียดเพิ่มเติมObsidian's official Importer plugin supports migrating from Craft by using Craft's built-in Markdown export, converting your Craft documents into durable Markdown files that work seamlessly with Obsidian. You can also use Craft's Textbundle export to preserve embedded images and attachments. Here's how to do it.

---

Method 1: Official Importer Plugin via Markdown Export (Recommended)

This is the simplest and most reliable method, using Craft's native Markdown export and Obsidian's official Importer plugin.

Step 1: Export your data from Craft

On desktop (macOS / Windows):

1. Open the Craft app on your desktop computer.
2. Go to the "Organize" or "All Documents" view.
3. Click the three-dot menu (⋯).
4. Select the Export option.
5. Choose Markdown as the export format.

Depending on the number of notes you have in Craft, this process may take a while.

💡 Tip: For documents containing images or attachments, Craft also supports TextBundle (.textbundle) export, which bundles Markdown with embedded images and attachments together. Choose TextBundle if you want to carry over media files cleanly.

Step 2: Import into Obsidian

1. Open Settings → Community Plugins and install/enable Importer.
2. Open the Importer via the command palette or ribbon icon.
3. Under File format, choose Markdown (.md, .txt) (or Textbundle (.textbundle, .textpack) if you exported as TextBundle).
4. Select the location of your exported Craft files.
5. Review the generated template and preview, then click Import and wait for the process to complete.

The Importer plugin's Markdown importer supports individual files, folders, and ZIP archives, and preserves source folder hierarchies, relative links, attachments, and .base/.canvas files.

---

Method 2: Direct Copy to Vault (Simplest)

If you prefer a no-plugin approach, you can copy the exported Markdown files directly into your Obsidian vault folder.

1. Locate your vault folder via Settings → Files and links and check the path shown under Vault path.
2. Copy your exported .md files (and any subfolders) into the vault folder using Finder (macOS) or File Explorer (Windows).
3. Obsidian will automatically recognize the new files.

This works best when your notes are already in clean Markdown format and you don't need template customization.

---

Method 3: Community Script (Advanced)

Craft and Obsidian use slightly different conventions for daily notes and asset folders. The community script craft-to-obsidian (by coofdy) performs several cleanup tasks automatically:

· Renames yyyy.mm.dd.md to yyyy-mm-dd.md
· Renames yyyy.mm.dd.assets folders to yyyy-mm-dd.assets
· Updates asset folder references inside daily notes
· Removes the redundant # note title heading (since Obsidian uses the filename as title)
· Removes asset files ending with _preview.png
· Converts TIFF images to PNG and updates image links
· Converts Craft's day:// links (e.g., [22 Jul 2023](day://2023.07.22)) to Obsidian [[wikilinks]] ([[2023-07-22]])

Usage: Clone the repository and run:

```bash
npm install
node craft-to-obsidian your-folder-path
```

⚠️ Important: This script is experimental. Make a backup copy of your Craft export and your Obsidian vault before running it. Use at your own risk.

---

⚠️ Troubleshooting: Craft's Non-Standard Link Syntax

Craft Docs uses non-standard syntax for certain links (such as day:// links for daily notes). These links will not resolve correctly in Obsidian by default. The Importer GitHub repository maintains a dedicated issue thread with resources and community solutions for migrating these links:

🔗 Importer GitHub repo – Issue #27

You may also use the community script above to handle the most common day:// link conversions.

---

Summary

Method Preserves Attachments Preserves Folder Structure Handles Craft-Specific Links Best For
Official Importer (Markdown) ⚠️ Partial (use TextBundle for full) ✅ Yes ⚠️ Manual Most users, standard migration
Official Importer (TextBundle) ✅ Yes ✅ Yes ⚠️ Manual Notes with images/attachments
Direct Copy to Vault ⚠️ Manual ✅ Yes ❌ No Quick, simple migrations
craft-to-obsidian script ✅ Yes ✅ Yes ✅ Yes (day:// links) Advanced users, daily notes

If you tell me which method you'd like to try or run into any issues during export, I can walk you through it in more detail.

---

TH

ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian รองรับการย้ายข้อมูลจาก Craft โดยใช้การส่งออก Markdown ที่มีในตัวของ Craft แปลงเอกสาร Craft ของคุณเป็นไฟล์ Markdown ที่คงทนซึ่งใช้งานร่วมกับ Obsidian ได้อย่างราบรื่น คุณยังสามารถใช้การส่งออก Textbundle ของ Craft เพื่อรักษารูปภาพและไฟล์แนบที่ฝังอยู่ได้

---

วิธีที่ 1: ปลั๊กอิน Importer อย่างเป็นทางการผ่านการส่งออก Markdown (แนะนำ)

วิธีนี้ง่ายและเชื่อถือได้มากที่สุด โดยใช้การส่งออก Markdown ของ Craft และปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian

ขั้นตอนที่ 1: ส่งออกข้อมูลจาก Craft

บนเดสก์ท็อป (macOS / Windows):

1. เปิดแอป Craft บนคอมพิวเตอร์ตั้งโต๊ะของคุณ
2. ไปที่มุมมอง "Organize" หรือ "All Documents"
3. คลิกที่ เมนูจุดสามจุด (⋯)
4. เลือกตัวเลือก Export
5. เลือก Markdown เป็นรูปแบบการส่งออก

กระบวนการนี้อาจใช้เวลาสักครู่ ขึ้นอยู่กับจำนวนโน้ตที่คุณมีใน Craft

💡 เคล็ดลับ: สำหรับเอกสารที่มีรูปภาพหรือไฟล์แนบ Craft ยังรองรับการส่งออก TextBundle (.textbundle) ซึ่งรวม Markdown กับรูปภาพและไฟล์แนบที่ฝังอยู่เข้าด้วยกัน เลือก TextBundle หากต้องการนำไฟล์มีเดียไปด้วยอย่างสมบูรณ์

ขั้นตอนที่ 2: นำเข้า Obsidian

1. เปิด Settings → Community Plugins ติดตั้งและเปิดใช้งาน Importer
2. เปิด Importer ผ่าน command palette หรือไอคอน ribbon
3. ที่ File format เลือก Markdown (.md, .txt) (หรือ Textbundle (.textbundle, .textpack) หากคุณส่งออกเป็น TextBundle)
4. เลือกตำแหน่งไฟล์ Craft ที่ส่งออกมา
5. ตรวจสอบเทมเพลตและดูตัวอย่าง แล้วคลิก Import และรอให้กระบวนการเสร็จสมบูรณ์

ตัวนำเข้า Markdown ของปลั๊กอิน Importer รองรับไฟล์เดี่ยว โฟลเดอร์ และ ZIP archives และรักษาโครงสร้างโฟลเดอร์ต้นทาง ลิงก์สัมพันธ์ ไฟล์แนบ และไฟล์ .base/.canvas

---

วิธีที่ 2: คัดลอกเข้า Vault โดยตรง (ง่ายที่สุด)

หากไม่ต้องการใช้ปลั๊กอิน คุณสามารถคัดลอกไฟล์ Markdown ที่ส่งออกมาเข้าโฟลเดอร์ vault ของ Obsidian ได้โดยตรง

1. ค้นหาโฟลเดอร์ vault ของคุณผ่าน Settings → Files and links และดูพาธที่แสดงใต้ Vault path
2. คัดลอกไฟล์ .md (และโฟลเดอร์ย่อย) เข้าโฟลเดอร์ vault โดยใช้ Finder (macOS) หรือ File Explorer (Windows)
3. Obsidian จะรู้จักไฟล์ใหม่โดยอัตโนมัติ

วิธีนี้เหมาะที่สุดเมื่อโน้ตของคุณอยู่ในรูปแบบ Markdown ที่สะอาดแล้ว และไม่ต้องการปรับแต่งเทมเพลต

---

วิธีที่ 3: สคริปต์จากชุมชน (ขั้นสูง)

Craft และ Obsidian ใช้รูปแบบที่แตกต่างกันเล็กน้อยสำหรับ daily notes และโฟลเดอร์ asset สคริปต์จากชุมชน craft-to-obsidian (โดย coofdy) จะทำงานทำความสะอาดหลายอย่างโดยอัตโนมัติ:

· เปลี่ยนชื่อ yyyy.mm.dd.md เป็น yyyy-mm-dd.md
· เปลี่ยนชื่อโฟลเดอร์ yyyy.mm.dd.assets เป็น yyyy-mm-dd.assets
· อัปเดตการอ้างอิงโฟลเดอร์ asset ภายใน daily notes
· ลบหัวข้อ # note title ที่ซ้ำซ้อน (เนื่องจาก Obsidian ใช้ชื่อไฟล์เป็นชื่อเรื่อง)
· ลบไฟล์ asset ที่ลงท้ายด้วย _preview.png
· แปลงรูปภาพ TIFF เป็น PNG และอัปเดตลิงก์รูปภาพ
· แปลงลิงก์ day:// ของ Craft (เช่น [22 Jul 2023](day://2023.07.22)) เป็น wikilinks ของ Obsidian ([[2023-07-22]])

วิธีใช้: โคลน repository แล้วรัน:

```bash
npm install
node craft-to-obsidian your-folder-path
```

⚠️ สำคัญ: สคริปต์นี้เป็น experimental สำรองข้อมูล Craft export และ vault ของ Obsidian ก่อนรัน ใช้ด้วยความเสี่ยงของคุณเอง

---

⚠️ การแก้ไขปัญหา: ไวยากรณ์ลิงก์ที่ไม่เป็นมาตรฐานของ Craft

Craft Docs ใช้ไวยากรณ์ที่ไม่เป็นมาตรฐานสำหรับลิงก์บางประเภท (เช่น ลิงก์ day:// สำหรับ daily notes) ลิงก์เหล่านี้จะไม่ resolve อย่างถูกต้องใน Obsidian โดยค่าเริ่มต้น Importer GitHub repository มี issue thread เฉพาะที่มีทรัพยากรและโซลูชันจากชุมชนสำหรับการย้ายลิงก์เหล่านี้:

🔗 Importer GitHub repo – Issue #27

คุณยังสามารถใช้สคริปต์จากชุมชนด้านบนเพื่อจัดการการแปลงลิงก์ day:// ที่พบบ่อยที่สุดได้

---

สรุป

วิธี รักษาไฟล์แนบ รักษาโครงสร้างโฟลเดอร์ จัดการลิงก์เฉพาะ Craft เหมาะสำหรับ
Importer อย่างเป็นทางการ (Markdown) ⚠️ บางส่วน (ใช้ TextBundle สำหรับทั้งหมด) ✅ ได้ ⚠️ ด้วยตนเอง ผู้ใช้ทั่วไป, การย้ายข้อมูลมาตรฐาน
Importer อย่างเป็นทางการ (TextBundle) ✅ ได้ ✅ ได้ ⚠️ ด้วยตนเอง โน้ตที่มีรูปภาพ/ไฟล์แนบ
คัดลอกเข้า Vault โดยตรง ⚠️ ด้วยตนเอง ✅ ได้ ❌ ไม่ การย้ายข้อมูลง่าย รวดเร็ว
สคริปต์ craft-to-obsidian ✅ ได้ ✅ ได้ ✅ ได้ (ลิงก์ day://) ผู้ใช้ขั้นสูง, daily notes

หากคุณต้องการลองวิธีใดหรือพบปัญหาระหว่างการส่งออก แจ้งได้เลย แล้วจะให้คำแนะนำโดยละเอียดเพิ่มเติมObsidian's official Importer plugin supports direct Evernote import via Evernote's .enex export format, converting your notes, notebooks, tags, and attachments into durable Markdown files. Here's how to do it.

---

Method 1: Official Importer Plugin (Recommended)

This is the official, simplest method for migrating from Evernote to Obsidian.

Step 1: Export your data from Evernote

Obsidian uses Evernote's export format: .enex files. This method lets you export entire notebooks from the Evernote desktop client.

1. Open Evernote and go to the Notebooks screen.
2. Click on More actions (•••) next to the notebook you want to export.
3. Choose Export Notebook…
4. Select ENEX as the file format.
5. Choose a location for your exported .enex file.

⚠️ Important limitation: The Importer can only reliably handle up to 50 notes per .enex file without risking file corruption. For larger notebooks, export in smaller batches or use a third-party converter (see Method 3).

Step 2: Import into Obsidian

1. Open Settings → Community Plugins and install/enable Importer.
2. Open the Importer via the command palette or ribbon icon.
3. Under File format, choose Evernote (.enex).
4. Select the location of your Evernote backup file.
5. Select Import to review the generated template and preview examples from your notes.
6. Select Import again and wait for the import to finish.

---

Handling Notebook Stacks

Evernote's export process is limited to single notebooks, so the default .enex file lacks information about notebook stacks. However, the Importer can recognize patterns in the .enex file name to recreate notebook stacks as folders.

If you have a notebook called NotebookA inside a stack called Stack1, rename the .enex file to Stack1@@@NotebookA before importing. This results in the converted notes being generated within the Stack1/NotebookA folder.

---

Handling Tag Hierarchy

Evernote exports do not preserve tag hierarchy. To keep your tag hierarchy, you can "flatten" tags separated by /.

For example, if you have a parent tag ParentTag and a child tag ChildTag, rename ChildTag to ParentTag/ChildTag in Evernote before exporting. In Obsidian, this will create a nested tag structure.

💡 Tip: Special characters in tags (like &, @, (, ), /, .) can cause migration issues. Consider cleaning up your tags in Evernote first—rename to remove or replace special characters, use hyphens or underscores instead of slashes and periods, and merge similar tags to reduce total count.

---

Template Customization

Use Importer templates to fully configure how your Evernote data is imported. The following variables are available:

Variable Description
{{body}} Markdown body without properties (no frontmatter)
{{content}} Complete Markdown before the selected template is applied
{{ctime}} Source creation time as an ISO 8601 timestamp; empty when unavailable
{{date}} Current date and time when the template is rendered
{{folder}} Final vault-relative parent folder; empty when the note is in the vault root
{{mtime}} Source modification time as an ISO 8601 timestamp; empty when unavailable
{{noteName}} Final resolved note name after removing invalid characters and adding any suffixes for duplicates
{{path}} Final vault-relative path, including the .md extension
{{title}} Original note title before sanitization and deduplication

---

⚠️ Troubleshooting & Known Issues

Duplicate Note Names Differing by Capitalization

If your Evernote notebook has notes with the same name but differing only in capitalization (e.g., My Note, my Note, my note), the Importer may only generate a single note, losing the others. Workaround: Rename the notes in Evernote to have consistent capitalization before exporting. Duplicate names that are otherwise identical are handled correctly with numbers applied to filenames.

Dead Links & Attachments

A common issue after migration is that internal note links point nowhere and attachments become dead links. Recommendation: Compare exact counts before and after migration—total notes, total attachments on disk, and total internal links. If you start with 4,000 notes and get 3,980 out, you need to know this on day one.

Checklist States Lost

Checklists may silently become unchecked during import. Search your raw Markdown for - [ ] and - [x] and compare total numbers before and after migration to verify checklists survived.

Tags Created from Web Clippings

Every # before a word in an Evernote note becomes a tag in Obsidian, which can clutter your tag space. Most of this junk comes from web clippings—consider moving web clips to a separate vault or cleaning them up after import.

---

Method 2: Direct Copy to Vault (Simplest)

If your notes are already in clean Markdown format and you don't need template customization, you can copy the exported files directly into your Obsidian vault folder. Locate your vault via Settings → Files and links, then copy the .md files (and any subfolders) using Finder or File Explorer. Obsidian will recognize them automatically.

---

Method 3: Third-Party Converters (For Large Libraries)

If you have thousands of notes and hit the 50-note .enex limit, several free tools can help:

evernote-exporter (Web App)

A web application that converts .enex files to Obsidian-compatible Markdown with YAML frontmatter and attachment support. It packages everything into a single ZIP for download—extract it into your Obsidian vault.

Notes Migrator

A free tool that accepts .enex exports, converts them to Markdown, and packages the result as a ZIP. Extract and move the Markdown files to your Obsidian directory.

evernote2obsidian (Python Script)

A community Python script that converts Evernote notes to Obsidian format, designed to solve many of the issues with the official Importer and YARLE (Yet Another Rope Ladder from Evernote).

---

Summary

Method Preserves Attachments Preserves Tag Hierarchy Preserves Notebook Stacks Best For
Official Importer (.enex) ✅ Yes ⚠️ Manual (flatten tags) ⚠️ Manual (rename file) Most users, standard migration
Direct Copy to Vault ⚠️ Manual ❌ No ⚠️ Manual Simple, clean Markdown exports
evernote-exporter ✅ Yes ⚠️ Partial ✅ Yes (ZIP organized) Large libraries, batch conversion
evernote2obsidian ✅ Yes ✅ Yes ✅ Yes Advanced users, Python scripting

If you tell me which method you'd like to try or run into any issues during export, I can walk you through it in more detail.

---

TH

ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian รองรับการนำเข้าจาก Evernote โดยตรง ผ่านรูปแบบการส่งออก .enex ของ Evernote โดยแปลงบันทึก สมุดโน้ต แท็ก และไฟล์แนบของคุณเป็นไฟล์ Markdown ที่ใช้งานได้อย่างถาวร

---

วิธีที่ 1: ปลั๊กอิน Importer อย่างเป็นทางการ (แนะนำ)

วิธีนี้เป็นวิธีที่ง่ายและเป็นทางการที่สุดสำหรับการย้ายข้อมูลจาก Evernote ไปยัง Obsidian

ขั้นตอนที่ 1: ส่งออกข้อมูลจาก Evernote

Obsidian ใช้รูปแบบการส่งออกของ Evernote: ไฟล์ .enex วิธีนี้ให้คุณส่งออกสมุดโน้ตทั้งหมดจากไคลเอนต์เดสก์ท็อปของ Evernote

1. เปิด Evernote และไปที่หน้าจอ Notebooks
2. คลิกที่ More actions (•••) ข้างสมุดโน้ตที่คุณต้องการส่งออก
3. เลือก Export Notebook…
4. เลือก ENEX เป็นรูปแบบไฟล์
5. เลือกตำแหน่งสำหรับไฟล์ .enex ที่ส่งออก

⚠️ ข้อจำกัดสำคัญ: Importer สามารถจัดการได้อย่างน่าเชื่อถือเพียง 50 บันทึกต่อไฟล์ .enex เท่านั้น หากมากกว่านั้นอาจเสี่ยงต่อการเสียหายของไฟล์ สำหรับสมุดโน้ตขนาดใหญ่ ให้ส่งออกเป็นชุดเล็ก ๆ หรือใช้ตัวแปลงจากบุคคลที่สาม (ดูวิธีที่ 3)

ขั้นตอนที่ 2: นำเข้า Obsidian

1. เปิด Settings → Community Plugins ติดตั้งและเปิดใช้งาน Importer
2. เปิด Importer ผ่าน command palette หรือไอคอน ribbon
3. ที่ File format เลือก Evernote (.enex)
4. เลือกตำแหน่งไฟล์สำรอง Evernote ของคุณ
5. เลือก Import เพื่อตรวจสอบเทมเพลตและดูตัวอย่างจากบันทึกของคุณ
6. เลือก Import อีกครั้งและรอให้การนำเข้าเสร็จสมบูรณ์

---

การจัดการ Notebook Stacks

กระบวนการส่งออกของ Evernote จำกัดเฉพาะสมุดโน้ตเดียว ดังนั้นไฟล์ .enex เริ่มต้นจึงขาดข้อมูลเกี่ยวกับ notebook stacks อย่างไรก็ตาม Importer สามารถจดจำรูปแบบในชื่อไฟล์ .enex เพื่อสร้าง notebook stacks เป็นโฟลเดอร์ได้

หากคุณมีสมุดโน้ตชื่อ NotebookA ใน stack ชื่อ Stack1 ให้เปลี่ยนชื่อไฟล์ .enex เป็น Stack1@@@NotebookA ก่อนนำเข้า ผลลัพธ์คือบันทึกที่แปลงแล้วจะถูกสร้างในโฟลเดอร์ Stack1/NotebookA

---

การจัดการลำดับชั้นของแท็ก

การส่งออกของ Evernote ไม่รักษาลำดับชั้นของแท็ก หากต้องการรักษาลำดับชั้นของแท็ก คุณสามารถ "flatten" แท็กที่คั่นด้วย / ได้

ตัวอย่างเช่น หากคุณมีแท็กแม่ ParentTag และแท็กย่อย ChildTag ให้เปลี่ยนชื่อ ChildTag เป็น ParentTag/ChildTag ใน Evernote ก่อนส่งออก ใน Obsidian จะสร้างโครงสร้างแท็กแบบซ้อนกัน

💡 เคล็ดลับ: อักขระพิเศษในแท็ก (เช่น &, @, (, ), /, .) อาจทำให้เกิดปัญหาการย้ายข้อมูล ควรทำความสะอาดแท็กใน Evernote ก่อน—เปลี่ยนชื่อเพื่อลบหรือแทนที่อักขระพิเศษ ใช้ยัติภังค์หรือขีดล่างแทนสแลชและจุด และรวมแท็กที่คล้ายกันเพื่อลดจำนวนแท็กรวม

---

การปรับแต่งเทมเพลต

ใช้ Importer templates เพื่อกำหนดค่าวิธีนำเข้าข้อมูล Evernote ของคุณอย่างเต็มที่ ตัวแปรต่อไปนี้พร้อมใช้งาน:

ตัวแปร คำอธิบาย
{{body}} เนื้อหา Markdown โดยไม่มี properties (ไม่มี frontmatter)
{{content}} Markdown ที่สมบูรณ์ก่อนใช้เทมเพลตที่เลือก
{{ctime}} เวลาสร้างต้นทางเป็น ISO 8601 timestamp; ว่างเปล่าเมื่อไม่มีข้อมูล
{{date}} วันที่และเวลาปัจจุบันเมื่อเรนเดอร์เทมเพลต
{{folder}} โฟลเดอร์แม่สุดท้ายที่สัมพันธ์กับ vault; ว่างเปล่าเมื่อบันทึกอยู่ใน vault root
{{mtime}} เวลาแก้ไขต้นทางเป็น ISO 8601 timestamp; ว่างเปล่าเมื่อไม่มีข้อมูล
{{noteName}} ชื่อบันทึกสุดท้ายหลังลบอักขระที่ไม่ถูกต้องและเพิ่มคำต่อท้ายสำหรับรายการซ้ำ
{{path}} พาธสุดท้ายที่สัมพันธ์กับ vault รวมนามสกุล .md
{{title}} ชื่อบันทึกต้นฉบับก่อน sanitization และ deduplication

---

⚠️ การแก้ไขปัญหาและปัญหาที่ทราบ

ชื่อบันทึกซ้ำที่ต่างกันเฉพาะตัวพิมพ์ใหญ่-เล็ก

หากสมุดโน้ต Evernote ของคุณมีบันทึกชื่อเดียวกันแต่ต่างกันเฉพาะตัวพิมพ์ใหญ่-เล็ก (เช่น My Note, my Note, my note) Importer อาจสร้างเพียงบันทึกเดียวและสูญเสียบันทึกอื่น ๆ วิธีแก้: เปลี่ยนชื่อบันทึกใน Evernote ให้ตัวพิมพ์ใหญ่-เล็กสอดคล้องกันก่อนส่งออก ชื่อซ้ำที่เหมือนกันทุกประการจะถูกจัดการอย่างถูกต้องโดยเพิ่มตัวเลขต่อท้ายชื่อไฟล์

ลิงก์เสียและไฟล์แนบ

ปัญหาที่พบบ่อยหลังการย้ายข้อมูลคือลิงก์ภายในชี้ไปที่ไม่มีอะไรและไฟล์แนบกลายเป็นลิงก์เสีย คำแนะนำ: เปรียบเทียบจำนวนที่แน่นอนก่อนและหลังการย้าย—จำนวนบันทึกทั้งหมด จำนวนไฟล์แนบทั้งหมดบนดิสก์ และจำนวนลิงก์ภายในทั้งหมด หากคุณเริ่มต้นด้วย 4,000 บันทึกและได้ 3,980 บันทึก คุณต้องรู้เรื่องนี้ตั้งแต่วันแรก

สถานะ Checklist สูญหาย

Checklists อาจกลายเป็นไม่ถูกเลือกโดยไม่มีการแจ้งเตือนระหว่างการนำเข้า ค้นหา Markdown ดิบของคุณสำหรับ - [ ] และ - [x] และเปรียบเทียบจำนวนรวมก่อนและหลังการย้ายเพื่อตรวจสอบว่า checklists รอดชีวิตหรือไม่

แท็กที่สร้างจาก Web Clippings

ทุก # หน้าคำในบันทึก Evernote จะกลายเป็นแท็กใน Obsidian ซึ่งอาจทำให้พื้นที่แท็กของคุณรก ส่วนใหญ่ขยะนี้มาจาก web clippings—พิจารณาย้าย web clips ไปยัง vault แยกต่างหากหรือทำความสะอาดหลังการนำเข้า

---

วิธีที่ 2: คัดลอกเข้า Vault โดยตรง (ง่ายที่สุด)

หากบันทึกของคุณอยู่ในรูปแบบ Markdown ที่สะอาดแล้วและไม่ต้องการปรับแต่งเทมเพลต คุณสามารถคัดลอกไฟล์ที่ส่งออกเข้าโฟลเดอร์ vault ของ Obsidian ได้โดยตรง ค้นหา vault ของคุณผ่าน Settings → Files and links จากนั้นคัดลอกไฟล์ .md (และโฟลเดอร์ย่อย) โดยใช้ Finder หรือ File Explorer Obsidian จะรู้จักโดยอัตโนมัติ

---

วิธีที่ 3: ตัวแปลงจากบุคคลที่สาม (สำหรับไลบรารีขนาดใหญ่)

หากคุณมีบันทึกหลายพันรายการและติดข้อจำกัด 50 บันทึกต่อ .enex มีเครื่องมือฟรีหลายอย่างที่ช่วยได้:

evernote-exporter (เว็บแอป)

เว็บแอปพลิเคชันที่แปลงไฟล์ .enex เป็น Markdown ที่เข้ากันได้กับ Obsidian พร้อม YAML frontmatter และรองรับไฟล์แนบ บรรจุทุกอย่างเป็น ZIP เดียวสำหรับดาวน์โหลด—แตกไฟล์เข้า vault ของ Obsidian

Notes Migrator

เครื่องมือฟรีที่รับ .enex แปลงเป็น Markdown และบรรจุผลลัพธ์เป็น ZIP แตกไฟล์และย้ายไฟล์ Markdown ไปยังไดเรกทอรี Obsidian ของคุณ

evernote2obsidian (สคริปต์ Python)

สคริปต์ Python จากชุมชนที่แปลงบันทึก Evernote เป็นรูปแบบ Obsidian ออกแบบมาเพื่อแก้ปัญหาหลายอย่างของ Importer อย่างเป็นทางการและ YARLE (Yet Another Rope Ladder from Evernote)

---

สรุป

วิธี รักษาไฟล์แนบ รักษาลำดับชั้นแท็ก รักษา Notebook Stacks เหมาะสำหรับ
Importer อย่างเป็นทางการ (.enex) ✅ ได้ ⚠️ ด้วยตนเอง (flatten tags) ⚠️ ด้วยตนเอง (เปลี่ยนชื่อไฟล์) ผู้ใช้ทั่วไป, การย้ายข้อมูลมาตรฐาน
คัดลอกเข้า Vault โดยตรง ⚠️ ด้วยตนเอง ❌ ไม่ ⚠️ ด้วยตนเอง การส่งออก Markdown ที่สะอาดและง่าย
evernote-exporter ✅ ได้ ⚠️ บางส่วน ✅ ได้ (จัดระเบียบ ZIP) ไลบรารีขนาดใหญ่, การแปลงเป็นชุด
evernote2obsidian ✅ ได้ ✅ ได้ ✅ ได้ ผู้ใช้ขั้นสูง, การเขียนสคริปต์ Python

หากคุณต้องการลองวิธีใดหรือพบปัญหาระหว่างการส่งออก แจ้งได้เลย แล้วจะให้คำแนะนำโดยละเอียดเพิ่มเติมThe official Obsidian Importer plugin supports direct Google Keep import via Google Takeout's .zip export, converting your notes, lists, labels, colors, and attachments into Markdown files with automatically generated frontmatter properties. Here's how to do it, with a focus on adding and customizing properties.

---

Method 1: Official Importer Plugin (Recommended)

Step 1: Export your data from Google Keep

1. Go to Google Takeout and log in.
2. Click Deselect all in the top right corner.
3. Scroll down and select Keep from the list.
4. Scroll to the bottom and click Next step.
5. Click Create export, then download the .zip file once available.

Step 2: Import into Obsidian

1. Open Settings → Community Plugins and install/enable Importer.
2. Open the Importer via the command palette or ribbon icon.
3. Under File format, choose Google Keep (.zip).
4. Select the location of your .zip file.
5. Select Import to review the generated template and preview examples from your notes.
6. Select Import again and wait for the import to finish.

---

Properties: What Gets Created Automatically

By default, the Google Keep importer automatically generates frontmatter properties from Keep metadata. The following mapping is applied:

Google Keep Property Frontmatter Field Transformation
title (multiline) aliases Split on \n, excludes the filename
color tags Keep/Color/{SentenceCase}
isPinned tags Keep/Pinned
isArchived tags Keep/Archived
isTrashed tags Keep/Deleted
labels[].name tags Keep/Label/{name}
attachments tags Keep/Attachment (if present)

Example generated frontmatter:

```yaml
---
aliases:
  - Alternative Title Line 1
  - Alternative Title Line 2
tags:
  - Keep/Color/Blue
  - Keep/Pinned
  - Keep/Label/Important
  - Keep/Label/Work
---
```



Google Keep–Specific Template Variables

In addition to the shared variables ({{body}}, {{content}}, {{ctime}}, {{date}}, {{folder}}, {{mtime}}, {{noteName}}, {{path}}, {{properties}}, {{source}}, {{sourceId}}, {{time}}, {{title}}), Google Keep provides these additional variables you can use in templates:

Variable Description
{{isArchived}} Whether the note is archived
{{isPinned}} Whether the note is pinned
{{isTrashed}} Whether the note is in the trash
{{color}} Google Keep color name
{{labels}} Array of label records
{{sharees}} Array of people the note was shared with
{{annotations}} Array of link annotation records



---

Adding & Customizing Properties with Templates

The Importer uses a template system that lets you fully control how properties are generated. You can edit the template directly in the Importer's preview screen.

How to Edit the Template

1. During import, the Importer shows a preview with up to 10 sample notes.
2. Select Edit above the preview to modify the default template.
3. You can edit the note name, properties (frontmatter at the top), and Markdown content.
4. Select Save to return to the preview. Inline template edits are remembered for future imports of the same format.
5. You can also load a template from a Markdown file in your vault.

Template Syntax

Templates use Knap syntax (the same as Obsidian Web Clipper), with variables in double curly braces and support for filters and logic:

· Variables: {{title}}, {{content}}, {{date}}
· Filters: {{date|date:"YYYY-MM-DD"}}
· Logic: {% if tags %}...{% endif %}

Example Template with Custom Properties

```yaml
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: {{importer}}
keep_color: {{color}}
keep_pinned: {{isPinned}}
keep_archived: {{isArchived}}
labels: {{labels}}
---

# {{title}}

{{body}}
```

This template adds custom properties like created, modified, source, keep_color, keep_pinned, keep_archived, and labels while preserving the note content.

Accessing Source Values

For import formats that support Properties, source values are also available as top-level variables. If a source value has the same name as a shared variable, access it via {{source}} (e.g., {{source.content}}). Use bracket notation for field names with spaces or special characters: {{source["Project: status"]}}.

---

Important Limitations

· Checklists import as top-level items: Google Keep does not export indentation information, so nested checklists will be flattened.
· Reminders and user assignments are not imported: These features are not supported by Obsidian.
· Archived and trashed notes: The importer provides toggles to control whether archived and trashed notes are imported. If disabled, those notes are skipped.

---

Method 2: Community Plugin – KeepSydian (Two-Way Sync)

If you want ongoing two-way sync between Google Keep and Obsidian instead of a one-time migration, the community plugin KeepSydian downloads Google Keep notes into a folder of your choice, preserving checklists and tags. You capture a note in Google Keep, run Sync now in Obsidian, review the plan, and execute.

---

Summary

Method Properties Attachments Ongoing Sync Best For
Official Importer ✅ Auto-generated (tags, aliases, labels) ✅ Yes ❌ No One-time migration with full control via templates
KeepSydian ⚠️ Partial ✅ Yes ✅ Yes Continuous two-way sync

If you tell me which method you'd like to try or run into any issues during import, I can walk you through it in more detail.📥 Logseq Import Guide — Official Importer
 
The official Importer plugin for Obsidian now supports direct import from file-based Logseq graphs (Logseq OG). It reads Logseq Markdown files and converts their unique formatting into Obsidian-compatible files — all of which you can use freely, offline.
 
 
 
📋 Before You Begin
 
- Back up your data: Always back up your Logseq graph and your Obsidian vault.
- Locate your graph root folder: This folder typically contains subfolders such as  pages ,  journals ,  assets , and  logseq .
- Confirm your graph type: Only file-based Logseq graphs are supported. Logseq database graphs are not supported at this time.
 
 
 
🛠️ Import Steps
 
1. Open Settings → Community Plugins, then install and enable the Importer plugin.
2. Open the Importer using the Command Palette or the ribbon icon.
3. Under File Format, select Logseq.
4. Under Select Folder, choose your graph root folder — the folder that contains both  pages  and  journals  — do not select those subfolders individually.
5. Review the detected folders, exclude any items you do not wish to import, then choose your output folder and attachment storage location.
6. Review the import options and preview a sample of the converted notes. Once confirmed, select Import and wait for the process to complete.
 
 
 
🔄 What Gets Converted Automatically
 
The Importer translates these Logseq conventions for you:
 
Logseq Format Becomes in Obsidian 
Page properties ( property:: value ) YAML Frontmatter properties 
Page aliases, tags, and namespaces Obsidian aliases, tags, and links 
Workflow status Checkbox list items (priority and dates preserved as readable text) 
Block IDs, block references, and block embeds Obsidian links and embeds 
Journal filenames and date links Obsidian Daily Note format 
Highlights, ordered lists, Org-mode blocks, and media embeds Obsidian-compatible formatting 
 
 
 
📐 Templates & Properties
 
The Importer includes a templating system that gives you full control over how properties and content are generated during import. You can edit templates directly in the preview screen or load them from external Markdown template files.
 
Common variables (available across all importers):
 {{body}} ,  {{content}} ,  {{title}} ,  {{path}} ,  {{ctime}} ,  {{mtime}} ,  {{date}} ,  {{folder}} ,  {{noteName}} ,  {{properties}} ,  {{source}} ,  {{sourceId}} ,  {{time}} 
 
Templates support Knap syntax (the same used by Obsidian Web Clipper), including filters such as  {{date|date:"YYYY-MM-DD"}}  and conditionals like  {% if tags %}...{% endif %} .
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: logseq
---
# {{title}}
{{body}}
 
 
 
 
⚙️ Import Settings
 
Journal Handling
 
- Enabled by default: Journals will be placed according to your Daily Notes core plugin settings — this may place them outside your selected output folder.
- Disable this option to keep all journals inside your output folder under a  Journals/  subfolder, named in  YYYY-MM-DD  format.
 
Flatten Outline
 
- Logseq uses nested bullets for page structure. By default, this structure is preserved.
- Enable Flatten Outline to convert nested blocks into a mix of paragraphs, headings, and standard lists. Conversion is heuristic — always preview a few samples before importing a large graph.
 
Preserving Incompatible Data
 
Logseq queries, flashcards, and time-tracking entries have no direct equivalent in Obsidian. Choose what to keep:
 
- ✅ Preserve queries: Retained as fenced code blocks or inline code
- ✅ Preserve flashcards: The  #card  tag and cloze deletions are kept as plain text
- ✅ Preserve time tracking:  LOGBOOK  and  CLOCK  entries are kept as plain text
 
 
 
⚠️ Known Limitations
 
- ❌ Whiteboards are not imported.
- ❌ Dynamic Logseq template macros are preserved as plain text only.
- ❌ Flashcard scheduling, PDF annotations, and other app-specific data are not migrated.
- ⚠️ Block references appear as UUIDs in Obsidian and may be difficult to read.
- ⚠️ Page properties: Logseq uses  property:: value ; Obsidian uses YAML — conversion is automatic, but some multi-value properties may need manual adjustment.
- ⚠️ Namespaces: Logseq uses flat directories with  ___  separators in filenames; Obsidian uses nested directories — you may wish to reorganize these after import.
 
 
 
🔁 Alternative Approaches
 
1. Drag and Drop (Simplest)
 
For just a few files, simply drag your  .md  files directly into the Obsidian file explorer. No plugin needed.
 
2. Community Python Scripts
 
- Logseq-to-Obsidian (EllisMorrow): A production-grade Python script that intelligently converts block references ( ((uuid))  →  [[Page#^block]] ), handles property conversion, PDF annotations, and special character cleanup.
- logseq2obsidian (PyPI): Install via  pip install logseq2obsidian  for command-line conversion.
- logseq_to_obsidian (sercxanto): Another community-maintained CLI converter.
 
3. Roam JSON Intermediate
 
Export your Logseq graph to Roam JSON format first, then import that file using Obsidian's built-in Roam importer.
 
 
 
📊 Comparison Summary
 
Method Preserves Block References Preserves Properties Preserves Attachments Best For 
Official Importer ⚠️ Converted to UUIDs ✅ Auto → YAML ✅ Yes Most users, standard migration 
Drag & Drop ❌ No ❌ Manual ⚠️ Manual Small number of files 
Python Scripts ✅ Smart conversion ✅ Auto → YAML ✅ Yes Advanced users, block-link preservation 
 
💡 Tip: If you share details about your graph size or what matters most to you — such as block references or namespace reorganization — I can provide a more specific recommendation. 😊📥 Importing from Microsoft OneNote — Obsidian Importer Guide
 
The official Importer plugin for Obsidian supports importing notes from Microsoft OneNote, converting your notebooks and pages into durable Markdown files. It offers two import modes to suit different needs.
 
 
 
📋 Import Methods — Two Modes Available
 
1. Import from Microsoft Account (Requires Internet)
 
This method signs you into your Microsoft account and imports notebooks synced directly to OneDrive. An internet connection is required.
 
1. In the Importer, under File Format, select Microsoft OneNote.
2. Click Sign in and log into your Microsoft account in your browser.
3. Grant Obsidian permission to access your OneNote notebooks.
4. Back in Obsidian, check the Sections you want to import, then click Import to finish.
 
⚠️ Note: This mode only works with notebooks you own. Notebooks shared by others cannot be imported. Work or school accounts may require admin approval.
 
 
 
2. Import from Exported File (Works Offline)
 
Use this method with  .onepkg  or  .one  files exported from OneNote. No account or internet connection required — works even with notebooks that were never synced online.
 
1. In OneNote, export your notebook as a  .onepkg  or  .one  file.
2. In the Importer, select Microsoft OneNote as the file format, then choose your exported file.
 
 
 
📐 Templates & Properties
 
The Importer features a templating system that gives you full control over how properties and content are structured during import. You can edit templates directly in the preview panel or load them from external Markdown template files.
 
Common variables (shared across all importers):
 {{body}} ,  {{content}} ,  {{title}} ,  {{path}} ,  {{ctime}} ,  {{mtime}} ,  {{date}} ,  {{folder}} ,  {{noteName}} ,  {{properties}} ,  {{source}} ,  {{sourceId}} ,  {{time}} 
 
The OneNote importer automatically converts tags into YAML frontmatter, and attachments are saved in a dedicated folder within your vault. Templates support Knap syntax (identical to Obsidian Web Clipper), including filters like  {{date|date:"YYYY-MM-DD"}}  and conditionals like  {% if tags %}...{% endif %} .
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: onenote
---
# {{title}}
{{body}}
 
 
 
 
⚠️ Known Limitations & Notes
 
- ✍️ Handwritten content: Handwritten notes and text labels cannot be preserved verbatim. Recent versions attempt to convert drawings to SVG vectors, but handwritten text recognition is lost.
- 🔒 Password-protected sections: These are skipped during import — unlock them in OneNote first.
- 🔁 Shared notebooks: Notebooks shared with you by others are not supported.
- 📂 Page organization: Known issue — early versions sometimes placed only the first page of each section in the correct folder, with remaining pages at the vault root. Fixed in v2.2.0.
- ⏭️ Import skipping: The Importer may skip items it believes were already imported. If this happens, disable "Incremental import" or clear the cache at  .obsidian/plugins/obsidian-importer .
- 🐌 Performance: Importing very large notebooks may be slower.
 
 
 
🔁 Alternative Tools
 
If the official plugin doesn't meet your needs, consider these alternatives:
 
Tool Description 
OneNote MD Exporter Free Windows command-line tool that converts OneNote notebooks to Markdown. Great workaround if you encounter plugin errors. 
OneNoteExporter Community tool on GitHub that exports to formats including Obsidian and Logseq. 
On2Od Plugin Open-source Obsidian plugin designed to preserve OneNote's free-form canvas layout, including ink annotations. 
Univik ONE Converter Standalone converter for  .one  and  .onepkg  files — useful when the official plugin can't access your notebooks. 
 
 
 
📊 Comparison Summary
 
Method Preserves Handwriting Preserves Attachments Internet/Account Needed Best For 
Official Importer — Account Mode ⚠️ Converted to SVG ✅ Yes ✅ Yes Personal notebooks synced to OneDrive 
Official Importer — File Mode ⚠️ Converted to SVG ✅ Yes ❌ No Offline notebooks or content never synced 
OneNote MD Exporter ❌ No ✅ Yes ❌ No Plugin errors / Windows users 
On2Od Plugin ✅ Preserves ink ✅ Yes ❌ No Preserving handwritten canvas layout 
 
💡 Tip: If you share details about your notebook size or what matters most — such as preserving handwriting or handling attachments — I can give you a more specific recommendation. 😊📥 Importing from Notion — Obsidian Importer Guide
 
The official Importer plugin for Obsidian supports importing from Notion, offering two modes to suit different migration needs:
 
 
 
📋 Two Import Modes
 
Mode 1: Notion API Import (Recommended)
 
This method connects directly to your Notion workspace, preserves database structures and converts them into Obsidian  .base  files. Formulas are also converted automatically. Requires a Notion API token and internet connection.
 
Step 1: Create a Notion API Access Token
 
1. Log into the Notion Connections dashboard.
2. Select New connection and give it a name (e.g., "Personal").
3. For authentication, select Access token.
4. Under Installable in, choose the workspace you want to export from, then click Create connection.
5. On the Configuration tab, under Access token, click Show and copy your token (typically starts with  ntn_ ).
6. Important: On the Content access tab of your connection, add the pages and databases you wish to import.
 
Step 2: Import in Obsidian
 
1. Open the Importer and select Notion (API) as the File Format.
2. Under API token, click Link…, enter  notion  as the ID, and paste your token into the Secret field.
3. Click Load to fetch your list of pages and databases, then select what you want to import.
4. Click Import, review the template preview, and confirm to begin.
 
 
 
Mode 2: File Import (.zip)
 
This method requires no API token or internet connection. Use a  .zip  file exported from Notion. Note: database structure and formula conversion are not supported in this mode.
 
Step 1: Export from Notion
 
1. In Notion, click your name in the top-left → Settings → Workspace → Export all workspace content.
2. For Export format, choose HTML.
3. Under Include databases, select Current view.
4. Under Include content, select Everything.
5. Enable Create folders for subpages.
6. Download the resulting  .zip  file.
 
Step 2: Import in Obsidian
 
1. Open the Importer and select Notion (.zip) as the File Format.
2. Select your exported  .zip  file, then click Import to complete the process.
 
 
 
🔄 Automatic Property Mapping
 
The Importer automatically converts Notion properties into YAML frontmatter:
 
Notion Property Type YAML Type Example 
 checkbox   boolean   true ,  false  
 date ,  created_time ,  last_edited_time   string   "2023-01-15"  
 file ,  multi_select ,  relation   string[]   ["item1", "item2"]  
 number ,  auto_increment_id   number   42 ,  3.14  
 text ,  email ,  url ,  select ,  person , etc.  string   "value"  
 
 
 
📐 Templates & Custom Properties
 
The Importer uses a templating system — edit templates directly in the preview screen or load them from Markdown files in your vault. Templates support Knap syntax (same as Obsidian Web Clipper), with filters like  {{date|date:"YYYY-MM-DD"}}  and conditionals like  {% if tags %}...{% endif %} .
 
Common variables:
 {{body}} ,  {{content}} ,  {{title}} ,  {{path}} ,  {{ctime}} ,  {{mtime}} ,  {{date}} ,  {{folder}} ,  {{noteName}} ,  {{properties}} ,  {{source}} ,  {{sourceId}} ,  {{importer}} 
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: notion
---
# {{title}}
{{body}}
 
 
 
 
⚠️ Known Limitations
 
- ⏱️ API rate limits: Importing large workspaces may take significant time — please be patient.
- 📊 Main view only: Only the primary view of each database is imported; other views (board, calendar, timeline, etc.) are not preserved.
- 🔗 Linked data sources: Notion connected databases and relations are not migrated.
- 📁 Path length (macOS): Maximum path length on macOS is ~256 characters. Deeply nested pages may fail — you may need to reorganize manually.
- 📎 Attachment folder: With API import, attachments may not always go into your configured attachments folder.
- 📄 HTML export mode: No database structure — all databases become CSV files or scattered Markdown.
 
 
 
🔁 Alternative Tools
 
Tool Description 
notion-bases Local tool — no API token needed. Converts Notion exports into a clean Obsidian vault including wikilinks, YAML frontmatter, attachments folder, and proper  .base  database files. 
notion2obsidian High-performance CLI tool. Requires Bun. Converts Notion exports into Obsidian-compatible Markdown in bulk. 
n2o (Notion to Obsidian Migrator) Gives you full control over what gets imported. Requires creating a Notion integration for an API token. 
 
 
 
📊 Comparison Summary
 
Method Preserves Databases Preserves Formulas Requires API Token Best For 
Official Importer — API Mode ✅ Converts to  .base  ✅ Yes ✅ Yes Full workspace migration — recommended 
Official Importer — .zip Mode ❌ CSV only ❌ No ❌ No Simple page exports, quick offline import 
notion-bases ✅  .base  files ⚠️ Partial ❌ No Local processing, privacy-focused 
notion2obsidian ⚠️ Partial ❌ No ❌ No Bulk processing, CLI users 
 
💡 Tip: If you share details about your workspace size or what matters most — such as preserving databases or formula conversion — I can give you a more specific recommendation. 😊📥 Importing from Roam Research — Obsidian Importer Guide
 
The official Importer plugin for Obsidian supports importing notes from Roam Research using its JSON export format, converting your Roam graph into durable Markdown files ready for offline use.
 
 
 
📋 Step 1: Export from Roam Research
 
1. In Roam Research, click More actions (•••) in the top-right corner.
2. Select Export All.
3. For Export Format, choose JSON.
4. Click Export All to download your archive.
 
 
 
🛠️ Step 2: Import into Obsidian
 
1. Go to Settings → Community Plugins, then install and enable the Importer plugin.
2. Open the Importer using the Command Palette or ribbon icon.
3. Under File Format, select Roam Research (.json).
4. Select your exported  .json  file.
5. Under Output Folder, choose where to save your imported files (leave empty for vault root).
6. Enable Download all attachments to preserve your uploaded files.
7. Click Import and wait for the process to complete.
 
 
 
🔄 Automatic Syntax Conversion
 
Roam Research Syntax Obsidian Equivalent 
 #tag  or  #[[tag]]   [[tag]]  (Wikilink) 
 ^^highlight^^   ==highlight==  
 {{[[TODO]]}}   [ ]  (checkbox) 
 
 
 
📐 Templates & Properties
 
The Importer uses a templating system — edit templates directly in the preview screen or load them from Markdown files in your vault.
 
Common variables:
 {{body}} ,  {{content}} ,  {{title}} ,  {{path}} ,  {{ctime}} ,  {{mtime}} ,  {{date}} ,  {{folder}} ,  {{noteName}} ,  {{properties}} ,  {{source}} ,  {{sourceId}} ,  {{time}} 
 
Templates support Knap syntax (same as Obsidian Web Clipper), including filters like  {{date|date:"YYYY-MM-DD"}}  and conditionals like  {% if tags %}...{% endif %} .
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: roam
---
# {{title}}
{{body}}
 
 
 
 
⚠️ Known Limitations
 
- 🔗 Block references not preserved: Roam's  ((UID))  block references have no direct equivalent in Obsidian. Markdown exports lose block links entirely; JSON imports convert them to raw UUIDs that are hard to read.
- 🔤 Case sensitivity conflicts: Roam allows pages named  Python  and  python  to coexist, but Obsidian's filesystem is case-insensitive — pages may merge or overwrite. Standardize capitalization in Roam before exporting.
- ⚠️ Special characters: Slashes  /  and colons  :  in Roam page titles are invalid in filenames and may cause import failures.
- 📎 Attachments: Always enable Download all attachments — otherwise, files uploaded to Roam won't be retrieved.
- 📱 Cross-platform: Works on both desktop and mobile Obsidian.
 
 
 
🔁 Alternative Tools
 
Tool Description 
rj2obs Python script that inserts  ^block-id  anchors and converts  ((uid))  →  [[Note#^block-id]]  links, preserving block references. 
Roam2Obsidian Replaces block references and embeds with their actual content plus proper Obsidian block links. Run the output through the official Markdown importer afterward. 
outl Local-first outliner that parses  ((uid))  and  {{embed}}  into real block references, preserves fold state, and supports:  outl import roam backup.json my-notes/  
obsidian-migration-deep-dive Full migration toolkit — handles attachment relocation, wikilink conversion, tag migration, and frontmatter generation. 
 
 
 
📊 Comparison Summary
 
Method Preserves Block Refs Preserves Attachments Preserves Tags Best For 
Official Importer (JSON) ❌ Converted to UUIDs ✅ Yes ✅ Yes Most users, straightforward migration 
rj2obs ✅ Inserts readable anchors ✅ Yes ✅ Yes Power users needing block-link retention 
Roam2Obsidian ✅ Content + block links ✅ Yes ✅ Yes Dense graphs with heavy block usage 
outl ✅ Resolves  ((uid))  natively ✅ Yes ✅ Yes Local-first workflow preference 
 
💡 Tip: If you share details about your graph size or what matters most — such as preserving block references or handling case conflicts — I can give you a more specific recommendation. 😊📥 Importing from Textbundle — Obsidian Importer Guide
 
The official Importer plugin supports importing Textbundle files — ideal for migrating notes from apps like Ulysses, Craft, Taio, and others that use this format. Textbundle packages your Markdown content and referenced images together, making migration seamless.
 
 
 
📋 Step 1: Import Your Textbundle Files
 
1. Open Settings → Community Plugins, then install and enable the Importer plugin.
2. Open the Importer using the Command Palette or ribbon icon.
3. Under File Format, select Textbundle (.textbundle, .textpack).
4. Select your Textbundle, Textpack, or  .zip  archive.
5. Click Import to preview the generated template and sample note.
6. Click Import again and wait for completion.
 
⚠️ Important Limitation: Direct  .textbundle  import works one file at a time and only on Mac. For multiple files or other platforms: compress all your  .textbundle  files into a single  .zip  archive, then import that zip file on any device.
 
 
 
🎨 Step 2: Customize Your Imported Notes
 
Before importing begins, you'll see a preview. You can edit the template directly or select a Markdown template from your vault.
 
Available Template Variables
 
Variable Description 
 {{body}}  Markdown content without frontmatter 
 {{content}}  Full Markdown before template is applied 
 {{ctime}}  Source creation timestamp (ISO 8601), empty if unavailable 
 {{date}}  Current date/time at import (ISO 8601) 
 {{importer}}  Importer ID — e.g.,  textbundle  
 {{folder}}  Relative parent folder in vault; empty if at root 
 {{mtime}}  Source modification timestamp (ISO 8601), empty if unavailable 
 {{noteName}}  Final note filename (invalid chars removed, duplicates numbered) 
 {{path}}  Full relative path including  .md  extension 
 {{properties}}  Object containing frontmatter properties 
 {{source}}  Object with source-specific metadata 
 {{sourceId}}  Stable source identifier, empty if not provided 
 {{time}}  Alias for  {{date}}  
 {{title}}  Original note title before sanitization 
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: textbundle
---
# {{title}}
{{body}}
 
 
 
 
📎 How Attachments Are Handled
 
Textbundle files include an  assets/  folder containing embedded images, PDFs, and other media. During import:
 
- ✅ All files in  assets/  are copied to your vault's attachments folder
- ✅ Relative links in your Markdown are updated to point to the new locations
 
Change where attachments are saved:
Go to Settings → Files & Links → Default location for new attachments. Options:
 
- Vault folder: attachments go to your vault root
- In subfolder next to current file: attachments live alongside your notes in a dedicated subfolder
 
 
 
⚠️ Known Issues & Troubleshooting
 
Duplicate Titles
 
When importing from Bear, the first line of your note is used as the filename but also appears at the top of your content — resulting in the title appearing twice. This is a known issue; the community expects the Importer to eventually strip the first line from content.
 
Images Not Showing
 
If images show "Click to create" instead of appearing inline:
 
- The images may not have been properly included in the original Textbundle export
- Try re-exporting from your source app
- If the problem persists, consider using Jimmy (see below) as an alternative
 
 
 
🔁 Alternative Approaches
 
Tool Description 
Jimmy Free, open-source converter for Textbundle/Textpack → Markdown. Handles batch processing. 
Alchemist Community plugin — supports both importing and exporting Textbundle files, preserving images, audio, and links. 
Manual Method Rename  .textbundle  →  .zip , extract it, rename  .markdown  →  .md , then copy the folder and  assets/  contents into your vault. Fully manual but completely under your control. 
 
 
 
📊 Comparison Summary
 
Method Preserves Attachments Batch Import Platform Best For 
Official Importer ✅ Yes ⚠️ One at a time; use .zip for batch Mac native; zip works everywhere Standard single-file migration 
Jimmy ✅ Yes ✅ Yes Cross-platform Bulk processing, import failures 
Alchemist Plugin ✅ Yes ✅ Yes Cross-platform Round-trip: import + export 
Manual Extraction ✅ Yes ⚠️ Manual Cross-platform Small batches, full control 
 
💡 Tip: If you tell me which app you're migrating from or describe the specific issue you're seeing, I can recommend the best approach for your situation. 😊📥 Importing from Tomboy & Gnote — Obsidian Importer Guide
 
The official Importer plugin for Obsidian supports importing notes from Tomboy and Gnote. It reads their  .note  XML files directly and converts them to Markdown.
 
 
 
📋 Step 1: Locate Your Note Files
 
Tomboy and Gnote store notes in these default locations:
 
Platform Default Path 
macOS  ~/Library/Application Support/Tomboy  
Windows  %APPDATA%\Tomboy  
Linux  ~/.local/share/tomboy  or  ~/.local/share/gnote  
 
💡 Paths may differ if you moved your data folder or use a different version.
 
 
 
🛠️ Step 2: Import into Obsidian
 
1. Open Settings → Community Plugins, install and enable the Importer plugin.
2. Open the Importer via the Command Palette or ribbon icon.
3. Under File Format, select Tomboy/Gnote (.note).
4. Select a single  .note  file or an entire folder containing your notes.
5. Review the import options, generated template, and preview.
6. Click Import and wait for completion.
 
 
 
🔄 Automatic Format Conversion
 
Tomboy/Gnote XML Obsidian Markdown 
 <bold>text</bold>   **text**  
 <italic>text</italic>   *text*  
 <strikethrough>text</strikethrough>   ~~text~~  
 <list>  /  <list-item>  Bulleted list ( - item ) 
 <link:internal>   [[wikilink]]  
 <size:huge>  Heading conversion 
 
TODO List Conversion
 
When a note title contains the word "TODO" (enable in settings):
 
- Lists become checkbox tasks:  - [ ] 
- Struck-through items become completed:  - [x] 
- Nested lists are processed recursively
 
 
 
📐 Title Preservation Modes
 
Mode Behavior 
automatic Title included in content only when special characters were stripped from the filename 
yes Title always appears as a top-level heading in your note 
no Title appears only in the filename, not in the content 
 
💡 Why? Obsidian removes characters like  # ,  : , and  /  from filenames.  automatic  mode preserves the original title in your content only when information would otherwise be lost.
 
 
 
📝 Templates & Properties
 
Edit templates directly in the preview or load external Markdown templates from your vault.
 
Common variables:
 {{body}} ,  {{content}} ,  {{title}} ,  {{path}} ,  {{ctime}} ,  {{mtime}} ,  {{date}} ,  {{folder}} ,  {{noteName}} ,  {{properties}} ,  {{source}} ,  {{sourceId}} ,  {{importer}} ,  {{time}} 
 
Templates support Knap syntax with filters like  {{date|date:"YYYY-MM-DD"}}  and conditionals like  {% if tags %}...{% endif %} .
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: tomboy
---
# {{title}}
{{body}}
 
 
 
 
⚠️ Known Limitations
 
- 📎 No attachments: The  .note  format does not support embedded images or files — attachments cannot be migrated.
- 📄 .note files only: Only XML-based  .note  files are supported. Other export formats (e.g., HTML) require a different import method.
- 🌐 Cross-platform: Works on both desktop and mobile — no platform restrictions.
 
 
 
🔁 Alternative Methods
 
Method Description 
Trombone Legacy converter for very old Tomboy formats. Requires Python 2 → converts notes to ENEX → then import via Evernote importer. 
Jimmy Open-source tool that converts Tomboy-ng / Gnote notes to clean Markdown, compatible with Obsidian and Joplin. 
HTML Intermediate (Gnote) Gnote can export notes to HTML via a plugin. Use Obsidian's built-in HTML importer — good for preserving images. 
 
 
 
📊 Comparison Summary
 
Method Preserves Attachments Preserves Internal Links Preserves Tags Best For 
Official Importer ❌ No ✅ Yes ✅ Yes Most users — straightforward migration 
Trombone ❌ No ⚠️ Partial ⚠️ Partial Very old legacy Tomboy formats 
Jimmy ❌ No ✅ Yes ✅ Yes Batch processing or when official import fails 
HTML Intermediate ✅ Yes ⚠️ Manual ⚠️ Manual Gnote users needing image preservation 
 
💡 Tip: If you share details about your notes — such as heavy use of internal links or tags — or any specific errors you encounter, I can give you a more tailored recommendation. 😊📥 Importing from CSV — Obsidian Importer Guide
 
The official Importer plugin supports importing data from CSV files, converting each row into a note with complete YAML Frontmatter properties. You have full control over how aliases, tags, and custom fields are generated using a flexible template system.
 
 
 
📋 Step 1: Import Your CSV File
 
1. Open Settings → Community Plugins, install and enable the Importer plugin.
2. Open the Importer via the Command Palette or ribbon icon.
3. Under File Format, select CSV (.csv).
4. Select your CSV file.
5. Click Import to proceed to field configuration.
6. Configure your mappings, then click Continue to preview the template and sample notes.
7. Click Import once more and wait for the process to finish.
 
✅ After import: One Markdown note is created per row, plus a .base file that displays all your data in a table view within Obsidian Bases.
 
💡 Encoding Tip: If your CSV was saved from Excel, re-save it with UTF-8 encoding in a text editor first — otherwise non-ASCII characters may appear garbled.
 
 
 
🗺️ Step 2: Configure Field Mapping
 
The Importer automatically generates a template from your CSV headers, using the first column as the note title and creating one property per remaining column. Reference columns by their header name:
 
plaintext
  
{{source["Column Name"]}}
 
 
⚠️ Use bracket notation for column names containing spaces or special characters:
 
plaintext
  
{{source["Project Name"]}}
{{source["Price ($)"] | yaml}}
 
 
 
 
📐 Step 3: Template Variables & Customization
 
Edit templates directly in the preview or load them from your vault. Templates support Knap syntax — same as Obsidian Web Clipper — with filters and conditionals.
 
Common Template Variables
 
Variable Description 
 {{body}}  Markdown content without frontmatter 
 {{content}}  Full Markdown before template application 
 {{ctime}}  Source creation timestamp (ISO 8601) 
 {{date}}  Current date/time at import 
 {{importer}}  Importer ID — e.g.,  csv  
 {{folder}}  Target parent folder in vault 
 {{mtime}}  Source modification timestamp (ISO 8601) 
 {{noteName}}  Final note filename 
 {{path}}  Full relative path including  .md  
 {{properties}}  Object of all frontmatter properties 
 {{source}}  Object containing all row values 
 {{sourceId}}  Unique row identifier 
 {{time}}  Alias for  {{date}}  
 {{title}}  Original value from the title column 
 
 
 
📝 Generating Aliases
 
yaml
  
aliases:
  - {{source["Alternative Name"]}}
 
 
The Importer automatically formats this as a proper YAML list.
 
🏷️ Generating Tags
 
yaml
  
tags:
  - {{source["Category"]}}
  - imported/csv
 
 
⚠️ Multiple tags in one cell: Enclose the entire cell in quotes so commas inside don't split the row:  "tag1, tag2, tag3" 
 
⚙️ Custom Properties
 
Map any column directly to a frontmatter field:
 
yaml
  
priority: {{source["Priority"]}}
status: {{source["Status"]}}
due: {{source["Due Date"] | date:"YYYY-MM-DD"}}
 
 
 
 
📄 Full Example Template
 
Scenario: Project management CSV with columns:  Project Name ,  Alias ,  Tags ,  Priority ,  Status ,  Description ,  Due Date 
 
yaml
  
---
aliases:
  - {{source["Alias"]}}
tags:
  - {{source["Tags"]}}
  - imported/csv
priority: {{source["Priority"]}}
status: {{source["Status"]}}
due: {{source["Due Date"] | date:"YYYY-MM-DD"}}
source: csv-import
---

# {{title}}

{{source["Description"]}}
 
 
Sample Output:
 
yaml
  
---
aliases:
  - Web Redesign
tags:
  - 前端, 设计
  - imported/csv
priority: 高
status: 进行中
due: 2026-06-15
source: csv-import
---

# 网站重构

重新设计公司官网
 
 
 
 
⚠️ Important Notes
 
- 📌 Commas in cells: Always wrap multi-value fields in double quotes —  "tag1, tag2"  — so commas inside values aren't misread as column delimiters.
- 📊 Auto-generated Base: A  .base  file is created automatically — view all your imported data as a sortable, filterable table in Obsidian Bases.
- 📱 Cross-platform: Works on both desktop and mobile.
- ⭯ Empty values: Missing cells produce empty properties. Use conditionals like  {% if source["Notes"] %}  to skip empty fields.
 
💡 Tip: Share your CSV headers/structure with me, and I'll write a complete, ready-to-use template just for your data. 😊📥 Importing HTML — Obsidian Importer Guide
 
The official Importer plugin supports importing HTML files, converting individual files or entire folders into Markdown notes while preserving images, links, and other assets.
 
 
 
📋 Step 1: Import Your HTML Files
 
1. Open Settings → Community Plugins, install and enable the Importer plugin.
2. Open the Importer via the Command Palette or ribbon icon.
3. Under File Format, select HTML (.html).
4. Select your HTML file or an entire folder. You can also drag and drop a ZIP archive for batch import.
5. Click Import to preview the template and sample notes.
6. Click Import again and wait for completion.
 
 
 
⚙️ Import Settings
 
Option Description 
Attachment size limit Skip files larger than the specified size 
Minimum image dimensions Skip images smaller than the given size — useful for filtering out icons and logos 
 
 
 
📐 Templates & Customization
 
Edit templates directly in the preview or load Markdown templates from your vault. Templates support Knap syntax with filters and conditionals.
 
Common Template Variables
 
Variable Description 
 {{body}}  Markdown content without frontmatter 
 {{content}}  Full Markdown before template application 
 {{ctime}}  Source creation timestamp (ISO 8601) 
 {{date}}  Current date/time at import 
 {{importer}}  Importer ID —  html  
 {{folder}}  Target parent folder in vault 
 {{mtime}}  Source modification timestamp (ISO 8601) 
 {{noteName}}  Final note filename 
 {{path}}  Full relative path including  .md  
 {{properties}}  Object of all frontmatter properties 
 {{source}}  Object containing source metadata 
 {{sourceId}}  Unique source identifier 
 {{time}}  Alias for  {{date}}  
 {{title}}  Extracted page title 
 
Example template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: html-import
---
# {{title}}
{{body}}
 
 
 
 
🔄 Automatic Conversion & Asset Handling
 
- ✅ HTML tags → Markdown: Headings, bold, italic, lists, links, and tables are converted automatically
- ✅ Images & media: Local images, remote images, audio, and video are downloaded and embedded
- ✅ Internal links: Links between imported HTML files are converted to Obsidian wikilinks
- ✅ URL encoding: Spaces in filenames become  %20  for compatibility
 
 
 
⚠️ Known Limitations
 
- 📁 No folder structure: All files go into a single output folder by default — original hierarchy is not preserved
- 🧩 Non-standard HTML: Custom metadata or proprietary markup may not parse correctly
- 🐌 Performance: Importing hundreds of files may be slow
- 🌏 Unicode filenames: Non-ASCII characters (e.g., Korean) may cause import to hang due to Unicode normalization differences
 
 
 
🔁 Alternative Tools
 
Tool Description 
Jimmy Open-source converter — HTML → Markdown in batches. Preserves folder structure. Also supports DOCX, ODT, EPUB. 
Pandoc Powerful CLI converter. Batch command:  for f in *.html; do pandoc -f html -t markdown --wrap=none -o "${f%.html}.md" "$f"; done  Add  -t markdown-fenced_divs  to avoid unsupported syntax. 
obsidian-html-to-md-effect Community plugin — convert HTML files directly inside Obsidian, no external tools needed. 
 
 
 
📊 Comparison Summary
 
Method Preserves Folder Structure Preserves Attachments Platform Best For 
Official Importer ❌ No ✅ Yes Cross-platform Quick imports, single files 
Jimmy ✅ Yes ✅ Yes Cross-platform Batch processing, keep folder hierarchy 
Pandoc ⚠️ Script required ⚠️ Partial Cross-platform Automation, advanced conversion 
obsidian-html-to-md-effect ❌ No ✅ Yes Cross-platform Single files, quick in-app conversion 
 
💡 Tip: If you tell me where your HTML files come from (e.g., Notion export, saved web pages) and how many you have, I can recommend the best tool for your situation. 😊📋 Real-World Use Cases — Obsidian Importer
 
Here are practical examples of when to use each import mode:
 
 
 
🧳 1. Personal Knowledge Migration
 
Scenario Recommended Importer Why 
Moving from Notion → Obsidian Notion API Import Preserves databases as  .base  files, properties convert to YAML automatically 
Moving from Roam Research → Obsidian Roam JSON Import Converts  ((block refs))  and  {{[[TODO]]}}  checkboxes; use  rj2obs  if you need block links 
Moving from OneNote → Obsidian OneDrive Account Import Pulls all notebooks directly; use  .onepkg  export for offline/school accounts 
Moving from Logseq → Obsidian Logseq Import Converts  property:: value  to YAML frontmatter; preserves journal pages 
 
 
 
📊 2. Bulk Data & Workflow Integration
 
Scenario Recommended Importer Example 
Project tracker from Excel → Obsidian CSV Import Export tasks.csv → each row becomes a note with  status ,  due ,  assignee  in frontmatter 
Meeting minutes from HTML export HTML Import Save meeting pages as HTML → import; images and links preserved 
Research articles saved as HTML HTML Import Batch-archive web pages; set min image size to skip logos 
Inventory / Asset list from spreadsheet CSV Import Generate 50+ asset notes instantly with tags and categories 
 
 
 
🏢 3. Team & Organization
 
Scenario Recommended Importer Pro Tip 
Shared database in Notion → team vault Notion API Import Sync periodically; filter which databases get imported 
Legacy notes from Tomboy/Gnote Tomboy/Gnote Import Simple, direct conversion; use  Jimmy  if you need batch processing 
Ulysses / Craft / Taio writing projects Textbundle Import Bundle + zip multiple files → import on any platform 
HR / Employee directory from HR system CSV Import Auto-generate profile pages; template with  {{source["Name"]}}  and  {{source["Dept"]}}  
 
 
 
🔁 4. Daily / Recurring Workflows
 
Use Case How It Works 
📅 Weekly report import Export tasks from your project management tool → save as CSV → run import → all notes updated with latest status 
📝 Blog backup Export blog posts as HTML → batch import → archive in Obsidian; images and links preserved 
📈 Research log Export survey/data as CSV → import → each respondent becomes a note → use Dataview to analyze 
📚 Book library CSV with Title, Author, ISBN, Status → import → generate reading list dashboard automatically 
 
 
 
💡 Quick Decision Cheat Sheet
 
What You Have What You Need Go With 
Notion workspace Databases + pages intact Notion API ✅ 
Roam graph Block references + daily pages Roam JSON +  rj2obs  
OneNote notebooks Sections + images OneDrive / .onepkg 
Logseq graph Properties + journals Logseq Import 
Excel/Google Sheets Individual notes per row CSV Import ⭐ 
Saved web pages / docs Clean Markdown HTML Import or Jimmy 
Ulysses/Craft/Taio notes Images + text together Textbundle + zip 
Old Tomboy/Gnote notes Simple text conversion Tomboy/Gnote Import 
 
Want me to write a custom template or step-by-step workflow for your specific import scenario? Just tell me what you're starting with! 😊📥 Importing Markdown — Obsidian Importer Guide
 
The official Importer plugin offers powerful, flexible support for importing Markdown files. It handles individual files, entire folders, and ZIP archives — intelligently preserving your folder structure, attachments, and internal links — while letting you standardize everything with a template system.
 
 
 
🚀 Quick Start: Import Markdown Files
 
1. Install & enable: Go to Settings → Community Plugins, search for and install Importer.
2. Open Importer: Run "Importer: Open importer" from the Command Palette ( Ctrl/Cmd+P ), or click the import icon in the left sidebar.
3. Choose format: Under File Format, select Markdown (.md, .zip).
4. Select files: Pick individual  .md  files, an entire folder, or a  .zip  archive containing your Markdown files.
5. Preview & import: Review the structure, properties, and content in the preview pane. When ready, click Import to begin.
 
 
 
⚙️ Core Features & Settings
 
Feature What It Does 
Preserve folder structure Maintains your original directory hierarchy exactly — including all subfolders 
Attachments & special files Images and media referenced in your notes are copied over;  .base  and  .canvas  files are recognized and preserved 
Selective import Use the folder tree to pick exactly which folders or files to import — no need to import everything 
Standardize formatting Applies your vault's preferred list, indentation, and link styles to all imported notes 
Convert inline tags to properties Automatically moves  #tags  found in note body into the  tags  field in YAML frontmatter 
 
 
 
📝 Custom Templates & Properties
 
The template system lets you standardize titles, metadata, and content across all notes during import.
 
Example Scenario
 
You have Markdown files from another app and want to consistently add  created ,  modified , and  source  properties — plus ensure aliases and tags are formatted correctly.
 
Steps:
 
1. In the import preview, click Edit to customize your template.
2. Edit the YAML frontmatter and body just like a regular note.
 
Sample Template:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: markdown-import
aliases:
  - "{{title}}-alias"
tags:
  - imported/markdown
---

# {{title}}

{{body}}
 
 
Result:
For a file originally created  2026-03-15 , modified  2026-03-20 , titled "My Note":
 
yaml
  
---
created: 2026-03-15
modified: 2026-03-20
source: markdown-import
aliases:
  - "My Note-alias"
tags:
  - imported/markdown
---
 
 
✅ Your note title and body content remain unchanged.
 
 
 
📐 Template Variable Reference
 
Variable Description Example 
 {{title}}  Original note title My Note 
 {{body}}  Markdown body without frontmatter This is the content... 
 {{content}}  Full Markdown before template is applied  ---\n...\n---\nContent  
 {{ctime}}  File creation timestamp (ISO 8601)  2026-03-15T10:30:00Z  
 {{mtime}}  File modification timestamp (ISO 8601)  2026-03-20T14:45:00Z  
 {{date}}  Current import date/time  2026-10-09T...  
 {{folder}}  Parent folder path (relative to vault) Projects/Subfolder 
 {{noteName}}  Final filename after sanitization My Note 
 {{path}}  Full vault-relative path Projects/My Note.md 
 
💡 Bonus Conversion: The built-in converter also translates other app syntax automatically — e.g., Roam's  #[[tag]]  →  [[tag]]  and  {{[[TODO]]}}  →  - [ ] 
 
 
 
💡 Best Practices
 
- 📦 Back up first: Always back up your vault before bulk importing or standardizing formatting.
- 🧪 Test small: Run a small batch first to verify your template and settings before importing everything.
- 👁️ Use the preview: The live preview shows exactly what will be created — check it carefully!
 
If you share your specific file structure or what you're migrating from, I can write a custom template just for you. 😊
 
 
 
🇹🇭 ภาษาไทย
 
ปลั๊กอิน Importer อย่างเป็นทางการของ Obsidian รองรับการนำเข้าไฟล์ Markdown ได้อย่างยืดหยุ่นและครบถ้วน ไม่เพียงแต่นำเข้าไฟล์เดี่ยวหรือทั้งโฟลเดอร์เท่านั้น แต่ยังรักษาโครงสร้างโฟลเดอร์เดิม ไฟล์แนบ และลิงก์ภายในได้อย่างถูกต้อง พร้อมระบบเทมเพลตเพื่อปรับรูปแบบบันทึกให้เป็นมาตรฐานเดียวกัน
 
เริ่มนำเข้า:
 
1. ติดตั้งและเปิดใช้งาน Importer จาก Settings → Community Plugins
2. เปิด Importer ผ่าน Command Palette ( Ctrl/Cmd+P ) หรือไอคอนนำเข้าที่แถบด้านซ้าย
3. เลือก Markdown (.md, .zip) เป็นรูปแบบไฟล์
4. เลือกไฟล์เดี่ยว โฟลเดอร์ทั้งหมด หรือไฟล์ .zip
5. ตรวจสอบตัวอย่างในหน้าตัวอย่าง แล้วกด Import เพื่อเริ่มนำเข้า
 
คุณสมบัติหลัก:
 
- ✅ รักษาโครงสร้างโฟลเดอร์ — โครงสร้างเดิมไม่เปลี่ยนแปลง
- ✅ นำเข้าไฟล์แนบด้วย — รูปภาพและไฟล์ที่อ้างอิงถูกคัดลอกมาด้วย รวมถึงไฟล์  .base  และ  .canvas 
- ✅ เลือกเฉพาะส่วนที่ต้องการ — เลือกเฉพาะบางโฟลเดอร์ ไม่ต้องนำเข้าทั้งหมด
- ✅ ปรับรูปแบบให้เป็นมาตรฐาน — รายการ การย่อหน้า และลิงก์สอดคล้องกับค่าที่ตั้งไว้ใน Vault
- ✅ แปลงแท็กในเนื้อหาเป็น Properties —  #tag  ในเนื้อหาย้ายไปอยู่ใน  tags  ที่ Frontmatter โดยอัตโนมัติ
 
ระบบเทมเพลต:
ใช้ตัวแปรเช่น  {{title}} ,  {{body}} ,  {{ctime}} ,  {{mtime}}  เพื่อสร้าง Frontmatter ที่สอดคล้องกันทุกบันทึก ตัวอย่าง:
 
yaml
  
---
created: {{ctime | date:"YYYY-MM-DD"}}
modified: {{mtime | date:"YYYY-MM-DD"}}
source: markdown-import
tags:
  - imported/markdown
---
# {{title}}
{{body}}
 
 
คำแนะนำ: สำรองข้อมูลก่อนนำเข้าทุกครั้ง ทดสอบด้วยไฟล์จำนวนน้อยก่อนเสมอ และใช้หน้าตัวอย่างตรวจสอบผลลัพธ์ก่อนกดยืนยัน 😊📐 Understanding the Importer Template System
 
The template system is the core of the Obsidian Importer — it's essentially a "recipe" that tells the Importer how to take your source data (CSV columns, HTML metadata, etc.) and shape it into your preferred Markdown structure.
 
 
 
📝 How to Edit a Template
 
In the import preview screen, click Edit to customize the default template. You can modify the note's title, properties, and content. Once saved, your template is remembered for future imports using the same file format.
 
 
 
🧩 Core Concept: Variables
 
Use  {{variableName}}  placeholders in your template to inject dynamic data. These are available across all importers:
 
Variable Description Example Output 
 {{title}}  Original note title My Note 
 {{body}}  Markdown content without frontmatter This is the content... 
 {{content}}  Full Markdown before template is applied  ---\n...\n---\nContent  
 {{ctime}}  Source file creation timestamp (ISO 8601)  2026-03-15T10:30:00Z  
 {{mtime}}  Source file modification timestamp (ISO 8601)  2026-03-20T14:45:00Z  
 {{date}}  Current date/time at import  2026-10-09T...  
 {{folder}}  Parent folder path (relative to vault) Projects/Subfolder 
 {{noteName}}  Final sanitized note filename My Note 
 {{path}}  Full vault-relative path including  .md  Projects/My Note.md 
 {{importer}}  Importer identifier  html ,  notion-api ,  csv  
 {{source}}  Object containing all source data values Access CSV columns:  {{source["Column Name"]}}  
 {{sourceId}}  Stable unique identifier from source  abc123  
 
 
 
⚙️ Advanced: Filters & Logic
 
Templates use Knap syntax — the same as Obsidian Web Clipper — giving you powerful ways to transform and conditionally include content.
 
🔧 Filters — Transform Your Data
 
Chain filters using the pipe  |  character:
 
yaml
  
created: {{ctime | date:"YYYY-MM-DD"}}    # Format timestamp
title: {{title | capitalize}}             # Capitalize first letter
 
 
🧠 Logic — Conditionals & Loops
 
Control what appears based on whether data exists:
 
yaml
  
{% if source["Tags"] %}
tags:
  - {{source["Tags"]}}
{% endif %}
 
 
 
 
💡 Real-World Example: CSV Import
 
Scenario: CSV with columns:  Name ,  Alias ,  Tags ,  Description 
 
Your Template:
 
yaml
  
---
aliases:
  - {{source["Alias"]}}
tags:
  - {{source["Tags"]}}
  - imported/csv
source: csv-import
---

# {{title}}

{{source["Description"]}}
 
 
Sample CSV Row:
 
Name Alias Tags Description 
Website Redesign Web Redesign Frontend, Design Redesign the company homepage 
 
Generated Note:
 
yaml
  
---
aliases:
  - Web Redesign
tags:
  - Frontend, Design
  - imported/csv
source: csv-import
---

# Website Redesign

Redesign the company homepage
 
 
 
 
⚠️ Important Notes
 
- 📌 Column names with spaces: Always use bracket notation —  {{source["Project Name"]}}  — when headers contain spaces or special characters.
- 👁️ Preview limits: The preview shows at most 10 sample rows. Some attachments and remote references may not be fully resolved until the actual import runs.
- 📋 Multi-value fields in CSV: Cells containing commas (e.g.,  "tag1, tag2" ) must be wrapped in double quotes so commas inside aren't mistaken for column delimiters.
 
💡 Pro Tip: Start simple — build your template with basic fields first, then add conditionals and filters once you see how the data flows! 😊