title: Semantic Document Chunking
aliases:
 
- "การแบ่งเอกสารตามความหมาย"
- "Semantic Chunking for RAG"
slug: semantic-chunking
icon: 🧩
color: purple
type: guide
status: active
priority: high
tags:
- type/guide
- topic/rag
- topic/ai
- topic/document
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[RAG Systems]]"
related:
- "[[RAG Systems]]"
- "[[Local LLM]]"
- "[[Local LLM — Build API Server]]"
 
 
 
🧩 Semantic Document Chunking — การแบ่งเอกสารตามความหมาย
 
แบ่งเอกสารตามเนื้อหา ไม่ใช่ตามความยาว — ให้แต่ละก้อนมีเนื้อหาที่เกี่ยวข้องกันอย่างเป็นธรรมชาติ ✅
 
 
 
📌 Semantic Chunking คืออะไร?
 
Semantic Chunking = แบ่งเอกสารโดยดูจากความหมายของเนื้อหา ไม่ใช่แบ่งตามจำนวนตัวอักษรคงที่ 
 
- ✅ วิธีทำ: แปลงประโยค/ย่อหน้าเป็นเวกเตอร์ (Embedding) → คำนวณความคล้ายคลึงกันระหว่างส่วนที่ติดกัน → ถ้าความคล้ายคลึงตกลงมาก → แยกเป็นก้อนใหม่ 
- ✅ ผลลัพธ์: แต่ละก้อนมีเนื้อหาที่เกี่ยวข้องกันในหัวข้อเดียว — ไม่มีเนื้อหาที่ไม่เกี่ยวข้องติดมากัน
- ✅ ต่างจากวิธีเดิม:
- ❌ Fixed-size: แบ่งทุกๆ 1,000 ตัวอักษร — อาจตัดกลางหัวข้อ
- ❌ Structure-based: แบ่งตามหัวข้อ — ใช้ไม่ได้กับเอกสารที่ไม่มีโครงสร้าง
- ✅ Semantic: แบ่งเมื่อหัวข้อเปลี่ยน — เข้าใจเนื้อหาจริงๆ 
 
 
 
🔬 หลักการทำงาน
 
plaintext
  
ประโยคที่ 1 → Embedding ─┐
ประโยคที่ 2 → Embedding ──→ คำนวณความคล้ายคลึง → สูง → รวมก้อนเดียวกัน
ประโยคที่ 3 → Embedding ─┘
ประโยคที่ 4 → Embedding ──→ คำนวณความคล้ายคลึง → ต่ำ ↓ → แยกก้อนใหม่
ประโยคที่ 5 → Embedding ─┐
ประโยคที่ 6 → Embedding ──→ ความคล้ายคลึงสูง → รวมก้อนเดียวกัน
                          ↓
                    ก้อนที่ 1      ก้อนที่ 2
                [ประโยค1-3]    [ประโยค4-6]
 
 
ขั้นตอนหลัก :
 
1. แยกเอกสารออกเป็นประโยค/ย่อหน้า
2. แปลงแต่ละส่วนเป็น Embedding
3. เปรียบเทียบ Cosine Similarity ระหว่างส่วนปัจจุบันกับส่วนก่อนหน้า
4. ถ้าความคล้ายคลึง ต่ำกว่าเกณฑ์ → สร้างก้อนใหม่
5. รวมก้อนที่สั้นเกินไปเข้าด้วยกัน
 
 
 
💻 โค้ดตัวอย่าง
 
📌 ด้วย LangChain
 
python
  
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_experimental.text_splitter import SemanticChunker

# โหลดโมเดลสร้าง Embedding
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ตั้งค่า Semantic Chunker
text_splitter = SemanticChunker(
    embeddings=embedding_model,
    breakpoint_threshold_type="percentile",  # หรือ "standard_deviation"
    breakpoint_threshold_amount=95,          # ยิ่งสูง ยิ่งแบ่งน้อยลง
    min_chunk_size=200                       # ก้อนสั้นสุด
)

# แบ่งเอกสาร
chunks = text_splitter.split_documents(documents)

# แสดงผล
print(f"จำนวนก้อน: {len(chunks)}")
for i, chunk in enumerate(chunks):
    print(f"\n--- ก้อนที่ {i+1} ---")
    print(chunk.page_content[:150], "...")
 
 
 
 
📌 ด้วย LlamaIndex
 
python
  
from llama_index.core.node_parser import SemanticSplitterNodeParser
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-zh-v1.5")

splitter = SemanticSplitterNodeParser(
    buffer_size=1,               # จำนวนประโยคที่นำมาคำนวณ
    breakpoint_percentile_threshold=95,
    embed_model=embed_model
)

nodes = splitter.get_nodes_from_documents(documents)
 
 
📌 แบบเขียนเองง่ายๆ
 
python
  
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def semantic_chunk(
    sentences,
    embed_fn,
    threshold=0.7,
    min_chunk_len=2
):
    # สร้าง Embedding ทีละประโยค
    embeddings = embed_fn(sentences)
    
    chunks = []
    current_chunk = [sentences[0]]
    
    for i in range(1, len(sentences)):
        sim = cosine_similarity(
            [embeddings[i-1]], [embeddings[i]]
        )[0][0]
        
        if sim < threshold and len(current_chunk) >= min_chunk_len:
            # หัวข้อเปลี่ยน → ปิดก้อนเดิม เริ่มก้อนใหม่
            chunks.append(" ".join(current_chunk))
            current_chunk = [sentences[i]]
        else:
            # หัวข้อเดิม → รวมต่อ
            current_chunk.append(sentences[i])
    
    # ก้อนสุดท้าย
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    return chunks
 
 
 
 
⚙️ พารามิเตอร์ที่สำคัญ & ค่าแนะนำ
 
พารามิเตอร์ หน้าที่ ค่าแนะนำ ผลเมื่อปรับค่าเพิ่ม 
threshold / percentile ความเข้มงวดในการแบ่งก้อน 90–95% ก้อนใหญ่น้อยลง, น้อยก้อน 
buffer_size จำนวนประโยคที่นำมาคำนวณ 1–2 พิจารณาบริบทมากขึ้น 
min_chunk_size ความยาวขั้นต่ำของก้อน 200–500 ตัวอักษร ไม่มีก้อนเล็กเกินไป 
max_chunk_size ความยาวสูงสุดของก้อน 1000–2000 ตัวอักษร ป้องกันก้อนใหญ่เกินไป 
 
💡 กฎง่ายๆ: เริ่มที่ threshold = 95 → ถ้าได้ก้อนใหญ่เกินไป ลดลงมา 90–92 → ถ้าก้อนเล็กเกินไป เพิ่มเป็น 97 
 
 
 
📊 เปรียบเทียบวิธีแบ่งเอกสาร
 
วิธี หลักการ ข้อดี ข้อสังเกต เหมาะกับ 
Fixed-Size แบ่งตามจำนวนตัวอักษรคงที่ ง่ายและรวดเร็ว ตัดกลางหัวข้อได้ เอกสารที่มีหัวข้อสั้นและสม่ำเสมอ 
Structure-Based แบ่งตามหัวข้อ/ย่อหน้า สอดคล้องกับโครงสร้างเดิม ต้องอาศัยโครงสร้างที่ชัดเจน เอกสารทางการ, คู่มือ, รายงาน[__LINK_ICON] 
Semantic แบ่งตามความหมาย แต่ละก้อนมีความสมบูรณ์ในตัว ช้ากว่า ต้องใช้ Embedding เอกสารไม่มีโครงสร้าง, บันทึกการประชุม, อีเมล, เว็บเพจ[__LINK_ICON] 
Hybrid Structure ก่อน → Semantic ถ้าใหญ่เกินไป ได้ประโยชน์ทั้งสองด้าน ต้องตั้งค่าทั้งสองระบบ คลังเอกสารผสมหลายประเภท ⭐ แนะนำ[__LINK_ICON] 
 
 
 
⚠️ ข้อจำกัด & สิ่งที่ต้องระวัง
 
- 🐢 ช้ากว่าวิธีอื่น: ต้องสร้าง Embedding ทุกประโยค — ใช้เวลาและทรัพยากรมากขึ้น 
- 📐 ขนาดไม่คงที่: บางก้อนอาจสั้นมาก บางก้อนอาจยาวมาก — ควรมีขอบบนและล่าง
- 🔤 คุณภาพขึ้นกับโมเดล Embedding: เลือกโมเดลที่เข้าใจภาษาไทยได้ดี เช่น  bge-small-zh-v1.5 ,  paraphrase-multilingual-MiniLM-L12-v2 
- 🧪 ต้องทดสอบค่า Threshold: ไม่มีค่าที่ดีที่สุดสำหรับทุกเอกสาร — ทดสอบและปรับแต่งเสมอ 
 
 
 
🎯 แนวทางปฏิบัติที่ดีที่สุด
 
✅ ขั้นตอนแนะนำ
 
1. Structure-Based ก่อน — ถ้าเอกสารมีหัวข้อชัดเจน ให้แบ่งตามโครงสร้างก่อน 
2. ตรวจสอบความยาว — ก้อนไหนยาวเกิน 1,500 ตัวอักษร → ส่งให้ Semantic Chunker แบ่งต่อ
3. รวมก้อนที่สั้นเกินไป — ก้อนที่สั้นกว่า 200 ตัวอักษร ให้รวมกับก้อนถัดไปถ้าเกี่ยวข้องกัน 
4. ทดสอบค่าความคล้ายคลึง — ปรับ Threshold จำนวนก้อนเหมาะสม ไม่น้อยเกินไป ไม่มากเกินไป
5. ประเมินผลจริง — ทดสอบการค้นหา ดูว่าผลลัพธ์ถูกต้องหรือไม่
 
✅ เลือกใช้เมื่อไหร่?
 
- ✅ เอกสารไม่มีโครงสร้างชัดเจน: บันทึกการประชุม, ถอดเสียง, เว็บเพจ, อีเมล 
- ✅ หัวข้อเปลี่ยนบ่อยและไม่สม่ำเสมอ
- ✅ ต้องการความแม่นยำในการค้นหาสูงสุด
- ❌ ไม่จำเป็น: เอกสารสั้น, หัวข้อชัดเจนมาก, ข้อมูลที่มีโครงสร้างตายตัว
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[RAG Systems]] — ระบบดึงข้อมูลเชิงความหมายฉบับเต็ม
- [[Local LLM]] — รันโมเดล Embedding ในเครื่องโดยไม่ต้องอินเทอร์เน็ต
- [[Local LLM — Build API Server]] — สร้าง API สำหรับกระบวนการแบ่งเอกสาร
- [[Document Processing Pipeline]] — ขั้นตอนเต็มตั้งแต่อ่านไฟล์ → แบ่ง → เก็บใน Vector DB
 
 
 
✅ สรุปสั้นๆ: Semantic Chunking = แบ่งเมื่อความหมายเปลี่ยน ไม่ใช่เมื่อตัวอักษรครบ — ใช้ร่วมกับ Structure-Based จะได้ผลดีที่สุดครับ 😊
 
ต้องการโค้ดเต็มรูปแบบ Pipeline แบ่งเอกสารภาษาไทย หรือ ปรับใช้ร่วมกับ Vector Database (Chroma/Milvus) ไหมครับ 😊