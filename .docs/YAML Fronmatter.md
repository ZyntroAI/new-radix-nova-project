YAML Frontmatter คือบล็อกข้อมูลเชิงโครงสร้าง (Metadata) ที่มักเขียนไว้ที่ ส่วนหัวสุดของไฟล์ Markdown (หรือไฟล์ static site generator อื่นๆ) โดยล้อมด้วยเครื่องหมาย --- ด้านบนและด้านล่าง เพื่อบอกรายละเอียด หรือตั้งค่าให้กับไฟล์นั้นๆ
โครงสร้างและรูปแบบพื้นฐาน
---
title: "แนวทางการทดสอบเว็บอีคอมเมิร์ซด้วย Playwright"
date: 2026-10-03
tags:
  - testing
  - playwright
  - automation
draft: false
category: QA & Automation
---

ชนิดข้อมูลที่ใช้บ่อยใน YAML Frontmatter
 * String (ข้อความ):
   title: "หัวข้อบทความ"
author: 'John Doe'

 * Number (ตัวเลข):
   price: 1500
rating: 4.8

 * Boolean (ค่าจริง/เท็จ):
   published: true
featured: false

 * List / Array (รายการ):
   # แบบใช้ขีด
tags:
  - python
  - playwright

# แบบใช้วงเล็บปีกกา
categories: ["Testing", "DevOps"]

 * Nested Object (ข้อมูลเชิงซ้อน):
   seo:
  keywords: ["e-commerce", "automation"]
  description: "คู่มือการตั้งค่าทดสอบระบบสั่งซื้อ"

ตัวอย่างการประยุกต์ใช้งาน
1. สรุปผลการทดสอบ หรือ Log ระบบ (เช่น Playwright / Test Reports)
---
test_suite: "Checkout Flow Verification"
executed_at: 2026-10-03T16:30:00Z
environment: "staging"
total_tests: 12
passed: 11
failed: 1
failure_reason: "Timeout at selector [[add-to-cart-btn]]"
trace_file: "./traces/trace-checkout-fail.zip"
---

2. สำหรับ Obsidian / Note-Taking
---
aliases:
  - Playwright Console Debugging
  - Browser Console Capture
status: in-progress
related_project: crystalcastle
created: 2026-10-03
---

3. สำหรับ Static Site Generators (Hugo, Jekyll, Astro, Next.js MDX)
---
title: "วิธีตรวจสอบ Browser Console ด้วย Playwright"
description: "ดึง log และ error จากหน้าเว็บมาวิเคราะห์อัตโนมัติ"
date: 2026-10-03
layout: post
cover_image: "/images/playwright-console.png"
---

ต้องการนำ YAML Frontmatter ไปใช้ร่วมกับระบบไหนเป็นพิเศษหรือไม่ครับ? (เช่น อ่านค่าใน Python, ใช้จัดเก็บ Note ใน Obsidian หรือใช้ร่วมกับ Static Site Generator)
