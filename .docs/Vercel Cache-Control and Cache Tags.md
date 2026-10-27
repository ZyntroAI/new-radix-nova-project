---
id: vercel-cache-control-and-cache-tags
title: Vercel Cache-Control and Cache Tags
aliases:
  - Vercel CDN Caching
  - Vercel Cache Invalidation Strategy
  - Cache-Control with Vercel-Cache-Tag
  - Vercel API Response Caching
type: guide
domain: vercel
status: active
owner: engineering
risk: high
review_cycle: quarterly
last_reviewed: 2026-09-30
created: 2026-09-30
updated: 2026-09-30
tags:
  - vercel
  - caching
  - cdn
  - cache-control
  - cache-tags
  - performance
  - cost-control
  - security
  - ai-agents
related:
  - "[[Vercel Cache Invalidation]]"
  - "[[Rate Limiting and Cost Control]]"
  - "[[REST API Documentation Cron Job]]"
  - "[[Approval Rules]]"
  - "[[Vercel Deployment Workflow]]"
  - "[[Security Policy]]"
---

# Vercel Cache-Control and Cache Tags

> [!summary]
> ใช้ `Cache-Control` เพื่อกำหนดอายุ cache ของ browser และ CDN  
> ใช้ `Vercel-CDN-Cache-Control` เมื่อ browser และ Vercel CDN ต้องใช้ TTL ต่างกัน  
> ใช้ `Vercel-Cache-Tag` เพื่อ invalidate เฉพาะกลุ่ม response เมื่อข้อมูลเปลี่ยน
>
> ใช้ shared CDN cache ได้เฉพาะ response แบบ public, safe-to-share และไม่ขึ้นกับ
> user, session, authorization, tenant, PII หรือข้อมูล admin

[[vercel]] [[caching]] [[cdn]] [[cache-control]] [[cache-tags]] [[performance]] [[cost-control]]

## Purpose

กำหนดแนวทาง cache HTTP response บน Vercel เพื่อ:

- ลด Vercel Function invocations และ compute cost
- ลด latency สำหรับผู้ใช้ทั่วโลก
- ลด database และ third-party API calls ที่ซ้ำกัน
- ทำให้ public content อัปเดตได้รวดเร็วผ่าน tag invalidation
- ป้องกันการ cache ข้อมูลผิด scope หรือข้อมูล sensitive
- ทำให้ AI Agent สามารถเสนอ cache policy ได้อย่างเป็นระบบและปลอดภัย

## Scope

เอกสารนี้ใช้กับ:

- Public `GET` และ `HEAD` responses
- Vercel Functions
- Next.js Route Handlers
- REST API documentation
- OpenAPI documentation
- Public content, catalog, status และ read-only endpoints
- CDN cache invalidation ผ่าน Vercel Cache Tags

เอกสารนี้ไม่ใช้กับ:

- user-specific dashboard
- authenticated API response
- admin API
- mutation endpoint เช่น `POST`, `PUT`, `PATCH`, `DELETE`
- webhook endpoint
- cron endpoint
- responses ที่มี session, cookie, authorization-specific data
- PII, secrets, private tenant data หรือ financial information

## Core Principles

1. **Cache only safe shared responses**  
   Shared CDN cache ใช้ได้เฉพาะ response ที่ทุกคนควรเห็นเหมือนกัน

2. **Use the smallest correct scope**  
   Cache tag และ purge scope ต้องเล็กที่สุดเท่าที่ทำได้

3. **Prefer invalidation over short TTLs**  
   สำหรับข้อมูลที่มี event update ชัดเจน ให้ใช้ TTL ที่สมเหตุสมผลและ invalidate
   เมื่อ data เปลี่ยน แทนการตั้ง TTL สั้นเกินไปจนเสียประโยชน์ของ cache

4. **Separate browser and CDN requirements**  
   Browser ต้องการ freshness ที่ต่างจาก CDN ได้ จึงใช้
   `Vercel-CDN-Cache-Control` เพื่อแยก policy

5. **Fail closed for sensitive data**  
   หากไม่แน่ใจว่า response public จริงหรือไม่ ให้ใช้ `private, no-store`

6. **Validate after deployment**  
   ต้องตรวจ header, `x-vercel-cache`, เนื้อหา และ authorization behavior
   หลัง deploy หรือเปลี่ยน cache policy

7. **Cache policy changes are production changes**  
   การเปลี่ยน TTL, tags, purge behavior หรือ shared-cache scope ต้องผ่าน
   [[Approval Rules]] ตามระดับความเสี่ยง

## Cache Layers

| Layer | Controlled By | Purpose | Example |
|---|---|---|---|
| Browser cache | `Cache-Control: max-age` | ลด request ซ้ำจาก browser เดิม | `max-age=60` |
| Vercel CDN cache | `s-maxage` หรือ `Vercel-CDN-Cache-Control` | ลด Function invocation และ origin fetch | `s-maxage=300` |
| Stale serving | `stale-while-revalidate` | ส่ง response เก่าระหว่าง refresh แบบ background | `stale-while-revalidate=900` |
| Tag invalidation | `Vercel-Cache-Tag` | Refresh content ก่อน TTL หมด | `products,storefront` |
| Next.js Data Cache | `revalidateTag`, `revalidatePath` | Refresh fetched data หรือ route data | `revalidateTag("products")` |
| Runtime cache | Vercel Runtime Cache or external store | ลด query/compute ซ้ำใน function | query result cache |

> [!important]
> `Vercel-Cache-Tag` ใช้กับ CDN response cache  
> `revalidateTag()` ของ Next.js ใช้กับ Next.js Data Cache  
> ระบบที่ใช้ทั้งสอง layer อาจต้อง invalidate ทั้งสองส่วนเพื่อให้ข้อมูลใหม่แสดงครบ

## Header Priority

Vercel ใช้ policy สำหรับ CDN ตามลำดับนี้:

1. `Vercel-CDN-Cache-Control`
2. `CDN-Cache-Control`
3. `Cache-Control`

ใช้ `Vercel-CDN-Cache-Control` เมื่อ CDN ต้อง cache นานกว่า browser
หรือเมื่อไม่ต้องการให้ directive สำหรับ shared cache ถูกส่งให้ browser โดยตรง

## Safe Default

หากไม่สามารถยืนยันได้ว่า response เป็น public และเหมือนกันสำหรับทุกผู้ใช้:

```http
Cache-Control: private, no-store