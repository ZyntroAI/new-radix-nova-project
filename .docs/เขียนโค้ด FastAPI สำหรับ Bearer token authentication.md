เขียนโค้ด FastAPI สำหรับ Bearer token authentication

ใช้ **JWT Bearer token** กับ FastAPI ได้โดยสร้าง token ที่ `/auth/token`, ตรวจ `Authorization: Bearer <token>` ด้วย dependency แล้วป้องกัน endpoint ที่ต้องการสิทธิ์ FastAPI ใช้ `Depends()` สำหรับ authentication/authorization และ `OAuth2PasswordBearer` ช่วยดึง token จาก header แต่ยังต้อง verify signature เอง[1][2]

## ติดตั้ง

```bash
pip install "fastapi[standard]" "pyjwt[crypto]"
```

หรือเพิ่มใน `requirements.txt`:

```text
fastapi[standard]>=0.115.0
pyjwt[crypto]>=2.8.0
```

## โครงสร้าง

```text
obsidian-fastapi/
├── .env
├── main.py
├── auth.py
└── schemas.py
```

## `.env`

```env
AGENT_OS_SECRET_KEY=change-this-to-a-long-random-secret
AGENT_OS_ACCESS_TOKEN_EXPIRE_MINUTES=60
```

สร้าง secret แบบสุ่ม:

```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

## `schemas.py`

```python
from pydantic import BaseModel


class TokenRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CurrentUser(BaseModel):
    username: str
    role: str


class ProtectedResponse(BaseModel):
    message: str
    user: CurrentUser
```

## `auth.py`

```python
import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from schemas import CurrentUser

load_dotenv()

SECRET_KEY = os.getenv(
    "AGENT_OS_SECRET_KEY",
    "change-this-in-production",
)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "AGENT_OS_ACCESS_TOKEN_EXPIRE_MINUTES",
        "60",
    )
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/token",
    scheme_name="Agent OS Bearer",
)

FAKE_USERS = {
    "zyntro": {
        "username": "zyntro",
        "password": "change-this-password",
        "role": "admin",
    }
}


def create_access_token(
    username: str,
    expires_minutes: int | None = None,
) -> str:
    expires_delta = timedelta(
        minutes=(
            expires_minutes
            or ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    now = datetime.now(timezone.utc)

    payload = {
        "sub": username,
        "iat": now,
        "exp": now + expires_delta,
        "scope": "agent-os:read agent-os:write",
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def verify_access_token(
    token: str = Depends(oauth2_scheme),
) -> CurrentUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        username = payload.get("sub")

        if not username:
            raise credentials_exception

        user = FAKE_USERS.get(username)

        if not user:
            raise credentials_exception

        return CurrentUser(
            username=user["username"],
            role=user["role"],
        )
    except jwt.ExpiredSignatureError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        ) from error
    except jwt.InvalidTokenError as error:
        raise credentials_exception from error


def require_admin(
    current_user: CurrentUser = Depends(
        verify_access_token
    ),
) -> CurrentUser:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required",
        )

    return current_user
```

`OAuth2PasswordBearer` เพียงดึง Bearer token จาก header; การตรวจ signature, expiry และ user ต้องทำใน dependency ของคุณเอง  PyJWT ใช้ `jwt.encode()` และ `jwt.decode()` กับ `algorithms=["HS256"]`[2][3][4]

## `main.py`

```python
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from auth import (
    create_access_token,
    require_admin,
    verify_access_token,
)
from schemas import (
    ProtectedResponse,
    TokenResponse,
)

load_dotenv()

app = FastAPI(
    title="ZyntroAI Agent OS API",
    version="0.1.0",
)


@app.post(
    "/auth/token",
    response_model=TokenResponse,
    tags=["auth"],
)
async def issue_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> TokenResponse:
    user = FAKE_USERS.get(form_data.username)

    if (
        not user
        or user["password"] != form_data.password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        username=user["username"]
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
    )


@app.get(
    "/api/v1/me",
    tags=["auth"],
)
async def read_current_user(
    current_user: CurrentUser = Depends(
        verify_access_token
    ),
) -> CurrentUser:
    return current_user


@app.get(
    "/api/v1/admin-only",
    tags=["admin"],
)
async def admin_only(
    current_user: CurrentUser = Depends(require_admin),
) -> ProtectedResponse:
    return ProtectedResponse(
        message="Admin access granted.",
        user=current_user,
    )


@app.post(
    "/api/v1/knowledge/search",
    tags=["knowledge"],
)
async def search_knowledge(
    current_user: CurrentUser = Depends(
        verify_access_token
    ),
) -> dict:
    return {
        "message": "Authenticated knowledge search",
        "user": current_user.username,
    }


@app.post(
    "/api/v1/knowledge/reindex",
    tags=["knowledge"],
)
async def reindex_knowledge(
    current_user: CurrentUser = Depends(require_admin),
) -> dict:
    return {
        "message": "Reindex started",
        "user": current_user.username,
    }
```

## รัน server

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

เปิด Swagger UI:

```text
http://127.0.0.1:8000/docs
```

## ทดสอบด้วย curl

ขอ token:

```bash
curl -X POST http://127.0.0.1:8000/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=zyntro&password=change-this-password"
```

ผลลัพธ์:

```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer"
}
```

เรียก endpoint ที่ต้อง login:

```bash
curl http://127.0.0.1:8000/api/v1/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

เรียก admin endpoint:

```bash
curl http://127.0.0.1:8000/api/v1/admin-only \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

OAuth2 password flow ต้องส่ง `username` และ `password` เป็น `application/x-www-form-urlencoded` ไม่ใช่ JSON[1][2]

## เรียกจาก Obsidian plugin

```typescript
const response = await requestUrl({
  url: "http://127.0.0.1:8000/api/v1/knowledge/search",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.settings.accessToken}`,
  },
  body: JSON.stringify({
    query: "MCP server",
    limit: 5,
  }),
  throw: false,
});
```

## แนวปฏิบัติ

- เก็บ `AGENT_OS_SECRET_KEY` ใน `.env` หรือ secret manager ไม่ใช่ใน Git
- ใช้ HTTPS เมื่อ expose นอก localhost
- ตั้ง token expiry สั้น เช่น 15–60 นาที
- ใช้ refresh token หรือ OAuth2/OIDC สำหรับ production
- อย่าเก็บ password แบบ plain text; ใช้ password hash เช่น bcrypt/argon2
- ใช้ `Depends(verify_access_token)` กับทุก endpoint ที่ต้องป้องกัน
- ใช้ `require_admin` สำหรับ action ที่มีผลกระทบสูง เช่น reindex หรือ deploy

FastAPI ระบุว่า `Depends()` ใช้สำหรับ dependency ทั่วไป และ `Security()` ใช้เมื่อต้องการประกาศ OAuth2 scopes; ทั้งคู่ integrate กับ OpenAPI docs อัตโนมัติ  OWASP ย้ำว่า `OAuth2PasswordBearer` ไม่ได้ validate token เอง จึงต้อง verify signature และ reject invalid credentials ใน authentication dependency[1][2]

การอ้างอิง:
[1] Dependencies - Depends() and Security() - FastAPI https://fastapi.tiangolo.com/reference/dependencies/
[2] cheatsheetseries.owasp.org › cheatsheets › FastAPIFastAPI Security - OWASP Cheat Sheet Series https://cheatsheetseries.owasp.org/cheatsheets/FastAPI_Security_Cheat_Sheet.html
[3] pyjwt.readthedocs.io · en · latestUsage Examples — PyJWT 2.15.1 documentation https://pyjwt.readthedocs.io/en/latest/usage.html
[4] API Reference — PyJWT 2.15.1 documentation - Read the Docs https://pyjwt.readthedocs.io/en/stable/api.html
[5] Usage Examples — PyJWT 2.15.0 documentation - Read the Docs https://pyjwt.readthedocs.io/en/stable/usage.html
[6] Usage Examples — PyJWT 2.8.0 documentation - Read the Docs https://pyjwt.readthedocs.io/en/2.8.0/usage.html
[7] FastAPI¶ https://fastapi.tiangolo.com/
[8] Usage Examples — PyJWT 2.4.0 documentation https://pyjwt.readthedocs.io/en/2.4.0/usage.html
[9] Usage Examples — PyJWT 2.3.0 documentation - Read the Docs https://pyjwt.readthedocs.io/en/2.3.0/usage.html
[10] PyJWT https://pypi.org/project/PyJWT/
[11] Security - First Steps | FastAPI Basics https://www.fastapiinteractive.com/fastapi-basics/27-security-first-steps
