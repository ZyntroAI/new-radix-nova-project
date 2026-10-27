title: Local LLM — Code & Document Models
aliases:
 
- "โมเดลสำหรับเขียนโค้ดและสรุปเอกสาร"
- "Best Local LLMs for Coding & Long Documents"
slug: local-llm-code-docs
icon: 💻
color: violet
type: reference
status: active
priority: high
tags:
- type/reference
- topic/ai
- topic/llm
- topic/code
- topic/document
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Local LLM]]"
related:
- "[[Local LLM]]"
- "[[RAG Systems]]"
 
 
 
💻 📄 โมเดล Local LLM — สำหรับเขียนโค้ด & สรุปเอกสารยาว
 
แนะนำโมเดลที่ดีที่สุด + คำสั่งติดตั้ง + เทคนิคการใช้งาน จัดเต็มให้แล้วครับ ✅
 
 
 
📖 สารบัญ
 
- 💻 ส่วนที่ 1 — เขียนโค้ด
- 📄 ส่วนที่ 2 — สรุปเอกสารยาว
- 🚀 ส่วนที่ 3 — คู่มือติดตั้ง Ollama แบบละเอียด
- ⚙️ ส่วนที่ 4 — คำสั่ง/พร้อมท์แนะนำ
 
 
 
 
 
💻 ส่วนที่ 1 — โมเดลสำหรับเขียนโค้ด
 
🏆 อันดับแนะนำ
 
โมเดล ขนาด VRAM จุดเด่น คำสั่งรัน 
DeepSeek-Coder V2 7B / 16B 8–12 GB เก่งสุดด้านโค้ด, รองรับหลายภาษา, อธิบายชัดเจน  ollama run deepseek-coder  
CodeLlama 7B / 13B 8–12 GB จาก Meta, มาตรฐานอุตสาหกรรม, เสถียรมาก  ollama run codellama  
Qwen 2.5-Coder 7B / 14B 6–10 GB เก่งภาษาไทย + โค้ดดีเยี่ยม, ขนาดเล็กแต่ประสิทธิภาพสูง  ollama run qwen2.5-coder  
StarCoder2 7B / 15B 8–12 GB ฝึกจากโค้ดโอเพ่นซอรส์จริง, เข้าใจบริบทกว้าง  ollama run starcoder2  
Llama 3.2 7B 6–8 GB ไม่ได้เน้นโค้ดโดยเฉพาะ แต่ทำได้ดีมากในทุกด้าน  ollama run llama3.2  
 
✅ เลือกอย่างไร?
 
- เน้นโค้ดล้วน → DeepSeek-Coder ⭐ แนะนำอันดับ 1
- ต้องการไทยด้วย + โค้ด → Qwen 2.5-Coder ⭐ ครบเครื่องที่สุด
- ต้องการความเสถียร/มาตรฐาน → CodeLlama
- แล็ปท็อปสเปกปานกลาง → Qwen 2.5-Coder:7B-Instruct — แรงน้อยแต่เก่งมาก
 
🎯 พร้อมท์ตัวอย่าง
 
plaintext
  
เขียนฟังก์ชัน Python เพื่ออ่านไฟล์ CSV และแสดงผลข้อมูลสรุป
อธิบายโค้ดทีละส่วน และเขียนคำสั่งใช้งานตัวอย่างให้ด้วย
 
 
 
 
📄 ส่วนที่ 2 — โมเดลสำหรับสรุปเอกสารยาว
 
🧠 สิ่งที่สำคัญที่สุด: Context Window
 
- Context Window = ความยาวข้อความที่โมเดลจำได้ในครั้งเดียว
- เอกสาร 50 หน้า ≈ 40,000–50,000 คำ — ต้องเลือกโมเดลที่รองรับ Context ใหญ่พอ
 
🏆 อันดับแนะนำ
 
โมเดล ขนาด Context Window VRAM จุดเด่น คำสั่งรัน 
Qwen 2.5-7B-Instruct 7B 128K 6–8 GB ⭐ แนะนำอันดับ 1 — เก่งไทยมาก, จำได้ยาว, รันไว  ollama run qwen2.5  
Llama 3.1-8B-Instruct 8B 128K 6–10 GB สมดุลที่สุด, เข้าใจเนื้อหาลึก, เหียงน้อย  ollama run llama3.1  
Phi-3.5-mini 3.8B 128K 4–6 GB เล็กแต่ฉลาดเหลือเชื่อ — แล็ปท็อปสเปกต่ำก็รันได้  ollama run phi3.5  
Gemini 2 Flash (GGUF) 9B 1M 10–14 GB จำได้ยาวที่สุด — เหมาะกับเอกสารยาวมากๆ  ollama run gemma:9b  
Mistral Small 3 7B 128K 6–8 GB วิเคราะห์ละเอียด, สรุปได้กระชับและครบถ้วน  ollama run mistral  
 
✅ เลือกอย่างไร?
 
- เอกสารภาษาไทย → Qwen 2.5 ⭐ ดีที่สุดอย่างไม่ต้องสงสัย
- เอกสารยาวมาก > 50 หน้า → Gemma 9B หรือใช้ RAG ดู [[RAG Systems]]
- แล็ปท็อปสเปกไม่สูง → Phi-3.5-mini — ประหลั่นใจประสิทธิภาพ
- ต้องการสรุปที่ลึกซึ้งและแม่นยำ → Llama 3.1-8B-Instruct
 
🎯 พร้อมท์ตัวอย่าง — สรุปเอกสาร
 
plaintext
  
นี่คือเนื้อหาเอกสาร:
{วางเนื้อหาทั้งหมดตรงนี้}

ทำหน้าที่สรุปเนื้อหาในรูปแบบ:
1. บทสรุปย่อ (3–5 ประโยค)
2. จุดสำคัญหลัก (5 ข้อ)
3. ข้อค้นพบ/ข้อสรุป
4. ประเด็นที่ต้องพิจารณาต่อ

รักษาความถูกต้องตามข้อเท็จจริงในเอกสาร ห้ามเพิ่มข้อมูลที่ไม่มีอยู่เดิม
ใช้ภาษาไทยที่เข้าใจง่ายและกระชับ
 
 
 
 
🚀 ส่วนที่ 3 — คู่มือติดตั้ง Ollama แบบละเอียด
 
🪟 Windows
 
1. เข้าเว็บ: ollama.com/download/windows → ดาวน์โหลดตัวติดตั้ง
2. เปิดไฟล์ติดตั้ง → กด Next → Finish
3. เปิด Command Prompt หรือ PowerShell
4. ทดสอบ:
 
bash
  
ollama --version
ollama run qwen2.5
 
 
🍎 macOS
 
bash
  
# วิธีที่ 1: ดาวน์โหลดจากเว็บ
# ollama.com/download/mac

# วิธีที่ 2: ใช้ Homebrew
brew install ollama

# ทดสอบ
ollama run qwen2.5
 
 
🐧 Linux (Ubuntu/Debian)
 
bash
  
# ติดตั้งด้วยสคริปต์อัตโนมัติ
curl -fsSL https://ollama.com/install.sh | sh

# เพิ่มสิทธิ์ (ถ้าจำเป็น)
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc

# ทดสอบ
ollama --version
ollama run qwen2.5
 
 
📱 บนมือถือ (Android)
 
- ติดตั้งแอป: Maid หรือ Llammakit จาก Play Store
- ดาวน์โหลดไฟล์โมเดล  .gguf  → เปิดในแอป → พร้อมใช้งาน
 
 
 
⚙️ ส่วนที่ 4 — คำสั่งพื้นฐานที่ต้องรู้
 
bash
  
# ดาวน์โหลดและเริ่มใช้
ollama run qwen2.5

# ดูโมเดลที่มีในเครื่อง
ollama list

# ลบโมเดลที่ไม่ได้ใช้
ollama rm qwen2.5

# อัปเดตโมเดล
ollama pull qwen2.5

# ดูขนาดไฟล์และรายละเอียด
ollama list --details

# เปิด API Server (แอปอื่นเชื่อมต่อได้ที่พอร์ต 11434)
ollama serve
 
 
🔗 เรียกใช้จากโค้ดตัวอย่าง — Python
 
python
  
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    "model": "qwen2.5",
    "prompt": "สรุปเนื้อหาต่อไปนี้: ...",
    "stream": False
})

print(response.json()["response"])
 
 
 
 
🧠 เทคนิคเพิ่ม — เอกสารยาวเกิน Context Window?
 
ถ้าเอกสารยาวเกินกว่าที่โมเดลจะจำได้ในคราวเดียว:
 
1. แบ่งเป็นส่วนๆ → สรุปแต่ละบท แล้วนำบทสรุปมารวมกันสรุปอีกรอบ
2. ใช้ระบบ RAG → ดู [[RAG Systems]] — แยกชิ้นส่วน ค้นหาส่วนที่เกี่ยวข้อง ส่งให้ LLM ทีละส่วน
3. เลือกโมเดลที่มี Context ใหญ่ → Qwen 2.5 (128K), Llama 3.1 (128K), Gemma 2 (1M)
 
 
 
✅ สรุป — เลือกโมเดลอย่างไรให้ตรงงาน
 
งาน โมเดลที่แนะนำ VRAM ที่ต้องการ 
💻 เขียนโค้ดทั่วไป Qwen 2.5-Coder:7B 6 GB 
💻 โค้ดซับซ้อน/อธิบายละเอียด DeepSeek-Coder:16B 10–12 GB 
📄 สรุปเอกสารภาษาไทย Qwen 2.5:7B-Instruct ⭐ 6 GB 
📄 เอกสารยาวมาก > 50 หน้า Llama 3.1:8B หรือ Gemma 2:9B 8–10 GB 
📄 สเปกเครื่องน้อย/มือถือ Phi-3.5-mini:3.8B 4 GB 
 
 
 
ต้องการคู่มือเชื่อมต่อกับแอปเฉพาะไหมครับ เช่น Obsidian, VS Code, หรือสร้าง API สำหรับใช้งานภายในทีม 😊