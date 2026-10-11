#!/usr/bin/env node
/**
 * Check Docstrings Script
 * ตรวจสอบว่าไฟล์โค้ดมี Docstring/ความคมชัดที่จุดเริ่มต้นหรือไม่
 * รองรับ: .js, .jsx, .ts, .tsx, .py, .go
 */

const fs = require('fs');
const path = require('path');

// ==================== การตั้งค่า ====================
const CONFIG = {
  // นามสกุลไฟล์ที่จะตรวจสอบ
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.py', '.go'],
  
  // โฟลเดอร์ที่จะข้าม
  ignoreDirs: [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    'vendor',
    '.github',
    '.vscode'
  ],
  
  // ไฟล์ที่ข้าม (ตรงกับชื่อไฟล์)
  ignoreFiles: [],
  
  // ข้อความเริ่มต้นที่ถือว่าเป็น Docstring
  // แต่ละภาษาจะใช้รูปแบบต่างกัน
  docstringPatterns: {
    js: [/^\/\*+/, /^\/\//, /^\/\*\*/],    // /** ... */ หรือ /* ... */ หรือ //
    ts: [/^\/\*+/, /^\/\//, /^\/\*\*/],
    py: [/^"""/, /^'''/, /^r"""/],         // """ ... """ หรือ ''' ... '''
    go: [/^\/\//]                          // Package comment at top
  },

  // ตำแหน่งที่ต้องมี docstring (บรรทัดแรกถึงบรรทัดที่ N)
  checkLines: 5,

  // เส้นทางรูท (เริ่มจากที่รันคำสั่ง)
  root: process.cwd()
};

// ==================== ตัวช่วย ====================

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m%s\x1b[0m',
    success: '\x1b[32m%s\x1b[0m',
    warning: '\x1b[33m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
    reset: '%s'
  };
  console.log(colors[type], message);
}

function shouldIgnoreDir(dirName) {
  return CONFIG.ignoreDirs.includes(dirName);
}

function shouldIgnoreFile(fileName) {
  return CONFIG.ignoreFiles.some(ignore => fileName.endsWith(ignore));
}

function getFileExtension(filePath) {
  return path.extname(filePath).toLowerCase();
}

function getLanguage(ext) {
  const map = {
    '.js': 'js',
    '.jsx': 'js',
    '.ts': 'ts',
    '.tsx': 'ts',
    '.py': 'py',
    '.go': 'go'
  };
  return map[ext] || null;
}

function hasDocstring(content, language) {
  const patterns = CONFIG.docstringPatterns[language] || [];
  const lines = content.split('\n').slice(0, CONFIG.checkLines);
  
  for (const line of lines) {
    const trimmed = line.trim();
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) {
        return true;
      }
    }
  }
  return false;
}

function getAllFiles(dirPath, filesList = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      if (!shouldIgnoreDir(entry.name)) {
        getAllFiles(fullPath, filesList);
      }
    } else {
      const ext = getFileExtension(entry.name);
      if (CONFIG.extensions.includes(ext) && !shouldIgnoreFile(entry.name)) {
        filesList.push(fullPath);
      }
    }
  }
  return filesList;
}

// ==================== หลักการทำงาน ====================

function main() {
  log('📝 กำลังตรวจสอบ Docstrings...\n', 'info');
  
  const files = getAllFiles(CONFIG.root);
  const missingDocstrings = [];
  
  log(`🔍 พบไฟล์ทั้งหมด: ${files.length} ไฟล์`, 'info');
  
  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const ext = getFileExtension(filePath);
      const language = getLanguage(ext);
      
      if (!language) continue;
      
      if (!hasDocstring(content, language)) {
        missingDocstrings.push(filePath);
        log(`❌ ขาด Docstring: ${path.relative(CONFIG.root, filePath)}`, 'error');
      }
    } catch (err) {
      log(`⚠️  ไม่อ่านไฟล์: ${filePath} — ${err.message}`, 'warning');
    }
  }
  
  // ==================== สรุปผล ====================
  console.log('\n' + '='.repeat(60));
  
  if (missingDocstrings.length === 0) {
    log('✅ ทุกไฟล์มี Docstring ครบถ้วน!', 'success');
    console.log('='.repeat(60));
    process.exit(0);
  } else {
    log(`\n⚠️  พบไฟล์ที่ขาด Docstring ทั้งหมด: ${missingDocstrings.length} ไฟล์`, 'warning');
    console.log('='.repeat(60));
    log('\n💡 วิธีแก้: เพิ่มความคมชัด/คำอธิบายที่ส่วนบนของไฟล์ เช่น:\n', 'info');
    
    // ตัวอย่างตามภาษา
    log('// JavaScript/TypeScript:', 'info');
    log('/**\n * ชื่อโมดูล/ฟังก์ชัน\n * คำอธิบายการทำงาน\n */\n', 'reset');
    
    log('# Python:', 'info');
    log('"""ชื่อโมดูล/ไฟล์\nคำอธิบายการทำงาน\n"""', 'reset');
    
    log('// Go:', 'info');
    log('// Package ชื่อแพ็กเกจ ให้บริการ...\n', 'reset');
    
    process.exit(1);  // exit 1 = ทำงานล้มเหลว → ทำให้ GitHub Action ล้มเหลวด้วย
  }
}

// เรียกใช้งาน
main();
