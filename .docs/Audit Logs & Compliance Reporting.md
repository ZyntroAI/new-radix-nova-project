title: "Audit Logs & Compliance Reporting"
aliases:
 
- "บันทึกกิจกรรมและรายงานความสอดคล้อง"
- "Keycloak Audit Logs และรายงานการตรวจสอบ"
slug: audit-logs-compliance
icon: 📋
color: cyan
type: guide
status: active
priority: high
tags:
- type/guide
- topic/security
- topic/keycloak
- topic/compliance
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Groups & RBAC]]"
children: []
related:
- "[[Keycloak Self-hosted]]"
- "[[Groups & RBAC]]"
- "[[OIDC Authentication (SSO) แทน Static Token]]"
 
 
 
📋 Audit Logs & Compliance Reporting — บันทึกกิจกรรมและรายงานความสอดคล้อง
 
"ถ้าคุณไม่ได้บันทึกไว้ → มันเหมือนไม่เคยเกิดขึ้นเลย" ✅ Audit Log = บันทึกทุกการกระทำที่เกิดขึ้นในระบบ — รู้ว่าใคร ทำอะไร ที่ไหน เมื่อไหร่ และทำไม
 
 
 
🎯 ทำไมต้องมี Audit Log?
 
วัตถุประสงค์ ความสำคัญ 
🔍 ตรวจสอบความผิดปกติ รู้เมื่อมีคนพยายามเข้าผิด, เปลี่ยนสิทธิ์, หรือล็อกอินจากที่แปลก 
📝 หลักฐานการปฏิบัติ พิสูจน์ว่าทำตามนโยบายและกฎระเบียบแล้ว 
⚖️ Compliance ISO 27001, SOC 2, GDPR, PDPA, PCI DSS — ทั้งหมดกำหนดให้ต้องมี 
🕵️ สืบสวนเหตุการณ์ เมื่อเกิดปัญหา — ย้อนดูได้ว่าใครทำอะไรก่อนเกิดเหตุ 
📊 รายงานประจำปี แสดงให้ผู้ตรวจสอบเห็นว่าระบบทำงานถูกต้อง 
 
 
 
📝 สิ่งที่ควรบันทึกใน Audit Log
 
✅ ประเภทเหตุการณ์
 
หมวดหมู่ เหตุการณ์ที่ต้องบันทึก 
🔐 Authentication ล็อกอินสำเร็จ/ล้มเหลว, ล็อกเอาท์, รีเซ็ตรหัสผ่าน, หมดอายุเซสชัน 
👤 ผู้ใช้ สร้าง/แก้ไข/ลบบัญชี, เปลี่ยนสถานะ, ย้ายกลุ่ม, เปลี่ยนรหัสผ่าน 
🔑 สิทธิ์ & บทบาท มอบ/เพิกถอนสิทธิ์, เปลี่ยนกลุ่ม, จัดการ Client/App 
⚙️ การตั้งค่า เปลี่ยนค่าระบบ, อัปเดตนโยบาย, สร้าง/แก้ไข Realm 
🚪 Token & Access ขอ Token, ใช้ Token เข้าถึงทรัพยากร, หมดอายุ/เพิกถอน Token 
⚠️ ความผิดพลาด สิทธิ์ไม่พอ, Token ไม่ถูกต้อง, พยายามเข้าถึงพื้นที่ต้องห้าม 
 
✅ ข้อมูลที่ต้องมีในทุกๆ บันทึก
 
json
  
{
  "timestamp": "2026-10-27T14:30:00+07:00",
  "eventId": "evt-abc123",
  "eventType": "USER_LOGIN_SUCCESS",
  "userId": "user-xyz",
  "username": "somsak@company.com",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "realm": "company-auth",
  "clientId": "turborepo-cache",
  "description": "ผู้ใช้เข้าสู่ระบบสำเร็จ"
}
 
 
⚠️ ห้ามบันทึก: รหัสผ่าน, Token, ข้อมูลละเอียดอ่อน — บันทึกแค่เหตุการณ์ ไม่ใช่ข้อมูลลับ ❌
 
 
 
🔧 ตั้งค่า Audit Log ใน Keycloak
 
✅ เปิดใช้งาน Event Logging
 
1. เข้า Realm → Realm Settings → Events
2. แท็บ Config:
- ✅ เปิด Events Enabled
- ✅ Include Representation in Event: ปิด (ลดขนาดและความเสี่ยง)
- ✅ Expiration: 90 วัน (ตามนโยบายองค์กร)
3. บันทึก ✅
 
✅ เลือกประเภทเหตุการณ์ที่จะบันทึก
 
แท็บ Event Listeners:
 
- เลือก:  jboss-logging , สำหรับส่งไปยังระบบภายนอก เช่น  syslog ,  slf4j 
- บันทึก ✅
 
แท็บ Events → เลือกเหตุการณ์ที่ต้องการบันทึก:
 
plaintext
  
✅ LOGIN, LOGOUT, LOGIN_ERROR
✅ REGISTER, REGISTER_ERROR
✅ UPDATE_PROFILE, UPDATE_PASSWORD
✅ REMOVE_FEDERATED_IDENTITY
✅ ADD_REALM_ROLE, REMOVE_REALM_ROLE
✅ GROUP_CREATE, GROUP_DELETE, GROUP_MEMBERSHIP
✅ CLIENT_AUTHENTICATION, TOKEN_INTROSPECTION
 
 
 
 
📤 ส่ง Audit Log ไปยังระบบภายนอก
 
Log ภายใน Keycloak มีอายุจำกัด — ส่งต่อไปยังระบบกลางเพื่อเก็บถาวรและวิเคราะห์ ✅
 
🔹 ตัวเลือก A: ไฟล์ Log + Log Aggregator (ง่ายที่สุด)
 
bash
  
# Keycloak บันทึกไปที่ stdout/stderr
# ให้ Docker/Kubernetes/Runtime จัดการต่อ
# ตัวอย่าง Fluentd → Elasticsearch/Kibana หรือ Loki/Grafana
 
 
🔹 ตัวเลือก B: Syslog Protocol
 
ตั้งค่าใน  keycloak.conf :
 
plaintext
  
quarkus.log.handler.syslog.enabled=true
quarkus.log.handler.syslog.endpoint=udp://log-server.your-company.com:514
quarkus.log.handler.syslog.format=%d{ISO8601} %p %c{1.} [%t] %m%n
 
 
🔹 ตัวเลือก C: Custom Event Listener (ยืดหยุ่นที่สุด)
 
เขียน Extension ส่งไปยัง API/Webhook หรือฐานข้อมูลกลางโดยตรง
 
 
 
📊 Compliance Reporting — รายงานเพื่อการตรวจสอบ
 
✅ รายงานพื้นฐานที่ต้องมี
 
รายงาน ความถี่ ตัวอย่างเนื้อหา 
📈 การเข้าสู่ระบบ รายเดือน จำนวนครั้ง, ผู้ใช้, IP, ความล้มเหลว, ช่วงเวลาที่มีกิจกรรมมาก 
👥 รายงานบัญชีผู้ใช้ รายไตรมาส รายชื่อบัญชีทั้งหมด, สถานะ, วันหมดอายุ, สมาชิกกลุ่ม 
🔑 สิทธิ์และบทบาท รายไตรมาส ใครมีสิทธิ์อะไรบ้าง, ใครมีสิทธิ์ระดับสูง, การเปลี่ยนแปลงสิทธิ์ 
⚠️ กิจกรรมที่ผิดปกติ ทันทีเมื่อเกิด ล็อกอินผิดหลายครั้ง, IP ต้องสงสัย, การเปลี่ยนแปลงการตั้งค่า 
📅 การเข้าถึงข้อมูลสำคัญ ตามเหตุการณ์ ใครเข้าถึงระบบสำคัญ, เวลา, วัตถุประสงค์ 
 
✅ ตัวอย่าง SQL Query สำหรับรายงาน
 
ถ้าเก็บ Log ใน PostgreSQL/Elasticsearch สามารถดึงข้อมูลได้ดังนี้:
 
sql
  
-- จำนวนการล็อกอินสำเร็จ แยกตามวัน
SELECT 
  DATE(timestamp) AS date,
  COUNT(*) AS successful_logins
FROM audit_logs
WHERE event_type = 'LOGIN_SUCCESS'
  AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- ผู้ใช้ที่มีการล็อกอินผิดพลาดมากที่สุด
SELECT 
  username,
  COUNT(*) AS failed_attempts
FROM audit_logs
WHERE event_type = 'LOGIN_ERROR'
  AND timestamp >= NOW() - INTERVAL '7 days'
GROUP BY username
HAVING COUNT(*) >= 5
ORDER BY failed_attempts DESC;

-- การเปลี่ยนแปลงสิทธิ์
SELECT 
  timestamp,
  username,
  event_type,
  JSON_EXTRACT(data, '$.roleName') AS role_name
FROM audit_logs
WHERE event_type LIKE '%ROLE%'
  AND timestamp >= NOW() - INTERVAL '90 days'
ORDER BY timestamp DESC;
 
 
 
 
🚨 การแจ้งเตือน — เมื่อพบสิ่งผิดปกติ
 
✅ กฎการแจ้งเตือนพื้นฐาน
 
เหตุการณ์ ระดับความสำคัญ การดำเนินการ 
ล็อกอินผิดพลาด ≥ 5 ครั้งใน 1 ชม. ⚠️ ปานกลาง แจ้งผู้ใช้ + ผู้ดูแลระบบ 
ล็อกอินจากประเทศ/IP ที่ไม่คาดคิด 🔴 สูง บล็อกชั่วคราว + แจ้งทันที 
เปลี่ยนสิทธิ์ระดับ Admin 🔴 สูง บันทึกและแจ้งทันที 
บัญชี Admin ล็อกอินนอกเวลาทำการ 🔴 สูง ตรวจสอบทันที 
มีการสร้างบัญชีใหม่โดยไม่ได้รับอนุญาต 🔴 สูง ปิดบัญชี + สืบสวน 
Token ถูกใช้จาก IP ที่แตกต่างกันอย่างมาก ⚠️ ปานกลาง ตรวจสอบความถูกต้อง 
 
 
 
📋 มาตรฐานที่เกี่ยวข้อง
 
มาตรฐาน ข้อกำหนดหลักเกี่ยวกับ Audit Log 
🏅 ISO 27001: A.12.4 บันทึกกิจกรรมและเหตุการณ์ความมั่นคง ต้องเก็บอย่างน้อย 3 เดือน 
🏅 ISO 27701 (PDPA) บันทึกการเข้าถึงและประมวลผลข้อมูลส่วนบุคคล — สามารถตรวจสอบได้ 
🏅 SOC 2 — CC6.1 มีระบบบันทึกและตอบสนองต่อเหตุการณ์ความมั่นคง 
🏅 GDPR — Article 30 บันทึกกิจกรรมการประมวลผลข้อมูล 
🏅 PCI DSS — Req 10 บันทึกทุกการเข้าถึงข้อมูลบัตรเครดิต — เก็บอย่างน้อย 1 ปี 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
Log หายไปเอง ตั้งค่าหมดอายุสั้นเกินไป หรือ ไม่ได้ส่งออกไปที่อื่น ส่งต่อไปยังระบบกลางทันที — ไม่พึ่งพา Log ภายในของ Keycloak 
Log มีข้อมูลไม่ครบ ไม่ได้เลือกประเภทเหตุการณ์ครบถ้วน ตรวจสอบรายการ Event Type ที่เลือกเป็นประจำ 
ค้นหายาก ไม่มีระบบจัดการ เก็บแค่ไฟล์ข้อความ ใช้ ELK Stack, Loki/Grafana หรือโซลูชันเช่น Datadog, Splunk 
มีข้อมูลละเอียดอ่อนใน Log Log มีข้อมูลมากเกินไป ปิด Include Representation, ตรวจสอบก่อนบันทึก, Mask ข้อมูลสำคัญ 
ไม่รู้ว่า Log เก็บไว้นานแค่ไหน ไม่มีนโยบายการเก็บรักษา กำหนดนโยบายเป็นลายลักษณ์อักษร — เก็บตามกฎหมายที่บังคับใช้ 
ไม่มีการทดสอบ มี Log แต่ไม่เคยอ่าน จำลองเหตุการณ์ → ตรวจสอบว่ามีบันทึกจริง และค้นหาได้ 
 
 
 
✅ Checklist — Audit & Compliance พร้อมไหม?
 
เปิดใช้งาน Event Logging ใน Keycloak ✅
เลือกประเภทเหตุการณ์ที่จำเป็นครบถ้วน ✅
ปิด Include Representation — ไม่บันทึกข้อมูลมากเกินไป ✅
ส่ง Log ไปยังระบบกลางภายนอก — ไม่พึ่งพา Keycloak ภายใน ✅
กำหนดระยะเวลาเก็บรักษาให้สอดคล้องกับกฎหมาย ✅
มีนโยบายการเข้าถึง Log — จำกัดสิทธิ์อ่าน Log ✅
มีรายงานพื้นฐานที่สามารถส่งออกได้ ✅
ตั้งค่าการแจ้งเตือนสำหรับเหตุการณ์สำคัญ ✅
ทดสอบค้นหาและตรวจสอบ Log เป็นประจำ ✅
เอกสารนโยบายการเก็บรักษาและทำลาย Log ✅
 
 
 
🔗 Related Notes
 
- [[Keycloak Self-hosted]] — ติดตั้งและจัดการ Keycloak
- [[Groups & RBAC]] — จัดการสิทธิ์และบทบาท
- [[Security Fundamentals]] — หลักการความมั่นคงและความรับผิดชอบ
- [[Incident Response]] — ใช้ Audit Log ในการสืบสวนและกู้คืน
 
 
 
✅ สรุปสั้นๆ: Audit Log ไม่ใช่แค่เรื่องกฎระเบียบ — แต่คือ "กล้องวงจรปิด" ของระบบ — เมื่อเกิดเหตุ จะเป็นสิ่งเดียวที่ช่วยให้คุณรู้ว่าเกิดอะไรขึ้น ใครเป็นคนทำ และต้องแก้ไขอย่างไร เก็บให้ดีๆ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Incident Response Workflow, Data Retention Policy, หรือ Log Management & SIEM Integration 😊