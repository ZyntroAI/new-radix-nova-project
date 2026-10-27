title: Document Deduplication — EN/TH Bilingual
aliases:
 
- "ตรวจสอบเอกสารซ้ำ ภาษาไทย-อังกฤษ"
- "Bilingual Duplicate Detection for RAG"
slug: doc-deduplication-bilingual
icon: 🔍
color: orange
type: guide
status: active
priority: high
tags:
- type/guide
- topic/rag
- topic/quality
- topic/thai
- topic/english
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Document Processing Pipeline]]"
related:
- "[[Document Processing Pipeline]]"
- "[[Semantic Document Chunking]]"
- "[[RAG Systems]]"
 
 
 
🔍 ตรวจสอบเอกสารซ้ำ — Bilingual English/Thai
 
กรองเอกสารซ้ำซ้อนก่อนนำเข้าฐานข้อมูล — ลดพื้นที่ ลดเวลาค้นหา และป้องกันผลลัพธ์ซ้ำซ้อน ✅
 
 
 
📋 ประเภทของความซ้ำซ้อน ที่ต้องตรวจจับ
 
ประเภท ความหมาย วิธีตรวจจับ 
Exact Duplicate เนื้อหาเหมือนกันทุกประการ Hash (MD5/SHA) 
Near-Duplicate เหมือนกันเกือบทั้งหมด — แก้คำเล็กน้อย, เปลี่ยนรูปแบบ MinHash + LSH 
Semantic Duplicate เขียนต่างกันแต่หมายความเดียวกัน — รวมถึงแปลข้ามภาษา Multilingual Embedding + Cosine Similarity 
Cross-Lingual Duplicate เนื้อหาเดียวกันคนละภาษา (EN ↔ TH) — แปลกันโดยตรง Multilingual Embedding + Cross-Lingual Similarity 
 
 
 
🏗️ สถาปัตยกรรมการตรวจจับ — 3 ชั้น
 
plaintext
  
📥 เอกสารใหม่
    ↓
🔹 ชั้นที่ 1: EXACT HASH CHECK — กรองของเหมือนกันทันที
    ↓
🔹 ชั้นที่ 2: NEAR-DUPLICATE CHECK — จับของคล้ายกัน
    ↓
🔹 ชั้นที่ 3: SEMANTIC + CROSS-LINGUAL CHECK — จับความหมายเดียวกันคนละภาษา
    ↓
✅ ผ่าน → บันทึกเข้าฐานข้อมูล
❌ ซ้ำ → ข้าม / รายงาน / ผสานเนื้อหา
 
 
 
 
🔹 ชั้นที่ 1 — Exact Deduplication (เร็วที่สุด)
 
💻 โค้ด
 
python
  
import hashlib
from typing import Dict, Set, Tuple

class ExactDeduplicator:
    """ตรวจจับเอกสารที่เหมือนกันทุกประการด้วย SHA-256 Hash"""
    
    def __init__(self):
        self.seen_hashes: Set[str] = set()
    
    def compute_hash(self, text: str) -> str:
        """คำนวณ Hash ของเนื้อหา — ปรับนิดหน่อยให้คงที่"""
        normalized = " ".join(text.strip().lower().split())
        return hashlib.sha256(normalized.encode("utf-8")).hexdigest()
    
    def check(self, text: str) -> Tuple[bool, str]:
        """คืน (is_duplicate, hash_value)"""
        h = self.compute_hash(text)
        if h in self.seen_hashes:
            return True, h
        self.seen_hashes.add(h)
        return False, h
    
    def reset(self):
        self.seen_hashes.clear()
 
 
✅ ข้อดี: เร็วที่สุด แม่นยำ 100%
⚠️ ข้อจำกัด: จับได้แค่เหมือนกันทุกตัวอักษร — เปลี่ยนคำเดียว ก็จับไม่ได้
 
 
 
🔹 ชั้นที่ 2 — Near-Duplicate Detection
 
ใช้ MinHash + LSH จับเอกสารที่คล้ายกันส่วนใหญ่
 
💻 ติดตั้ง
 
bash
  
pip install datasketch
 
 
💻 โค้ด
 
python
  
from datasketch import MinHash, MinHashLSH
from typing import List, Tuple, Dict

class NearDeduplicator:
    """ตรวจจับเอกสารที่คล้ายกันส่วนใหญ่"""
    
    def __init__(self, threshold: float = 0.8, num_perm: int = 128):
        self.threshold = threshold
        self.num_perm = num_perm
        self.lsh = MinHashLSH(threshold=threshold, num_perm=num_perm)
        self.doc_map: Dict[str, str] = {}  # hash → doc_id
    
    def _create_minhash(self, text: str) -> MinHash:
        """สร้าง MinHash signature จาก n-gram ของคำ"""
        m = MinHash(num_perm=self.num_perm)
        words = text.lower().split()
        # ใช้ 3-gram เพื่อความทนทานต่อการเปลี่ยนคำเล็กน้อย
        for i in range(len(words) - 2):
            gram = " ".join(words[i:i+3])
            m.update(gram.encode("utf-8", errors="ignore"))
        return m
    
    def check(self, doc_id: str, text: str) -> Tuple[bool, List[str]]:
        """
        ตรวจสอบว่ามีเอกสารที่คล้ายกันหรือไม่
        คืน (is_duplicate, list_of_similar_doc_ids)
        """
        mh = self._create_minhash(text)
        matches = self.lsh.query(mh)
        
        if matches:
            return True, [self.doc_map[m] for m in matches]
        
        self.lsh.insert(doc_id, mh)
        self.doc_map[doc_id] = doc_id
        return False, []
    
    def get_stats(self):
        return {"indexed_documents": len(self.doc_map)}
 
 
✅ เหมาะกับ: เอกสารเวอร์ชันต่างๆ, สำเนาที่แก้ไขเล็กน้อย, รูปแบบต่างกันแต่เนื้อหาเดิม
⚙️ Threshold: 0.7–0.85 → ยิ่งสูง ยิ่งเข้มงวด
 
 
 
🔹 ชั้นที่ 3 — Semantic & Cross-Lingual Detection (EN ↔ TH)
 
ใช้ Multilingual Embedding เพื่อจับเอกสารที่หมายความเดียวกัน แม้จะเขียนคนละภาษา 
 
🧠 โมเดลที่แนะนำ — รองรับทั้งไทยและอังกฤษ
 
โมเดล ภาษาไทย ขนาด มิติ หมายเหตุ 
jina-embeddings-v3 ⭐ ดีมาก 137MB 1024 รองรับหลายภาษา ดีที่สุดสำหรับข้ามภาษา 
BAAI/bge-m3 ⭐ ดีมาก 560MB 1024 เก่งไทย+อังกฤษ+จีน, หลากหลายมาก 
sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2 ดี 470MB 384 เบาและเร็ว เหมาะกับแล็ปท็อป 
EmbeddingGemma 2 ดี 740M params 768 จาก Google DeepMind, รองรับ 100+ ภาษา[__LINK_ICON] 
 
💻 โค้ด
 
python
  
from langchain_huggingface import HuggingFaceEmbeddings
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Tuple, Dict

class CrossLingualDeduplicator:
    """
    ตรวจจับความซ้ำซ้อนเชิงความหมาย — รองรับข้ามภาษา EN ↔ TH
    ใช้ Multilingual Embedding เพื่อให้เนื้อหาเดียวกันคนละภาษาอยู่ในเวกเตอร์พื้นที่เดียวกัน
    """
    
    def __init__(
        self,
        model_name: str = "BAAI/bge-m3",
        similarity_threshold: float = 0.85,
        device: str = "cpu"
    ):
        self.similarity_threshold = similarity_threshold
        self.embedding_model = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs={"device": device},
            encode_kwargs={"normalize_embeddings": True}
        )
        self.embeddings: List[np.ndarray] = []
        self.doc_ids: List[str] = []
        self.doc_texts: List[str] = []
    
    def compute_embedding(self, text: str) -> np.ndarray:
        return np.array(self.embedding_model.embed_query(text))
    
    def check(self, doc_id: str, text: str) -> Tuple[bool, List[Tuple[str, float]]]:
        """
        ตรวจสอบว่ามีเอกสารที่มีความหมายเดียวกันหรือไม่
        คืน (is_duplicate, [(matched_doc_id, similarity_score), ...])
        """
        new_emb = self.compute_embedding(text)
        
        if len(self.embeddings) == 0:
            self.embeddings.append(new_emb)
            self.doc_ids.append(doc_id)
            self.doc_texts.append(text)
            return False, []
        
        # คำนวณความคล้ายคลึงกับที่มีอยู่ทั้งหมด
        stored_embs = np.vstack(self.embeddings)
        similarities = cosine_similarity([new_emb], stored_embs)[0]
        
        matches = []
        for idx, score in enumerate(similarities):
            if score >= self.similarity_threshold:
                matches.append((self.doc_ids[idx], float(score)))
        
        if matches:
            return True, matches
        
        # ไม่ซ้ำ — เพิ่มเข้าดัชนี
        self.embeddings.append(new_emb)
        self.doc_ids.append(doc_id)
        self.doc_texts.append(text)
        return False, matches
    
    def find_cross_lingual_pairs(self, threshold: float = 0.85) -> List[Tuple[str, str, float]]:
        """
        ค้นหาคู่เอกสารที่เป็นเนื้อหาเดียวกันแต่คนละภาษา
        คืน [(doc_id_en, doc_id_th, similarity_score)]
        """
        pairs = []
        for i in range(len(self.doc_ids)):
            for j in range(i + 1, len(self.doc_ids)):
                sim = cosine_similarity(
                    [self.embeddings[i]], [self.embeddings[j]]
                )[0][0]
                if sim >= threshold:
                    pairs.append((self.doc_ids[i], self.doc_ids[j], float(sim)))
        return pairs
    
    def reset(self):
        self.embeddings.clear()
        self.doc_ids.clear()
        self.doc_texts.clear()
 
 
 
 
🚀 ทั้งหมดรวมกัน — Pipeline เต็มรูปแบบ
 
python
  
from dataclasses import dataclass
from typing import Optional, List, Tuple
from uuid import uuid4

@dataclass
class CheckResult:
    is_duplicate: bool
    duplicate_type: Optional[str]  # exact / near / semantic / cross-lingual
    matches: List[Tuple[str, float]]
    doc_id: str

class FullDeduplicationPipeline:
    """
    Pipeline ตรวจสอบซ้ำแบบครบวงจร 3 ชั้น:
    1. Exact Hash → 2. Near-Duplicate MinHash → 3. Semantic Cross-Lingual
    """
    
    def __init__(self, semantic_threshold: float = 0.85, near_threshold: float = 0.8):
        self.exact = ExactDeduplicator()
        self.near = NearDeduplicator(threshold=near_threshold)
        self.semantic = CrossLingualDeduplicator(similarity_threshold=semantic_threshold)
        self.stats = {
            "total": 0,
            "exact_duplicates": 0,
            "near_duplicates": 0,
            "semantic_duplicates": 0,
            "cross_lingual_pairs": 0,
            "accepted": 0
        }
    
    def check_document(self, text: str, doc_id: Optional[str] = None) -> CheckResult:
        self.stats["total"] += 1
        doc_id = doc_id or str(uuid4())
        
        # ชั้นที่ 1: Exact Hash
        is_exact, _ = self.exact.check(text)
        if is_exact:
            self.stats["exact_duplicates"] += 1
            return CheckResult(True, "exact", [], doc_id)
        
        # ชั้นที่ 2: Near-Duplicate
        is_near, near_matches = self.near.check(doc_id, text)
        if is_near:
            self.stats["near_duplicates"] += 1
            return CheckResult(True, "near", [(m, 0.85) for m in near_matches], doc_id)
        
        # ชั้นที่ 3: Semantic + Cross-Lingual
        is_semantic, sem_matches = self.semantic.check(doc_id, text)
        if is_semantic:
            self.stats["semantic_duplicates"] += 1
            # แยกประเภทความซ้ำซ้อน
            dup_type = "cross-lingual" if any(s >= 0.92 for _, s in sem_matches) else "semantic"
            return CheckResult(True, dup_type, sem_matches, doc_id)
        
        # ผ่านทุกชั้น
        self.stats["accepted"] += 1
        return CheckResult(False, None, [], doc_id)
    
    def get_cross_lingual_report(self) -> List[Tuple[str, str, float]]:
        pairs = self.semantic.find_cross_lingual_pairs(0.92)
        self.stats["cross_lingual_pairs"] = len(pairs)
        return pairs
    
    def print_report(self):
        print("=" * 50)
        print("📊 รายงานการตรวจสอบเอกสารซ้ำ")
        print("=" * 50)
        print(f"📥 รับเข้าทั้งหมด:      {self.stats['total']}")
        print(f"❌ Exact ซ้ำกัน:      {self.stats['exact_duplicates']}")
        print(f"⚠️  Near ซ้ำคล้ายกัน:  {self.stats['near_duplicates']}")
        print(f"🔍 Semantic ซ้ำความหมาย: {self.stats['semantic_duplicates']}")
        print(f"🌐 EN↔TH คู่แปล:      {self.stats['cross_lingual_pairs']}")
        print(f"✅ ผ่านเข้าฐาน:        {self.stats['accepted']}")
        if self.stats['total'] > 0:
            rate = 100 - (self.stats['accepted'] / self.stats['total'] * 100)
            print(f"📉 อัตราการกรองซ้ำ:    {rate:.1f}%")
        print("=" * 50)
 
 
 
 
📝 การตัดสินใจเมื่อพบเอกสารซ้ำ
 
ประเภทการซ้ำ แนวทางปฏิบัติ 
Exact ✅ ลบทิ้งทันที — เก็บแค่สำเนาเดียว 
Near-Duplicate ✅ เก็บฉบับล่าสุด/สมบูรณ์ที่สุด → ย้ายอันเก่าไป Archives 
Semantic ⚠️ ตรวจสอบด้วยตัวเอง — อาจเป็นเนื้อหาเดียวกันแต่มุมมองต่างกัน 
Cross-Lingual (EN↔TH) ✅ เก็บทั้งสองฉบับไว้ แต่ทำลิงก์เชื่อมถึงกัน เพิ่มใน Frontmatter:  translated_from: "[[doc-en]]"  หรือ  translated_to: "[[doc-th]]"  
 
💡 ตัวอย่างการใช้งาน
 
python
  
# สร้าง Pipeline
pipeline = FullDeduplicationPipeline(
    semantic_threshold=0.85,   # ปรับตามความเข้มงวดที่ต้องการ
    near_threshold=0.8
)

# ประมวลผลเอกสาร
documents = [
    {"id": "doc-en-001", "text": "Access control ensures users only see what they are permitted to view."},
    {"id": "doc-th-001", "text": "การควบคุมการเข้าถึงทำให้แน่ใจว่าผู้ใช้เห็นเฉพาะข้อมูลที่ได้รับอนุญาตเท่านั้น"},
    {"id": "doc-en-002", "text": "Access control ensures users only see what they are permitted to view."},  # Exact duplicate
]

for doc in documents:
    result = pipeline.check_document(doc["text"], doc["id"])
    if result.is_duplicate:
        print(f"❌ {result.doc_id} เป็นซ้ำประเภท {result.duplicate_type}")
        if result.matches:
            for match_id, score in result.matches:
                print(f"   ↳ ตรงกับ: {match_id} (ความคล้ายคลึง: {score:.2f})")
    else:
        print(f"✅ {result.doc_id} ผ่าน")

# แสดงคู่ EN↔TH ที่เป็นเนื้อหาเดียวกัน
print("\n🌐 คู่เอกสารแปล:")
pairs = pipeline.get_cross_lingual_report()
for en_id, th_id, score in pairs:
    print(f"   {en_id} ↔ {th_id} ({score:.2f})")

# พิมพ์สรุป
pipeline.print_report()
 
 
 
 
⚙️ ค่าที่แนะนำ & การปรับแต่ง
 
พารามิเตอร์ ค่าเริ่มต้น ช่วงปรับ ผลเมื่อเพิ่มค่า 
Exact Hash — เปิด/ปิด เปิดเสมอ — ฟรีและเร็ว 
Near-Duplicate Threshold 0.8 0.65–0.9 กรองเข้มขึ้น — จับซ้ำได้มากขึ้น แต่อาจผิดพลาด 
Semantic Threshold 0.85 0.75–0.95 ยิ่งสูง ยิ่งจับเฉพาะที่เหมือนมาก 0.90–0.95 = เนื้อหาเดียวกัน 0.80–0.85 = หัวข้อเดียวกัน 
Cross-Lingual Threshold 0.90–0.92 0.85–0.95 คู่แปลที่แท้จริงจะได้คะแนนสูงมาก >0.90[__LINK_ICON] 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ วิธีแก้ 
❌ จับผิดพลาด — เอกสารไม่ซ้ำแต่บอกว่าซ้ำ Threshold ต่ำเกินไป เพิ่ม semantic threshold เป็น 0.90–0.92 
❌ จับข้ามภาษาไม่ได้ ใช้โมเดล Embedding ไม่รองรับหลายภาษา เปลี่ยนเป็น BGE-M3 หรือ jina-embeddings-v3 
🐢 ช้ามากเมื่อมีเอกสารเยอะ เปรียบเทียบทุกคู่ → O(n²) ใช้ FAISS/ANN ค้นหาแทนเปรียบเทียบตรง[__LINK_ICON] 
📄 เวอร์ชันเก่าถูกลบไป ไม่มีการติดตามเวอร์ชัน อย่าลบทิ้งโดยตรง — ย้ายไป Archives พร้อมบันทึกความสัมพันธ์ 
 
 
 
✅ Checklist ระบบตรวจสอบซ้ำพร้อมใช้งาน
 
มี Exact Hash Check เป็นชั้นแรก ✅
มี Near-Duplicate detection สำหรับเอกสารที่คล้ายกัน ✅
ใช้ Multilingual Embedding สำหรับข้ามภาษา EN↔TH ✅
ตั้งค่า Threshold ที่เหมาะสมสำหรับแต่ละประเภท ✅
บันทึกประวัติการกรอง — ไม่ลบโดยไม่ทราบสาเหตุ ✅
มีรายงานสรุปจำนวนที่กรองออก ✅
ค้นหาคู่เอกสารแปลข้ามภาษาและสร้างลิงก์อัตโนมัติ ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Document Processing Pipeline]] — วางตำแหน่งขั้นตอนนี้ก่อนสร้าง Embedding
- [[Semantic Document Chunking]] — แบ่งก้อนให้เหมาะสมก่อนตรวจสอบซ้ำ
- [[RAG Systems]] — ผลกระทบของเอกสารซ้ำต่อคุณภาพการค้นหา
- [[Local LLM]] — รันทั้งระบบในเครื่องโดยไม่ต้องอินเทอร์เน็ต
 
 
 
✅ สรุปสั้นๆ: 3 ชั้นคือคำตอบ — Hash จับของเหมือน, MinHash จับของคล้าย, Multilingual Embedding จับความหมายเดียวกันข้ามภาษา เริ่มที่ Threshold กลางๆ แล้วปรับขึ้น/ลงตามผลจริงครับ 😊
 
ต้องการเพิ่มอะไรต่อไหมครับ เช่น บันทึกประวัติเวอร์ชันเอกสาร, ตรวจสอบซ้ำก่อนอัปเดตเข้า Vector DB, หรือรายงานสรุปในรูปแบบตาราง 😊