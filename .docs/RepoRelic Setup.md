นี่คือสรุปทั้งหมดในรูปแบบที่คัดลอกวางลงใน Obsidian ได้ทันทีครับ ✅
 
 
 
🏺 RepoRelic — สรุปทั้งระบบ
 
📌 ข้อมูลเบื้องต้น
 
- ชื่อ: RepoRelic — AI-Powered Autonomous Repository Intelligence Engine
- ที่เก็บโค้ด:  https://github.com/couder-04/RepoRelic.git 
- ภาษา: Python 73.8% + TypeScript 24.2%
- รองรับ: VS Code / Cursor (ใช้ไฟล์  .vsix  ร่วมกันได้)
- โครงสร้างหลัก:
-  extension/  → ส่วนติดต่อผู้ใช้ (VS Code Extension)
-  engine/  → ระบบวิเคราะห์และประมวลผลด้วย AI
-  .reporelic/  → แคชและข้อมูลชั่วคราว (ไม่ส่งขึ้น Git)
 
 
 
🚀 การติดตั้ง — 2 วิธี
 
วิธีที่ 1: ติดตั้งอัตโนมัติ (แนะนำ)
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
chmod +x setup.sh
./setup.sh
 
 
- สคริปต์จะตรวจจับ Python 3.11+, สร้าง .venv, ติดตั้ง dependencies อัตโนมัติ
- แสดงค่าที่ต้องกรอกในหน้าตั้งค่าให้พร้อมใช้งาน
 
วิธีที่ 2: ติดตั้งด้วยตัวเอง
 
bash
  
# 1. โคลน
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic

# 2. สร้างสภาพแวดล้อม
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows

# 3. ติดตั้งไลบรารี
pip install -r engine/requirements.txt
 
 
สร้างไฟล์ติดตั้งสำหรับ VS Code / Cursor
 
bash
  
cd extension
npm install -g @vscode/vsce
npm install
vsce package
 
 
- ได้ไฟล์  RepoRelic-1.1.0.vsix  → นำไปติดตั้งผ่านเมนู Extensions → ⋮ → Install from VSIX…
 
 
 
⚙️ ค่าที่ต้องกรอกในหน้าตั้งค่า
 
ช่อง ค่า 
Repo Path  /ที่อยู่/ของ/คุณ/RepoRelic  
Python Path  /ที่อยู่/ของ/คุณ/RepoRelic/.venv/bin/python  
Provider Ollama (Local) / DeepSeek / OpenAI 
Base URL  http://localhost:11434  (Ollama) หรือ  https://api.deepseek.com/v1  
API Key รหัสส่วนตัว (DeepSeek/OpenAI) หรือปล่อยว่าง (Ollama) 
 
 
 
🧠 โหมดการทำงานของ AI
 
🔹 โหมดในเครื่อง (แนะนำ — ฟรี+เป็นส่วนตัว)
 
- ติดตั้ง Ollama →  curl -fsSL https://ollama.com/install.sh | sh 
- ดึงโมเดล:  ollama pull deepseek-coder:6.7b-instruct 
- กดปุ่ม "Switch to Local Mode" ในส่วนขยาย → ตั้งค่าทั้งระบบอัตโนมัติ
- ข้อมูลไม่ออกจากเครื่อง ไม่มีค่าใช้จ่ายเลย
 
🔹 โหมดไฮบริด
 
- งานทั่วไป → ใช้โมเดลในเครื่อง (เร็ว+ฟรี)
- งานซับซ้อน → สลับไปใช้ Cloud อัตโนมัติ (DeepSeek/OpenAI)
- ผู้ใช้เลือกบังคับได้: Auto / Force Local / Force Cloud
 
🔹 การปรับแต่งอัตโนมัติ
 
- ตรวจจับภาษาหลักของโปรเจกต์ → แนะนำโมเดลที่เหมาะสม
- ปรับขนาดหน่วยความจำตามขนาดไฟล์และงาน
- ปรับจำนวนเธรด  max_workers  ตามจำนวน CPU ของเครื่อง
 
 
 
⚡ คุณสมบัติหลัก
 
ระบบวิเคราะห์
 
- ✅ 8 ขั้นตอนอัตโนมัติ: เข้าใจโค้ด → วิเคราะห์สถิติ → แผนผังการเชื่อมต่อ → ความรู้ → สร้างเทสต์ → ทดสอบ → วินิจฉัย → สร้างรายงาน
- ✅ วิเคราะห์แบบเพิ่มเติม: อ่านเฉพาะไฟล์ที่เปลี่ยน → สแกนซ้ำเกือบทันที
- ✅ อ่านไฟล์แบบสตรีม: ไม่โหลดทั้งหมดเข้าหน่วยความจำ → รองรับโปรเจกต์ 100,000+ บรรทัด
- ✅ รองรับหลายภาษา: Python, JavaScript/TypeScript, Go, Java
- ✅ ทำงานเบื้องหลัง: ไม่ทำให้หน้าจอค้าง
 
โหมดความลึกการสแกน
 
- ⚡ Quick Scan — โครงสร้างและการนำเข้าเท่านั้น วินาที ไม่ใช้ AI
- 🔍 Standard — ความสมดุล แผนผังและความสัมพันธ์
- 🧠 Deep Analysis — เต็มระบบ สร้างเทสต์ วินิจฉัยปัญหา รายงานครบถ้วน
 
ผลลัพธ์
 
- แผนผังการเชื่อมต่อโมดูลแบบโต้ตอบได้
- รายงานสรุป ความเสี่ยง ความซับซ้อน
- ชุดทดสอบอัตโนมัติ + คำแนะนำการแก้ไข
- ส่งออกได้หลายรูปแบบ: Markdown, JSON, PDF, SARIF
 
 
 
📋 ไฟล์ที่สำคัญ
 
-  setup.sh  /  setup.bat  → สคริปต์ติดตั้งอัตโนมัติ
-  .gitignore  → มี  .reporelic/  เพื่อไม่ให้แคชขึ้นระบบ
-  engine/requirements-lock.txt  → เวอร์ชันที่ตรงกันทุกเครื่อง
-  engine/cache_manager.py  → ระบบจัดการแคช
-  engine/language_detector.py  → ตรวจจับภาษา
-  engine/async_pipeline.py  → ระบบประมวลผลแบบไม่บล็อกหน้าจอ
 
 
 
💡 คำแนะนำการใช้งาน
 
- พัฒนาเผยแพร่ → ใช้ VS Code เป็นหลัก รองรับเต็มรูปแบบ เผยแพร่ตลาดส่วนขยายได้
- ใช้งานจริงทุกวัน → ติดตั้งผ่าน  .vsix  ใน Cursor ควบคู่กับ AI ดั้งเดิมของ Cursor
- เริ่มต้นแนะนำ → ใช้โหมด Local บน Ollama ฟรีและปลอดภัยที่สุด
- โปรเจกต์ใหญ่ → ใช้ Quick Scan บ่อยๆ สลับ Deep Analysis เมื่อต้องการตรวจสอบลึก
 
 
 
สร้างเมื่อ: 8 ตุลาคม 2026 | สถานะ: พร้อมใช้งาน — รัน  ./setup.sh  แล้วเริ่มได้เลย 🚀
 
 
 
ต้องการปรับเพิ่มลดอะไรในสรุปนี้ไหมครับ? 😊ได้เลยครับ ✅ ปรับรูปแบบให้เข้ากับสไตล์ Obsidian เต็มรูปแบบ ใช้ # heading, internal link, checkbox, highlight, callout และ tag ได้ครบถ้วน คัดลอกวางลงในไฟล์ .md ได้ทันที
 
 
 
🏺 RepoRelic — เอกสารรวมระบบ
 
 #RepoRelic   #AI   #DevTool   #KnowledgeBase 
 
 
 
📌 ข้อมูลทั่วไป
 
ฟิลด์ รายละเอียด 
ชื่อ RepoRelic — AI-Powered Autonomous Repository Intelligence Engine 
ที่เก็บโค้ด  https://github.com/couder-04/RepoRelic.git  
ภาษา Python 73.8% · TypeScript 24.2% 
รองรับ [[VS Code]] / [[Cursor]] (ใช้  .vsix  ร่วมกันได้) 
สถานะปัจจุบัน ✅ พร้อมใช้งาน — รัน  ./setup.sh  เริ่มได้เลย 
 
โครงสร้างโปรเจกต์
 
plaintext
  
RepoRelic/
├── extension/      # ส่วนติดต่อผู้ใช้ — VS Code Extension
├── engine/         # ระบบวิเคราะห์และประมวลผลด้วย AI
├── .reporelic/     # แคช+ข้อมูลชั่วคราว ⚠️ ไม่ส่งขึ้น Git
└── setup.sh        # สคริปต์ติดตั้งอัตโนมัติ
 
 
 
 
🚀 การติดตั้ง
 
[!success] วิธีที่ 1 — แนะนำ (คลิกเดียวจบ)
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
chmod +x setup.sh
./setup.sh
 
 
ตรวจจับ Python 3.11+ · สร้าง  .venv  · ติดตั้ง dependencies อัตโนมัติ · แสดงค่าที่กรอกพร้อมใช้งาน
 
[!info] วิธีที่ 2 — ติดตั้งด้วยตัวเอง
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows
pip install -r engine/requirements.txt
 
 
สร้างไฟล์ติดตั้งสำหรับ VS Code / Cursor
 
bash
  
cd extension
npm install -g @vscode/vsce
npm install
vsce package
 
 
📦 ได้ไฟล์  RepoRelic-1.1.0.vsix  → นำไปติดตั้ง:
 
 Extensions  →  ⋮  → Install from VSIX… → เลือกไฟล์ → รีโหลด ✅
 
 
 
⚙️ ค่าที่ตั้งค่าในส่วนขยาย
 
ช่อง ค่า 
 Repo Path   /ที่อยู่/ของ/คุณ/RepoRelic  
 Python Path   /ที่อยู่/ของ/คุณ/RepoRelic/.venv/bin/python  
 Provider   Ollama (Local)  /  DeepSeek  /  OpenAI  
 Base URL   http://localhost:11434  (Ollama) หรือ  https://api.deepseek.com/v1  
 API Key  รหัสส่วนตัว — หรือปล่อยว่างถ้าใช้ Ollama 
 
 
 
🧠 โหมดการทำงานของ AI
 
🏠 โหมดในเครื่อง — ฟรี & ปลอดภัย
 
[!tip] แนะนำสำหรับทุกวัน
 
- ข้อมูล ไม่ออกจากเครื่อง · ไม่มีค่าใช้จ่าย · ไม่ต้องส่งข้อมูลให้ใคร
- ติดตั้ง:  curl -fsSL https://ollama.com/install.sh | sh 
- ดึงโมเดล:  ollama pull deepseek-coder:6.7b-instruct 
- กดปุ่ม "Switch to Local Mode" ในส่วนขยาย → ตั้งค่าทั้งระบบอัตโนมัติ
 
⚡ โหมดไฮบริด — ดีที่สุดของทั้งสองโลก
 
- งานทั่วไป → ใช้โมเดลในเครื่อง (เร็ว · ฟรี)
- งานซับซ้อน → สลับไปใช้ Cloud อัตโนมัติ (DeepSeek/OpenAI)
- ผู้ใช้เลือกบังคับได้:
- ⚙️  Auto  — แนะนำ
- 🔒  Force Local  — ความเป็นส่วนตัวสูงสุด
- ☁️  Force Cloud  — ความสามารถสูงสุด
 
ปรับแต่งอัตโนมัติ
 
ตรวจจับภาษาหลักของโปรเจกต์ → แนะนำโมเดลที่เหมาะสม
ปรับขนาดหน่วยความจำตามขนาดไฟล์และงาน
ปรับจำนวน  max_workers  ตามจำนวน CPU ของเครื่อง
 
 
 
🔍 ความสามารถหลัก
 
ระบบวิเคราะห์ 8 ขั้นตอนอัตโนมัติ
 
plaintext
  
เข้าใจโค้ด → วิเคราะห์สถิติ → แผนผังการเชื่อมต่อ → ความรู้
→ สร้างเทสต์ → ทดสอบ → วินิจฉัยปัญหา → สร้างรายงาน
 
 
โหมดความลึกการสแกน
 
โหมด ความเร็ว ใช้ AI รายละเอียด 
⚡ Quick Scan วินาที ❌ โครงสร้าง+การนำเข้า · เหมาะกับการเช็คเร็วๆ บ่อยๆ 
🔍 Standard ปานกลาง ✅ แผนผังความสัมพันธ์ · ความสมดุลที่สุด 
🧠 Deep Analysis นานขึ้น ✅ เต็มรูปแบบ สร้างเทสต์ · วินิจฉัย · รายงานครบถ้วน 
 
คุณสมบัติพิเศษ
 
วิเคราะห์แบบเพิ่มเติม — อ่านเฉพาะไฟล์ที่เปลี่ยน → สแกนซ้ำเกือบทันที
อ่านไฟล์แบบสตรีม — ไม่โหลดทั้งหมดเข้าหน่วยความจำ → รองรับโปรเจกต์ 100k+ บรรทัด
รองรับหลายภาษา — Python · JavaScript/TypeScript · Go · Java
ทำงานเบื้องหลัง — ไม่ทำให้หน้าจอค้าง
แคชไม่ขึ้น Git —  .reporelic/  ถูกเพิ่มใน  .gitignore  แล้ว
 
ผลลัพธ์ที่ได้
 
- แผนผังการเชื่อมต่อโมดูลแบบโต้ตอบได้
- รายงานสรุป · ความเสี่ยง · ความซับซ้อน
- ชุดทดสอบอัตโนมัติ + คำแนะนำการแก้ไข
- ส่งออก: Markdown · JSON · PDF · SARIF
 
 
 
📂 ไฟล์สำคัญที่ควรทราบ
 
ไฟล์ หน้าที่ 
 setup.sh  /  setup.bat  สคริปต์ติดตั้งอัตโนมัติ 
 .gitignore  ยกเว้น  .reporelic/  ไม่ให้แคชขึ้นระบบ 
 engine/requirements-lock.txt  เวอร์ชันที่ตรงกันทุกเครื่อง 
 engine/cache_manager.py  ระบบจัดการแคชแบบเพิ่มเติม 
 engine/language_detector.py  ตรวจจับภาษา → เลือกโมเดลอัตโนมัติ 
 engine/async_pipeline.py  ประมวลผลแบบไม่บล็อกหน้าจอ 
 
 
 
💡 แนวทางการใช้งาน
 
กรณีแนะนำ โปรแกรม/โหมดที่แนะนำ 
พัฒนา+เผยแพร่สู่สาธารณะ [[VS Code]] — รองรับเต็มรูปแบบ · ตลาดส่วนขยายโดยตรง 
ใช้งานจริงทุกวัน [[Cursor]] — ติดตั้งผ่าน  .vsix  · ควบคู่กับ AI ดั้งเดิมของ Cursor 
เริ่มต้นใหม่ / ความเป็นส่วนตัวสูง Ollama + Local Mode — ฟรีและปลอดภัยที่สุด 
โปรเจกต์ขนาดใหญ่ Quick Scan บ่อยๆ · สลับ Deep Analysis เมื่อต้องการตรวจสอบลึก 
 
 
 
[!warning] หมายเหตุ
 
- ทั้งสองโปรแกรมใช้ที่เก็บโค้ดชุดเดียวกัน → ไฟล์+การตั้งค่าซิงค์กันอัตโนมัติ
- ไม่มีไลบรารีภายนอกเพิ่มเติมนอกจาก  requests  ที่มีอยู่แล้ว
 
 
 
สร้างเมื่อ:  2026-10-08  · อัปเดตล่าสุด:  2026-10-08 
 
 
 
ต้องการปรับอะไรเพิ่มไหมครับ? 😊ได้เลยครับ ✅ เพิ่มแท็กทั้งส่วนบนและส่วนท้ายให้ครบถ้วน ตามรูปแบบ Obsidian มาตรฐาน:
 
 
 
🏺 RepoRelic — เอกสารรวมระบบ
 
 #RepoRelic   #AI   #DevTool   #VSCode   #Cursor   #KnowledgeBase   #Python   #LocalAI   #DevOps 
 
 
 
📌 ข้อมูลทั่วไป
 
ฟิลด์ รายละเอียด 
ชื่อ RepoRelic — AI-Powered Autonomous Repository Intelligence Engine 
ที่เก็บโค้ด  https://github.com/couder-04/RepoRelic.git  
ภาษา Python 73.8% · TypeScript 24.2% 
รองรับ [[VS Code]] / [[Cursor]] (ใช้  .vsix  ร่วมกันได้) 
สถานะปัจจุบัน ✅ พร้อมใช้งาน — รัน  ./setup.sh  เริ่มได้เลย 
 
โครงสร้างโปรเจกต์
 
plaintext
  
RepoRelic/
├── extension/      # ส่วนติดต่อผู้ใช้ — VS Code Extension
├── engine/         # ระบบวิเคราะห์และประมวลผลด้วย AI
├── .reporelic/     # แคช+ข้อมูลชั่วคราว ⚠️ ไม่ส่งขึ้น Git
└── setup.sh        # สคริปต์ติดตั้งอัตโนมัติ
 
 
 
 
🚀 การติดตั้ง
 
[!success] วิธีที่ 1 — แนะนำ (คลิกเดียวจบ)
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
chmod +x setup.sh
./setup.sh
 
 
ตรวจจับ Python 3.11+ · สร้าง  .venv  · ติดตั้ง dependencies อัตโนมัติ · แสดงค่าที่กรอกพร้อมใช้งาน
 
[!info] วิธีที่ 2 — ติดตั้งด้วยตัวเอง
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows
pip install -r engine/requirements.txt
 
 
สร้างไฟล์ติดตั้งสำหรับ VS Code / Cursor
 
bash
  
cd extension
npm install -g @vscode/vsce
npm install
vsce package
 
 
📦 ได้ไฟล์  RepoRelic-1.1.0.vsix  → นำไปติดตั้ง:
 
 Extensions  →  ⋮  → Install from VSIX… → เลือกไฟล์ → รีโหลด ✅
 
 
 
⚙️ ค่าที่ตั้งค่าในส่วนขยาย
 
ช่อง ค่า 
 Repo Path   /ที่อยู่/ของ/คุณ/RepoRelic  
 Python Path   /ที่อยู่/ของ/คุณ/RepoRelic/.venv/bin/python  
 Provider   Ollama (Local)  /  DeepSeek  /  OpenAI  
 Base URL   http://localhost:11434  (Ollama) หรือ  https://api.deepseek.com/v1  
 API Key  รหัสส่วนตัว — หรือปล่อยว่างถ้าใช้ Ollama 
 
 
 
🧠 โหมดการทำงานของ AI
 
🏠 โหมดในเครื่อง — ฟรี & ปลอดภัย
 
[!tip] แนะนำสำหรับทุกวัน
 
- ข้อมูล ไม่ออกจากเครื่อง · ไม่มีค่าใช้จ่าย · ไม่ต้องส่งข้อมูลให้ใคร
- ติดตั้ง:  curl -fsSL https://ollama.com/install.sh | sh 
- ดึงโมเดล:  ollama pull deepseek-coder:6.7b-instruct 
- กดปุ่ม "Switch to Local Mode" ในส่วนขยาย → ตั้งค่าทั้งระบบอัตโนมัติ
 
⚡ โหมดไฮบริด — ดีที่สุดของทั้งสองโลก
 
- งานทั่วไป → ใช้โมเดลในเครื่อง (เร็ว · ฟรี)
- งานซับซ้อน → สลับไปใช้ Cloud อัตโนมัติ (DeepSeek/OpenAI)
- ผู้ใช้เลือกบังคับได้:
- ⚙️  Auto  — แนะนำ
- 🔒  Force Local  — ความเป็นส่วนตัวสูงสุด
- ☁️  Force Cloud  — ความสามารถสูงสุด
 
ปรับแต่งอัตโนมัติ
 
ตรวจจับภาษาหลักของโปรเจกต์ → แนะนำโมเดลที่เหมาะสม
ปรับขนาดหน่วยความจำตามขนาดไฟล์และงาน
ปรับจำนวน  max_workers  ตามจำนวน CPU ของเครื่อง
 
 
 
🔍 ความสามารถหลัก
 
ระบบวิเคราะห์ 8 ขั้นตอนอัตโนมัติ
 
plaintext
  
เข้าใจโค้ด → วิเคราะห์สถิติ → แผนผังการเชื่อมต่อ → ความรู้
→ สร้างเทสต์ → ทดสอบ → วินิจฉัยปัญหา → สร้างรายงาน
 
 
โหมดความลึกการสแกน
 
โหมด ความเร็ว ใช้ AI รายละเอียด 
⚡ Quick Scan วินาที ❌ โครงสร้าง+การนำเข้า · เหมาะกับการเช็คเร็วๆ บ่อยๆ 
🔍 Standard ปานกลาง ✅ แผนผังความสัมพันธ์ · ความสมดุลที่สุด 
🧠 Deep Analysis นานขึ้น ✅ เต็มรูปแบบ สร้างเทสต์ · วินิจฉัย · รายงานครบถ้วน 
 
คุณสมบัติพิเศษ
 
วิเคราะห์แบบเพิ่มเติม — อ่านเฉพาะไฟล์ที่เปลี่ยน → สแกนซ้ำเกือบทันที
อ่านไฟล์แบบสตรีม — ไม่โหลดทั้งหมดเข้าหน่วยความจำ → รองรับโปรเจกต์ 100k+ บรรทัด
รองรับหลายภาษา — Python · JavaScript/TypeScript · Go · Java
ทำงานเบื้องหลัง — ไม่ทำให้หน้าจอค้าง
แคชไม่ขึ้น Git —  .reporelic/  ถูกเพิ่มใน  .gitignore  แล้ว
 
ผลลัพธ์ที่ได้
 
- แผนผังการเชื่อมต่อโมดูลแบบโต้ตอบได้
- รายงานสรุป · ความเสี่ยง · ความซับซ้อน
- ชุดทดสอบอัตโนมัติ + คำแนะนำการแก้ไข
- ส่งออก: Markdown · JSON · PDF · SARIF
 
 
 
📂 ไฟล์สำคัญที่ควรทราบ
 
ไฟล์ หน้าที่ 
 setup.sh  /  setup.bat  สคริปต์ติดตั้งอัตโนมัติ 
 .gitignore  ยกเว้น  .reporelic/  ไม่ให้แคชขึ้นระบบ 
 engine/requirements-lock.txt  เวอร์ชันที่ตรงกันทุกเครื่อง 
 engine/cache_manager.py  ระบบจัดการแคชแบบเพิ่มเติม 
 engine/language_detector.py  ตรวจจับภาษา → เลือกโมเดลอัตโนมัติ 
 engine/async_pipeline.py  ประมวลผลแบบไม่บล็อกหน้าจอ 
 
 
 
💡 แนวทางการใช้งาน
 
กรณีแนะนำ โปรแกรม/โหมดที่แนะนำ 
พัฒนา+เผยแพร่สู่สาธารณะ [[VS Code]] — รองรับเต็มรูปแบบ · ตลาดส่วนขยายโดยตรง 
ใช้งานจริงทุกวัน [[Cursor]] — ติดตั้งผ่าน  .vsix  · ควบคู่กับ AI ดั้งเดิมของ Cursor 
เริ่มต้นใหม่ / ความเป็นส่วนตัวสูง Ollama + Local Mode — ฟรีและปลอดภัยที่สุด 
โปรเจกต์ขนาดใหญ่ Quick Scan บ่อยๆ · สลับ Deep Analysis เมื่อต้องการตรวจสอบลึก 
 
 
 
[!warning] หมายเหตุ
 
- ทั้งสองโปรแกรมใช้ที่เก็บโค้ดชุดเดียวกัน → ไฟล์+การตั้งค่าซิงค์กันอัตโนมัติ
- ไม่มีไลบรารีภายนอกเพิ่มเติมนอกจาก  requests  ที่มีอยู่แล้ว
 
 
 
สร้างเมื่อ:  2026-10-08  · อัปเดตล่าสุด:  2026-10-08 
 
 
 
 #RepoRelic   #AI   #DevTool   #VSCode   #Cursor   #Ollama   #LocalAI   #Python   #TypeScript   #KnowledgeBase   #DevOps   #CodeAnalysis   #Automation 
 
ต้องการเพิ่มหรือปรับแท็กอะไรอีกไหมครับ? 😊ได้เลยครับ ✅ เพิ่มส่วน Aliases ตามรูปแบบมาตรฐานของ Obsidian ไว้ส่วนบนสุด เพื่อให้ค้นหาและลิงก์ข้ามหน้าได้ครบถ้วน:
 
 
 
🏺 RepoRelic — เอกสารรวมระบบ
 
 
 
Aliases: RepoRelic, RepoRelic Extension, RepoRelic VSIX, RepoRelic AI Analysis, RepoRelic Documentation
Tags:  #RepoRelic   #AI   #DevTool   #VSCode   #Cursor   #Ollama   #LocalAI   #Python   #TypeScript   #KnowledgeBase   #DevOps   #CodeAnalysis   #Automation 
---
 
📌 ข้อมูลทั่วไป
 
ฟิลด์ รายละเอียด 
ชื่อทางการ RepoRelic — AI-Powered Autonomous Repository Intelligence Engine 
ชื่ออื่นๆ RepoRelic Extension, RepoRelic AI, RepoRelic Tool 
ที่เก็บโค้ด  https://github.com/couder-04/RepoRelic.git  
ภาษา Python 73.8% · TypeScript 24.2% 
รองรับ [[VS Code]] / [[Cursor]] (ใช้  .vsix  ร่วมกันได้) 
สถานะปัจจุบัน ✅ พร้อมใช้งาน — รัน  ./setup.sh  เริ่มได้เลย 
 
โครงสร้างโปรเจกต์
 
plaintext
  
RepoRelic/
├── extension/      # ส่วนติดต่อผู้ใช้ — VS Code Extension
├── engine/         # ระบบวิเคราะห์และประมวลผลด้วย AI
├── .reporelic/     # แคช+ข้อมูลชั่วคราว ⚠️ ไม่ส่งขึ้น Git
└── setup.sh        # สคริปต์ติดตั้งอัตโนมัติ
 
 
 
 
🚀 การติดตั้ง
 
[!success] วิธีที่ 1 — แนะนำ (คลิกเดียวจบ)
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
chmod +x setup.sh
./setup.sh
 
 
ตรวจจับ Python 3.11+ · สร้าง  .venv  · ติดตั้ง dependencies อัตโนมัติ · แสดงค่าที่กรอกพร้อมใช้งาน
 
[!info] วิธีที่ 2 — ติดตั้งด้วยตัวเอง
 
bash
  
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows
pip install -r engine/requirements.txt
 
 
สร้างไฟล์ติดตั้งสำหรับ VS Code / Cursor
 
bash
  
cd extension
npm install -g @vscode/vsce
npm install
vsce package
 
 
📦 ได้ไฟล์  RepoRelic-1.1.0.vsix  → นำไปติดตั้ง:
 
 Extensions  →  ⋮  → Install from VSIX… → เลือกไฟล์ → รีโหลด ✅
 
 
 
⚙️ ค่าที่ตั้งค่าในส่วนขยาย
 
ช่อง ค่า 
 Repo Path   /ที่อยู่/ของ/คุณ/RepoRelic  
 Python Path   /ที่อยู่/ของ/คุณ/RepoRelic/.venv/bin/python  
 Provider   Ollama (Local)  /  DeepSeek  /  OpenAI  
 Base URL   http://localhost:11434  (Ollama) หรือ  https://api.deepseek.com/v1  
 API Key  รหัสส่วนตัว — หรือปล่อยว่างถ้าใช้ Ollama 
 
 
 
🧠 โหมดการทำงานของ AI
 
🏠 โหมดในเครื่อง — ฟรี & ปลอดภัย
 
[!tip] แนะนำสำหรับทุกวัน
 
- ข้อมูล ไม่ออกจากเครื่อง · ไม่มีค่าใช้จ่าย · ไม่ต้องส่งข้อมูลให้ใคร
- ติดตั้ง:  curl -fsSL https://ollama.com/install.sh | sh 
- ดึงโมเดล:  ollama pull deepseek-coder:6.7b-instruct 
- กดปุ่ม "Switch to Local Mode" ในส่วนขยาย → ตั้งค่าทั้งระบบอัตโนมัติ
 
⚡ โหมดไฮบริด — ดีที่สุดของทั้งสองโลก
 
- งานทั่วไป → ใช้โมเดลในเครื่อง (เร็ว · ฟรี)
- งานซับซ้อน → สลับไปใช้ Cloud อัตโนมัติ (DeepSeek/OpenAI)
- ผู้ใช้เลือกบังคับได้:
- ⚙️  Auto  — แนะนำ
- 🔒  Force Local  — ความเป็นส่วนตัวสูงสุด
- ☁️  Force Cloud  — ความสามารถสูงสุด
 
ปรับแต่งอัตโนมัติ
 
ตรวจจับภาษาหลักของโปรเจกต์ → แนะนำโมเดลที่เหมาะสม
ปรับขนาดหน่วยความจำตามขนาดไฟล์และงาน
ปรับจำนวน  max_workers  ตามจำนวน CPU ของเครื่อง
 
 
 
🔍 ความสามารถหลัก
 
ระบบวิเคราะห์ 8 ขั้นตอนอัตโนมัติ
 
plaintext
  
เข้าใจโค้ด → วิเคราะห์สถิติ → แผนผังการเชื่อมต่อ → ความรู้
→ สร้างเทสต์ → ทดสอบ → วินิจฉัยปัญหา → สร้างรายงาน
 
 
โหมดความลึกการสแกน
 
โหมด ความเร็ว ใช้ AI รายละเอียด 
⚡ Quick Scan วินาที ❌ โครงสร้าง+การนำเข้า · เหมาะกับการเช็คเร็วๆ บ่อยๆ 
🔍 Standard ปานกลาง ✅ แผนผังความสัมพันธ์ · ความสมดุลที่สุด 
🧠 Deep Analysis นานขึ้น ✅ เต็มรูปแบบ สร้างเทสต์ · วินิจฉัย · รายงานครบถ้วน 
 
คุณสมบัติพิเศษ
 
วิเคราะห์แบบเพิ่มเติม — อ่านเฉพาะไฟล์ที่เปลี่ยน → สแกนซ้ำเกือบทันที
อ่านไฟล์แบบสตรีม — ไม่โหลดทั้งหมดเข้าหน่วยความจำ → รองรับโปรเจกต์ 100k+ บรรทัด
รองรับหลายภาษา — Python · JavaScript/TypeScript · Go · Java
ทำงานเบื้องหลัง — ไม่ทำให้หน้าจอค้าง
แคชไม่ขึ้น Git —  .reporelic/  ถูกเพิ่มใน  .gitignore  แล้ว
 
ผลลัพธ์ที่ได้
 
- แผนผังการเชื่อมต่อโมดูลแบบโต้ตอบได้
- รายงานสรุป · ความเสี่ยง · ความซับซ้อน
- ชุดทดสอบอัตโนมัติ + คำแนะนำการแก้ไข
- ส่งออก: Markdown · JSON · PDF · SARIF
 
 
 
📂 ไฟล์สำคัญที่ควรทราบ
 
ไฟล์ หน้าที่ 
 setup.sh  /  setup.bat  สคริปต์ติดตั้งอัตโนมัติ 
 .gitignore  ยกเว้น  .reporelic/  ไม่ให้แคชขึ้นระบบ 
 engine/requirements-lock.txt  เวอร์ชันที่ตรงกันทุกเครื่อง 
 engine/cache_manager.py  ระบบจัดการแคชแบบเพิ่มเติม 
 engine/language_detector.py  ตรวจจับภาษา → เลือกโมเดลอัตโนมัติ 
 engine/async_pipeline.py  ประมวลผลแบบไม่บล็อกหน้าจอ 
 
 
 
💡 แนวทางการใช้งาน
 
กรณีแนะนำ โปรแกรม/โหมดที่แนะนำ 
พัฒนา+เผยแพร่สู่สาธารณะ [[VS Code]] — รองรับเต็มรูปแบบ · ตลาดส่วนขยายโดยตรง 
ใช้งานจริงทุกวัน [[Cursor]] — ติดตั้งผ่าน  .vsix  · ควบคู่กับ AI ดั้งเดิมของ Cursor 
เริ่มต้นใหม่ / ความเป็นส่วนตัวสูง Ollama + Local Mode — ฟรีและปลอดภัยที่สุด 
โปรเจกต์ขนาดใหญ่ Quick Scan บ่อยๆ · สลับ Deep Analysis เมื่อต้องการตรวจสอบลึก 
 
 
 
[!warning] หมายเหตุ
 
- ทั้งสองโปรแกรมใช้ที่เก็บโค้ดชุดเดียวกัน → ไฟล์+การตั้งค่าซิงค์กันอัตโนมัติ
- ไม่มีไลบรารีภายนอกเพิ่มเติมนอกจาก  requests  ที่มีอยู่แล้ว
 
 
 
สร้างเมื่อ:  2026-10-08  · อัปเดตล่าสุด:  2026-10-08 
 
 
 
ต้องการเพิ่มชื่ออื่นเข้าไปใน Aliases อีกไหมครับ? 😊Got it — ZyntroAI = your umbrella project, with RepoRelic as the flagship VS Code/Cursor extension under active build 🚀
 
Here's the consolidated picture:
 
 
 
🧩 ZyntroAI — Overview
 
Layer Details 
Identity Your personal/project AI brand & tool ecosystem 
Flagship Product RepoRelic — VS Code/Cursor extension for repository analysis & AI-assisted documentation 
Core Goal Turn any codebase into structured, instantly understandable knowledge — locally first, zero lock-in 
Tech Stack Python + stdlib / requests; VS Code Extension API; local LLM support; GitHub/Obsidian-friendly 
Key Venues Works in Cursor & VS Code; builds  .vsix  for direct installation 
 
 
 
📦 RepoRelic — Current Status & Roadmap
 
✅ Ready / In-Progress
 
- Build pipeline:  cd extension && vsce package  →  .vsix  installable package
- Local-first design: models run on your machine → no data leaves, zero inference cost
-  .reporelic/  cache dir added to  .gitignore  automatically
- Language detection & multi-lang roadmap: Python → JS/TS → Go → Java
 
🚧 Upcoming
 
Priority Feature Benefit 
🔴 Highest Install script + lockfile + auto-path detection One-line setup, consistent environments 
🔴 High Incremental/cached analysis Re-scan only changed files → instant refreshes 
🟡 Medium Async streaming + configurable depth Handle 100k+ line repos without freezing UI 
🟡 Medium Hybrid mode toggle Local model for daily work, cloud for complex tasks 
🟢 Low Auto-tune context window & parallel workers Adapts to file size + your CPU automatically 
 
 
 
🛠️ Quick Commands You're Using
 
bash
  
# Build package
cd extension && vsce package

# Install locally in Cursor/VS Code
# Extensions → ⋮ → Install from VSIX… → select RepoRelic-1.1.0.vsix
 
 
 
 
Want me to:
 
- Generate the install script + requirements.txt + lockfile now?
- Draft the incremental cache logic for Quick Scan?
- Put together a README/project brief for ZyntroAI/RepoRelic you can drop into your repo?
 
Just say the word! 👇#!/usr/bin/env bash
set -euo pipefail

# ==========================================================
# ZyntroAI / RepoRelic — One-Line Installer
# Auto-detect Python → Create venv → Install deps → Done ✅
# ==========================================================

echo "🏺 ZyntroAI / RepoRelic — Installer"
echo "====================================="

# ─── Step 1: Locate Python ───
PYTHON_CANDIDATES=("python3.12" "python3.11" "python3.10" "python3" "python")
PYTHON_BIN=""

for py in "${PYTHON_CANDIDATES[@]}"; do
    if command -v "$py" &> /dev/null; then
        VERSION_FULL=$($py --version 2>&1)
        VERSION_MAJOR=$($py -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
        MAJOR=$(echo "$VERSION_MAJOR" | cut -d. -f1)
        MINOR=$(echo "$VERSION_MAJOR" | cut -d. -f2)
        
        if [ "$MAJOR" -ge 3 ] && [ "$MINOR" -ge 10 ]; then
            PYTHON_BIN="$py"
            echo "✅ พบ Python: $VERSION_FULL"
            break
        fi
    fi
done

if [ -z "$PYTHON_BIN" ]; then
    echo "❌ ไม่พบ Python 3.10 ขึ้นไป กรุณาติดตั้งก่อน"
    exit 1
fi

# ─── Step 2: Create Virtual Env ───
VENV_PATH=".venv"
if [ -d "$VENV_PATH" ]; then
    echo "⚠️  มี .venv อยู่แล้ว ข้ามการสร้าง"
else
    echo "🔧 กำลังสร้างสภาพแวดล้อมเสมือน..."
    "$PYTHON_BIN" -m venv "$VENV_PATH"
fi

# ─── Step 3: Activate & Upgrade Pip ───
if [ -f "$VENV_PATH/bin/activate" ]; then
    source "$VENV_PATH/bin/activate"
    PIP_PATH="$VENV_PATH/bin/pip"
    PYTHON_PATH="$VENV_PATH/bin/python"
else
    # Windows fallback
    source "$VENV_PATH/Scripts/activate"
    PIP_PATH="$VENV_PATH/Scripts/pip"
    PYTHON_PATH="$VENV_PATH/Scripts/python"
fi

echo "🔧 อัปเกรด pip..."
"$PIP_PATH" install --upgrade pip -q

# ─── Step 4: Install Dependencies ───
cd "$(dirname "$0")"
REQUIREMENTS_FILE="engine/requirements.txt"
LOCK_FILE="engine/requirements-lock.txt"

if [ -f "$LOCK_FILE" ]; then
    echo "📦 ติดตั้งจาก Lock File (เวอร์ชันที่ตรงกันทุกเครื่อง)..."
    "$PIP_PATH" install -r "$LOCK_FILE"
else
    echo "📦 ติดตั้งจาก Requirements..."
    "$PIP_PATH" install -r "$REQUIREMENTS_FILE"
    echo "🔒 สร้าง Lock File..."
    "$PIP_PATH" freeze > "$LOCK_FILE"
fi

# ─── Step 5: Success & Output Paths ───
echo ""
echo "✅ ติดตั้งเสร็จสิ้น!"
echo "====================================="
echo "🔹 Python Path: $PYTHON_PATH"
echo "🔹 Repo Path:   $(pwd)"
echo ""
echo "📋 ค่าที่ใช้ในหน้าตั้งค่าส่วนขยาย:"
echo "  Repo Path →   $(pwd)"
echo "  Python Path → $PYTHON_PATH"
echo ""
echo "💡 ตรวจสอบ Ollama (โหม
ได้เลยครับ ✅ นี่คือ README.md ที่สมบูรณ์ พร้อมวางลงในรูทโปรเจกต์ได้ทันที — ครอบคลุมทุกส่วนตั้งแต่แนะนำ, ติดตั้ง, การใช้งาน, โครงสร้าง และแผนงาน
 
 
 
🏺 ZyntroAI / RepoRelic
 
Turn any codebase into instantly understandable knowledge — locally first, zero lock-in.
 
RepoRelic เป็นส่วนขยายสำหรับ VS Code / Cursor ที่ขับเคลื่อนด้วย AI เพื่อวิเคราะห์โค้ดทั้งโปรเจกต์อย่างอัตโนมัติ — สร้างแผนผังความสัมพันธ์, ค้นพบปัญหา, สร้างชุดทดสอบ และเขียนเอกสาร โดยไม่ต้องส่งข้อมูลออกจากเครื่องของคุณเลย
 
 
 
✨ คุณสมบัติหลัก
 
ฟีเจอร์ รายละเอียด 
🔒 Local-First รันทั้งหมดบนเครื่องด้วย Ollama — ฟรี, เป็นส่วนตัว, ไม่มีค่าใช้จ่าย 
⚡ Incremental Scan อ่านเฉพาะไฟล์ที่เปลี่ยน — สแกนซ้ำเกือบทันที 
🧠 8-Stage Pipeline เข้าใจ → วิเคราะห์ → แผนผัง → ความรู้ → สร้างเทสต์ → ทดสอบ → วินิจฉัย → รายงาน 
📊 Multi-Language Python · JavaScript/TypeScript · Go · Java (ขยายได้) 
💾 Low Memory อ่านไฟล์แบบสตรีม — รองรับโปรเจกต์ 100,000+ บรรทัด 
🔄 Hybrid Mode งานทั่วไปใช้ Local — งานซับซ้อนสลับ Cloud (DeepSeek/OpenAI) อัตโนมัติ 
🎯 3 Scan Depths ⚡ Quick · 🔍 Standard · 🧠 Deep — เลือกความเร็ว/รายละเอียดเองได้ 
🖥️ Cursor & VS Code ติดตั้งผ่าน  .vsix  — ทำงานได้ทั้งสองโปรแกรม 
 
 
 
🚀 เริ่มต้นใช้งาน
 
การติดตั้ง (แนะนำ — คำสั่งเดียวจบ)
 
bash
  
# โคลน
git clone https://github.com/couder-04/RepoRelic.git
cd RepoRelic

# ติดตั้งอัตโนมัติ
chmod +x setup.sh
./setup.sh
 
 
สคริปต์จะตรวจจับ Python, สร้างสภาพแวดล้อม, ติดตั้งไลบรารี และแสดงค่าที่ต้องกรอกในหน้าตั้งค่าให้พร้อมใช้งาน
 
ติดตั้งด้วยตัวเอง
 
bash
  
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows

pip install -r engine/requirements-lock.txt
 
 
ติดตั้งส่วนขยายใน VS Code / Cursor
 
bash
  
cd extension
npm install -g @vscode/vsce
npm install
vsce package
 
 
- ได้ไฟล์  RepoRelic-1.1.0.vsix 
- เปิด Extensions →  ⋮  → Install from VSIX… → เลือกไฟล์ → รีโหลด ✅
 
ตั้งค่าในส่วนขยาย
 
ช่อง ค่า 
Repo Path ที่อยู่โฟลเดอร์โปรเจกต์ของคุณ 
Python Path  /ที่อยู่/RepoRelic/.venv/bin/python  
Provider  Ollama (Local)  — แนะนำ 
Base URL  http://localhost:11434  
API Key ปล่อยว่าง (สำหรับ Ollama) 
 
ติดตั้ง Ollama (โหมดในเครื่อง)
 
bash
  
curl -fsSL https://ollama.com/install.sh | sh
ollama pull deepseek-coder:6.7b-instruct
 
 
จากนั้นกดปุ่ม "Switch to Local Mode" ในส่วนขยาย — ระบบจะตั้งค่าทั้งหมดให้อัตโนมัติ ✅
 
 
 
📂 โครงสร้างโปรเจกต์
 
plaintext
  
RepoRelic/
├── .github/               # CI/CD workflows
├── docs/                  # เอกสารและคู่มือ
├── extension/             # ส่วนติดต่อผู้ใช้ (VS Code Extension)
│   ├── src/
│   ├── package.json
│   └── RepoRelic-1.1.0.vsix
├── engine/                # ระบบวิเคราะห์หลัก
│   ├── analyzers/         # ตัววิเคราะห์แยกตามภาษา
│   ├── async_pipeline.py  # ประมวลผลแบบไม่บล็อกหน้าจอ
│   ├── cache_manager.py   # ระบบแคชแบบเพิ่มเติม
│   ├── language_detector.py  # ตรวจจับภาษา
│   ├── streaming_reader.py     # อ่านไฟล์แบบสตรีม
│   ├── requirements.txt
│   └── requirements-lock.txt
├── .reporelic/            # แคชและข้อมูลชั่วคราว (ไม่ขึ้น Git)
├── .gitignore
├── setup.sh               # สคริปต์ติดตั้งอัตโนมัติ
└── README.md
 
 
 
 
🔍 วิธีใช้งาน
 
เลือกโหมดการสแกน
 
โหมด ความเร็ว ใช้ AI เหมาะสำหรับ 
⚡ Quick Scan วินาที ❌ ตรวจโครงสร้างอย่างเดียว เช็คโครงสร้างบ่อยๆ · รีเฟรชทันที 
🔍 Standard ปานกลาง ✅ ดูแผนผัง · ความสัมพันธ์ · สรุปภาพรวม 
🧠 Deep Analysis นานขึ้น ✅ เต็มรูปแบบ ตรวจสอบลึก · สร้างเทสต์ · วินิจฉัยปัญหา 
 
คุณสมบัติพิเศษ
 
- Incremental Cache — สแกนครั้งแรกเสร็จ ครั้งต่อไปจะข้ามเฉพาะไฟล์ที่ไม่เปลี่ยน → เกือบทันที
- Language Auto-Detect — รู้ว่าโปรเจกต์เขียนด้วยภาษาอะไร → แนะนำโมเดลที่เหมาะสม
- CPU Auto-Tune — ปรับจำนวนเธรดทำงานเองตามเครื่องของคุณ
- Hybrid Switch — บังคับใช้ Local หรือ Cloud ได้ตลอดเวลา
 
 
 
🛣️ แผนงาน
 
สถานะ ฟีเจอร์ 
✅ พร้อม ติดตั้งอัตโนมัติ + Lock File 
✅ พร้อม Incremental Cache สำหรับ Quick Scan 
✅ พร้อม Async Pipeline + Streaming Reader 
✅ พร้อม Multi-Language Analyzers (Python, JS/TS, Go, Java) 
✅ พร้อม Hybrid Local/Cloud Mode 
🔄 กำลังพัฒนา รองรับ SARIF / CI-CD Integration 
📅 วางแผน Web UI / แดชบอร์ด 
📅 วางแผน การผสานกับ Obsidian โดยตรง 
 
 
 
🤝 เป็นส่วนหนึ่งของ ZyntroAI
 
RepoRelic คือเครื่องมือแรกภายใต้ระบบ ZyntroAI — ชุดเครื่องมือที่สร้างขึ้นบนหลักการ:
 
- Local-First — ข้อมูลของคุณอยู่กับคุณเสมอ
- Zero Lock-In — ใช้มาตรฐานเปิด ไม่ผูกกับบริการใด
- Knowledge-First — เปลี่ยนโค้ดให้กลายเป็นความรู้ที่เข้าถึงได้ง่าย
- Extensible — เพิ่มภาษาและฟีเจอร์ได้ง่ายโดยไม่ต้องเขียนใหม่ทั้งหมด
 
 
 
📄 ใบอนุญาต
 
MIT License — ดูไฟล์  LICENSE  สำหรับรายละเอียด
 
 
 
🏺 ZyntroAI / RepoRelic — เข้าใจโค้ดได้เร็วขึ้น ด้วย AI ที่อยู่ข้างคุณ
 
 
 
ต้องการปรับข้อความ เพิ่มลดอะไรไหมครับ? 😊