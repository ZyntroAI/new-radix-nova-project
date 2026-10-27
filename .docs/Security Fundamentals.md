title: "Security Fundamentals — หลักการพื้นฐานความมั่นคง"
aliases:
 
- "พื้นฐานความปลอดภัยระบบสารสนเทศ"
- "InfoSec Basics"
slug: security-fundamentals
icon: 🔒
color: red
type: reference
status: active
priority: critical
tags:
- type/reference
- topic/security
- topic/devops
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent: []
children: []
related:
- "[[Authentication]]"
- "[[Incident Response]]"
- "[[JWT vs OAuth2]]"
 
 
 
🔒 Security Fundamentals — หลักการพื้นฐานที่ทุกคนต้องรู้
 
"ความปลอดภัยไม่ใช่ผลิตภัณฑ์ แต่เป็นกระบวนการ" — Bruce Schneier
 
 
 
🛡️ CIA Triad — หัวใจทั้งหมด
 
หลักการพื้นฐานที่สุดของความมั่นคงสารสนเทศ:
 
หลักการ ความหมาย ตัวอย่าง 
C — Confidentiality ความลับ ข้อมูลเข้าถึงได้เฉพาะผู้ที่มีสิทธิ์เท่านั้น เข้ารหัสข้อมูล, ล็อกอิน, สิทธิ์เข้าถึง 
I — Integrity ความถูกต้อง ข้อมูลไม่ถูกแก้ไขโดยไม่ได้รับอนุญาต Hash, Digital Signature, Checksums 
A — Availability พร้อมใช้งาน ระบบและข้อมูลพร้อมใช้งานเมื่อต้องการ สำรองข้อมูล, Load Balancer, DDoS Protection 
 
ทั้ง 3 ต้องสมดุลกัน — ป้องกันอย่างเดียวไม่พอ ต้องพร้อมใช้และเชื่อถือได้ด้วย ✅
 
 
 
🧑‍🤝‍🧑 AAA Model — การควบคุมการเข้าถึง
 
ขั้นตอน ความหมาย เครื่องมือ 
Authentication ยืนยันตัวตน คุณคือใคร? รหัสผ่าน, MFA, Token, ใบหน้า 
Authorization กำหนดสิทธิ์ คุณทำอะไรได้บ้าง? RBAC, ACL, Policy 
Accounting บันทึกการใช้งาน คุณทำอะไรไปเมื่อไหร่? Logs, Audit Trail 
 
 
 
⚠️ Common Threats — ภัยคุกคามที่พบบ่อยที่สุด
 
ภัยคุกคาม มันคืออะไร วิธีป้องกัน 
Phishing หลอกลวง ส่งข้อความหลอกให้เปิดลิงก์/ให้ข้อมูลส่วนตัว ฝึกอบรม, ตรวจสอบอีเมล, MFA 
Malware โปรแกรมอันตราย ไวรัส, แรนซัมแวร์, Trojan — แอบเข้ามาทำลาย อัปเดตซอฟต์แวร์, Antivirus, ไม่เปิดไฟล์แปลก 
SQL Injection แทรกคำสั่งเข้าไปใน Input เพื่อเข้าถึง/ทำลายฐานข้อมูล Parameterized Query, ORM, ตรวจสอบ Input 
XSS Cross-Site Scripting แทรกสคริปต์อันตรายลงในหน้าเว็บ Sanitize Input, Content Security Policy, HttpOnly Cookie 
CSRF Cross-Site Request Forgery หลอกให้ผู้ใช้ทำการโดยไม่รู้ตัวผ่านเว็บอื่น SameSite Cookie, CSRF Token, ตรวจสอบ Origin 
DDoS Distributed DoS ส่งคำขอมากจนระบบล่ม CDN/WAF, Rate Limiting, Scalable Infrastructure 
Man-in-the-Middle ดักจับข้อมูลระหว่างผู้ส่งและผู้รับ HTTPS/TLS, VPN, Certificate Validation 
Brute Force เดารหัสผ่านทีละคู่จนถูกต้อง รหัสผ่านยาว+, ล็อกบัญชี, Rate Limit, MFA 
 
 
 
🏰 Defense in Depth — ป้องกันหลายชั้น
 
❌ ไม่เคยเชื่อว่ากำแพงชั้นเดียวจะป้องกันได้ทั้งหมด — สร้างกำแพงหลายชั้น เหมือนปราสาท
 
plaintext
  
🌍 ภายนอก
    │
    ├─ 🔒 Network Security — Firewall, WAF, VPN
    │
    ├─ 🔑 Identity — MFA, Strong Password, SSO
    │
    ├─ 🛡️ Application — Input Validation, Encryption, Secure Headers
    │
    ├─ 💾 Data — Encryption at Rest, Backup, Access Logs
    │
    └─ 📚 People — Training, Awareness, Policies
 
 
ถ้าชั้นนอกพัง ชั้นในยังป้องกันได้ ✅
 
 
 
📏 Principles — หลักการสำคัญที่ต้องจำ
 
🔹 Least Privilege — ให้สิทธิน้อยที่สุดเท่าที่จำเป็น
 
ทุกคน/กระบวนการ มีสิทธิ์แค่ที่จำเป็นต้องใช้งานเท่านั้น — ไม่มากไม่น้อย
 
🔹 Separation of Duties — แบ่งหน้าที่กัน
 
คนเดียวไม่ควรมีอำนาจทั้งหมด เช่น คนจ่ายเงิน ≠ คนอนุมัติ
 
🔹 Zero Trust — ไม่เชื่อใคร ทั้งในและนอก
 
❌ "อย่าเชื่อว่าอยู่ในเครือข่ายแล้วปลอดภัย" — ✅ "ตรวจสอบทุกคน ทุกครั้ง จากทุกที่"
 
- Verify explicitly — ตรวจสอบชัดเจน
- Least privilege — สิทธิน้อยที่สุด
- Assume breach — ถือว่าถูกบุกรุกแล้ว วางแผนรับมือ
 
🔹 Fail Securely — เมื่อผิดพลาด ให้ปลอดภัย
 
ระบบล่ม/ผิดพลาด → ปิดการเข้าถึง ไม่เปิดให้เข้าได้
 
- ❌ ผิดพลาด → เปิดประตู = อันตราย
- ✅ ผิดพลาด → ปิดประตู = ปลอดภัย
 
🔹 KISS — Keep It Simple, Stupid
 
ระบบซับซ้อน = โอกาสผิดพลาดมากขึ้น = จุดอ่อนเพิ่มขึ้น — ทำให้ง่ายที่สุดเท่าที่ทำได้
 
🔹 Patch Management — อัปเดตเสมอ
 
ช่องโหว่ 90% มีแพตช์แก้ไขแล้วแต่ไม่ได้ติดตั้ง — อัปเดตเป็นประจำคือการป้องกันที่คุ้มค่าที่สุด 💰
 
 
 
🔐 Encryption — เข้ารหัสคือเกราะป้องกัน
 
ประเภท ใช้ทำอะไร ตัวอย่าง 
Encryption in Transit ขณะส่งผ่านเครือข่าย ป้องกันการดักจับข้อมูลระหว่างทาง TLS/HTTPS, SSH, VPN 
Encryption at Rest เมื่อเก็บอยู่กับที่ ป้องกันถ้าฮาร์ดดิสก์/เซิร์ฟเวอร์ถูกขโมย/เข้าถึง Database Encryption, BitLocker, S3 Encryption 
Hashing แปลงค่าไม่ย้อนกลับ ตรวจสอบความถูกต้องโดยไม่ต้องเห็นข้อมูลจริง bcrypt (รหัสผ่าน), SHA-256 (File Integrity) 
 
⚠️ เข้ารหัส = ล็อกกล่อง ยังไงก็ต้องเก็บกุญแจให้ปลอดภัยด้วย — Key Management คือหัวใจสำคัญ ❤️
 
 
 
📋 Risk Management — จัดการความเสี่ยง
 
ไม่มีระบบที่ปลอดภัย 100% — เราทำงานเพื่อ ลดความเสี่ยงให้อยู่ในระดับที่ยอมรับได้
 
4 วิธีจัดการความเสี่ยง
 
วิธี ความหมาย ตัวอย่าง 
Avoid — หลีกเลี่ยง หยุดทำสิ่งนั้นเลย ไม่เปิดบริการที่มีความเสี่ยงสูงเกินไป 
Mitigate — ลดความเสี่ยง ลดโอกาสหรือผลกระทบลง ติดตั้ง Firewall, เข้ารหัสข้อมูล 
Transfer — ย้ายความเสี่ยง ให้คนอื่นรับผิดชอบแทน ประกันความเสี่ยง, ใช้บริการ Cloud ที่เชื่อถือได้ 
Accept — ยอมรับ ตัดสินใจยอมรับเพราะคุ้มค่า ความเสี่ยงเล็กน้อย ค่าแก้ไขแพงกว่าความเสียหาย 
 
 
 
🧑‍💻 Developer Security — สิ่งที่ทุกคนเขียนโค้ดต้องรู้
 
✅ Secure Coding Principles
 
- Never Trust Input — ข้อมูลจากภายนอกทั้งหมดคือภัยคุกคาม จงตรวจสอบทุกครั้ง
- Don't Roll Your Own — อย่าประดิษฐ์ลูกเล่นด้านความปลอดภัยเอง ใช้สิ่งที่มีการพิสูจน์แล้ว
- Defense in Depth — มีแผนสำรอง ชั้นป้องกันรองเสมอ
- Least Privilege — สิทธิน้อยที่สุด
- Secure by Default — ค่าเริ่มต้นต้องปลอดภัย ไม่ต้องไปเปิดเอง
- Keep Secrets Secret — รหัสผ่าน/Token/Key ห้ามอยู่ในโค้ด, Git, Logs
 
📊 OWASP Top 10 — รายการอันตรายที่นักพัฒนาต้องรู้
 
ทศอันดับความเสี่ยงของแอปพลิเคชัน — อัปเดตปีละครั้งโดย OWASP Foundation
 
# ชื่อ ความเสี่ยง 
A01 Broken Access Control สิทธิ์เข้าถึงไม่ถูกต้อง — คนอื่นเข้าถึงข้อมูลไม่ควรเห็น 
A02 Cryptographic Failures การเข้ารหัสอ่อนแอ/หายไป — ข้อมูลรั่วไหล 
A03 Injection SQL/Command/XSS Injection — ข้อมูลแทรกคำสั่ง 
A04 Insecure Design ออกแบบมาไม่ปลอดภัยตั้งแต่ต้น — แก้ยากมาก 
A05 Security Misconfiguration ตั้งค่าผิดพลาด — เปิดช่องโหว่โดยไม่รู้ตัว 
A06 Vulnerable & Outdated Components ใช้ Library/เวอร์ชันเก่าที่มีช่องโหว่ 
A07 Identification & Auth Failures ตรวจสอบตัวตนอ่อนแอ — แฮ็กเกอร์แอบเข้ามาได้ 
A08 Software & Data Integrity Failures ไม่ตรวจสอบความถูกต้องของโค้ด/การอัปเดต 
A09 Security Logging & Monitoring Failures ไม่มีบันทึก/ไม่เฝ้าดู — โดนแฮ็กเป็นเดือนยังไม่รู้ 
A10 Server-Side Request Forgery เซิร์ฟเวอร์ถูกสั่งให้เรียกข้อมูลภายในโดยไม่ได้รับอนุญาต 
 
 
 
🚨 The Human Factor — คนคือจุดอ่อนที่สุด
 
🔐 เทคโนโลยีดีที่สุดก็แพ้ให้กับความผิดพลาดของคน
 
- ใช้ MFA/2FA ทุกบัญชีสำคัญ ✅
- รหัสผ่านยาวและไม่ซ้ำกัน — ใช้ Password Manager ✅
- ระมัดระวัง Phishing — ตรวจสอบผู้ส่ง ลิงก์ ก่อนคลิก ✅
- ไม่แชร์บัญชี/รหัสผ่าน — ทุกคนต้องมีบัญชีของตน ✅
- ลาออก/เปลี่ยนตำแหน่ง → เพิกถอนสิทธิ์ทันที ✅
 
 
 
✅ Checklist พื้นฐานความปลอดภัย
 
รหัสผ่านยาว ≥ 12 ตัวอักษร + ไม่ซ้ำกัน ✅
เปิด MFA ทุกบัญชีสำคัญ ✅
ใช้ HTTPS/TLS ทุกหน้าเว็บ/API ✅
อัปเดตระบบ/ซอฟต์แวร์สม่ำเสมอ ✅
สำรองข้อมูล 3-2-1: 3 ชุด, 2 ประเภทสื่อ, 1 ที่แยกออกจากกัน ✅
มี Log และรู้ว่าใครทำอะไรไป ✅
มีแผนรับมือเมื่อเกิดเหตุ — [[Incident Response]] ✅
ฝึกอบรมทีมเป็นประจำ ✅
 
 
 
🔗 Related Notes
 
- [[Authentication]] — การยืนยันตัวตนและสิทธิ์
- [[Incident Response]] — แผนรับมือเมื่อถูกบุกรุก
- [[JWT vs OAuth2]] — เลือกระบบยืนยันตัวตนให้เหมาะสม
- [[FastAPI]] — เขียน API ที่ปลอดภัย
 
 
 
✅ สรุป: ความปลอดภัยไม่ใช่เรื่องที่ทำเสร็จแล้วจบ — แต่เป็นวงจรต่อเนื่อง: ประเมิน → ป้องกัน → ตรวจจับ → ตอบสนอง → เรียนรู้ → ปรับปรุง 🔁
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น OWASP Top 10 ลึกแต่ละข้อ, Secure Coding Practices, การตั้งค่า Security Headers, หรือ Cryptography พื้นฐาน 😊