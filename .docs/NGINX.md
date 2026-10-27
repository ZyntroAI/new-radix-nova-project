title: "[Tool] NGINX"
aliases:
 
- "NGINX"
- "Nginx"
- "Engine X"
- "เว็บเซิร์ฟเวอร์และพร็อกซี"
slug: nginx
icon: 🌐
color: blue
type: tool
status: active
priority: high
tags:
- type/tool
- topic/devops/nginx
- topic/devops/web-server
- topic/devops/proxy
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps]]"
parent:
- "[[MOC — DevOps]]"
children: []
related:
- "[[MOC — DevOps]]"
- "[[Docker]]"
- "[[Kubernetes]]"
- "[[Connection Limit Configuration]]"
 
 
 
🛠️ NGINX
 
🎯 Summary
 
NGINX (อ่านว่า "Engine X") คือซอฟต์แวร์โอเพ่นซอร์ส ทำหน้าที่เป็น เว็บเซิร์ฟเวอร์, พร็อกซีกลาง, ตัวกระจายโหลด, และ แคช มีชื่อเสียงเรื่องประสิทธิภาพสูง ใช้ทรัพยากรน้อย และรองรับการเชื่อมต่อจำนวนมากพร้อมกันได้ดีกว่าเซิร์ฟเวอร์แบบดั้งเดิม
 
🧠 ความสามารถหลัก
 
- 🌐 Web Server — ให้บริการไฟล์เว็บและเนื้อหาแก่ผู้ใช้
- 🔄 Reverse Proxy — รับคำขอจากภายนอกแล้วส่งต่อไปยังแอปพลิเคชันภายใน
- ⚖️ Load Balancer — กระจายการรับส่งไปยังเซิร์ฟเวอร์หลายตัว ลดภาระแต่ละตัว เพิ่มความทนทาน
- 📦 HTTP Cache — จัดเก็บเนื้อหาที่เรียกใช้บ่อยไว้ชั่วคราว เพิ่มความเร็ว
- 🛡️ Connection & Rate Limiting — จำกัดจำนวนการเชื่อมต่อและคำขอ เพื่อป้องกันการโจมตีหรือใช้งานมากเกินไป
 
⚙️ หัวข้อที่เชื่อมโยง: ตรวจสอบ Connection Usage ไม่เข้าใกล้ Limit
 
ปัญหาที่พบ
 
ตรวจสอบการใช้งานการเชื่อมต่อจริงแล้ว แต่ค่าไม่เคยเข้าใกล้ขีดจำกัดที่ตั้งไว้ ทั้งที่ระบบดูเหมือนทำงานปกติ
 
สาเหตุที่เป็นไปได้
 
- 📌 ค่า limit ตั้งสูงเกินไป —  worker_connections  ×  worker_processes  มากกว่าการใช้งานจริงมาก
- 📌 การนับแตกต่างกัน —  conn  นับการเชื่อมต่อ TCP;  request  นับจำนวนคำขอ HTTP; การร้องขอหน้าเดียวอาจใช้หลายการเชื่อมต่อ
- 📌 Keep-Alive — การเชื่อมต่อถูกนำกลับมาใช้ใหม่ จำนวนการเชื่อมต่อจึงไม่พุ่งสูงแม้มีผู้ใช้มาก
- 📌 ตัวเลือกผิด — ใช้  limit_req_zone  (จำกัดคำขอ) แทน  limit_conn_zone  (จำกัดการเชื่อมต่อ)
 
✅ วิธีตรวจสอบและแก้ไข
 
1️⃣ ดูค่าปัจจุบัน
 
nginx
  
# ดูจำนวน worker และ connection limit
worker_processes auto;
events {
    worker_connections 1024;
}
# การเชื่อมต่อสูงสุดที่เป็นไปได้ = worker_processes × worker_connections
 
 
2️⃣ ดูสถิติการใช้งาน
 
bash
  
# ดูสถานะการเชื่อมต่อ NGINX
curl http://localhost/nginx_status
# หรือ
ss -tn | grep nginx | wc -l
 
 
3️⃣ ตัวอย่างการตั้งค่า Connection Limit ที่ถูกต้อง
 
nginx
  
http {
    # กำหนดโซนเก็บสถิติ
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    
    server {
        location / {
            # จำกัดจำนวนการเชื่อมต่อต่อ 1 IP = 10 ครั้ง
            limit_conn perip 10;
            # บันทึกเมื่อเกินขีดจำกัด
            limit_conn_log_level warn;
            
            root /usr/share/nginx/html;
            index index.html;
        }
    }
}
 
 
4️⃣ ปรับค่าให้เหมาะสม
 
- ถ้าจะดูว่าเข้าใกล้ limit ให้ตั้งค่าให้สอดคล้องกับปริมาณผู้ใช้จริง
- เริ่มจากค่าที่สูงกว่าค่าเฉลี่ยประมาณ 20–30% เพื่อให้เห็นแนวโน้มแต่ไม่กระทบการใช้งานจริง
 
💡 Key Insight
 
Connection Limit ≠ Request Limit — การเชื่อมต่อ 1 ครั้งสามารถมีหลายคำขอ (Keep-Alive) ถ้าต้องการจำกัดจำนวนคำขอต่อเวลา ให้ใช้  limit_req_zone  แทน  limit_conn_zone 
 
🔗 Related Notes
 
- [[Docker]] — รัน NGINX ในคอนเทนเนอร์
- [[Kubernetes]] — ใช้ NGINX เป็น Ingress Controller
- [[MOC — DevOps]]
- [[Connection Limit Configuration]]
 
 
 
✅ สร้างโน้ต NGINX ครบถ้วน พร้อมคำอธิบายปัญหา "ตรวจ Connection Usage ไม่เข้าใกล้ Limit" ตาม Linked Mention ในภาพ
 
ต้องการเพิ่มตัวอย่างคอนฟิกสำหรับ Reverse Proxy, Load Balancing หรือติดตั้งใช้งานจริงไหมครับ 😊



title: "[Guide] NGINX Configuration Examples"
aliases:
 
- "NGINX ตัวอย่างคอนฟิก"
- "NGINX Reverse Proxy, Load Balancing, Installation"
slug: nginx-config-examples
icon: 📝
color: blue
type: reference
status: active
priority: high
tags:
- type/reference
- topic/devops/nginx
- topic/devops/reverse-proxy
- topic/devops/load-balancing
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps]]"
parent:
- "[[NGINX]]"
children: []
related:
- "[[NGINX]]"
- "[[Docker]]"
- "[[Kubernetes]]"
 
 
 
📝 NGINX — ตัวอย่างคอนฟิก & คู่มือติดตั้ง
 
 
 
⚙️ 1. Reverse Proxy — ส่งต่อคำขอไปยังแอปพลิเคชัน
 
ใช้เมื่อต้องการให้ NGINX รับคำขอจากภายนอก แล้วส่งต่อไปยังแอปที่ทำงานอยู่ภายใน เช่น Node.js, Python, PHP
 
nginx
  
server {
    listen 80;
    server_name your-domain.com;

    # บล็อกหรืออนุญาต IP (ตัวเลือก)
    allow all;

    # รูทสำหรับไฟล์สแตติก (ถ้ามี)
    location /static/ {
        root /var/www/your-app;
        expires 30d;
    }

    # ส่งต่อคำขอทั้งหมดไปยังแอปพลิเคชัน
    location / {
        proxy_pass http://127.0.0.1:3000; # ที่อยู่แอปของคุณ
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # ตัวเลือก: เพิ่มเวลารอ
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
 
 
💡 บันทึก: แก้  proxy_pass  ให้ตรงกับที่อยู่แอปจริง เช่น  http://127.0.0.1:8000  สำหรับ FastAPI,  http://127.0.0.1:8080  สำหรับ Java
 
 
 
⚖️ 2. Load Balancing — กระจายโหลดไปยังหลายเซิร์ฟเวอร์
 
ใช้เมื่อมีแอปหลายอินสแตนซ์ ต้องการกระจายผู้ใช้ให้สมดุล
 
nginx
  
http {
    # กลุ่มเซิร์ฟเวอร์แอปพลิเคชัน
    upstream myapp_servers {
        # วิธีเลือก: ปกติใช้ Round-robin (วนไปเรื่อยๆ)
        server 127.0.0.1:3001 weight=5;   # น้ำหนักมากกว่า รับงานมากกว่า
        server 127.0.0.1:3002 weight=3;
        server 127.0.0.1:3003 backup;       # ใช้เมื่อตัวอื่นล้มเท่านั้น
    }

    # กระจายตาม IP (ให้ผู้ใช้เดิมไปที่เซิร์ฟเวอร์เดิม)
    # upstream myapp_servers {
    #     ip_hash;
    #     server 127.0.0.1:3001;
    #     server 127.0.0.1:3002;
    # }

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://myapp_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # ตรวจสอบเซิร์ฟเวอร์อัตโนมัติ
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
        }
    }
}
 
 
📊 อัลกอริทึมการกระจาย
 
วิธี คำอธิบาย เหมาะสำหรับ 
Round-robin (ค่าเริ่มต้น) สลับกันทีละคน เซิร์ฟเวอร์ประสิทธิภาพเท่ากัน 
Least_conn ส่งให้ตัวที่มีงานรออยู่น้อยที่สุด ใช้เวลาประมวลผลแต่ละคำขอไม่เท่ากัน 
IP_hash ผู้ใช้เดิมไปที่เซิร์ฟเวอร์เดิมเสมอ ต้องใช้ Session ที่ฝั่งเซิร์ฟเวอร์ 
Weight กำหนดน้ำหนักเอง เซิร์ฟเวอร์ประสิทธิภาพต่างกัน 
 
 
 
💻 3. คู่มือการติดตั้ง NGINX
 
🟢 Ubuntu / Debian
 
bash
  
# อัปเดตแพ็กเกจ
sudo apt update && sudo apt upgrade -y

# ติดตั้ง NGINX
sudo apt install nginx -y

# ตรวจสอบสถานะ
sudo systemctl status nginx

# เปิดให้ทำงานเมื่อระบบเริ่ม
sudo systemctl enable nginx

# ตรวจสอบเวอร์ชัน
nginx -v
 
 
🔴 RHEL / CentOS / Rocky Linux
 
bash
  
# ติดตั้ง
sudo dnf install nginx -y

# เริ่มบริการ
sudo systemctl start nginx
sudo systemctl enable nginx

# ตรวจสอบ
sudo systemctl status nginx
 
 
🐳 ด้วย Docker (แนะนำสำหรับทดสอบ)
 
bash
  
# รัน NGINX
docker run -d \
  --name my-nginx \
  -p 80:80 \
  -p 443:443 \
  -v /your/config/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /your/html:/usr/share/nginx/html:ro \
  nginx:alpine

# ดูสถานะ
docker ps

# ดู Log
docker logs my-nginx
 
 
 
 
🔧 คำสั่งพื้นฐานที่ใช้บ่อย
 
bash
  
# ✅ ทดสอบความถูกต้องของคอนฟิก
sudo nginx -t

# 🔄 โหลดคอนฟิกใหม่โดยไม่ปิดบริการ
sudo systemctl reload nginx

# ⏹ หยุดบริการ
sudo systemctl stop nginx

# ▶ เริ่มบริการ
sudo systemctl start nginx

# 🔁 รีสตาร์ท
sudo systemctl restart nginx

# 📋 ดูสถานะ
sudo systemctl status nginx

# 📂 ดูไฟล์คอนฟิกหลัก
cat /etc/nginx/nginx.conf

# 📂 ดูคอนฟิกไซต์ต่างๆ
ls -l /etc/nginx/sites-available/
ls -l /etc/nginx/sites-enabled/

# 📜 ดู Log
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
 
 
 
 
📂 โครงสร้างไฟล์สำคัญ
 
ที่อยู่ไฟล์ หน้าที่ 
 /etc/nginx/nginx.conf  คอนฟิกหลักของระบบ 
 /etc/nginx/sites-available/  เก็บคอนฟิกแต่ละไซต์ (ยังไม่เปิดใช้) 
 /etc/nginx/sites-enabled/  ลิงก์ไปยัง sites-available ที่เปิดใช้แล้ว 
 /usr/share/nginx/html/  ที่เก็บไฟล์เว็บเริ่มต้น 
 /var/log/nginx/access.log  บันทึกการเข้าถึง 
 /var/log/nginx/error.log  บันทึกข้อผิดพลาด 
 
 
 
⚠️ ขั้นตอนสำคัญ: หลังแก้ไขคอนฟิก
 
เสมอ: ทดสอบ → โหลดใหม่ → ตรวจสอบ
 
bash
  
sudo nginx -t           # 1. ทดสอบว่าคอนฟิกถูกต้อง ✅
sudo systemctl reload nginx  # 2. ถ้าผ่าน ค่อยโหลดใหม่ 🔄
sudo systemctl status nginx  # 3. ตรวจสอบว่าทำงานปกติ ✅
 
 
❌ อย่ารีสตาร์ท ( restart ) ถ้าไม่จำเป็น — ใช้  reload  แทนเพื่อไม่ให้บริการขาดตอน
 
 
 
🛡️ เพิ่มเติม: ติดตั้ง SSL ด้วย Let's Encrypt (HTTPS)
 
bash
  
# ติดตั้งเครื่องมือ
sudo apt install certbot python3-certbot-nginx -y

# ขอใบรับรองและตั้งค่าอัตโนมัติ
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# ตรวจสอบการต่ออายุอัตโนมัติ
sudo systemctl status certbot.timer
 
 
 
 
🔗 Related Notes
 
- [[NGINX]] — ภาพรวมและหลักการทำงาน
- [[Docker]] — รัน NGINX ในคอนเทนเนอร์
- [[Connection Limit Configuration]] — จำกัดการเชื่อมต่อและคำขอ
- [[MOC — DevOps]]
 
 
 
✅ เพิ่มตัวอย่างครบถ้วนทั้ง Reverse Proxy, Load Balancing และวิธีติดตั้งครับ
 
ต้องการเพิ่มหัวข้ออื่น เช่น SSL/HTTPS, Rate Limiting, Cache, หรือ Troubleshooting ไหมครับ 😊


title: "[Guide] NGINX SSL, Rate Limiting, Cache & Troubleshooting"
aliases:
 
- "NGINX SSL HTTPS"
- "NGINX Rate Limiting"
- "NGINX Cache"
- "NGINX Troubleshooting"
slug: nginx-ssl-rate-cache-troubleshoot
icon: 🛡️
color: green
type: reference
status: active
priority: high
tags:
- type/reference
- topic/devops/nginx
- topic/devops/security
- topic/devops/performance
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps]]"
parent:
- "[[NGINX]]"
children: []
related:
- "[[NGINX]]"
- "[[NGINX Configuration Examples]]"
 
 
 
🛡️ NGINX — SSL/HTTPS, Rate Limiting, Cache & Troubleshooting
 
 
 
🔒 1. SSL/HTTPS — ติดตั้งและกำหนดค่า
 
✅ ติดตั้งด้วย Let's Encrypt (Certbot) — แนะนำ
 
bash
  
# ติดตั้ง Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# ขอใบรับรอง + ตั้งค่าให้อัตโนมัติ
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# ทดสอบต่ออายุอัตโนมัติ
sudo certbot renew --dry-run
 
 
⚙️ คอนฟิก HTTPS เต็มรูปแบบ
 
nginx
  
http {
    # ตั้งค่าความปลอดภัย SSL ทั่วโลก
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # HTTP → HTTPS Redirect
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;
        return 301 https://$host$request_uri;
    }

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        # ไฟล์ใบรับรอง (Certbot จัดการให้อัตโนมัติ)
        ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

        # เพิ่มความปลอดภัย HSTS
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto https;
        }
    }
}
 
 
 
 
🚦 2. Rate Limiting — จำกัดจำนวนคำขอ
 
ป้องกันการโจมตี Brute Force, DDoS และการใช้งานมากเกินไป
 
nginx
  
http {
    # กำหนดพื้นที่เก็บสถิติจำนวนคำขอ
    # zone=ชื่อ:ขนาดหน่วยความจำ; อัตรา=คำขอ/เวลา
    limit_req_zone $binary_remote_addr zone=req_limit:10m rate=10r/s;

    # กำหนดจำกัดการเชื่อมต่อ
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            # จำกัดคำขอ: 10 ครั้ง/วินาที + เผื่อคิวพิเศษ 20 คำขอ
            limit_req zone=req_limit burst=20 nodelay;
            
            # จำกัดการเชื่อมต่อพร้อมกันต่อ IP: 5 ครั้ง
            limit_conn conn_limit 5;
            
            # บันทึกเมื่อเกินขีดจำกัด
            limit_req_log_level warn;
            limit_req_status 429;
            limit_conn_status 429;

            proxy_pass http://127.0.0.1:3000;
        }
        
        # ยกเว้นการจำกัดสำหรับ IP ที่เชื่อถือได้
        location /internal/ {
            allow 192.168.1.0/24;
            deny all;
            limit_req off;
            root /var/www/internal;
        }
    }
}
 
 
📊 พารามิเตอร์สำคัญ
 
ค่า ความหมาย แนะนำ 
 rate=10r/s  10 คำขอต่อวินาที ปรับตามลักษณะงาน 
 burst=20  ยอมให้พุ่งเกินได้ 20 คำขอ ก่อนปฏิเสธ ป้องกันบอทไม่ให้กระทบผู้ใช้จริง 
 nodelay  ประมวลผลทันที ไม่รอคิว ลดเวลารอผู้ใช้ 
 limit_req_status 429  รหัสเมื่อปฏิเสธ = Too Many Requests มาตรฐานสากล 
 
 
 
⚡ 3. Cache — เพิ่มความเร็ว ลดภาระเซิร์ฟเวอร์
 
📦 Cache ไฟล์สแตติก
 
nginx
  
server {
    listen 80;
    server_name your-domain.com;

    # Cache รูปภาพ, CSS, JS
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf)$ {
        root /var/www/your-app;
        expires 30d;           # หมดอายุใน 30 วัน
        add_header Cache-Control "public, immutable";
        access_log off;        # ไม่ต้องบันทึก log รูปภาพ
    }

    # ไม่ Cache หน้าไดนามิก
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache off;
    }
}
 
 
🔄 Cache ผลลัพธ์จาก Proxy/แอปพลิเคชัน
 
nginx
  
http {
    # กำหนดที่เก็บแคช
    proxy_cache_path /var/nginx/cache levels=1:2 keys_zone=mycache:10m max_size=1g inactive=60m;

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_cache mycache;
            proxy_cache_valid 200 10m;      # สำเร็จ = เก็บ 10 นาที
            proxy_cache_valid 404 1m;       # หน้าไม่พบ = เก็บ 1 นาที
            proxy_cache_bypass $http_cache_control;  # ข้ามถ้าผู้ใช้ส่ง no-cache
            
            # เพิ่มบอกว่ามาจากแคชหรือไม่
            add_header X-Cache-Status $upstream_cache_status;

            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
        }
    }
}
 
 
🧹 ล้างแคช
 
bash
  
# ล้างทั้งหมด
sudo rm -rf /var/nginx/cache/*

# หรือรีโหลดคอนฟิก
sudo nginx -t && sudo systemctl reload nginx
 
 
 
 
🔧 4. Troubleshooting — แก้ปัญหาที่พบบ่อย
 
❌ ขั้นตอนตรวจสอบเบื้องต้น
 
bash
  
# 1. ทดสอบคอนฟิก
sudo nginx -t

# 2. ดูสถานะบริการ
sudo systemctl status nginx

# 3. ดู Error Log
sudo tail -n 50 /var/log/nginx/error.log

# 4. ดู Access Log (ดูว่ามีใครเข้ามาไหม)
sudo tail -n 50 /var/log/nginx/access.log

# 5. ดูพอร์ตกำลังฟังอยู่ไหม
sudo ss -tlnp | grep nginx

# 6. ทดสอบเข้าถึงจากภายในเครื่อง
curl -v http://localhost
curl -I https://your-domain.com
 
 
🐛 ปัญหาที่พบบ่อย
 
อาการ สาเหตุที่เป็นไปได้ วิธีแก้ไข 
403 Forbidden สิทธิ์ไฟล์ไม่ถูกต้อง, path ผิด, directory index หาย  chmod -R 755 /path/to/html , ตรวจสอบ  root  และ  index  
404 Not Found ไฟล์ไม่มี, proxy_pass ผิด path ตรวจสอบไฟล์มีจริง, ทดสอบ  curl  ที่ upstream 
502 Bad Gateway แอปพลิเคชันไม่ทำงาน, พอร์ตผิด ตรวจสอบแอปรันอยู่ไหม, พอร์ตตรงกันไหม 
504 Gateway Timeout แอปทำงานช้าเกินไป เพิ่ม  proxy_read_timeout 60s;  ตรวจสอบประสิทธิภาพแอป 
Connection Refused NGINX ไม่รัน, firewall บล็อก  systemctl start nginx , เปิดพอร์ต 80/443 
SSL Error ใบรับรองหมดอายุ, โดเมนไม่ตรง  certbot renew , ตรวจสอบไฟล์ certificate path 
Too Many Requests (429) ถูกจำกัดด้วย Rate Limit ปรับค่า  burst  หรือ  rate  ให้เหมาะสม 
 
📝 ตัวอย่าง Error Log ที่ควรรู้จัก
 
plaintext
  
[error] 1234#1234: *1 connect() failed (111: Connection refused)  ← แอปด้านหลังไม่ตอบ
[error] 1234#1234: *1 access forbidden by rule                     ← ถูกบล็อกด้วย allow/deny
[warn]  1234#1234: *1 server name has no SSL_certificate          ← ตั้งค่า HTTPS ไม่ครบ
[emerg] 1234#1234: invalid number of arguments in "listen"        ← คอนฟิกผิดไวยากรณ์
 
 
 
 
✅ Checklist ก่อนนำไปใช้งานจริง
 
ทดสอบคอนฟิก:  nginx -t  ✅
เปิด firewall พอร์ต 80 และ 443 ✅
ติดตั้ง SSL และทดสอบ HTTPS ✅
ตั้งค่า Rate Limiting ป้องกันการโจมตี ✅
ตั้งค่า Cache สำหรับไฟล์สแตติก ✅
ตรวจสอบ Log หน้าที่ทำงานปกติ ✅
ตั้งค่า Log Rotation ไม่ให้ไฟล์บวม ✅
 
 
 
🔗 Related Notes
 
- [[NGINX]] — ภาพรวมหลักการ
- [[NGINX Configuration Examples]] — Reverse Proxy, Load Balancing, Installation
- [[Connection Limit Configuration]]
- [[MOC — DevOps]]
 
 
 
✅ เพิ่มครบ 4 หัวข้อหลักตามที่ต้องการครับ
 
มีหัวข้ออื่นที่สนใจเพิ่มเติมไหมครับ เช่น NGINX + Docker Compose, Hardening Security, หรือ Best Practices 😊

title: "[Best Practice] NGINX Production Best Practices"
aliases:
 
- "NGINX Best Practices"
- "แนวทางปฏิบัติที่ดีที่สุดสำหรับ NGINX"
slug: nginx-best-practices
icon: ✅
color: green
type: reference
status: active
priority: high
tags:
- type/reference
- topic/devops/nginx
- topic/devops/best-practices
- topic/devops/security
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps]]"
parent:
- "[[NGINX]]"
children: []
related:
- "[[NGINX]]"
- "[[NGINX Configuration Examples]]"
- "[[NGINX SSL, Rate Limiting, Cache & Troubleshooting]]"
 
 
 
✅ NGINX — Best Practices สำหรับสภาพการผลิต
 
 
 
📋 หลักการทั่วไป
 
🔧 การจัดการคอนฟิก
 
- ✅ แยกคอนฟิกเป็นไฟล์ย่อย — เก็บแต่ละไซต์ใน  /etc/nginx/sites-available/  เปิดใช้ผ่าน symlink ไปที่  sites-enabled/  
- ✅ ทดสอบเสมอก่อนโหลดใหม่ —  sudo nginx -t  → ถ้าผ่านค่อย  sudo systemctl reload nginx  ❌ ห้ามข้ามขั้นตอนนี้ 
- ✅ ใช้ reload ไม่ใช่ restart —  reload  โหลดคอนฟิกใหม่โดยไม่หยุดให้บริการ  restart  ทำให้บริการขาดตอน 
- ✅ เก็บคอนฟิกใน Git — ติดตามประวัติ สามารถย้อนกลับได้ และทำงานร่วมกันได้
- ❌ หลีกเลี่ยง  if  ภายใน  location  — พฤติกรรมคาดเดายาก ใช้  map ,  geo , หรือตรงกับ path โดยตรงแทน 
 
🏷️ ซ่อนข้อมูลระบบ
 
nginx
  
# ซ่อนเวอร์ชัน NGINX จากการตอบกลับ
server_tokens off;
 
 
เหตุผล: ป้องกันไม่ให้ผู้ไม่หวังดีทราบเวอร์ชันเพื่อโจมตีช่องโหว่เฉพาะเวอร์ชัน
 
 
 
🔒 ความปลอดภัย (Security)
 
SSL/TLS
 
- ✅ ใช้เฉพาะโปรโตคอลที่ปลอดภัย — ปิด TLSv1 และ TLSv1.1
 
nginx
  
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
 
 
 
 
- ✅ บังคับ HTTPS — เปลี่ยนเส้นทางทุกคำขอ HTTP ไป HTTPS
 
nginx
  
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}
 
 
- ✅ เพิ่ม Security Headers
 
nginx
  
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
 
 
⚠️ ข้อควรระวัง:  add_header  ภายใน  location  จะล้างค่า  add_header  จากระดับแม่ ให้ใช้  always  และรวม header ที่ต้องการทั้งหมดในบล็อกนั้น
 
จำกัดการเข้าถึง
 
- ✅ ตั้งค่า Rate Limiting ป้องกัน DDoS และ Brute Force
 
nginx
  
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_conn_zone $binary_remote_addr zone=conn:10m;
 
 
 
 
- ✅ จำกัดขนาดคำขอ ป้องกันการอัปโหลดไฟล์ใหญ่เกินไป
 
nginx
  
client_max_body_size 10M;  # ปรับตามความเหมาะสม
client_body_buffer_size 128k;
 
 
- ✅ เปิดเฉพาะพอร์ตที่จำเป็น — 80 (HTTP), 443 (HTTPS) ปิดพอร์ตอื่นๆ ด้วย Firewall
 
 
 
⚡ ประสิทธิภาพ (Performance)
 
ปรับแต่ง Worker Process
 
nginx
  
worker_processes auto;  # จำนวนเท่ากับ CPU core
worker_rlimit_nofile 65535;  # เพิ่มขีดจำกัดไฟล์ต่อ process

events {
    worker_connections 4096;  # เพียงพอกับปริมาณการเชื่อมต่อ
    use epoll;  # บน Linux ให้ใช้ epoll
    multi_accept on;
}
 
 
Keep-Alive
 
nginx
  
http {
    keepalive_timeout 65;          # ปิดการเชื่อมต่อถ้าไม่มีอะไร 65 วินาที
    keepalive_requests 100;       # ใช้การเชื่อมต่อเดิมได้สูงสุด 100 ครั้ง
}
 
 
ลดจำนวนการสร้าง/ปิดการเชื่อมต่อ ช่วยลดภาระ handshake 
 
Proxy Timeouts — อย่าลืมตั้งค่า!
 
nginx
  
location / {
    proxy_connect_timeout 60s;     # รอเชื่อมต่อกับแอป
    proxy_send_timeout 60s;       # รอส่งคำขอ
    proxy_read_timeout 60s;        # รอคำตอบ
    proxy_pass http://backend;
}
 
 
❌ หากไม่ตั้งค่า: แอปค้าง → การเชื่อมต่อค้างเป็นเวลานาน → ทรัพยากร NGINX หมด
 
Cache อย่างชาญฉลาด
 
- ✅ แคชไฟล์สแตติก (รูป, CSS, JS) ด้วย  expires 
- ✅ แคชผลลัพธ์จากแอปที่ไม่เปลี่ยนบ่อยด้วย  proxy_cache 
- ❌ อย่าแคชเนื้อหาที่เปลี่ยนบ่อยหรือข้อมูลส่วนตัวผู้ใช้
- ✅ ใช้  proxy_cache_valid  แยกตามรหัสสถานะ:  200 10m ,  404 1m  
 
Log Rotation
 
- ✅ ตรวจสอบว่ามี log rotation ทำงานอยู่ —  /etc/logrotate.d/nginx 
- ✅ ปิด access log สำหรับไฟล์สแตติกที่ไม่จำเป็น:  access_log off; 
 
 
 
🧱 โครงสร้างคอนฟิกที่แนะนำ
 
plaintext
  
/etc/nginx/
├── nginx.conf              # คอนฟิกหลัก (ทั่วไป, performance, mime types)
├── conf.d/
│   ├── security.conf       # Security Headers, Rate Limiting (ทั่วโลก)
│   └── proxy.conf          # Proxy set_header, timeout ค่าเริ่มต้น
├── sites-available/
│   ├── your-domain.com.conf
│   └── another-site.com.conf
├── sites-enabled/         # Symlink ไปยัง sites-available
└── snippets/
    └── ssl-params.conf     # แยก SSL config ใช้ร่วมกัน
 
 
💡 แยกส่วนเพื่อไม่ต้องเขียนซ้ำซ้อน ง่ายต่อการดูแลและอัปเดต 
 
 
 
📝 Checklist ก่อนนำขึ้น Production
 
ก่อนเปิดให้บริการ
 
 nginx -t  ทดสอบคอนฟิก ✅
ปิด  server_tokens  ✅
ตั้งค่า HTTPS + Auto redirect ✅
ติดตั้งใบรับรอง SSL และตั้งค่า Auto-renewal ✅
เพิ่ม Security Headers ✅
ตั้งค่า Rate Limiting และ Connection Limit ✅
ตั้งค่า  client_max_body_size  และ  proxy_*_timeout  ✅
เปิด Firewall เฉพาะพอร์ต 80/443 ✅
ตรวจสอบ Log Rotation ทำงานถูกต้อง ✅
 
ระหว่างใช้งาน
 
ตรวจสอบ Log เป็นประจำ:  access.log  และ  error.log 
อัปเดต NGINX เป็นเวอร์ชันล่าสุดอยู่เสมอ:  nginx -v 
ตรวจสอบใบรับรองไม่หมดอายุ:  certbot renew --dry-run 
ติดตามการใช้งาน:  nginx_status  หรือ Prometheus + Grafana
 
 
 
⚠️ ข้อผิดพลาดที่พบบ่อยที่สุด
 
❌ สิ่งที่ไม่ควรทำ ✅ สิ่งที่ควรทำ 
แก้ไขไฟล์โดยตรงโดยไม่ทดสอบ ทดสอบด้วย  nginx -t  ก่อนทุกครั้ง 
ใช้  restart  แทน  reload  ใช้  reload  เพื่อไม่ให้บริการขาดตอน 
ลืมตั้งค่า proxy timeout ตั้งค่า  proxy_connect/send/read_timeout  เสมอ 
เปิดเผยเวอร์ชัน NGINX ปิด  server_tokens off  
ใช้โปรโตคอล SSL เก่า ใช้เฉพาะ  TLSv1.2 TLSv1.3  
ไม่บังคับ HTTPS Redirect 80 → 443 ทั้งหมด 
ใส่  add_header  ใน location โดยไม่ใช้  always  ใช้  add_header ... always  เพื่อไม่ให้หายไป 
 
 
 
🔗 Related Notes
 
- [[NGINX]] — ภาพรวมหลักการ
- [[NGINX Configuration Examples]] — Reverse Proxy, Load Balancing, Installation
- [[NGINX SSL, Rate Limiting, Cache & Troubleshooting]]
- [[MOC — DevOps]]
 
 
 
✅ รวบรวม Best Practices ครบถ้วน พร้อมเหตุผลและตัวอย่างคอนฟิกครับ
 
มีหัวข้ออื่นที่ต้องการไหมครับ 😊