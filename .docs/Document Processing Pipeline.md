title: Document Processing Pipeline
aliases:
 
- "ขั้นตอนประมวลผลเอกสารสำหรับ RAG"
- "End-to-End RAG Pipeline Guide"
slug: document-processing-pipeline
icon: 🔄
color: indigo
type: guide
status: active
priority: high
tags:
- type/guide
- topic/rag
- topic/pipeline
- topic/document
- topic/ai
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[RAG Systems]]"
related:
- "[[RAG Systems]]"
- "[[Semantic Document Chunking]]"
- "[[Local LLM]]"
- "[[Vector Databases]]"
 
 
 
🔄 Document Processing Pipeline — ขั้นตอนประมวลผลเอกสารแบบครบวงจร
 
ตั้งแต่อ่านไฟล์ → แปลง → ทำความสะอาด → แบ่ง → สร้างเวกเตอร์ → เก็บในฐานข้อมูล — คู่มือฉบับสมบูรณ์ ✅ 
 
 
 
📠 ภาพรวมกระบวนการ
 
plaintext
  
📥 ไฟล์ต้นฉบับ
    ↓
📂 Stage 1: LOADING & EXTRACTION — อ่านและแยกเนื้อหา
    ↓
🧹 Stage 2: CLEANING & NORMALIZATION — ทำความสะอาดข้อความ
    ↓
✂️ Stage 3: CHUNKING — แบ่งเป็นก้อน
    ↓
🔤 Stage 4: EMBEDDING — แปลงเป็นเวกเตอร์
    ↓
🗄️  Stage 5: INDEXING & STORAGE — บันทึกลงฐานข้อมูลเวกเตอร์
    ↓
🔍 Stage 6: RETRIEVAL — ค้นหาข้อมูลที่เกี่ยวข้อง
    ↓
💬 Stage 7: GENERATION — สร้างคำตอบด้วย LLM
 
 
 
 
 
 
📂 Stage 1: Loading & Extraction — อ่านและแยกเนื้อหา
 
✅ รองรับประเภทไฟล์
 
ประเภท เครื่องมือที่แนะนำ หมายเหตุ 
.md / .txt  pathlib  หรือ  os  อ่านตรงได้เลย ง่ายที่สุด 
.pdf PyMuPDF (fitz), PDFPlumber PDFPlumber เก่งเรื่องตารางและการจัดวาง 
.docx / .doc python-docx หลีกเลี่ยงการแปลงเป็น PDF ก่อน — ข้อมูลจะเสีย 
ภาพ/สแกน PDF Tesseract + Thai Language Pack, PaddleOCR ต้องใช้ OCR — ตรวจสอบผลลัพธ์ทุกครั้งว่าถูกต้อง 
PowerPoint / Excel python-pptx, pandas ดึงเฉพาะเนื้อหาที่จำเป็น 
 
💻 โค้ดตัวอย่าง
 
python
  
from pathlib import Path
import fitz  # PyMuPDF
from docx import Document

def load_file(file_path: str) -> str:
    """อ่านไฟล์ตามนามสกุล คืนเนื้อหาข้อความ"""
    path = Path(file_path)
    
    if not path.exists():
        raise FileNotFoundError(f"ไม่พบไฟล์: {file_path}")
    
    # Text / Markdown
    if path.suffix.lower() in ['.txt', '.md']:
        return path.read_text(encoding='utf-8')
    
    # PDF
    elif path.suffix.lower() == '.pdf':
        text = ""
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()
        return text
    
    # Word
    elif path.suffix.lower() == '.docx':
        doc = Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])
    
    else:
        raise ValueError(f"ไม่รองรับไฟล์ประเภท: {path.suffix}")
 
 
 
 
🧹 Stage 2: Cleaning & Normalization — ทำความสะอาด
 
✅ สิ่งที่ต้องทำ
 
- ✅ ลบช่องว่าง/บรรทัดว่างซ้ำซ้อน
- ✅ แก้การขึ้นบรรทัดกลางคำผิดพลาด
- ✅ ลบส่วนที่ไม่จำเป็น: หัวกระดาษ, ท้ายกระดาษ, หมายเลขหน้า, โฆษณา
- ✅ รวมคำที่ขึ้นบรรทัดใหม่แต่เป็นคำเดียวกัน
- ✅ ปรับรูปแบบตัวอักษรให้สอดคล้องกัน
 
💻 โค้ดตัวอย่าง
 
python
  
import re

def clean_text(text: str) -> str:
    """ทำความสะอาดข้อความสำหรับ RAG"""
    
    # ลบอักขระควบคุมที่ไม่จำเป็น
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', text)
    
    # แก้การตัดคำกลางบรรทัด → เช่น "สวัสดี\nคนไทย" → "สวัสดีคนไทย"
    text = re.sub(r'(\w)\n(\w)', r'\1 \2', text)
    
    # ลบช่องว่างซ้ำ และบรรทัดว่างเยอะๆ
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)
    
    # ลบหมายเลขหน้า/หัวท้ายเอกสาร (ปรับตามรูปแบบเอกสารของคุณ)
    text = re.sub(r'^\s*หน้า\s+\d+\s*$', '', text, flags=re.MULTILINE)
    
    return text.strip()
 
 
 
 
✂️ Stage 3: Chunking — แบ่งเอกสาร
 
🎯 เลือกวิธีให้เหมาะสม
 
วิธี ใช้เมื่อ ขนาดที่แนะนำ 
Fixed-Size เอกสารธรรมดา ไม่มีโครงสร้างซับซ้อน 500–1,000 ตัวอักษร 
Structure-Based มีหัวข้อ/ส่วนชัดเจน — แนะนำอันดับแรก ตามความยาวของเนื้อหาแต่ละส่วน 
Semantic เนื้อหาเปลี่ยนหัวข้อบ่อย ไม่มีรูปแบบตายตัว ดู [[Semantic Document Chunking]] 
 
💻 โค้ด — Structure-Based + Semantic Hybrid
 
python
  
from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter
from langchain_core.documents import Document

def smart_split(text: str, max_size: int = 1000):
    """
    ขั้นที่ 1: แบ่งตามหัวข้อก่อน
    ขั้นที่ 2: ถ้าส่วนไหนยาวเกินไป → แบ่งย่อยต่อ
    """
    
    # แบ่งตามหัวข้อ Markdown
    header_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[("#", "Header 1"), ("##", "Header 2"), ("###", "Header 3")]
    )
    sections = header_splitter.split_text(text)
    
    # แบ่งส่วนที่ยาวเกิน
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=max_size,
        chunk_overlap=100,
        separators=["\n\n", "\n", "。", " ", ""],  # เพิ่ม "。" สำหรับภาษาไทย
        is_separator_regex=False
    )
    
    final_chunks = []
    for sec in sections:
        if len(sec.page_content) <= max_size:
            final_chunks.append(sec)
        else:
            sub_chunks = text_splitter.split_documents([sec])
            final_chunks.extend(sub_chunks)
    
    return final_chunks
 
 
 
 
🔤 Stage 4: Embedding — แปลงเป็นเวกเตอร์
 
🧠 เลือกโมเดล Embedding
 
โมเดล ภาษาไทย ขนาด มิติ แหล่งดาวน์โหลด 
BAAI/bge-small-zh-v1.5 ⭐ ดีมาก 137MB 384 Hugging Face / Ollama 
paraphrase-multilingual-MiniLM-L12-v2 ดี 470MB 384 Hugging Face 
sentence-transformers/all-MiniLM-L6-v2 ปานกลาง 80MB 384 Hugging Face 
nomic-embed-text ปานกลาง 137MB 768 Ollama 
 
💡 ภาษาไทยสำคัญมาก: ใช้โมเดลที่ฝึกด้วยข้อมูลภาษาไทยผสมอยู่ — ผลลัพธ์ต่างกันมาก
 
💻 โค้ดสร้าง Embedding
 
python
  
from langchain_huggingface import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-zh-v1.5",  # หรือ nomic-embed-text
    model_kwargs={'device': 'cpu'},        # เปลี่ยนเป็น 'cuda' ถ้ามีการ์ดจอ
    encode_kwargs={'normalize_embeddings': True}
)

# ทดสอบ
text = "ทดสอบสร้างเวกเตอร์สำหรับเอกสารภาษาไทย"
vector = embedding_model.embed_query(text)
print(f"สร้างเวกเตอร์สำเร็จ: ขนาด {len(vector)} มิติ")
 
 
 
 
🗄️ Stage 5: Indexing & Storage — บันทึกลงฐานข้อมูลเวกเตอร์
 
📦 เลือกฐานข้อมูลเวกเตอร์
 
ฐานข้อมูล ความง่าย ขนาดข้อมูลที่เหมาะสม รองรับภาษาไทย 
ChromaDB ⭐ ง่ายที่สุด เล็ก–กลาง (<100K ก้อน) ✅ ดี 
FAISS ง่าย กลาง–ใหญ่ ✅ ดี 
Milvus ปานกลาง ใหญ่มาก (Enterprise) ✅ ดีมาก 
PGVector ปานกลาง ผสมกับข้อมูลอื่นใน PostgreSQL ✅ ดี 
 
💻 โค้ดบันทึกและสร้างดัชนี — ChromaDB
 
python
  
import chromadb
from chromadb.config import Settings
from uuid import uuid4

# เชื่อมต่อฐานข้อมูล
client = chromadb.PersistentClient(
    path="./vector_db",
    settings=Settings(anonymized_telemetry=False)
)

# สร้างคอลเลกชัน
collection = client.get_or_create_collection(
    name="knowledge_base",
    metadata={"description": "คลังความรู้ภายในองค์กร", "embedding_model": "bge-small-zh-v1.5"}
)

# เตรียมข้อมูลสำหรับบันทึก
documents = []
metadatas = []
ids = []
embeddings = []

for chunk in chunks:
    doc_id = str(uuid4())
    documents.append(chunk.page_content)
    metadatas.append({
        "source": chunk.metadata.get("source", "unknown"),
        "page": chunk.metadata.get("page", 0),
        "section": chunk.metadata.get("Header 2", "General")
    })
    ids.append(doc_id)
    embeddings.append(embedding_model.embed_documents([chunk.page_content])[0])

# บันทึกทั้งหมด
collection.add(
    documents=documents,
    metadatas=metadatas,
    ids=ids,
    embeddings=embeddings
)

print(f"✅ บันทึกสำเร็จ: {len(ids)} ก้อน")
 
 
 
 
🔍 Stage 6: Retrieval — ค้นหาข้อมูลที่เกี่ยวข้อง
 
✅ วิธีค้นหา
 
1. แปลงคำถามของผู้ใช้เป็นเวกเตอร์ด้วยโมเดล Embedding ตัวเดียวกัน
2. ค้นหาก้อนเอกสารที่มีความคล้ายคลึงมากที่สุด (Cosine Similarity)
3. กรองด้วยเงื่อนไขเพิ่มเติม เช่น วันที่, แหล่งที่มา, ประเภทเอกสาร
4. จัดอันดับใหม่ด้วย Reranker เพื่อความแม่นยำสูงขึ้น 
 
💻 โค้ดค้นหา
 
python
  
def retrieve(query: str, collection, top_k: int = 5):
    """ค้นหาก้อนเอกสารที่เกี่ยวข้องที่สุด"""
    
    # แปลงคำถามเป็นเวกเตอร์
    query_embedding = embedding_model.embed_query(query)
    
    # ค้นหา
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )
    
    return results["documents"][0], results["metadatas"][0], results["distances"][0]
 
 
 
 
💬 Stage 7: Generation — สร้างคำตอบด้วย LLM
 
✅ รูปแบบพร้อมท์
 
plaintext
  
คุณเป็นผู้ช่วยที่ซื่อสัตย์ ตอบคำถามโดยอาศัยเฉพาะข้อมูลที่ให้ไว้ด้านล่างนี้เท่านั้น
หากไม่มีข้อมูลที่เกี่ยวข้อง ให้ตอบว่า "ไม่พบข้อมูลที่เกี่ยวข้องในเอกสาร"
ห้ามประมวลผลหรือสร้างข้อมูลที่ไม่มีอยู่ในบริบท

=== ข้อมูลอ้างอิง ===
{นำก้อนเอกสารที่ค้นหาได้มาใส่ตรงนี้}
====================

คำถาม: {คำถามของผู้ใช้}
คำตอบ:
 
 
💻 โค้ดเรียกใช้ LLM (Ollama)
 
python
  
import requests

def generate_answer(query: str, context_docs: list):
    """สร้างคำตอบจากบริบทที่ค้นหาได้"""
    
    context = "\n\n---\n\n".join(context_docs)
    
    prompt = f"""คุณเป็นผู้ช่วยที่ซื่อสัตย์ ตอบคำถามโดยอาศัยเฉพาะข้อมูลที่ให้ไว้ด้านล่างนี้เท่านั้น
หากไม่มีข้อมูลที่เกี่ยวข้อง ให้ตอบว่า "ไม่พบข้อมูลที่เกี่ยวข้องในเอกสาร"
ห้ามสร้างข้อมูลที่ไม่มีอยู่ในบริบท

=== ข้อมูลอ้างอิง ===
{context}
====================

คำถาม: {query}
คำตอบ:"""

    resp = requests.post("http://localhost:11434/api/generate", json={
        "model": "qwen2.5:7b",
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.1}
    })
    
    return resp.json()["response"]
 
 
 
 
🚀 ทั้งหมดรวมกัน — Pipeline ฉบับสมบูรณ์
 
python
  
def process_document_pipeline(file_path: str, collection):
    """
    Pipeline เต็ม: อ่าน → ทำความสะอาด → แบ่ง → สร้างเวกเตอร์ → บันทึก
    """
    print(f"📥 กำลังประมวลผล: {file_path}")
    
    # Stage 1: อ่านไฟล์
    raw_text = load_file(file_path)
    print(f"   ✅ อ่านสำเร็จ: {len(raw_text)} ตัวอักษร")
    
    # Stage 2: ทำความสะอาด
    cleaned = clean_text(raw_text)
    print(f"   ✅ ทำความสะอาดแล้ว")
    
    # Stage 3: แบ่งก้อน
    chunks = smart_split(cleaned)
    print(f"   ✅ แบ่งเป็น {len(chunks)} ก้อน")
    
    # เพิ่ม metadata
    file_name = Path(file_path).name
    for chunk in chunks:
        chunk.metadata["source"] = file_name
    
    # Stage 4 & 5: สร้างเวกเตอร์และบันทึก
    documents = [c.page_content for c in chunks]
    metadatas = [c.metadata for c in chunks]
    ids = [str(uuid4()) for _ in chunks]
    embeddings = [embedding_model.embed_documents([c.page_content])[0] for c in chunks]
    
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids,
        embeddings=embeddings
    )
    
    print(f"   ✅ บันทึกลงฐานข้อมูลสำเร็จ\n")
    return len(chunks)
 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้ไข
 
ปัญหา สาเหตุ วิธีแก้ 
❌ ค้นหาไม่เจอ แม้ว่าจะมีข้อมูลจริง Embedding ไม่ตรงภาษา / Chunk ใหญ่เกินไป ใช้โมเดลที่รองรับไทย, ลดขนาดก้อน 
❌ ตอบผิด/สร้างเรื่องขึ้นมา พร้อมท์ไม่เข้มงวด / ดึงข้อมูลไม่ตรง เข้มงวดใน System Prompt, เพิ่ม Reranker 
🐢 ประมวลผลช้ามาก ประมวลผลทีละก้อน ไม่ได้แบทช์ ประมวลผลแบบกลุ่ม 10–50 ก้อนต่อครั้ง 
📄 ตาราง/ข้อมูลแปลงเพี้ยน ใช้ PDF ที่สแกนเป็นภาพ ใช้ OCR ที่มีชุดภาษาไทย หรือใช้ PDFPlumber 
📐 ก้อนเล็ก/ใหญ่เกินไป ค่า threshold ไม่เหมาะสม ปรับ Semantic Chunking threshold 90–95 
 
 
 
✅ Checklist Pipeline พร้อมใช้งานจริง
 
รองรับประเภทไฟล์ที่ต้องการ ✅
ทดสอบ OCR กับเอกสารภาษาไทย ✅
เลือกโมเดล Embedding ที่รองรับภาษาไทย ✅
มีขั้นตอนทำความสะอาดข้อความ ✅
ใช้ Hybrid Chunking (Structure + Semantic) ✅
บันทึกแหล่งที่มาและหน้าใน Metadata ✅
ทดสอบค้นหาและตรวจสอบความถูกต้อง ✅
มีระบบบันทึกประวัติการประมวลผล ✅
มีขั้นตอนอัปเดต/ลบเอกสารเมื่อมีการแก้ไข  ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Semantic Document Chunking]] — วิธีแบ่งเอกสารตามความหมายละเอียด
- [[RAG Systems]] — ภาพรวมระบบดึงข้อมูลเชิงความหมาย
- [[Vector Databases]] — เปรียบเทียบและติดตั้งฐานข้อมูลเวกเตอร์
- [[Local LLM]] — รันทั้งระบบในเครื่องโดยไม่ต้องอินเทอร์เน็ต
- [[Docker Deployment]] — บรรจุทั้ง Pipeline ลงคอนเทนเนอร์
 
 
 
✅ สรุปสั้นๆ: Pipeline ที่ดี = ข้อมูลสะอาด + แบ่งถูกที่ + Embedding ถูกต้อง + ค้นหาแม่นยำ + พร้อมท์เข้มงวด — ปรับแต่งทีละส่วน เริ่มจากเอกสารไม่กี่ฉบับก่อนจะช่วยให้เห็นปัญหาได้เร็วที่สุดครับ 😊
 
ต้องการเพิ่มฟีเจอร์อะไรต่อไหมครับ เช่น ระบบอัปโหลดไฟล์อัตโนมัติ, ตรวจสอบเอกสารซ้ำ, หรือประเมินคุณภาพการค้นหา 😊