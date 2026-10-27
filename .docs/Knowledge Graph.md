เปลี่ยนเป็น Obsidian note พร้อม YAML ให้หน่อย

```markdown
---
title: "Knowledge Graph"
aliases:
  - "Knowledge Graph Overview"
  - "KG"
tags:
  - ai-engineering
  - knowledge-graph
  - rag
  - graphrag
created: 2026-10-27
status: evergreen
type: reference
---

# Knowledge Graph

**Knowledge Graph** คือโครงสร้างข้อมูลที่เก็บ **entities (nodes)** และ **relationships (edges)** เพื่อให้ระบบทำ **multi-hop reasoning, semantic search และ explainable retrieval** ได้ — เหมาะกับข้อมูลที่มีความสัมพันธ์ซับซ้อน เช่น องค์กร, ผลิตภัณฑ์, compliance, supply chain

## Core Concepts

| Concept | ใช้ทำอะไร |
|---|---|
| **Entity / Node** | คน / องค์กร / สินค้า / เหตุการณ์ |
| **Relationship / Edge** | ความสัมพันธ์ |
| **Triple** | subject–predicate–object |
| **Ontology** | Schema + rules |
| **Provenance** | แหล่งที่มา |

ใช้ 5 concept นี้เป็นฐาน

## Triple

```text
(Company A) —[acquired]→ (Company B)
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Subject** | Entity ต้นทาง |
| **Predicate** | ความสัมพันธ์ |
| **Object** | Entity ปลายทาง |
| **Typed edge** | จำกัดความหมาย |

ใช้ triple เพื่อ fact

## Ontology

```yaml
entities:
  - Person
  - Company
  - Product
relationships:
  - works_at
  - owns
  - acquired
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Entity types** | จำกัด node |
| **Relationship types** | จำกัด edge |
| **Constraints** | กัน invalid |
| **Reuse vocab** | ลด custom |

ใช้ ontology เพื่อ governance

## Graph Construction

```text
Source → Extract → Resolve → Link → Validate → Index
```

| ขั้น | ใช้ทำอะไร |
|---|---|
| **Extract** | Entity + relation |
| **Resolve** | Entity resolution |
| **Link** | เชื่อม node |
| **Validate** | ตรวจ schema |
| **Index** | Search |

ใช้ pipeline เพื่อ quality

## GraphRAG

```text
Query → Entity match → Graph traversal → Subgraph → LLM
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Vector entry** | หา starting node |
| **Traversal** | ตาม edge |
| **Subgraph** | Context |
| **Citation** | Provenance |

ใช้ GraphRAG เพื่อ multi-hop

## Query Patterns

| Pattern | ใช้เมื่อ |
|---|---|
| **Local search** | ถามเรื่อง entity เดียว |
| **Global search** | ถามภาพรวม |
| **Path traversal** | หาความเชื่อมโยง |
| **Community summary** | สรุปกลุ่ม |

ใช้ pattern ตามคำถาม

## Best Practices

- [ ] เริ่มจาก schema เล็ก
- [ ] ใช้ ontology จำกัด
- [ ] ใช้ entity resolution
- [ ] ใช้ provenance ทุก fact
- [ ] ใช้ hybrid vector + graph
- [ ] ใช้ validation
- [ ] ใช้ incremental update
- [ ] ทบทวน graph เป็นรอบ

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| Schema ใหญ่เกิน | ดูแลยาก | เริ่มเล็ก |
| ไม่มี provenance | ไม่น่าเชื่อ | เพิ่ม source |
| ไม่มี entity resolution | Node ซ้ำ | เพิ่ม resolution |
| ใช้ graph อย่างเดียว | หา entry ยาก | ใช้ hybrid |
| ไม่มี validation | Graph พัง | เพิ่ม validation |

## Checklist

- [ ] มี ontology
- [ ] มี entity types
- [ ] มี relationship types
- [ ] มี provenance
- [ ] มี entity resolution
- [ ] มี validation
- [ ] มี hybrid retrieval
- [ ] มี incremental update
- [ ] ทบทวน graph

## Related Notes

- [[MOC - AI Engineering]]
- [[RAG Architecture]]
- [[GraphRAG]]
- [[Vector Database]]
- [[MOC - Platform Engineering]]
- [[MOC - Obsidian]]
```

