title: "Groups & RBAC — การจัดการสิทธิ์ตามบทบาท"
aliases:
 
- "Role-Based Access Control ใน Keycloak"
- "จัดการกลุ่มและสิทธิ์ผู้ใช้"
slug: keycloak-groups-rbac
icon: 👥
color: orange
type: guide
status: active
priority: high
tags:
- type/guide
- topic/security
- topic/keycloak
- topic/devops
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Keycloak Self-hosted]]"
children: []
related:
- "[[Keycloak Self-hosted]]"
- "[[OIDC Authentication (SSO) แทน Static Token]]"
- "[[Multi-Tenant Cache]]"
 
 
 
👥 Groups & RBAC — จัดการสิทธิ์ตามบทบาทใน Keycloak
 
"จัดการผู้ใช้ทีละคน = ฝันร้าย — จัดการทีละกลุ่ม/บทบาท = สุขสบาย" ✅ RBAC = กำหนดสิทธิ์ให้กับบทบาท ไม่ใช่ผู้ใช้โดยตรง
 
 
 
📌 พื้นฐาน — ความแตกต่าง
 
แนวคิด ความหมาย ตัวอย่าง 
User บัญชีผู้ใช้แต่ละคน "สมศักดิ์", "วิภาพร" 
Group กลุ่มผู้ใช้ที่มีคุณสมบัติเดียวกัน "ทีมแอปพลิเคชัน", "ฝ่ายความมั่นคง", "ผู้ดูแลระบบ" 
Role บทบาทและสิทธิ์ที่ทำได้  admin ,  developer ,  viewer ,  cache:write  
RBAC ระบบสิทธิ์: ผู้ใช้ → กลุ่ม → บทบาท → สิทธิ์ สมศักดิ์ → ทีมแอปพลิเคชัน → developer → อ่าน/เขียนแคช 
 
💡 กฎทอง: มอบ Role ให้กับ Group ไม่ใช่ User โดยตรง — เมื่อเปลี่ยนทีม ย้ายกลุ่ม = สิทธิ์เปลี่ยนตามอัตโนมัติ ✅
 
 
 
🏗️ โครงสร้างที่แนะนำ
 
plaintext
  
Realm: your-company
│
├── Groups
│   ├── ── ทีม
│   ├── engineering
│   │   ├── frontend-team
│   │   ├── backend-team
│   │   └── devops-team ← สมาชิก: สมศักดิ์, วิภาพร
│   ├── product
│   └── externals ← คนที่มาภายนอก — สิทธิ์จำกัด
│
├── Realm Roles (สิทธิ์กลาง)
│   ├── cache:read       ← อ่านแคชได้
│   ├── cache:write      ← อัปโหลดแคชได้
│   ├── ci:bot           ← สำหรับระบบอัตโนมัติ
│   └── admin            ← จัดการทั้งหมด
│
└── Client Roles (สิทธิ์เฉพาะแอป)
    └── turborepo-cache
        ├── web:build
        └── api:deploy
 
 
 
 
🚀 ขั้นที่ 1: สร้างและจัดการ Roles
 
✅ สร้าง Realm Role (ใช้ร่วมกันทุกแอป)
 
1. Realm Roles → Create Role
2. ชื่อ:  cache:read ,  cache:write ,  admin 
3. Save ✅
 
✅ สร้าง Client Role (เฉพาะแอปนี้)
 
1. Clients →  turborepo-cache  → Roles → Create Role
2. ชื่อ:  web:build ,  api:deploy 
3. Save ✅
 
💡 Realm Role = แชร์ได้ทุกแอป / Client Role = เฉพาะแอปนั้นเท่านั้น เลือกให้เหมาะสม ✅
 
 
 
👥 ขั้นที่ 2: สร้าง Groups และมอบสิทธิ์
 
✅ สร้างกลุ่ม
 
1. Groups → Create Group
2. ชื่อ:  devops-team 
3. Save ✅
 
✅ เพิ่มสมาชิกเข้ากลุ่ม
 
1. Groups →  devops-team  → Members → Add member
2. ค้นหาผู้ใช้ → เลือก → Join ✅
 
✅ มอบ Roles ให้กับ Group (สำคัญที่สุด!)
 
1. Groups →  devops-team  → Role mapping
2. Assign role → เลือก Roles ที่ต้องการ:
- ✅  cache:read 
- ✅  cache:write 
3. Save ✅
 
🎯 ผลลัพธ์: ทุกคนในกลุ่ม  devops-team  ได้รับสิทธิ์อ่านและเขียนแคชโดยอัตโนมัติ — ไม่ต้องจัดการทีละคน! ✅
 
 
 
🔗 ขั้นที่ 3: ส่ง Roles/Groups ใน Token
 
✅ ตั้งค่า Client Scope — เพิ่มข้อมูลเข้า Token
 
1. Clients →  turborepo-cache  → Client Scopes →  turborepo-cache-dedicated 
2. Add mapper → User Realm Role
- Name:  realm-roles 
- Token Claim Name:  roles 
- Multivalued: ✅ เปิด
- Save ✅
3. Add mapper → User Groups
- Name:  groups 
- Token Claim Name:  groups 
- Full group path: ✅ เปิด
- Save ✅
 
✅ ตัวอย่าง Token ที่ได้
 
json
  
{
  "sub": "user-123",
  "email": "somsak@company.com",
  "groups": ["engineering/devops-team", "engineering"],
  "roles": ["cache:read", "cache:write", "web:build"],
  "aud": "turborepo-cache"
}
 
 
 
 
🛡️ ขั้นที่ 4: ตรวจสอบสิทธิ์ที่แอป/Server ฝั่งเรา
 
✅ ตัวอย่างใน Turborepo Cache Server
 
javascript
  
// ตรวจสอบสิทธิ์ก่อนอนุญาตให้เขียนแคช
function hasPermission(tokenPayload, method, teamPath) {
  const roles = tokenPayload.roles || [];
  const groups = tokenPayload.groups || [];

  // ✅ Admin ทำได้ทุกอย่าง
  if (roles.includes("admin")) return true;

  // ✅ เขียนได้: มี cache:write หรือ อยู่ในกลุ่ม devops
  if (method === "PUT") {
    return roles.includes("cache:write") || 
           groups.some(g => g.includes("devops-team"));
  }

  // ✅ อ่านได้: สมาชิกองค์กรทุกคน
  if (method === "GET" || method === "HEAD") {
    return roles.includes("cache:read") || 
           tokenPayload.email?.endsWith("@your-company.com");
  }

  return false;
}
 
 
✅ ตัวอย่างใน FastAPI / แอปพลิเคชัน
 
python
  
from fastapi import Depends, HTTPException, status

def require_role(required_role: str):
    def dependency(token = Depends(get_current_token)):
        roles = token.get("roles", [])
        if required_role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"ต้องการสิทธิ์: {required_role}"
            )
        return token
    return dependency

# ใช้งาน
@app.post("/admin-only-action")
def admin_action(user = Depends(require_role("admin"))):
    return {"status": "ok"}
 
 
 
 
📐 นิยามนโยบายสิทธิ์ที่ชัดเจน
 
📋 ตารางสิทธิ์ตัวอย่าง
 
บทบาท / กลุ่ม cache:read cache:write deploy:prod user:manage ดู Log 
นักพัฒนาทั่วไป ✅ ❌ ❌ ❌ ❌ 
ทีม DevOps ✅ ✅ ✅ ❌ ✅ 
ผู้ดูแลระบบ ✅ ✅ ✅ ✅ ✅ 
CI/CD Bot ✅ ✅ ❌ ❌ ❌ 
ผู้ใช้ภายนอก ❌ ❌ ❌ ❌ ❌ 
 
✅ เขียนลงในเอกสารทีมให้ชัดเจน — ทุกคนรู้ว่าต้องขอสิทธิ์ที่ไหน อย่างไร
 
 
 
🔄 Group Hierarchy — กลุ่มซ้อนกลุ่ม
 
💡 กลุ่มสามารถมีกลุ่มลูกได้ — สิทธิ์สืบทอดลงไปอัตโนมัติ
 
plaintext
  
engineering
├── frontend-team  ← สืบทอด cache:read จาก engineering
├── backend-team   ← สืบทอด cache:read จาก engineering
└── devops-team    ← สืบทอด cache:read + เพิ่ม cache:write
 
 
วิธีทำ:
 
1. Groups →  frontend-team  → Members → Add group
2. เลือก  engineering  → Join ✅
3. มอบ Role ให้  engineering  เพียงครั้งเดียว — ทีมลูกทั้งหมดได้รับอัตโนมัติ ✅
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
Roles/Groups ไม่ขึ้นใน Token Mapper ไม่ได้สร้าง หรือ ปิดการส่ง ตรวจสอบ Client Scopes → Mappers เปิดใช้ และชื่อ Claim ถูกต้อง 
ย้ายคนไปกลุ่มใหม่ แต่สิทธิ์ยังเก่า Token ยังไม่หมดอายุ Token มีอายุสั้นๆ หรือ มีระบบเพิกถอนเมื่อเปลี่ยนแปลง 
สิทธิ์ซับซ้อนเกินไป มีหลายร้อย Role ไม่ได้ใช้กลุ่มอย่างเต็มที่ ลดจำนวน Role → เพิ่มกลุ่มที่มอบ Role แทน 
ทุกคนได้สิทธิ์เหมือนกันทั้งหมด มอบ Role ให้ทุกคนแบบเดียวกัน ตรวจสอบสมาชิกกลุ่ม — แยกตามหน้าที่ 
ไม่รู้ว่าใครมีสิทธิ์อะไร ไม่มีเอกสาร ใช้ Keycloak Admin Console → ดูรายงานสิทธิ์ หรือ Export รายงานเป็นประจำ 
 
 
 
✅ Checklist — RBAC สุขภาพดี
 
สร้าง Roles ตามสิทธิ์ที่จำเป็น — ไม่มาก ไม่น้อย ✅
สร้าง Groups ตามทีม/แผนก/หน้าที่ ✅
มอบ Roles ให้กับ Groups ไม่ใช่ User โดยตรง ✅
ตั้งค่า Mapper → ส่ง Roles/Groups ใน Token ✅
ตรวจสอบสิทธิ์ทุกครั้งที่เรียกใช้ API/แคช ✅
กำหนดนโยบายสิทธิ์เป็นลายลักษณ์อักษร ✅
ใช้ Group Hierarchy เพื่อลดความซ้ำซ้อน ✅
ตรวจสอบและทำความสะอาดสิทธิ์เป็นประจำ — รายไตรมาส ✅
เมื่อพนักงานย้ายทีม/ลาออก → ย้ายกลุ่ม/ลบออกจากกลุ่มทันที ✅
 
 
 
🔗 Related Notes
 
- [[Keycloak Self-hosted]] — ติดตั้งและตั้งค่า Keycloak
- [[OIDC Authentication (SSO) แทน Static Token]] — ตรวจสอบ Token และ Claim
- [[Multi-Tenant Cache]] — แยกพื้นที่ตามทีม/กลุ่ม
- [[Security Fundamentals]] — หลักการ Least Privilege และ Zero Trust
 
 
 
✅ สรุปสั้นๆ: User → Group → Role → Permission — มอบสิทธิ์ให้กลุ่ม ไม่ใช่คน ย้ายกลุ่มเมื่อเปลี่ยนงาน สิทธิ์เปลี่ยนเองอัตโนมัติ — เรียบง่าย สะดวก และปลอดภัย 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Attribute-Based Access Control (ABAC), Service Accounts & Machine-to-Machine Permissions, หรือ Audit Logs & Compliance Reporting 😊