title: Sync & Backup Setup Guides
aliases:
 
- "คู่มือตั้งค่า Remotely Save LiveSync Git Backup"
slug: sync-backup-setup
icon: 🛠️
color: teal
type: guide
status: active
priority: high
tags:
- type/guide
- topic/obsidian
- topic/sync
- topic/backup
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Sync & Backup Plugins]]"
related:
- "[[Sync & Backup Plugins]]"
 
 
 
🛠️ คู่มือตั้งค่า — Remotely Save · Self-Hosted LiveSync · Git Backup
 
ทีละขั้นตอน พร้อมค่าที่แนะนำและสิ่งที่ต้องระวัง ✅
 
 
 
☁️ 1. Remotely Save — สำรองขึ้นคลาวด์อัตโนมัติ
 
เหมาะสำหรับ: สำรองข้อมูลไป OneDrive / Google Drive / Dropbox / S3 / WebDAV
 
✅ ขั้นตอนติดตั้ง
 
1. ติดตั้งจาก Community Plugins → ค้นหา Remotely Save → Install → Enable
2. ไปที่ Settings → Remotely Save → General
 
⚙️ การตั้งค่าที่แนะนำ
 
ส่วน ตัวเลือก คำแนะนำ 
Remote Service เลือกบริการ: OneDrive / Google Drive / Dropbox / WebDAV / S3 เลือกที่คุณใช้งานอยู่แล้ว 
Authentication กด "Authorize" → เข้าสู่ระบบบัญชีของคุณ จะได้ Token อัตโนมัติ — อย่าแก้ไขด้วยตนเอง 
Remote Root Dir  ObsidianBackup/ชื่อ-Vault-ของคุณ  แยกโฟลเดอร์ชัดเจน ป้องกันไฟล์ปนกัน 
Auto Backup ✅ เปิด Interval: ทุก 6–12 ชม. หรือเมื่อเปิด/ปิด Obsidian อย่าตั้งถี่เกินไป — เปลืองเน็ตและพื้นที่ 
Versioning ✅ เปิด เก็บเวอร์ชันล่าสุด: 5–10 ชุด สามารถย้อนกลับไปดูไฟล์เวอร์ชันเก่าได้ 
Conflict Handling ให้ไฟล์ที่ใหม่กว่าเข้ามาแทน / ถามก่อน แนะนำ "Ask" ครั้งแรก — ปรับตามความถนัด 
File Exclusion เพิ่ม:  *.log ,  .trash/** ,  node_modules/**  ข้ามไฟล์ที่ไม่จำเป็น ประหยัดเวลา 
 
✅ ทดสอบ
 
- กด "Backup Now" รอจนเสร็จ → เช็คในคลาวด์ว่ามีไฟล์ขึ้นไปจริงไหม
- ทดสอบกู้คืน: เปิดแท็บ Restore → ดูว่าเห็นไฟล์สำรองไหม
 
⚠️ ข้อควรระวัง
 
- 🔐 Token หมดอายุ: ถ้าเชื่อมต่อไม่ได้ ให้ไปที่ Settings → กด "Re-authorize" ใหม่
- 📂 อย่าใช้โฟลเดอร์เดียวกัน กับ Vault อื่น — แยกชื่อให้ชัดเจน
- 📡 ตรวจสอบการเชื่อมต่ออินเทอร์เน็ตก่อนกด Backup/Restore
 
 
 
🔄 2. Self-Hosted LiveSync — ซิงค์เรียลไทม์ระหว่างอุปกรณ์
 
เหมาะสำหรับ: ซิงค์ข้อมูลตรงระหว่างมือถือ-คอมพิวเตอร์ โดยผ่าน CouchDB ที่คุณควบคุมเอง
 
✅ สิ่งที่ต้องเตรียมก่อน
 
- เซิร์ฟเวอร์ CouchDB (โฮสต์เอง หรือใช้บริการเช่น CouchDB One, IBM Cloudant)
- ที่อยู่ URL ของ CouchDB + ชื่อผู้ใช้ + รหัสผ่าน
- ทุกอุปกรณ์ต้องติดตั้งปลั๊กอินนี้
 
✅ ขั้นตอนติดตั้ง — บน เครื่องแรก
 
ขั้นที่ 1: ตั้งค่าเซิร์ฟเวอร์
 
1. เปิด Settings → LiveSync
2. กรอกข้อมูล:
 
plaintext
  
CouchDB URI: https://your-couchdb.example.com:6984/
Database Name: obsidian-sync
Username: your-username
Password: your-password
 
 
3. กด "Check connection" → ต้องขึ้น ✅ Connection successful
4. กด "Create database if not exists" → เสร็จแล้ว
 
ขั้นที่ 2: ตั้งค่าการซิงค์
 
plaintext
  
✅ Start auto-sync on startup
✅ Sync after changes
✅ Real-time sync (Live)
✅ Use Chokidar for detecting changes (บนเดสก์ท็อป)
❌ Don't sync on mobile data (ถ้าต้องการประหยัดเน็ตมือถือ)
 
 
ขั้นที่ 3: สร้างการตั้งค่าสำหรับเครื่องอื่น
 
- ที่ด้านล่างสุด → กด "Show QR Code" หรือ "Copy URI for setup"
- บันทึกข้อมูลนี้ไว้ — จะใช้ติดตั้งบนเครื่องอื่น
 
✅ ขั้นตอนติดตั้ง — บน เครื่องที่สอง/มือถือ
 
1. ติดตั้งปลั๊กอินเหมือนเดิม
2. ไปที่ Settings → LiveSync → กด "Import configuration"
3. สแกน QR Code หรือวาง URI ที่คัดลอกมา
4. ตรวจสอบว่าข้อมูลถูกต้อง → กด "Connect"
5. ⚠️ เลือก "Fetch from remote" เมื่อถาม — เพื่อดึงข้อมูลจากเครื่องแรกลงมา
 
⚙️ การตั้งค่าที่แนะนำ
 
ตัวเลือก ค่าแนะนำ คำอธิบาย 
Conflict Resolution ✅ Keep both (สร้างไฟล์ใหม่) ปลอดภัยที่สุด — ไม่ให้ข้อมูลหาย 
Sync Deletion ✅ เปิด ลบไฟล์ที่อุปกรณ์หนึ่ง ลบไปแล้ว 
Batch Size 50–100 ไฟล์ ไม่มากจนเกินไป ช้าแต่เสถียร 
Custom Directories เพิ่ม:  .obsidian/themes ,  .obsidian/snippets ,  .obsidian/plugins  ซิงค์การตั้งค่าด้วย ไม่แค่บันทึก 
Excluded Files  *.DS_Store ,  Thumbs.db ,  .trash/**  ข้ามไฟล์ระบบ 
 
⚠️ ข้อควรระวัง
 
- 🔐 รักษาข้อมูลเข้าสู่ระบบ CouchDB ให้ปลอดภัย — ใครมีข้อมูลนี้ เข้าถึงบันทึกทั้งหมดของคุณได้
- 📱 บนมือถือ: ปิด "Sync on mobile data" ถ้าต้องการประหยัดเน็ต
- ⚡ ซิงค์ครั้งแรกอาจใช้เวลานาน — ขึ้นอยู่กับจำนวนไฟล์
- 🔄 เมื่อเปลี่ยนชื่อไฟล์หรือย้ายโฟลเดอร์ — อาจต้องรอสักครู่ให้ซิงค์เสร็จก่อนปิดแอป
 
❓ ปัญหาที่พบบ่อย
 
- เชื่อมต่อไม่ได้: ตรวจสอบ URL, พอร์ต, SSL ถ้าใช้ HTTPS
- ไฟล์ขัดแย้ง (Conflict): ปลั๊กอินจะสร้างไฟล์ใหม่ชื่อ  (Conflict)  — เปิดดูแลรวมเนื้อหากัน
- ซิงค์ช้า: ลด Batch Size หรือเพิ่มเวลารอ
 
 
 
📝 3. Git Backup — บันทึกประวัติทุกการเปลี่ยนแปลง
 
เหมาะสำหรับ: ต้องการย้อนกลับไปที่เวอร์ชันไหนก็ได้ เหมือนโค้ด — ควบคุมประวัติได้ละเอียดที่สุด
 
✅ สิ่งที่ต้องเตรียมก่อน
 
- Git ต้องติดตั้งในเครื่อง (บนมือถือไม่ต้อง — ปลั๊กอินมีมาให้แล้ว)
- Repository บน GitHub / GitLab / Gitea หรือ Repo ส่วนตัว
- ⚠️ สำคัญมาก: ใช้ Repo แบบ Private เสมอ — บันทึกของคุณอาจมีข้อมูลส่วนตัว!
 
✅ ขั้นตอนติดตั้ง
 
ขั้นที่ 1: เตรียม Repository
 
bash
  
# ในโฟลเดอร์ Vault ของคุณ
git init
git branch -M main
git remote add origin https://github.com/ชื่อ-คุณ/ชื่อ-repo.git
# หรือใช้ SSH: git@github.com:ชื่อ-คุณ/ชื่อ-repo.git
 
 
สร้างไฟล์  .gitignore :
 
plaintext
  
# ข้ามไฟล์ที่ไม่จำเป็น
.obsidian/workspace.json
.obsidian/workspace.json.bak*
.obsidian/plugins/*/data.json
!.obsidian/plugins/*/.gitkeep
.DS_Store
Thumbs.db
*.log
.trash/
 
 
ขั้นที่ 2: ติดตั้งและตั้งค่าปลั๊กอิน
 
1. ติดตั้ง Git Backup จาก Community Plugins → Enable
2. ไปที่ Settings → Git Backup
 
ส่วน ตัวเลือก คำแนะนำ 
Repository Remote URL: URL ของ repo ของคุณ Branch:  main  ใช้ SSH ดีกว่า HTTPS ถ้าตั้งค่าได้ — ไม่ต้องใส่รหัสผ่านบ่อย 
Authentication SSH Key หรือ Token สำหรับ HTTPS บนมือถือใช้ Personal Access Token 
Auto Commit ✅ เปิด หลังจากแก้ไขไฟล์: 1–5 นาที ไม่ต้องเร็วเกินไป — กลุ่มการเปลี่ยนแปลงเดียวกัน 
Auto Push ✅ เปิด พร้อมกับ Auto Commit อัปโหลดขึ้นไปทันทีที่บันทึก 
Commit Message  {{date}} {{time}}: {{numFiles}} files changed  อ่านง่าย มีเวลาชัดเจน 
Backup Schedule ตั้งเวลาเพิ่มเติม เช่น ทุกวันตอนกลางคืน ซ้ำซ้อนเพื่อความปลอดภัย 
 
ขั้นที่ 3: ทดสอบครั้งแรก
 
- กด "Create initial commit" → รอจนเสร็จ
- กด "Push" → เช็คบน GitHub ว่าไฟล์ขึ้นไปจริงไหม ✅
 
✅ การใช้งานประจำวัน
 
- ปกตัวปลั๊กอินจะทำงานเองเบื้องหลัง — คุณแค่เขียนบันทึกตามปกติ
- ต้องการดูประวัติ: กดไอคอน Git ที่แถบด้านข้างซ้าย → จะเห็นรายการ Commit ย้อนกลับไป
- ย้อนกลับไฟล์: คลิกขวาที่ไฟล์ → แท็บ Git → เลือกเวอร์ชันที่ต้องการ → Restore
 
⚠️ ข้อควรระวัง
 
- 🔒 ใช้ Private Repository เสมอ! อย่าใช้ Public — บันทึกส่วนตัวจะรั่วออกไปสู่สาธารณะ
- 📦 ขนาด Repo: ถ้ามีรูปภาพ/ไฟล์เยอะ แยกออกเป็นโฟลเดอร์อื่น หรือใช้  .gitignore  ข้าม
- 🤝 เมื่อใช้ร่วมกับคนอื่น: Pull ก่อนแก้ไขเสมอ เพื่อหลีกเลี่ยง Conflict
- 📱 บนมือถือ: การตั้งค่า SSH Key ยากกว่า — ใช้ Personal Access Token แทนได้
 
 
 
🎯 แนะนำการจับคู่ — เลือกใช้อย่างไร?
 
สถานการณ์ สิ่งที่แนะนำ 
ใช้แค่มือถือ + คอมพิวเตอร์ตัวเดียว Remotely Save — พอแล้วครับ ง่ายและปลอดภัย 
ใช้หลายเครื่อง ต้องการให้ข้อมูลตรงกันทันที LiveSync — ซิงค์เรียลไทม์ระหว่างอุปกรณ์ 
ต้องการย้อนกลับไปดูเก่าๆ ได้ทุกจังหวะ Git Backup — ประวัติทุกการเปลี่ยนแปลง 
ความปลอดภัยระดับสูงสุด LiveSync + Git Backup — ซิงค์กันไปมา พร้อมเก็บประวัติทุกเวอร์ชัน 
 
💡 สูตรสำเร็จส่วนตัว: LiveSync ซิงค์ระหว่างอุปกรณ์ + Remotely Save สำรองไปคลาวด์อีกชั้น — ปลอดภัยครบถ้วน ✅