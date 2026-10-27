title: "OIDC Authentication (SSO) แทน Static Token"
aliases:
 
- "SSO สำหรับ Turborepo Remote Cache"
- "OIDC instead of static tokens"
slug: turborepo-oidc-sso
icon: 🔑
color: green
type: guide
status: active
priority: high
tags:
- type/guide
- topic/security
- topic/devops
- topic/ci-cd
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Multi-Tenant Turborepo Cache]]"
children: []
related:
- "[[Multi-Tenant Cache]]"
- "[[Authentication]]"
- "[[S3 Custom Cache for Turborepo]]"
 
 
 
🔑 OIDC Authentication (SSO) — แทน Static Token
 
Static Token = คงที่ตลอดอายุ รั่วเมื่อไหร่ก็อันตราย
OIDC SSO = ใช้ระบบยืนยันตัวตนกลาง — Token สั้น, หมดอายุเอง, จัดการสิทธิ์จากที่เดียว ✅
 
 
 
⚠️ ปัญหาของ Static Token
 
ปัญหา ความเสี่ยง 
❌ คงที่ตลอดเวลา รั่วครั้งเดียว = เข้าถึงได้ตลอดจนกว่าจะเปลี่ยน 
❌ เพิกถอนยาก ต้องเปลี่ยน Token ทุกคนเมื่อคนหนึ่งลาออก 
❌ ไม่รู้ว่าใครคือใคร ทุกคนใช้ Token เดียวกัน = ไม่มี Audit 
❌ ไม่รองรับ MFA ข้ามชั้นความปลอดภัยสำคัญไปเลย 
❌ จัดการแยกจากระบบอื่น ต้องดูแล Token แยกจาก SSO หลักขององค์กร 
 
✅ ทางออก: ใช้ OIDC — ได้ SSO, MFA, Centralized Policy, Revoke เมื่อไหร่ก็ได้ 😎
 
 
 
📖 OIDC คืออะไรในบริบทนี้?
 
OpenID Connect (OIDC) = ชั้นบนของ OAuth2 — เพิ่มข้อมูลผู้ใช้มาตรฐาน
 
Flow ที่ทำงาน:
 
1. นักพัฒนา/CI → ขอ Token จาก Provider กลาง (Google/GitHub/Azure/Okta)
2. ได้ ID Token หรือ OIDC Access Token (อายุสั้น)
3. ส่ง Token นั้นไปที่ Turborepo CLI แทน Static Token
4. Cache Server → ตรวจสอบลายเซ็นกับ OIDC Provider → ยอมรับ/ปฏิเสธ
5. ✅ เสร็จ — ไม่มี Static Token อีกต่อไป
 
 
 
🎯 ตัวเลือก OIDC Provider
 
Provider เหมาะกับ ข้อสังเกต 
✅ GitHub OIDC ทีมที่ใช้ GitHub — 🔥 แนะนำอันดับ 1 ไม่ต้องสร้าง Token ใส่ใน Secrets เลย! CI ขอเองอัตโนมัติ 
✅ GitLab OIDC ทีมที่ใช้ GitLab คล้าย GitHub Actions — JWT จาก GitLab CI 
✅ Google Cloud Workload Identity บน GCP — ไร้ความลับเลย ผูกกับ Service Account โดยตรง 
✅ Azure AD / Entra ID องค์กรที่ใช้ Microsoft รวมกับบัญชีพนักงานเดิม 
✅ Okta / Auth0 / Keycloak องค์กรขนาดใหญ่ — SSO กลาง รองรับผู้ใช้จริง + CI/CD Workload ได้ครบ 
 
 
 
⭐ ตัวอย่างที่ 1: GitHub Actions OIDC — ไม่มี Token เลย!
 
🔥 ดีที่สุดสำหรับส่วนใหญ่ — ไม่ต้องเก็บ NPM_TOKEN, TURBO_TOKEN ใน Secrets เลย CI ขอ JWT จาก GitHub เอง → ตรวจสอบฝั่ง Cache Server → เสร็จ ✅
 
✅ ขั้นที่ 1: ตั้งค่า Cache Server ให้ตรวจสอบ OIDC
 
ตัวอย่างโค้ด Worker/Server ที่รับ OIDC:
 
javascript
  
// OIDC Configuration
const OIDC_ISSUER = "https://token.actions.githubusercontent.com";
const OIDC_AUDIENCE = "turborepo-cache";  // ตรงกับ claim aud

// ดึง Public Key จาก GitHub
async function getPublicKey(kid) {
  const res = await fetch(`${OIDC_ISSUER}/.well-known/jwks.json`);
  const keys = await res.json();
  return keys.keys.find(k => k.kid === kid);
}

// ตรวจสอบ Token
async function verifyOIDCToken(token) {
  const [headerB64, payloadB64, signatureB64] = token.split(".");
  const header = JSON.parse(atob(headerB64));
  const payload = JSON.parse(atob(payloadB64));
  
  // ตรวจสอบ Issuer
  if (payload.iss !== OIDC_ISSUER) return null;
  // ตรวจสอบ Audience
  if (payload.aud !== OIDC_AUDIENCE) return null;
  // ตรวจสอบหมดอายุ
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  
  // ตรวจสอบลายเซ็น
  const publicKey = await getPublicKey(header.kid);
  if (!publicKey) return null;
  
  // ✅ ตรวจสอบสำเร็จ — คืนข้อมูลผู้ใช้/Repository
  return {
    sub: payload.sub,               // repo:org/repo:ref
    repository: payload.repository, // ชื่อ Repository
    actor: payload.actor,           // คนที่รัน
    audience: payload.aud
  };
}
 
 
✅ ขั้นที่ 2: ใน GitHub Actions — ขอ Token เองอัตโนมัติ
 
yaml
  
name: CI
on: [push, pull_request]

# ✅ ให้สิทธิ์ขอ OIDC Token — ไม่มีบรรทัดนี้จะขอไม่ได้
permissions:
  id-token: write
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # ✅ ขอ OIDC Token จาก GitHub — ไม่ต้องเก็บใน Secrets!
      - name: Get OIDC Token
        id: oidc
        uses: actions/github-script@v7
        with:
          script: |
            const token = await core.getIDToken("turborepo-cache");
            core.setOutput('token', token)
      
      # ✅ ส่งไปที่ Turborepo แทน Static Token
      - name: Build
        env:
          TURBO_API: https://turbo-cache.your-company.com
          TURBO_TEAM: your-team
          TURBO_TOKEN: ${{ steps.oidc.outputs.token }}
          TURBO_TOKEN_TYPE: OIDC  # ← บอก Server ว่าเป็น OIDC Token
        run: pnpm build
 
 
💡 สิ่งที่เกิดขึ้น:
 
1. GitHub ออก JWT ที่มีลายเซ็นของ GitHub ให้โดยตรง
2. JWT มีอายุสั้น (~5 นาที) — หมดอายุเอง
3. Cache Server ตรวจสอบลายเซ็นกับ GitHub → ไม่ต้องไว้ใจเรา ไว้ใจ GitHub ✅
4. ไม่มี Secrets ที่ต้อง Rotate อีกต่อไป 🔥
 
 
 
🔑 ตัวอย่างที่ 2: OIDC สำหรับนักพัฒนา (Login ด้วย SSO)
 
✅ กระบวนการ
 
plaintext
  
นักพัฒนา → Terminal: turbo login
  ↓
เปิดเบราว์เซอร์ → SSO Login (Google/GitHub/Okta)
  ↓
ยินยอม → ได้ ID Token + Access Token
  ↓
บันทึกไว้ที่ ~/.turbo/config.json — หมดอายุเอง
  ↓
ทุกครั้งที่รัน: ส่ง Token → Server ตรวจสอบ → อนุญาต ✅
 
 
✅ ตรวจสอบสิทธิ์ตาม Claim ใน Token
 
javascript
  
// หลังจากตรวจสอบ Token สำเร็จแล้ว
function checkPermission(payload, method, key) {
  // ตัวอย่าง: สมาชิกในองค์กร อ่านได้ทั้งหมด
  if (payload.email?.endsWith("@your-company.com")) {
    return true;
  }
  
  // ✅ เฉพาะทีม frontend เขียนได้ใน path /web/
  if (payload.repository === "your-org/web" && method === "GET") {
    return true;
  }
  
  // ❌ ปฏิเสธ
  return false;
}
 
 
 
 
🏗️ สถาปัตยกรรมเปรียบเทียบ
 
❌ แบบเดิม — Static Token
 
plaintext
  
CI → ส่ง Token คงที่ → Server ตรวจสอบจากรายการรู้จัก → อนุญาต
     ↑
     ├─ รั่ว = อันตราย
     ├─ เพิกถอน = ต้องแก้ทุกที่
     └─ ไม่รู้ว่าใครคือใคร
 
 
✅ แบบใหม่ — OIDC
 
plaintext
  
CI → ขอ JWT จาก GitHub → ส่ง JWT → Server ตรวจสอบลายเซ็นกับ GitHub → อนุญาต
     ↑
     ├─ หมดอายุเอง ~5 นาที
     ├─ ใครรัน = รู้ชัดเจนใน Claim
     ├─ เพิกถอน = ปิดสิทธิ์ใน Provider ก็จบ
     └─ ไม่มีความลับใน Secrets เลย 🔥
 
 
 
 
⚙️ ตั้งค่า Provider สำคัญ
 
🔹 GitHub Actions OIDC
 
- Issuer:  https://token.actions.githubusercontent.com 
- Audience: ตั้งชื่ออะไรก็ได้ — ต้องตรงกันทั้งสองฝั่ง
- Claim ที่มีให้:  repository ,  actor ,  ref ,  sha ,  run_id 
- Permissions ที่ต้องการ:  id-token: write 
 
🔹 Keycloak / Okta / Auth0
 
- สร้าง Client ประเภท: Service หรือ Machine-to-Machine สำหรับ CI
- สำหรับนักพัฒนาจริง: Authorization Code Flow + PKCE
- Scope:  openid email profile  — ข้อมูลพื้นฐานเพียงพอแล้ว
 
 
 
🔐 การย้ายจาก Static Token → OIDC แบบค่อยๆ เปลี่ยน
 
ไม่ต้องเปลี่ยนพร้อมกันทั้งระบบ — รองรับทั้งสองแบบไปพร้อมกันก่อนได้ ✅
 
javascript
  
async function authenticate(request) {
  const auth = request.headers.get("Authorization")?.replace("Bearer ", "");
  
  // ✅ ลอง OIDC ก่อน
  if (looksLikeJWT(auth)) {
    const user = await verifyOIDCToken(auth);
    if (user) return { user, type: "oidc" };
  }
  
  // ✅ ถ้าไม่ใช่หรือไม่ผ่าน → ลอง Static Token แบบเดิม
  if (VALID_STATIC_TOKENS.includes(auth)) {
    return { user: "legacy-service", type: "static" };
  }
  
  throw new Error("Unauthorized");
}
 
 
เมื่อทุกอย่างใช้งานได้ดีแล้ว → ปิด Static Token ทีละทีม จนกว่าจะหมด ✅
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
401 Unauthorized — Issuer ไม่ถูกต้อง  iss  ไม่ตรงกับที่คาด ตรวจสอบ  OIDC_ISSUER  — ต้องตรงกับใน Token 
403 Forbidden — Audience ไม่ตรง  aud  ไม่ตรงกับที่ระบุ ตรวจสอบชื่อ Audience ทั้งฝั่งขอและฝั่งตรวจสอบ 
CI ขอ Token ไม่ได้ Permission  id-token: write  ไม่ได้ตั้ง เพิ่ม  permissions: id-token: write  ที่บนสุดของ Workflow 
Token หมดอายุเร็วเกินไป GitHub OIDC มีอายุประมาณ 5 นาที ให้ CI รันงานให้เสร็จภายในเวลานั้น หรือขอใหม่เมื่อหมดอายุ 
ต้องการ Claim เพิ่มเติม Provider ไม่ได้ส่งมา ใช้ Custom Claim / Groups ใน Provider ของคุณ 
 
 
 
✅ Checklist — พร้อมใช้ OIDC ไหม?
 
เลือก OIDC Provider ที่เหมาะสมกับทีม ✅
ตั้งค่า Provider และทราบ Issuer + Public Key ✅
ปรับ Cache Server ให้รับและตรวจสอบ OIDC Token ✅
ทดสอบกับ CI — ขอ Token → ส่ง → ตรวจสอบ → อนุญาต ✅
ทดสอบกับนักพัฒนา — Login SSO → ได้ Token → ใช้งานได้ ✅
ตั้งค่า Policy — ใครอ่านได้ ใครเขียนได้ จาก Claim ✅
รองรับทั้ง OIDC + Static Token ชั่วคราว เพื่อค่อยๆ ย้าย ✅
เมื่อพร้อม — ปิด Static Token ทั้งหมด 🔥 ✅
ลบ Secrets ที่เก็บ Static Token ออกจาก GitHub/GitLab 🔥 ✅
 
 
 
🔗 Related Notes
 
- [[Authentication]] — ภาพรวมระบบยืนยันตัวตน
- [[Multi-Tenant Cache]] — แยกสิทธิ์แต่ละทีมจาก Claim ใน Token
- [[S3 Custom Cache for Turborepo]] — Deploy Cache Server ที่รองรับ OIDC
- [[Dependency Security]] — ไม่มีความลับ = ไม่มีความลับที่รั่วได้ 😎
 
 
 
✅ สรุปสั้นๆ: OIDC = ไม่ต้องเก็บความลับ, Token หมดอายุเอง, รู้ว่าใครทำอะไร, จัดการสิทธิ์จากที่เดียว — ย้ายจาก Static Token มา OIDC คือการอัปเกรดความปลอดภัยที่คุ้มค่าที่สุดที่ทำได้เลยครับ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Keycloak Self-hosted, Custom Claims & RBAC, หรือ Transition Strategy จาก Static Token 😊