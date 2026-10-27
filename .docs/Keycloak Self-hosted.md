title: "Keycloak Self-hosted"
aliases:
 
- "ติดตั้งและใช้งาน Keycloak ด้วยตัวเอง"
- "SSO Identity Provider สำหรับองค์กร"
slug: keycloak-self-hosted
icon: 🔑
color: indigo
type: guide
status: active
priority: high
tags:
- type/guide
- topic/security
- topic/devops
- topic/kubernetes
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[OIDC Authentication (SSO) แทน Static Token]]"
children: []
related:
- "[[OIDC Authentication (SSO) แทน Static Token]]"
- "[[Multi-Tenant Cache]]"
- "[[Self-hosted Cache บน Kubernetes]]"
 
 
 
🔑 Keycloak Self-hosted — คู่มือติดตั้งและใช้งาน
 
Keycloak = โซลูชัน SSO และ Identity Management แบบโอเพ่นซอร์ส — โฮสต์เอง ควบคุมบัญชีผู้ใช้ สิทธิ์ และการเข้าสู่ระบบทั้งหมดภายในองค์กร
 
 
 
🎯 ทำไมต้อง Keycloak?
 
ข้อดี ความหมาย 
🔐 SSO กลางจุดเดียว เข้าสู่ระบบครั้งเดียว → ใช้ได้กับทุกแอปที่เชื่อมต่อ 
👥 จัดการผู้ใช้และสิทธิ์ สร้าง/ลบบัญชี กำหนดกลุ่ม และสิทธิ์จากที่เดียว 
🔄 เชื่อมต่อระบบภายนอก LDAP, Active Directory, Google, GitHub, Azure AD 
📋 มาตรฐานสากล รองรับ OAuth 2.0, OpenID Connect, SAML 2.0 
🏢 Multi-Tenant แยก Realm → แยกทีม/โปรเจกต์ออกจากกัน 
💰 โอเพ่นซอร์ส โฮสต์เองฟรี ไม่มีค่าลิขสิทธิ์ — จ่ายแค่ทรัพยากรที่ใช้จริง 
 
 
 
🚀 ขั้นที่ 1: เลือกโหมดการทำงาน
 
โหมด เหมาะกับ คำแนะนำ 
Development ทดสอบ, พัฒนา เริ่มง่าย — ไม่ต้องกังวลเรื่องประสิทธิภาพ 
Production จริงจัง องค์กร ปรับแต่งประสิทธิภาพ, ปิดฟีเจอร์ไม่จำเป็น, ปลอดภัยสูงสุด ✅ 
 
 
 
🐳 ตัวเลือกที่ 1: Docker — เริ่มต้นง่ายที่สุด
 
✅ รัน Development Mode
 
bash
  
docker run -d \
  --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=StrongAdminPass123! \
  quay.io/keycloak/keycloak:26.0 \
  start-dev
 
 
เข้าที่: http://localhost:8080/auth → ล็อกอินด้วย admin / รหัสที่ตั้งไว้ ✅
 
✅ Production Mode — Docker + PostgreSQL
 
ใช้  docker-compose.yml :
 
yaml
  
version: "3"

services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.0
    command: start
    ports:
      - "8080:8080"
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
      
      # Database
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: ${DB_PASSWORD}
      
      # Hostname & HTTPS
      KC_HOSTNAME: auth.your-company.com
      KC_HTTPS_CERTIFICATE_FILE: /certs/fullchain.pem
      KC_HTTPS_CERTIFICATE_KEY_FILE: /certs/privkey.pem
      
      # Security
      KC_HTTP_ENABLED: false
      KC_PROXY: edge
    volumes:
      - ./certs:/certs:ro
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    restart: unless-stopped

volumes:
  postgres-data:
 
 
รันด้วย:  docker compose up -d  — สร้างไฟล์  .env  เก็บรหัสผ่าน ❌ อย่า Commit เข้า Git!
 
 
 
☸️ ตัวเลือกที่ 2: Kubernetes — สำหรับองค์กร
 
✅ ติดตั้งด้วย Helm (แนะนำ)
 
bash
  
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install keycloak bitnami/keycloak \
  --namespace auth \
  --create-namespace \
  --set auth.adminPassword=YourStrongPassword \
  --set postgresql.auth.password=YourDBPassword \
  --set ingress.enabled=true \
  --set ingress.hostname=auth.your-company.com \
  --set ingress.annotations."cert-manager\.io/cluster-issuer"=letsencrypt-prod \
  --set ingress.tls=true
 
 
✅ สิ่งที่ได้: Keycloak + PostgreSQL + Ingress + HTTPS — พร้อมใช้งานในคลัสเตอร์ 🚀
 
 
 
⚙️ ขั้นที่ 2: ตั้งค่าเบื้องต้น
 
🔹 สร้าง Realm
 
Realm = ขอบเขตอิสระ — แยกผู้ใช้ แอป และการตั้งค่าออกจากกัน
 
1. เข้า Keycloak Console → ที่มุมซ้ายบน → Create Realm
2. ตั้งชื่อ:  company-auth  หรือ  turborepo-cache 
3. Create → เสร็จ ✅
 
🔹 สร้าง Client สำหรับ Turborepo Cache
 
Client = แอปพลิเคชันที่จะเชื่อมต่อ
 
1. เข้า Realm ของคุณ → Clients → Create Client
2. Client type: OpenID Connect
3. Client ID:  turborepo-cache 
4. ✅ Next → ตั้งค่า:
- Client authentication: On ✅ (มี Secret)
- Authentication flow: Standard flow + Service accounts roles
5. ✅ Next → Save
 
จะได้:
 
- Client ID:  turborepo-cache 
- Client Secret: สุ่มรหัส — บันทึกไว้ ใช้ครั้งเดียว!
 
🔹 ตั้งค่า Client Scopes & Mappers
 
เพื่อให้ Token มีข้อมูลที่จำเป็น เช่น email, groups, role
 
1. Client Scopes →  turborepo-cache-dedicated  → Add mapper
2. Mapper ที่แนะนำ:
- Email: →  email 
- Groups: →  groups  (Path prefix: ไม่มี)
- Realm Roles: →  roles 
 
 
 
🔗 ขั้นที่ 3: เชื่อมต่อกับ Turborepo Remote Cache
 
✅ ข้อมูลที่ต้องใช้จาก Keycloak
 
คัดลอกค่าเหล่านี้จาก Realm Settings → Endpoints → OpenID Endpoint Configuration
 
ค่า ตัวอย่าง 
Issuer URL  https://auth.your-company.com/realms/company-auth  
Authorization URL  https://auth.your-company.com/realms/company-auth/protocol/openid-connect/auth  
Token URL  https://auth.your-company.com/realms/company-auth/protocol/openid-connect/token  
JWKS URL  https://auth.your-company.com/realms/company-auth/protocol/openid-connect/certs  
Client ID  turborepo-cache  
Client Secret  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  
 
✅ ตั้งค่า Cache Server
 
javascript
  
const OIDC_CONFIG = {
  issuer: "https://auth.your-company.com/realms/company-auth",
  clientId: "turborepo-cache",
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  jwksUri: "https://auth.your-company.com/realms/company-auth/protocol/openid-connect/certs",
  audience: "turborepo-cache",
  algorithms: ["RS256"]
};
 
 
💡 ใช้ JWKS URI เพื่อดึง Public Key ตรวจสอบลายเซ็นโดยอัตโนมัติ — ไม่ต้องจัดการกุญแจเอง ✅
 
✅ ตั้งค่า CI / GitHub Actions
 
yaml
  
# ขอ Token จาก Keycloak แล้วส่งให้ Turbo
- name: Get OIDC Token from Keycloak
  id: get-token
  run: |
    TOKEN=$(curl -X POST \
      "${{ secrets.KEYCLOAK_ISSUER }}/protocol/openid-connect/token" \
      -H "Content-Type: application/x-www-form-urlencoded" \
      -d "grant_type=client_credentials" \
      -d "client_id=${{ secrets.KEYCLOAK_CLIENT_ID }}" \
      -d "client_secret=${{ secrets.KEYCLOAK_CLIENT_SECRET }}" \
      | jq -r '.access_token')
    echo "token=$TOKEN" >> $GITHUB_OUTPUT

- name: Build
  env:
    TURBO_API: https://turbo-cache.your-company.com
    TURBO_TEAM: your-team
    TURBO_TOKEN: ${{ steps.get-token.outputs.token }}
  run: pnpm build
 
 
 
 
🔐 Security Hardening — สำหรับ Production
 
การตั้งค่า ค่าแนะนำ ทำไม 
HTTPS บังคับใช้เสมอ — ไม่เคย HTTP ป้องกันดักจับ Token ระหว่างทาง 
Admin Account เปลี่ยนรหัสผ่าน และเปิด MFA ทันที บัญชีสำคัญที่สุด — ป้องกันแน่นที่สุด 
Client Secret ความยาว ≥ 32 อักขระ หมุนเวียนเป็นประจำ เปลี่ยนทุก 90 วัน หรือเมื่อพนักงานลาออก 
Token Lifespan Access Token: 5–15 นาที Refresh Token: 15–60 นาที สั้น = ปลอดภัย ถ้ารั่วใช้ได้ไม่นาน 
Password Policy ≥12 ตัวอักษร, ตัวเลข+อักษร, บล็อกบัญชีเมื่อผิดเกินครั้ง ป้องกัน Brute Force 
Session Timeout 15–30 นาที ไม่มีกิจกรรม ป้องกันคนอื่นใช้ต่อเมื่อลืมล็อกเอาท์ 
Brute Force Protection Lockout: 5 ครั้งผิด → ล็อก 5 นาที ป้องกันการเดารหัสผ่านอัตโนมัติ 
Audit Logging บันทึกทุกอย่าง — ล็อกอิน, ออก Token, เปลี่ยนสิทธิ์ รู้ว่าใครทำอะไร เมื่อไหร่ 
CORS ระบุเฉพาะโดเมนที่จำเป็น — ไม่ใช่ * ป้องกันเว็บอื่นเรียกใช้ Keycloak 
Backup Export Realm ทั้งหมด + ข้อมูลผู้ใช้เป็นประจำ กู้คืนได้เมื่อระบบเสียหาย 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
403 Forbidden — Audience ไม่ถูกต้อง Token ไม่มี  aud  หรือไม่ตรงกับ Client ID ตั้ง Client ID เป็น Audience หรือเพิ่มใน Audience Mapper 
Token ไม่มีข้อมูลกลุ่ม/บทบาท Mapper ไม่ได้ถูกสร้าง/เปิดใช้ Clients → Client Scopes → Mappers → เพิ่ม Groups/Roles 
CI ไม่สามารถขอ Token ได้ Client Authentication ผิด หรือ Secret ไม่ถูกต้อง ตรวจสอบ Client ID + Secret และ Endpoint URL 
ช้ามากเมื่อมีผู้ใช้เยอะ ใช้ H2 Database ใน Development Mode ย้ายไปใช้ PostgreSQL/MySQL และเปิด Caching 
หมดรหัสผ่าน Admin ลบ Container แล้วสร้างใหม่ หรือใช้ CLI รีเซ็ต  kc.sh credentials admin --user admin --password NewPass123!  
 
 
 
✅ Checklist — พร้อม Production ไหม?
 
ใช้ External Database (PostgreSQL) — ไม่ใช่ H2 ✅
ตั้งค่า HTTPS ด้วยใบรับรองที่ถูกต้อง ✅
เปลี่ยนรหัสผ่าน Admin เริ่มต้น ✅
เปิด MFA สำหรับ Admin ✅
ปิดสิทธิ์ไม่จำเป็น — ผู้ใช้ทั่วไปไม่ควรมีบัญชี Admin ✅
ตั้งค่า Password Policy และ Brute Force Protection ✅
ตั้งค่า Token Expiration ที่เหมาะสม ✅
เปิด Audit Logging ✅
มี Backup และทดสอบการกู้คืน ✅
จำกัดการเข้าถึง Network — Firewall, IP Whitelist ✅
 
 
 
🔗 Related Notes
 
- [[OIDC Authentication (SSO) แทน Static Token]] — ภาพรวม OIDC และการใช้งาน
- [[Multi-Tenant Cache]] — แยกสิทธิ์ตามกลุ่ม/บทบาทจาก Keycloak
- [[Self-hosted Cache บน Kubernetes]] — Deploy ทั้งสองระบบในคลัสเตอร์เดียวกัน
- [[Authentication]] — หลักการยืนยันตัวตนและสิทธิ์
 
 
 
✅ สรุปสั้นๆ: Keycloak = SSO กลางขององค์กร — ติดตั้งง่ายด้วย Docker/Helm, ตั้งค่า Realm + Client, เชื่อมทุกแอปเข้าใช้ และจัดการผู้ใช้จากที่เดียว ปลอดภัย ควบคุมเอง และประหยัดค่าใช้จ่าย 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น User Federation (LDAP/AD), Groups & RBAC, Backup & Disaster Recovery, หรือ Performance Tuning สำหรับผู้ใช้จำนวนมาก 😊