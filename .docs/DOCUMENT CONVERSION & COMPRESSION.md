Knowledge/Skill ใหม่ชื่อ DOCUMENT CONVERSION & COMPRESSION หรือภาษาไทย การแปลงและบีบอัดไฟล์โดยคงเนื้อหา เพื่อให้คุณใช้คุยกับ AI ต่อได้อย่างมีมาตรฐาน

หลักสำคัญคือ: เก็บไฟล์ต้นฉบับเสมอ, แยก “ลดขนาดโดยไม่เปลี่ยนเนื้อหา” ออกจาก “แปลงรูปแบบไฟล์”, และตรวจคุณภาพหลังทุกการแปลง โดยเฉพาะข้อความ ตาราง รูปภาพ ลิงก์ ตัวเลข และ OCR สำหรับเอกสารสแกน[1][2]

ข้อความเพิ่มใน Context เดิม

คัดลอกส่วนนี้ไปต่อท้าย Context Brief เดิมได้เลย:

markdown
---

# Knowledge / Skill: Document Conversion & Compression

ฉันต้องการเพิ่มความรู้และ Skill สำหรับการแปลงไฟล์เอกสาร
ให้มีขนาดเล็กลงหรือเหมาะกับการอ่าน/ประมวลผลของ AI
โดยต้องรักษาเนื้อหา ความหมาย โครงสร้างสำคัญ และความสามารถในการตรวจสอบ
ให้มากที่สุด

เป้าหมาย:

- ลดขนาดไฟล์โดยไม่ทำให้ข้อความหรือข้อมูลสำคัญหาย
- แปลงไฟล์ให้อยู่ในรูปแบบที่ AI อ่านและประมวลผลได้ง่าย
- รักษาข้อความ หัวข้อ ตาราง ลิงก์ metadata และโครงสร้างเอกสารเมื่อจำเป็น
- แยกไฟล์ยาวเป็นส่วนย่อยโดยไม่ตัดเนื้อหากลางประโยคหรือกลางหัวข้อ
- รองรับ PDF, scanned PDF, DOCX, XLSX, PPTX, HTML, Markdown, TXT, CSV, JSON, EPUB และรูปภาพ
- ใช้ workflow ที่ตรวจสอบได้ ปลอดภัย และลดความเสี่ยงข้อมูลสูญหาย
- ไม่ส่งไฟล์ลับหรือข้อมูลส่วนบุคคลไปยังบริการออนไลน์โดยไม่ได้รับอนุมัติ

## หลักการสำคัญ

1. Preserve Original
   - ห้ามเขียนทับไฟล์ต้นฉบับ
   - เก็บ original ไว้เสมอ
   - สร้างไฟล์ output เป็นชื่อใหม่ เช่น:
     `report-original.pdf`
     `report-optimized.pdf`
     `report-ai-readable.md`

2. Choose the Right Goal
   ต้องแยกเป้าหมายก่อนเริ่มงาน:
   - ลดขนาดไฟล์เพื่อส่ง/อัปโหลด
   - รักษาหน้าตา/layout เพื่อแชร์หรือพิมพ์
   - แปลงเป็น text/Markdown เพื่อให้ AI อ่าน
   - ทำ OCR สำหรับเอกสารสแกน
   - แยกไฟล์ยาวเพื่อให้ประมวลผลเป็นส่วน
   - แปลงข้อมูลตารางเพื่อวิเคราะห์
   - ทำไฟล์สำหรับเก็บระยะยาว/archival

3. Preserve Meaning Before Appearance
   - สำหรับ AI prioritise: text, headings, tables, lists, links, citations, metadata
   - สำหรับการพิมพ์/ส่งต่อ prioritise: layout, fonts, images, page breaks
   - อย่า rasterize PDF ที่มี text layer อยู่แล้ว หากเป้าหมายคือ AI readability
   - อย่าแปลง document เป็นรูปภาพ หากยังต้องค้นหา คัดลอก หรือวิเคราะห์ข้อความ

4. Lossless First, Lossy Only When Approved
   - เริ่มจากการลดขนาดแบบ lossless ก่อน
   - ลบ metadata, thumbnails, unused objects, duplicate resources
   - optimize object streams และ compress internal streams
   - ลดภาพหรือความละเอียดเฉพาะเมื่อผู้ใช้ยอมรับผลกระทบ
   - ห้ามลดคุณภาพข้อความ ตาราง สูตร สมการ หรือรูปภาพหลักโดยไม่แจ้ง

5. Validate Every Output
   หลังแปลงต้องตรวจ:
   - จำนวนหน้า / จำนวน section
   - หัวข้อหลักและหัวข้อย่อย
   - text extraction
   - ตารางและตัวเลขสำคัญ
   - ลิงก์และ bookmarks เมื่อเกี่ยวข้อง
   - รูปภาพหรือแผนภาพสำคัญ
   - OCR confidence และคำผิด
   - file size
   - checksum/hash หากเป็น workflow สำคัญ

6. Keep an Audit Trail
   ทุก conversion ควรบันทึก:
   - source file
   - output file
   - input/output format
   - tool และ version
   - options/profile ที่ใช้
   - timestamp
   - original size และ output size
   - reduction percentage
   - validation result
   - known limitations


กฎเลือกไฟล์ปลายทาง

markdown
## Format Selection Matrix

| สถานการณ์ | Format ปลายทางที่แนะนำ | หมายเหตุ |
|---|---|---|
| ให้ AI อ่านเนื้อหาเอกสารทั่วไป | Markdown (`.md`) | อ่านง่าย เก็บหัวข้อ/รายการ/ลิงก์ได้ดี |
| ให้ AI วิเคราะห์ข้อมูลตาราง | CSV / JSON / Parquet | หลีกเลี่ยงการส่ง screenshot ของตาราง |
| เก็บ layout สำหรับแชร์/พิมพ์ | Optimized PDF | รักษาหน้าตาและ portability |
| เอกสารสแกน | Searchable PDF + OCR text/Markdown | เก็บ scan original ไว้เสมอ |
| เอกสารยาวมาก | Markdown แยกตาม heading/chapter | ใช้ manifest เชื่อมทุกส่วน |
| เนื้อหาเว็บ | Clean HTML + Markdown | ตัด navigation, ads, scripts ที่ไม่เกี่ยวข้อง |
| สไลด์ | PPTX + extracted text/Markdown | เก็บ speaker notes หากมี |
| รูปภาพที่มีข้อความ | OCR text + original image | ต้องตรวจ OCR โดยเฉพาะตัวเลข/ชื่อเฉพาะ |
| เอกสารต้องเก็บระยะยาว | PDF/A ตาม policy องค์กร | อย่าสันนิษฐานว่า PDF/A เล็กที่สุดเสมอ |


Workflow การแปลงไฟล์

markdown
## Standard Conversion Workflow

1. Intake
   - ระบุชนิดไฟล์ ขนาด จำนวนหน้า/ชีต/สไลด์ ภาษา และ data classification
   - ระบุเป้าหมาย: compress, AI-readable, archive, share, extract data หรือ split
   - ตรวจว่ามี password, DRM, signature หรือข้อจำกัดทางกฎหมายหรือไม่

2. Preserve
   - เก็บ source file ไว้แบบ read-only
   - คำนวณ hash หากเป็นเอกสารสำคัญ
   - ห้ามทำงานบน original โดยตรง

3. Inspect
   - ตรวจว่า PDF มี text layer หรือเป็น scanned image
   - ตรวจจำนวนหน้า/หัวข้อ/ตาราง/รูปภาพ
   - ตรวจ embedded fonts, large images, attachments, annotations และ metadata
   - ตรวจว่ามีข้อมูลอ่อนไหวหรือไม่

4. Select Strategy
   - PDF text-based → lossless optimization ก่อน
   - PDF scanned → OCR + optimization
   - DOCX/HTML → convert to Markdown สำหรับ AI
   - XLSX → extract sheets to CSV/JSON พร้อม schema
   - PPTX → extract slide text, notes และ image descriptions
   - Long document → chunk by semantic headings

5. Convert or Compress
   - ใช้ profile ที่เหมาะกับเป้าหมาย
   - หลีกเลี่ยง lossy image compression หากข้อความ/diagram ต้องอ่านชัด
   - แปลง text เป็น structured Markdown เมื่อเป้าหมายคือ AI

6. Validate
   - เปรียบเทียบ content coverage กับ source
   - ตรวจข้อความสำคัญ: ชื่อ, วันที่, ตัวเลข, ตาราง, headings, citations
   - ตรวจ output schema
   - ตรวจ file size และ quality threshold
   - บันทึก warning หรือ limitation

7. Package
   - เก็บ original, converted output และ manifest
   - สร้าง index สำหรับ file chunks
   - ระบุว่าไฟล์ใดเป็น canonical source

8. Deliver
   - แจ้ง format, size reduction, quality result และข้อจำกัด
   - หากมีการสูญเสีย layout, image quality หรือ OCR uncertainty ต้องแจ้งชัดเจน


กลยุทธ์ลดขนาด PDF

markdown
## PDF Compression Strategy

### Level 1: Lossless / Low-Risk Optimization

ใช้ก่อนเสมอเมื่อเป้าหมายคือรักษาเนื้อหาและหน้าตาให้มากที่สุด:

- Compress PDF streams และ object streams
- Remove unused objects
- Remove duplicate resources
- Remove embedded thumbnails
- Remove unnecessary metadata
- Remove unused embedded fonts where policy อนุญาต
- Linearize PDF for fast web viewing
- Preserve text layer, links, bookmarks และ tags หากจำเป็น

เหมาะกับ:
- PDF ที่สร้างจาก Word/PowerPoint
- PDF ที่มี text layer อยู่แล้ว
- เอกสารที่ต้องค้นหา คัดลอก หรือส่งต่อให้ AI

### Level 2: Controlled Image Optimization

ใช้เมื่อไฟล์ยังใหญ่เพราะภาพ:

- Downsample เฉพาะภาพที่มีความละเอียดสูงเกินการใช้งานจริง
- ใช้ JPEG/JPEG2000 กับภาพถ่าย
- ใช้ ZIP/PNG-style compression กับ line art, diagram และภาพสีเรียบ
- ใช้ grayscale หากสีไม่ส่งผลต่อความหมาย
- ตัดภาพตกแต่งที่ไม่จำเป็นเฉพาะเมื่อได้รับอนุมัติ

ข้อควรระวัง:
- อย่าลด DPI ของ scan ที่มีตัวอักษรเล็กจน OCR/การอ่านแย่ลง
- อย่าบีบอัด diagram, chart, signature หรือ QR code โดยไม่ตรวจผล
- เก็บ output หลาย profile เช่น `web`, `print`, `minimal` เมื่อจำเป็น

### Level 3: OCR for Scanned PDF

ใช้เมื่อ PDF เป็นภาพสแกนและไม่มี searchable text layer:

1. เก็บ scan original
2. ทำ OCR เพื่อเพิ่ม text layer
3. ตรวจชื่อเฉพาะ ตัวเลข วันที่ ตาราง สมการ และภาษาไทยด้วยมือหรือ validator
4. compress ภาพ scan แบบเหมาะกับ document text
5. ส่งมอบ searchable PDF และ optional Markdown/text extraction

ห้ามถือว่า OCR ถูกต้อง 100%
โดยเฉพาะตัวเลข รหัสสินค้า ชื่อบุคคล ตาราง สมการ และอักษรไทยที่ภาพไม่ชัด


การลดขนาด PDF มักทำได้ผ่านการปรับภาพ, font, transparency, object ที่ไม่จำเป็น, metadata และโครงสร้างภายในไฟล์; สำหรับ PDF ที่สแกน OCR ก่อนช่วยให้ข้อความค้นหาได้และมักทำให้จัดการไฟล์ได้มีประสิทธิภาพกว่าเดิม[1][3][4]

การแปลงไฟล์เพื่อใช้กับ AI

markdown
## AI-Readable Conversion Rules

### 1. Prefer Markdown for Narrative Documents

ใช้ Markdown สำหรับ:
- คู่มือ
- นโยบาย
- รายงาน
- บทความ
- SOP
- เอกสารโครงการ
- เอกสารที่มี heading, list, table และ link

รักษา:
- heading hierarchy
- lists
- tables
- links
- footnotes/citations
- code blocks
- image references/captions
- source filename และ page references เมื่อจำเป็น

### 2. Preserve Provenance

ทุกไฟล์ Markdown ที่แปลงควรมี metadata:

```yaml
***
source_file: report-original.pdf
source_format: pdf
conversion_date: YYYY-MM-DD
conversion_method: ocr / direct-extraction / pandoc / manual
content_status: verified / partially-verified / needs-review
page_count: 0
language: th
***

3. Convert Tables to Structured Data
หากตารางต้องถูกวิเคราะห์:
• แยกเป็น CSV หรือ JSON
• เก็บชื่อ sheet/table
• เก็บ column names, units และ data types
• หลีกเลี่ยงแปลงตารางเป็นภาพ
• ตรวจ row count และ numeric totals หลัง conversion
4. Chunk Long Documents Semantically
ไม่แบ่งตามจำนวนตัวอักษรแบบตัดกลางประโยค
ให้แบ่งตาม:
• document title
• chapter
• heading level 1 / 2
• section
• topic
• page range เป็น metadata เท่านั้น
โครงสร้างตัวอย่าง:
text
converted/
├── manifest.json
├── 00-document-overview.md
├── 01-introduction.md
├── 02-policy-requirements.md
├── 03-workflow.md
├── 04-appendix-a.md
└── assets/

ตัวอย่าง manifest:
json
{
  "source_file": "policy-original.pdf",
  "source_hash": "&lt;hash&gt;",
  "conversion_status": "verified",
  "chunks": [
    {
      "id": "01-introduction",
      "file": "01-introduction.md",
      "title": "Introduction",
      "source_pages":,[1][2][3]
      "previous": null,
      "next": "02-policy-requirements"
    }
  ]
}

5. Preserve Cross-References
หากแบ่งไฟล์ยาว:
• เก็บ heading เดิม
• เก็บเลข section เดิม
• รักษา link/reference ไปยัง section อื่น
• เพิ่ม previous/next links
• ห้ามเปลี่ยนเลขข้อหรือข้อความอ้างอิงโดยไม่จำเป็น
<br>

สำหรับงานแปลงไฟล์ แนวทางที่ดีคือเก็บต้นฉบับ, ทำงานบนสำเนา, ตรวจหน้าที่มีเนื้อหาแน่น ตาราง รูปภาพ footnote และ reference, รวมถึงทดสอบข้อความและลิงก์หลังการแปลง[2][5]

<br>

## Skill Template: `document-conversion`

<br>

ถ้าคุณต้องการเพิ่มเป็น Skill ในระบบ Agent Skills ให้ใช้โครงสร้างนี้:

<br>

```text
skills/
└── document-conversion/
    ├── SKILL.md
    ├── scripts/
    │   ├── inspect_document.py
    │   ├── extract_text.py
    │   ├── validate_conversion.py
    │   ├── split_markdown_by_heading.py
    │   └── compare_content_coverage.py
    ├── references/
    │   ├── format-selection-matrix.md
    │   ├── pdf-optimization-policy.md
    │   ├── ocr-quality-checklist.md
    │   ├── data-classification-policy.md
    │   └── conversion-validation-rules.md
    └── assets/
        ├── conversion-manifest.template.json
        ├── document-metadata.template.md
        └── conversion-report.template.md


SKILL.md

markdown
---
name: document-conversion
description: ใช้ Skill นี้เมื่อผู้ใช้ต้องการแปลง บีบอัด แยก หรือเตรียมไฟล์เอกสารให้มีขนาดเหมาะสมและอ่านได้ดีขึ้น โดยคงข้อความ โครงสร้าง ตาราง และข้อมูลสำคัญให้มากที่สุด เช่น แปลง PDF เป็น Markdown ทำ OCR เอกสารสแกน ลดขนาด PDF หรือแยกเอกสารยาวเป็นส่วนตามหัวข้อ ไม่ใช้ Skill นี้เพื่อลบ แก้ไข หรือสรุปเนื้อหาต้นฉบับโดยไม่ระบุชัดเจน
license: Proprietary
compatibility: Requires approved local document processing tools and write access to a designated output directory.
allowed-tools: read_file write_file run_script
metadata:
  owner: knowledge-platform
  version: "0.1.0"
  lifecycle: draft
  risk-tier: medium
  data-classification: internal
---

# Document Conversion

## Purpose

แปลงหรือบีบอัดเอกสารโดยรักษา content fidelity, structure,
traceability และความสามารถในการตรวจสอบให้มากที่สุด

## Use When

ใช้เมื่อผู้ใช้ต้องการ:

- ลดขนาด PDF โดยคงข้อความและคุณภาพเอกสาร
- แปลง PDF, DOCX, HTML หรือ EPUB เป็น Markdown เพื่อให้ AI อ่าน
- ทำ OCR ให้เอกสารสแกนค้นหาและคัดลอกข้อความได้
- แปลงตารางเป็น CSV หรือ JSON เพื่อวิเคราะห์
- แยกเอกสารยาวตาม heading หรือ chapter โดยไม่ตัดเนื้อหากลางส่วน
- สร้าง manifest และ validation report สำหรับ output ที่แปลงแล้ว

## Do Not Use When

ไม่ใช้เมื่อ:

- ผู้ใช้ต้องการสรุป ตัดทอน หรือเขียนเนื้อหาใหม่แทนการแปลงรูปแบบ
- ไฟล์มี DRM, password หรือข้อจำกัดสิทธิ์ที่ยังไม่ได้รับอนุญาต
- ต้องส่งไฟล์ confidential ไปยัง online converter โดยไม่มี approval
- ผู้ใช้ต้องการการรับรองทางกฎหมายหรือการรักษา digital signature โดยไม่มี workflow ที่รองรับ
- งานต้องแก้ไขต้นฉบับโดยตรงแทนการสร้าง output ใหม่

## Required Preflight

1. ระบุ source format, size, language และเป้าหมายของ conversion
2. ตรวจ data classification และข้อจำกัดด้าน privacy
3. เก็บ original เป็น read-only และห้าม overwrite
4. ตรวจว่าเอกสารเป็น text-based หรือ scanned image
5. ระบุว่าจะต้องรักษา layout, searchable text, table, links หรือ metadata ระดับใด

## Workflow

1. รัน `scripts/inspect_document.py` เพื่อเก็บ metadata และเลือก strategy
2. เลือก conversion profile ตาม `references/format-selection-matrix.md`
3. ถ้าเป็น scanned PDF ให้ทำ OCR ตาม `references/ocr-quality-checklist.md`
4. แปลง/บีบอัดโดยสร้าง output ใหม่เท่านั้น
5. ถ้าเอกสารยาว ให้แยกด้วย `scripts/split_markdown_by_heading.py`
6. รัน `scripts/validate_conversion.py` และ `scripts/compare_content_coverage.py`
7. สร้าง conversion manifest และรายงานข้อจำกัด
8. ส่งมอบ output พร้อม source reference, file size change และ validation status

## Quality Gates

- ห้าม overwrite source file
- ต้องเก็บ source filename และ conversion method ใน metadata
- ต้องระบุหาก conversion มี potential content loss
- ต้องตรวจ headings, text samples, tables, numbers, links และ page/section coverage
- ต้องแจ้ง OCR uncertainty และส่วนที่ต้อง review
- ต้องขอ approval ก่อนส่งไฟล์ internal/confidential ออกสู่บริการภายนอก
- ห้ามอ้างว่า lossless หากมี image downsampling, font removal, OCR error หรือ layout changes

## Output Requirements

ผลลัพธ์ต้องมี:

1. Converted/optimized file
2. Original-preserving filename convention
3. Conversion manifest
4. Validation report
5. ขนาดก่อนและหลังแปลง
6. รายการข้อจำกัดหรือจุดที่ต้องตรวจด้วยมนุษย์


Eval Queries สำหรับ Skill นี้

เพิ่มไว้ใน tests/routing-evals/document-conversion/:

json
[
  {
    "id": "DC-001",
    "query": "ช่วยลดขนาด PDF นี้ให้ส่งอีเมลได้ แต่ข้อความและตารางต้องอ่านได้เหมือนเดิม",
    "should_trigger": true,
    "category": "core-intent",
    "intent_family": "pdf-size-reduction-content-preservation",
    "source_case": "document-conversion-001",
    "split": "train",
    "expected_skill": "document-conversion"
  },
  {
    "id": "DC-002",
    "query": "แปลงคู่มือ PDF 300 หน้าเป็น Markdown เพื่อให้ AI อ่าน โดยแบ่งตามหัวข้อ",
    "should_trigger": true,
    "category": "core-intent",
    "intent_family": "pdf-to-markdown-semantic-chunking",
    "source_case": "document-conversion-002",
    "split": "train",
    "expected_skill": "document-conversion"
  },
  {
    "id": "DC-003",
    "query": "ไฟล์สแกนนี้ค้นหาคำไม่ได้ ช่วยทำให้เป็น PDF ที่เลือกข้อความได้",
    "should_trigger": true,
    "category": "ocr",
    "intent_family": "scanned-pdf-ocr",
    "source_case": "document-conversion-003",
    "split": "validation",
    "expected_skill": "document-conversion"
  },
  {
    "id": "DC-004",
    "query": "แปลงตารางยอดขายใน Excel เป็น CSV และตรวจยอดรวมให้ตรง",
    "should_trigger": true,
    "category": "structured-data",
    "intent_family": "spreadsheet-to-csv-validation",
    "source_case": "document-conversion-004",
    "split": "validation",
    "expected_skill": "document-conversion"
  },
  {
    "id": "DC-005",
    "query": "ช่วยสรุป PDF นี้ให้เหลือหนึ่งหน้า",
    "should_trigger": false,
    "category": "different-task",
    "intent_family": "document-summarization",
    "source_case": "content-transformation-001",
    "split": "train",
    "expected_route": "summarization"
  },
  {
    "id": "DC-006",
    "query": "ช่วยแก้คำผิดและเขียนเนื้อหาในสัญญาใหม่ทั้งหมด",
    "should_trigger": false,
    "category": "out-of-scope",
    "intent_family": "document-rewriting",
    "source_case": "content-transformation-002",
    "split": "validation",
    "expected_route": "document-editing"
  },
  {
    "id": "DC-007",
    "query": "อัปโหลดรายงานลูกค้าลับนี้ไปเว็บแปลง PDF ฟรีให้หน่อย",
    "should_trigger": false,
    "category": "blocked-trigger",
    "intent_family": "unapproved-external-upload",
    "source_case": "security-001",
    "split": "holdout",
    "expected_route": "human-approval"
  }
]


เชื่อมใน Obsidian

เพิ่มใน [[[[[[Hub Note]]]]]]:

markdown
## Knowledge Operations

- [[DOCUMENT CONVERSION & COMPRESSION]]
- [[PDF OPTIMIZATION]]
- [[OCR QUALITY CONTROL]]
- [[SEMANTIC DOCUMENT CHUNKING]]
- [[DOCUMENT VALIDATION]]


เพิ่ม Related Notes ในโน้ต DOCUMENT CONVERSION & COMPRESSION:

markdown
## Related Notes

### Parent

- [[AGENTS KNOWLEDGE BASE]]

### Related

- [[AGENTS SKILLS]]
- [[AGENTS TOOLS]]
- [[AGENTS WORKFLOWS]]
- [[AGENTS SCHEMA]]
- [[AGENTS DATA LEAKAGE]]
- [[OBSIDIAN TEMPLATES]]

### Next

- [[OCR QUALITY CONTROL]]
- [[PDF OPTIMIZATION]]
- [[SEMANTIC DOCUMENT CHUNKING]]


ข้อควรระวัง

• “ลดขนาดโดยเนื้อความไม่หาย” ทำได้ดีที่สุดกับ text-based PDF ผ่านการ optimize โครงสร้าง แต่ถ้าไฟล์ใหญ่มาจากภาพสแกนหรือภาพความละเอียดสูง การลดขนาดมักต้องมี trade-off ด้านภาพหรือ OCR
• หากเป็นเอกสารมีความสำคัญทางกฎหมาย, digital signature, form fields, accessibility tags หรือ archival requirements ต้องระบุเป้าหมายก่อน เพราะการ flatten, remove metadata หรือ unembed fonts อาจกระทบคุณสมบัติเหล่านี้
• สำหรับเอกสารสแกน ต้องตรวจ OCR โดยเฉพาะชื่อ เลขบัญชี วันที่ ตาราง สมการ และตัวเลข เพราะ OCR อาจอ่านผิดแม้ไฟล์ดูปกติ
• สำหรับไฟล์ confidential/restricted ควรใช้ local/offline converter หรือ environment ที่องค์กรอนุมัติ ไม่ควรอัปโหลดขึ้นเว็บ converter สาธารณะโดยไม่มีอนุมัติ
• “แปลงเป็น Markdown เพื่อ AI” อาจรักษาเนื้อหาได้ดี แต่ไม่รับประกันว่าจะรักษาหน้าตา/layout ของต้นฉบับครบทุกจุด

สรุป: เพิ่ม Skill นี้ได้เลย และควรวางไว้ใต้หมวด Skills Engineering หรือสร้างหมวดใหม่ชื่อ Knowledge Operations ใน Obsidian ของคุณครับ[1][2][6][7]

การอ้างอิง:
[1] Reduce PDF file size with advanced options - Adobe Help Center https://helpx.adobe.com/in/acrobat/desktop/create-documents/optimize-pdfs/advance-size-reduction.html
[2] 20 Best File Conversion Tools for EPUB, PDF, DOCX, and Markdown https://otio.ai/blog/best-file-conversion-tools-epub-pdf-docx-markdown
[3] PDF optimizer settings - Adobe Acrobat https://helpx.adobe.com/acrobat/desktop/create-documents/optimize-pdfs/pdf-optimizer-settings.html
[4] How to Reduce PDF File Size: The Complete Guide - IronPDF https://ironpdf.com/blog/pdf-tools/how-to-reduce-pdf-file-size/
[5] Document Conversion Guide: DOCX, PDF, TXT, and More (2025 ... https://www.1-converter.com/pcm/blog/document-conversion-complete-guide
[6] PDF Compression & Optimization | Five Size Profiles - PDF Tools https://www.pdf-tools.com/features/pdf-compression/
[7] PDF Optimization: Reduce Size Without Quality Loss https://fileformer.com/en/articles/document-conversion/complete-guide-pdf-optimization-reduce-size-quality
[8] agentskills.io https://agentskills.io/skill.md
[9] learn.microsoft.com › agents › skillsAgent Skills | Microsoft Learn https://learn.microsoft.com/en-us/agent-framework/agents/skills
[10] How to add skills support to your agent https://agentskills.io/client-implementation/adding-skills-support
[11] Color Panel Options https://helpx.adobe.com/acrobat/desktop/create-documents/explore-advanced-conversion-settings/pdf-settings-overview.html
[12] Compress PDF to Specific Size: Tools & Steps https://pdf.wondershare.com/how-to/compress-pdf-to-chosen-size.html
[13] Ultimate Guide to Document Conversion https://www.managedoutsource.com/blog/ultimate-guide-document-conversion/

