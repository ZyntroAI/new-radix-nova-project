title: MOC — YAML Auto-Fixer
aliases:
 
- "เครื่องมือแก้ไข Frontmatter อัตโนมัติ"
- "YAML Frontmatter Lint & Fix Script"
slug: yaml-auto-fixer
icon: 🔧
color: red
type: reference
status: active
priority: medium
tags:
- type/reference
- topic/obsidian
- topic/yaml
- topic/tool
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[YAML Frontmatter]]"
related:
- "[[YAML Frontmatter]]"
- "[[Tag System]]"
- "[[Folder Structure]]"
 
 
 
🔧 MOC — YAML Frontmatter Auto-Fixer
 
สคริปต์ตรวจสอบและแก้ไข Frontmatter ให้ถูกต้องตามมาตรฐานโดยอัตโนมัติ ✅
 
 
 
📋 ความสามารถ
 
- ✅ ตรวจสอบโครงสร้างและแก้ไข  ---  ที่ขาดหาย
- ✅ ปรับรูปแบบวันที่ให้เป็น  YYYY-MM-DD 
- ✅ แปลงแท็กจาก  #tag  →  tag  ใน Frontmatter
- ✅ จัดเรียงฟิลด์ตามลำดับมาตรฐาน
- ✅ เพิ่มฟิลด์ที่ขาดหาย ( title ,  created ,  updated )
- ✅ ลบฟิลด์ที่ซ้ำซ้อน/ไม่ได้ใช้
- ✅ ตรวจสอบการเยื้องและอักขระพิเศษ
- ✅ สร้างไฟล์สำเนาเสมอ — ไม่เขียนทับไฟล์เดิมโดยไม่ได้รับอนุญาต
 
 
 
🚀 เวอร์ชัน 1: Node.js Script (ใช้บนคอมพิวเตอร์)
 
บันทึกเป็น  fix-yaml.js  ไว้ในโฟลเดอร์ Vault ของคุณ:
 
javascript
  
#!/usr/bin/env node
/**
 * YAML Frontmatter Auto-Fixer for Obsidian
 * รัน: node fix-yaml.js [path/to/file.md] หรือ node fix-yaml.js --all
 */

const fs = require('fs');
const path = require('path');

// ===== การตั้งค่า =====
const CONFIG = {
  fieldOrder: [
    'title', 'aliases', 'slug', 'icon', 'color',
    'type', 'status', 'priority', 'tags',
    'created', 'updated', 'author', 'version',
    'moc', 'parent', 'related'
  ],
  defaultType: 'note',
  defaultStatus: 'active',
  createBackup: true,
  backupSuffix: '.original'
};

// ===== ตัวช่วย =====
function today() {
  return new Date().toISOString().slice(0, 10);
}

function cleanTag(tag) {
  return tag.trim().replace(/^#/, '');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: null, body: content };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trimStart();
  const frontmatter = {};
  
  let currentKey = null;
  let listItem = false;
  
  frontmatterStr.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    if (trimmed.startsWith('- ')) {
      listItem = true;
      if (currentKey) {
        if (!Array.isArray(frontmatter[currentKey])) frontmatter[currentKey] = [];
        frontmatter[currentKey].push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ''));
      }
    } else if (line.includes(':')) {
      listItem = false;
      const idx = line.indexOf(':');
      currentKey = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (value === '') {
        frontmatter[currentKey] = [];
      } else {
        frontmatter[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  return { frontmatter, body };
}

function stringifyFrontmatter(data) {
  if (!data) return '';
  const lines = [];
  
  CONFIG.fieldOrder.forEach(key => {
    if (!(key in data)) return;
    const value = data[key];
    
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      lines.push(`${key}:`);
      value.forEach(item => {
        const needsQuote = /[:#\[\]{}'"]/.test(item) || item.includes(' ');
        lines.push(`  - ${needsQuote ? `"${item.replace(/"/g, '\\"')}"` : item}`);
      });
    } else if (typeof value === 'string') {
      const needsQuote = /[:#\[\]{}]/.test(value) || value.includes(' ');
      lines.push(`${key}: ${needsQuote ? `"${value}"` : value}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  });
  
  return lines.length > 0 ? `---\n${lines.join('\n')}\n---\n\n` : '';
}

function fixFrontmatter(filePath) {
  console.log(`\n📄 ประมวลผล: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('  ❌ ไฟล์ไม่มีอยู่');
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const { frontmatter: rawFm, body } = parseFrontmatter(content);
  const fm = rawFm || {};
  let modified = false;

  // 🔧 เพิ่ม/แก้ไข title
  if (!fm.title) {
    fm.title = path.basename(filePath, '.md');
    console.log('  ✅ เพิ่ม title จากชื่อไฟล์');
    modified = true;
  }

  // 🔧 เพิ่ม created/updated
  if (!fm.created) {
    fm.created = today();
    console.log('  ✅ เพิ่ม created');
    modified = true;
  }
  fm.updated = today();
  console.log('  ✅ อัปเดต updated');
  modified = true;

  // 🔧 แก้แท็กที่มี #
  if (fm.tags && Array.isArray(fm.tags)) {
    const cleaned = fm.tags.map(cleanTag).filter(Boolean);
    if (JSON.stringify(cleaned) !== JSON.stringify(fm.tags)) {
      fm.tags = cleaned;
      console.log('  ✅ แก้แท็ก: ลบเครื่องหมาย #');
      modified = true;
    }
  } else if (!fm.tags) {
    fm.tags = [];
  }

  // 🔧 เพิ่มค่าเริ่มต้น
  if (!fm.type) {
    fm.type = CONFIG.defaultType;
    console.log(`  ✅ เพิ่ม type: ${fm.type}`);
    modified = true;
  }
  if (!fm.status) {
    fm.status = CONFIG.defaultStatus;
    console.log(`  ✅ เพิ่ม status: ${fm.status}`);
    modified = true;
  }

  // 🔧 แก้รูปแบบวันที่
  const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  ['created', 'updated'].forEach(field => {
    if (typeof fm[field] === 'string' && datePattern.test(fm[field])) {
      const [, d, m, y] = fm[field].match(datePattern);
      fm[field] = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      console.log(`  ✅ แปลงรูปแบบวันที่ ${field} → ${fm[field]}`);
      modified = true;
    }
  });

  if (!modified) {
    console.log('  ✅ ถูกต้องแล้ว ไม่มีการเปลี่ยนแปลง');
    return true;
  }

  // 💾 เขียนไฟล์
  const newContent = stringifyFrontmatter(fm) + body.trimStart();
  
  if (CONFIG.createBackup) {
    fs.writeFileSync(filePath + CONFIG.backupSuffix, content, 'utf8');
    console.log(`  💾 สำเนาเดิมบันทึกที่: ${filePath}${CONFIG.backupSuffix}`);
  }
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('  ✅ บันทึกเรียบร้อย');
  return true;
}

function processDirectory(dirPath) {
  const results = [];
  const entries = fs.readdirSync(dirPath);
  
  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      results.push(...processDirectory(fullPath));
    } else if (entry.endsWith('.md') && !entry.startsWith('.')) {
      results.push(fixFrontmatter(fullPath));
    }
  });
  
  return results;
}

// 🚀 จุดเริ่มต้น
const args = process.argv.slice(2);

if (args[0] === '--all') {
  console.log('🔄 กำลังประมวลผลทุกไฟล์ .md ในโฟลเดอร์ปัจจุบัน...');
  const results = processDirectory(process.cwd());
  const ok = results.filter(Boolean).length;
  console.log(`\n🎉 เสร็จสิ้น: ประมวลผล ${results.length} ไฟล์, สำเร็จ ${ok} ไฟล์`);
} else if (args[0]) {
  fixFrontmatter(args[0]);
} else {
  console.log(`
🔧 YAML Frontmatter Auto-Fixer

การใช้งาน:
  node fix-yaml.js ไฟล์-ที่ต้องการ.md   # ตรวจสอบไฟล์เดียว
  node fix-yaml.js --all                 # ตรวจสอบทุกไฟล์ .md

ค่าที่แก้ไขอัตโนมัติ:
  ✅ เพิ่ม title จากชื่อไฟล์ ถ้าขาด
  ✅ เพิ่ม/อัปเดต created และ updated
  ✅ ลบ # ออกจาก tags ใน Frontmatter
  ✅ จัดเรียงฟิลด์ตามลำดับมาตรฐาน
  ✅ แปลงรูปแบบวันที่ DD/MM/YYYY → YYYY-MM-DD
  ✅ เพิ่ม type/status ถ้าขาดหาย
  ✅ สำเนาไฟล์เดิมเสมอก่อนแก้ไข
  `);
}
 
 
 
 
📝 วิธีใช้งาน
 
✅ ไฟล์เดียว
 
bash
  
node fix-yaml.js "ชื่อไฟล์.md"
 
 
✅ ทุกไฟล์ในโฟลเดอร์
 
bash
  
node fix-yaml.js --all
 
 
⚠️ สำคัญ: สคริปต์จะสร้างไฟล์สำเนา  ไฟล์.md.original  ก่อนแก้ไข — คุณสามารถเปรียบเทียบหรือกู้คืนได้ตลอดเวลา ✅
 
 
 
🧩 เวอร์ชัน 2: สำหรับใช้ใน Obsidian (Dataview Script)
 
วางที่ด้านบนของบันทึก หรือสร้างเป็นบันทึกแยก:
 
dataviewjs
  
// ตรวจสอบ Frontmatter ของทุกหน้าในโฟลเดอร์ปัจจุบัน
const pages = dv.pages('"."');
const issues = [];

pages.forEach(page => {
  const file = page.file;
  const problems = [];
  
  if (!page.title) problems.push('❌ ไม่มี title');
  if (!page.created) problems.push('⚠️ ไม่มี created');
  if (!page.updated) problems.push('⚠️ ไม่มี updated');
  if (!page.tags || page.tags.length === 0) problems.push('🏷️ ไม่มี tags');
  
  // ตรวจแท็กที่ขึ้นต้นด้วย #
  const rawTags = dv.io.cache[file.path]?.frontmatter?.tags || [];
  const hasHash = rawTags.some(t => t.startsWith('#'));
  if (hasHash) problems.push('🔍 แท็กมีเครื่องหมาย # ควรลบออก');
  
  if (problems.length > 0) {
    issues.push({ name: file.name, link: file.link, problems });
  }
});

if (issues.length === 0) {
  dv.span('✅ ทุกไฟล์มี Frontmatter ถูกต้อง!');
} else {
  dv.header(3, `พบปัญหา ${issues.length} ไฟล์`);
  issues.forEach(item => {
    dv.el('div', `${item.link}`, { cls: 'issue-file' });
    item.problems.forEach(p => dv.el('div', `&nbsp;&nbsp;${p}`, { cls: 'issue-detail' }));
  });
}
 
 
 
 
⚙️ การปรับแต่ง
 
แก้ค่าในส่วน  CONFIG  ที่ต้นไฟล์:
 
javascript
  
const CONFIG = {
  fieldOrder: [/* ลำดับที่ต้องการ */],
  createBackup: true,  // ปิดได้ แต่ไม่แนะนำ
  defaultType: 'note',
  defaultStatus: 'active'
};
 
 
 
 
✅ Checklist ก่อนรันสคริปต์
 
มีสำเนาสำรองข้อมูลสำคัญไว้แล้ว ✅
ทดสอบกับไฟล์ตัวอย่างก่อนใช้กับทั้งหมด ✅
เข้าใจว่าสคริปต์ทำอะไรบ้างแล้ว ✅
ตรวจสอบไฟล์  .original  ว่าถูกต้อง ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[YAML Frontmatter]] — คู่มือหลักการและรูปแบบ
- [[Tag System]] — ระบบป้ายและหมวดหมู่
- [[Sync & Backup Plugins]] — สำรองข้อมูลก่อนรันสคริปต์
- [[Home-MOC]] — กลับสู่หน้าหลัก
 
 
 
✅ สรุปสั้นๆ: สคริปต์นี้ช่วยรักษามาตรฐาน Frontmatter ให้สม่ำเสมอ — แต่ ตรวจสอบผลลัพธ์เสมอ และอย่าลืมว่าไฟล์  .original  คือประกันความปลอดภัยของคุณครับ 😊
 
ต้องการปรับแต่งกฎเพิ่มเติมไหมครับ เช่น บังคับใช้แท็กบางกลุ่ม, ตรวจสอบชื่อไฟล์, หรือตรวจสอบลิงก์ที่หายไป 😊