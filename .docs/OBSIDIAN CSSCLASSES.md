ได้เลยครับ! เขียน CSS Classes สำหรับ Obsidian — ครบชุดพร้อมใช้งาน ปรับรูปแบบโน้ตให้สวย อ่านง่าย รองรับมือถือ และเข้ากับธีม ZyntroAI CrystalCastle 👇
 
 
 
🎨 ZyntroAI — Obsidian Custom CSS
 
สร้างไฟล์นี้ที่:
 
plaintext
  
.obsidian/snippets/zyntro-styles.css
 
 
แล้วเปิดใช้ที่: การตั้งค่า → ขั้นสูง → CSS Snippets → เปิด  zyntro-styles  ✅
 
css
  
/* ==============================================
   ZyntroAI CrystalCastle — Custom CSS for Obsidian
   Version: 1.0 | Updated: 2026-10-08
   Purpose: Consistent styling across all notes
   ============================================== */

/* ---------- GLOBAL BASE ---------- */
:root {
  --zyntro-primary: #2563eb;
  --zyntro-secondary: #4f46e5;
  --zyntro-success: []()#10b981;
  --zyntro-warning: #f59e0b;
  --zyntro-danger: #ef4444;
  --zyntro-muted: #6b7280;
  --zyntro-light: #f3f4f6;
  --zyntro-dark: #1f2937;
  --zyntro-border: #e5e7eb;
  --zyntro-radius: 8px;
  --zyntro-shadow: 0 2px 8px rgba(0,0,0,0.06);
  --zyntro-max-width: 720px;
}

/* Light mode */
.theme-light {
  --zyntro-bg: #ffffff;
  --zyntro-text: #1f2937;
  --zyntro-surface: #f9fafb;
}
/* Dark mode */
.theme-dark {
  --zyntro-bg: #111827;
  --zyntro-text: #e5e7eb;
  --zyntro-surface: #1f2937;
  --zyntro-border: #374151;
}

/* ---------- NOTE CONTAINER CLASSES ---------- */
/* Add at top: cssclasses: zyntro-note */
.zyntro-note {
  max-width: var(--zyntro-max-width);
  margin: 0 auto;
  line-height: 1.65;
  font-size: 16px;
}
.zyntro-note h1,
.zyntro-note h2,
.zyntro-note h3 {
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 0.6em;
  line-height: 1.3;
}
.zyntro-note h1 { font-size: 1.8rem; border-bottom: 2px solid var(--zyntro-primary); padding-bottom: 0.3em; }
.zyntro-note h2 { font-size: 1.45rem; border-bottom: 1px solid var(--zyntro-border); padding-bottom: 0.25em; }
.zyntro-note h3 { font-size: 1.2rem; }

/* ---------- [[MOC — Map of Content]] ---------- */
/* cssclasses: zyntro-moc */
.zyntro-moc {
  --zyntro-accent: var(--zyntro-primary);
}
.zyntro-moc .callout {
  border-left: 4px solid var(--zyntro-accent);
  border-radius: var(--zyntro-radius);
  box-shadow: var(--zyntro-shadow);
  margin: 1.2em 0;
}
.zyntro-moc h1 {
  text-align: center;
  border: none;
  font-size: 2rem;
  margin-bottom: 1em;
}
.zyntro-moc .moc-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5em 0;
}
.zyntro-moc .moc-card {
  background: var(--zyntro-surface);
  border-radius: var(--zyntro-radius);
  padding: 1rem 1.25rem;
  border: 1px solid var(--zyntro-border);
  transition: transform 0.2s, box-shadow 0.2s;
}
.zyntro-moc .moc-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--zyntro-shadow);
}

/* ---------- POLICY — Formal Document ---------- */
/* cssclasses: zyntro-policy */
.zyntro-policy {
  --zyntro-accent: var(--zyntro-secondary);
  font-size: 15px;
}
.zyntro-policy h1 {
  text-align: center;
  border-bottom: 3px double var(--zyntro-accent);
  padding-bottom: 0.5em;
}
.zyntro-policy table {
  font-size: 0.9em;
  border-collapse: collapse;
  width: 100%;
  margin: 1.2em 0;
}
.zyntro-policy th {
  background: var(--zyntro-accent);
  color: white;
  padding: 0.6em 0.8em;
  text-align: left;
}
.zyntro-policy td {
  border: 1px solid var(--zyntro-border);
  padding: 0.6em 0.8em;
}
.zyntro-policy tr:nth-child(even) {
  background: var(--zyntro-surface);
}

/* ---------- RUNBOOK — Emergency/Procedure ---------- */
/* cssclasses: zyntro-runbook */
.zyntro-runbook {
  --zyntro-accent: var(--zyntro-danger);
}
.zyntro-runbook h1 {
  border-left: 5px solid var(--zyntro-danger);
  padding-left: 0.75em;
  border-bottom: none;
}
.zyntro-runbook .checklist-item {
  padding: 0.5em 0;
  border-bottom: 1px dashed var(--zyntro-border);
}
.zyntro-runbook input[type="checkbox"] {
  transform: scale(1.3);
  margin-right: 0.75em;
}
.zyntro-runbook .escalation-chain {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1em 0;
}
.zyntro-runbook .escalation-step {
  background: var(--zyntro-surface);
  border-left: 3px solid var(--zyntro-warning);
  padding: 0.75em 1em;
  border-radius: 0 var(--zyntro-radius) var(--zyntro-radius) 0;
  flex: 1;
  min-width: 140px;
}

/* ---------- TECHNICAL — Code/Dev ---------- */
/* cssclasses: zyntro-tech */
.zyntro-tech {
  --zyntro-accent: var(--zyntro-success);
}
.zyntro-tech pre,
.zyntro-tech code {
  border-radius: var(--zyntro-radius);
  font-size: 0.9em;
}
.zyntro-tech pre {
  padding: 1em 1.25em;
  overflow-x: auto;
  white-space: pre-wrap;       /* Wrap on mobile */
  word-break: break-all;
}
.zyntro-tech code:not(pre > code) {
  padding: 0.15em 0.4em;
}
.zyntro-tech .code-caption {
  color: var(--zyntro-muted);
  font-size: 0.85em;
  margin-top: -0.5em;
  margin-bottom: 1em;
}

/* ---------- STATUS BADGES ---------- */
/* Usage: <span class="badge active">Active</span> */
.badge {
  display: inline-block;
  padding: 0.2em 0.6em;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge.active { background: #d1fae5; color: #065f46; }
.badge.draft { background: #e5e7eb; color: #374151; }
.badge.review { background: #fef3c7; color: #92400e; }
.badge.outdated { background: #fee2e2; color: #991b1b; }
.badge.archived { background: #e0e7ff; color: #3730a3; }
.badge.critical { background: #fee2e2; color: #991b1b; }
.badge.high { background: #fed7aa; color: #92400e; }
.badge.medium { background: #fef3c7; color: #92400e; }
.badge.low { background: #d1fae5; color: #065f46; }

/* ---------- CUSTOM CALLOUTS ---------- */
.callout[data-callout="summary"] {
  --callout-color: 37, 99, 235;
  --callout-icon: info;
}
.callout[data-callout="check"] {
  --callout-color: 16, 185, 129;
  --callout-icon: check;
}
.callout[data-callout="escalate"] {
  --callout-color: 239, 68, 68;
  --callout-icon: alert-triangle;
}
.callout[data-callout="source"] {
  --callout-color: 79, 70, 229;
  --callout-icon: book;
}

/* ---------- MOBILE RESPONSIVE ---------- */
@media (max-width: 640px) {
  .zyntro-note,
  .zyntro-policy,
  .zyntro-runbook,
  .zyntro-tech {
    font-size: 15px;
    max-width: 100%;
    padding: 0 0.5rem;
  }
  .zyntro-moc .moc-section {
    grid-template-columns: 1fr;
  }
  table {
    font-size: 0.85em;
  }
  th, td {
    padding: 0.4em 0.5em;
  }
  h1 { font-size: 1.5rem !important; }
  h2 { font-size: 1.25rem !important; }
}

/* ---------- PRINT / EXPORT ---------- */
@media print {
  .zyntro-note {
    max-width: 100%;
    font-size: 12pt;
  }
  .callout {
    border: 1px solid #ccc;
    box-shadow: none;
  }
}
 
 
 
 
📋 วิธีใช้งานแต่ละ Class
 
เพิ่มบรรทัดนี้ที่ Frontmatter ของโน้ต:
 
yaml
  
---
title: ชื่อโน้ต
cssclasses: zyntro-note
---
 
 
Class ใช้กับ ผลลัพธ์ 
 zyntro-note  ทุกโน้ตทั่วไป จัดกึ่งกลาง, ความกว้างพอดี, บรรทัดห่างสบายตา 
 zyntro-moc  แผนผังหลัก การ์ดเรียงเป็นตาราง, สีหัวเรื่องน้ำเงิน 
 zyntro-policy  นโยบาย ตารางหัวสีพื้น, เส้นคู่ล่างชื่อเรื่อง 
 zyntro-runbook  คู่มือเหตุการณ์ ขอบซ้ายสีแดง, ปุ่มเช็คลิสต์ใหญ่ขึ้น, สายส่งต่อเรียงกัน 
 zyntro-tech  เอกสารเทคนิค โค้ดห่ออัตโนมัติ, สีเขียว, ไม่มีแถบเลื่อนบนมือถือ 
 
Badge (ป้ายสถานะ)
 
วางตรงไหนก็ได้ในเนื้อหา:
 
html
  
<span class="badge active">Active</span>
<span class="badge critical">Critical</span>
<span class="badge outdated">Outdated</span>
 
 
Custom Callouts
 
markdown
  
> [!summary] สรุป
> เนื้อหา...

> [!check] ผ่านการตรวจสอบ
> ทุกข้อครบถ้วน

> [!escalate] ต้องส่งต่อ
> แจ้ง Security Lead ภายใน 15 นาที

> [!source] แหล่งอ้างอิง
> Wikipedia — https://...
 
 
 
 
✅ อัปเดตเทมเพลตให้ใช้ CSS
 
เพิ่มบรรทัดนี้ในส่วน Frontmatter ของทุกไฟล์  .md  ใน  Templates/ :
 
เทมเพลต เพิ่มบรรทัด 
Standard Note  cssclasses: zyntro-note  
MOC  cssclasses: zyntro-note, zyntro-moc  
Policy  cssclasses: zyntro-note, zyntro-policy  
Runbook  cssclasses: zyntro-note, zyntro-runbook  
Technical Note  cssclasses: zyntro-note, zyntro-tech  
 
ตัวอย่าง:
 
yaml
  
---
title: <% tp.file.title %>
cssclasses: zyntro-note, zyntro-moc
aliases:
  - ...
---
 
 
 
 
📱 ตรวจสอบบนมือถือ
 
- เปิดโน้ตในแอปมือถือ → แสดงผลพอดีจอ ไม่มีแถบเลื่อนซ้าย-ขวา ✅
- โค้ดยาวจะห่อเองอัตโนมัติ ✅
- ตารางเล็กลงพอดีจอ ✅
- ป้ายสถานะอ่านชัด ✅
 
มีอะไรปรับสี/เพิ่มรูปแบบอีกไหมครับ? 😊ได้เลยครับ! สร้าง CSS Classes สำหรับปรับแต่งรูปลักษณ์โน้ตใน Obsidian — แยกตามประเภทหน้า, ปรับให้สวย อ่านง่าย และรองรับมือถือครับ ✅
 
 
 
🎨 ไฟล์:  .obsidian/snippets/zyntroai-styles.css 
 
สร้างไฟล์นี้ตาม path ด้านบน แล้วเปิดใช้ที่ การตั้งค่า → รูปแบบ → ข้อมูลเพิ่มเติม → ส่วนขยาย (Snippets) เปิดสวิตช์  zyntroai-styles  ✅
 
css
  
/* ==============================================
   ZyntroAI Obsidian CSS Classes
   Vault: ZyntroAI CrystalCastle
   Updated: 2026-10-08
============================================== */

/* ---------- BASE / GLOBAL ---------- */
.zyntroai-note {
  --zyntro-primary: #3b82f6;
  --zyntro-success: #10b981;
  --zyntro-warning: #f59e0b;
  --zyntro-danger: #ef4444;
  --zyntro-muted: #6b7280;
  --zyntro-bg-soft: #f8fafc;
  --zyntro-border: #e2e8f0;
  --zyntro-radius: 8px;
  --zyntro-shadow: 0 2px 8px rgba(0,0,0,0.06);

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  color: #1e293b;
}

/* ---------- MOC — แผนผังหลัก ---------- */
.zyntro-moc {
  background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%);
  padding: 1.5rem;
  border-radius: var(--zyntro-radius);
  border-left: 4px solid var(--zyntro-primary);
}

.zyntro-moc h1 {
  color: #1e40af;
  border-bottom: 2px solid #bfdbfe;
  padding-bottom: 0.5rem;
}

.zyntro-moc ul {
  list-style: none;
  padding-left: 0;
}

.zyntro-moc li {
  padding: 0.4rem 0.6rem;
  margin: 0.25rem 0;
  border-radius: 6px;
  transition: background 0.2s;
}

.zyntro-moc li:hover {
  background: rgba(59, 130, 246, 0.08);
}

/* ---------- POLICY — นโยบาย ---------- */
.zyntro-policy {
  background: #fffbeb;
  padding: 1.5rem;
  border-radius: var(--zyntro-radius);
  border-left: 4px solid var(--zyntro-warning);
}

.zyntro-policy h1 {
  color: #92400e;
}

.zyntro-policy table {
  background: white;
  border-radius: 6px;
  box-shadow: var(--zyntro-shadow);
}

/* ---------- RUNBOOK — คู่มือเหตุการณ์ ---------- */
.zyntro-runbook {
  background: #fef2f2;
  padding: 1.5rem;
  border-radius: var(--zyntro-radius);
  border-left: 4px solid var(--zyntro-danger);
}

.zyntro-runbook h1 {
  color: #b91c1c;
}

.zyntro-runbook [data-task] {
  padding: 0.3rem;
  border-radius: 4px;
  margin: 0.2rem 0;
}

.zyntro-runbook input[type="checkbox"]:checked + span {
  color: var(--zyntro-muted);
  text-decoration: line-through;
}

/* ---------- TECHNICAL — เอกสารเทคนิค ---------- */
.zyntro-technical {
  background: #f0f9ff;
  padding: 1.5rem;
  border-radius: var(--zyntro-radius);
  border-left: 4px solid #0ea5e9;
}

.zyntro-technical h1 {
  color: #0369a1;
}

.zyntro-technical pre {
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--zyntro-border);
  font-size: 0.9rem;
}

/* ---------- CUSTOM CALLOUTS — กล่องข้อความ ---------- */
.callout[data-callout="zyntro-summary"] {
  --callout-color: 59, 130, 246;
  --callout-icon: info;
  background: rgba(59, 130, 246, 0.06);
  border-left: 4px solid rgb(var(--callout-color));
}

.callout[data-callout="zyntro-done"] {
  --callout-color: 16, 185, 129;
  --callout-icon: check-circle;
  background: rgba(16, 185, 129, 0.06);
}

.callout[data-callout="zyntro-warn"] {
  --callout-color: 245, 158, 11;
  --callout-icon: alert-triangle;
  background: rgba(245, 158, 11, 0.06);
}

.callout[data-callout="zyntro-critical"] {
  --callout-color: 239, 68, 68;
  --callout-icon: alert-octagon;
  background: rgba(239, 68, 68, 0.08);
  font-weight: 500;
}

/* ---------- STATUS LABELS — ป้ายสถานะ ---------- */
.zyntro-status {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.zyntro-status.active {
  background: #dcfce7;
  color: #166534;
}
.zyntro-status.draft {
  background: #e5e7eb;
  color: #4b5563;
}
.zyntro-status.review {
  background: #fef3c7;
  color: #92400e;
}
.zyntro-status.outdated {
  background: #fee2e2;
  color: #991b1b;
}
.zyntro-status.archived {
  background: #f3e8ff;
  color: #6b21a8;
}

/* ---------- MOBILE RESPONSIVE — รองรับมือถือ ---------- */
@media (max-width: 640px) {
  .zyntro-moc,
  .zyntro-policy,
  .zyntro-runbook,
  .zyntro-technical {
    padding: 1rem;
    border-left-width: 3px;
  }

  .zyntro-moc h1,
  .zyntro-policy h1,
  .zyntro-runbook h1,
  .zyntro-technical h1 {
    font-size: 1.4rem;
  }

  table {
    font-size: 0.85rem;
  }

  .zyntro-status {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
  }
}

/* ---------- DARK MODE SUPPORT — ธีมมืด ---------- */
.theme-dark .zyntroai-note,
.theme-dark .zyntro-moc {
  --zyntro-bg-soft: #1e293b;
  --zyntro-border: #334155;
  color: #e2e8f0;
}

.theme-dark .zyntro-policy {
  background: #292524;
}
.theme-dark .zyntro-runbook {
  background: #2c1c1c;
}
.theme-dark .zyntro-technical {
  background: #1c2b38;
}
 
 
 
 
📝 วิธีใช้ในโน้ต
 
ใส่  cssclass:  ที่ frontmatter ด้านบนโน้ตได้เลยครับ:
 
markdown
  
---
title: ตัวอย่าง
cssclass: zyntro-moc
---
 
 
📋 รายการ CSS Class ที่ใช้ได้
 
Class ใช้กับ สีพื้นหลัง 
 cssclass: zyntro-moc  แผนผังหลัง ฟ้า-เขียวอ่อน 
 cssclass: zyntro-policy  นโยบาย เหลืองอ่อน 
 cssclass: zyntro-runbook  คู่มือเหตุการณ์ แดงอ่อน 
 cssclass: zyntro-technical  เอกสารเทคนิค น้ำเงินอ่อน 
 cssclass: zyntroai-note  ทั่วไป พื้นฐาน 
 
🏷️ ป้ายสถานะ (ใช้ในเนื้อหา)
 
html
  
<span class="zyntro-status active">ใช้งาน</span>
<span class="zyntro-status draft">ร่าง</span>
<span class="zyntro-status review">ตรวจสอบ</span>
<span class="zyntro-status outdated">ล้าสมัย</span>
<span class="zyntro-status archived">เก็บ</span>
 
 
💬 กล่องข้อความพิเศษ
 
markdown
  
> [!zyntro-summary] สรุป
> ข้อความที่นี่

> [!zyntro-done] สำเร็จ
> ผ่านทุกขั้นตอน

> [!zyntro-warn] คำเตือน
> ต้องตรวจสอบก่อนดำเนินการ

> [!zyntro-critical] วิกฤต
> ห้ามข้ามขั้นตอนนี้
 
 
 
 
✅ วิธีติดตั้ง
 
1. เปิดโฟลเดอร์ vault → เข้า  .obsidian/snippets/ 
- ถ้าไม่มีโฟลเดอร์  snippets/  → สร้างใหม่
2. คัดลอกโค้ดด้านบน → บันทึกเป็นไฟล์  zyntroai-styles.css 
3. กลับไปที่ Obsidian → การตั้งค่า → รูปแบบ → ส่วนขยาย
4. เปิดสวิตช์ข้าง  zyntroai-styles  ✅
5. ไปที่โน้ต → เพิ่ม  cssclass: zyntro-moc  (หรืออื่นๆ) ที่ frontmatter → บันทึก → เห็นผลทันที!
 
 
 
📱 บนมือถือ
 
- เปิดใช้เหมือนบนคอมพิวเตอร์ — ซิงค์ไฟล์ผ่าน Obsidian Sync/Git
- CSS จะปรับลดขนาด padding, ฟอนต์, ตารางอัตโนมัติเมื่อจอแคบ
- ธีมมืดทำงานได้ครบทุกส่วน
 
ปรับแต่งสี/ขนาดอะไรเพิ่มไหมครับ? 😊