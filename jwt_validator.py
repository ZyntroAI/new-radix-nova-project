"""jwt_validator.py

ใช้แนวปฏิบัติที่ดีที่สุดของ JSON Web Token (JWT) ตามที่เอกสารระบุไว้ 4 ข้อหลัก:

1. ใช้การลงลายเซ็นแบบอสมมาตร (เช่น RS256/ES256) แทนแบบสมมาตร (HS256)
   เพื่อให้มีเพียงศูนย์ยืนยันตัวตนหลักเท่านั้นที่ "สร้าง" โทเค็นได้
   ส่วนบริการย่อยอื่น ๆ ใช้กุญแจสาธารณะ (ผ่าน JWKS) เพียง "ตรวจสอบ" เท่านั้น
2. ปฏิเสธโทเค็นที่มีส่วนหัวเป็น ``{"alg": "none"}`` ทุกกรณีอย่างเด็ดขาด
3. ตรวจสอบ claim มาตรฐานอย่างเคร่งครัด ได้แก่ ``iss``, ``aud``, ``exp``, ``nbf``
4. (แนวคิดที่เกี่ยวข้อง) ใช้ Phantom Token Pattern ที่ Gateway เพื่อไม่ให้ JWT
   ที่มีข้อมูลลับรั่วไหลออกสู่ภายนอก — ดูรายละเอียดในโมดูล
   :mod:`api_concepts.phantom_token`

โมดูลนี้พึ่งพาไลบรารี ``PyJWT`` และ ``cryptography``
(ติดตั้งด้วย ``pip install pyjwt cryptography``)
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import jwt
from cryptography.hazmat.primitives.asymmetric.rsa import (
    RSAPrivateKey,
    RSAPublicKey,
    generate_private_key,
)

# อัลกอริทึมที่อนุญาตให้ใช้ได้เท่านั้น — เป็น allowlist ไม่ใช่ blocklist
# การไม่ระบุ allowlist ที่ชัดเจนคือช่องโหว่คลาสสิกที่เปิดทางให้ผู้โจมตี
# ปลอมแปลงส่วนหัวเป็น {"alg": "none"} หรือสลับไปใช้ HS256 โดยเดากุญแจลับ
_ALLOWED_ALGORITHMS = ("RS256", "ES256")


class JWTValidationError(Exception):
    """ข้อผิดพลาดทั่วไปเมื่อการตรวจสอบ JWT ล้มเหลวในขั้นตอนใดขั้นตอนหนึ่ง

    ทุกกรณีของข้อผิดพลาดนี้ควรถูกจับที่ชั้น API Gateway หรือ Middleware
    แล้วตอบกลับเป็น ``401 Unauthorized`` โดยไม่เปิดเผยรายละเอียดเชิงลึกของ
    สาเหตุความล้มเหลวให้ไคลเอนต์เห็น (เพื่อป้องกันการสอดแนมโครงสร้างระบบ
    ตามหลักการใน OWASP API8:2023 - Security Misconfiguration)
    """


@dataclass(frozen=True)
class IssuerKeyPair:
    """คู่กุญแจของศูนย์ยืนยันตัวตนหลัก (Authorization Server) สำหรับสาธิต

    ในระบบจริง กุญแจสาธารณะจะถูกเผยแพร่ผ่านระบบชุดกุญแจเว็บ JSON (JWKS)
    ที่ endpoint เช่น ``/.well-known/jwks.json`` และฝั่งที่ตรวจสอบโทเค็นจะ
    ดึงกุญแจมาแคชไว้แทนการฝังกุญแจไว้ในโค้ดโดยตรงแบบตัวอย่างนี้

    Attributes:
        private_key: กุญแจส่วนตัว ใช้ "ลงลายเซ็น" โทเค็นที่ศูนย์ยืนยันตัวตนเท่านั้น
        public_key: กุญแจสาธารณะ ใช้ "ตรวจสอบ" ลายเซ็นที่บริการย่อยปลายทาง
    """

    private_key: RSAPrivateKey
    public_key: RSAPublicKey


def generate_issuer_keypair() -> IssuerKeyPair:
    """สร้างคู่กุญแจ RSA สำหรับจำลองศูนย์ยืนยันตัวตนหลัก (สำหรับสาธิต/ทดสอบเท่านั้น)

    Returns:
        อินสแตนซ์ :class:`IssuerKeyPair` ที่มีทั้งกุญแจส่วนตัวและกุญแจสาธารณะ
    """
    private_key = generate_private_key(public_exponent=65537, key_size=2048)
    return IssuerKeyPair(private_key=private_key, public_key=private_key.public_key())


def issue_jwt(
    keypair: IssuerKeyPair,
    *,
    subject: str,
    issuer: str,
    audience: str,
    ttl_seconds: int = 1800,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    """ออก JWT ที่ลงลายเซ็นด้วย RS256 จากศูนย์ยืนยันตัวตนหลัก

    ตามคำแนะนำในเอกสาร Access Token ควรมีอายุสั้นเพียง 15-30 นาที
    ค่าเริ่มต้น ``ttl_seconds=1800`` (30 นาที) จึงเป็นค่าสูงสุดที่แนะนำ

    Args:
        keypair: คู่กุญแจของศูนย์ยืนยันตัวตนที่สร้างจาก :func:`generate_issuer_keypair`
        subject: ตัวระบุผู้ใช้งานเจ้าของโทเค็น (claim ``sub``)
        issuer: ผู้ประกาศสิทธิ์ออกโทเค็น (claim ``iss``)
        audience: ผู้รับเจตจำนงข้อมูลปลายทางที่โทเค็นนี้มีไว้สำหรับ (claim ``aud``)
        ttl_seconds: อายุการใช้งานของโทเค็นเป็นวินาที ควรอยู่ระหว่าง 900-1800
            วินาที (15-30 นาที) ตามที่เอกสารแนะนำ
        extra_claims: claim เพิ่มเติมอื่น ๆ ที่ต้องการฝังในโทเค็น เช่น
            ``{"role": "admin"}`` (ควรใช้ allowlist จำกัดฟิลด์เสมอ)

    Returns:
        สตริง JWT ที่ลงลายเซ็นแล้ว พร้อมส่งให้ไคลเอนต์
    """
    import time

    now = int(time.time())
    payload: dict[str, Any] = {
        "sub": subject,
        "iss": issuer,
        "aud": audience,
        "iat": now,
        "nbf": now,
        "exp": now + ttl_seconds,
    }
    if extra_claims:
        payload.update(extra_claims)

    return jwt.encode(payload, keypair.private_key, algorithm="RS256")


def validate_jwt(
    token: str,
    *,
    public_key: RSAPublicKey,
    expected_issuer: str,
    expected_audience: str,
) -> dict[str, Any]:
    """ตรวจสอบ JWT ตามแนวปฏิบัติที่ดีที่สุด 4 ข้อจากเอกสารอ้างอิง

    ลำดับการตรวจสอบ:

    1. อ่านส่วนหัว (header) แบบไม่ตรวจสอบลายเซ็นก่อน เพื่อคัดกรอง
       ``alg: none`` ทิ้งทันทีโดยไม่เข้าสู่ขั้นตอนตรวจลายเซ็นเลย
    2. บังคับให้ระบุอัลกอริทึมที่คาดหวังไว้อย่างชัดเจน (allowlist) แทนที่จะ
       เชื่อค่า ``alg`` ที่ประกาศมาในโทเค็นเอง — ป้องกันการโจมตีแบบ
       "algorithm confusion" ที่ผู้โจมตีพยายามสลับ RS256 เป็น HS256
    3. ตรวจลายเซ็นด้วยกุญแจสาธารณะของศูนย์ยืนยันตัวตน (ในระบบจริงคือกุญแจ
       ที่ดึงมาจาก JWKS ตาม ``kid`` ในส่วนหัว)
    4. ตรวจสอบ claim มาตรฐาน ``iss``, ``aud``, ``exp``, ``nbf`` ให้ครบถ้วน

    Args:
        token: สตริง JWT ที่ได้รับจากไคลเอนต์ (เช่น จาก header
            ``Authorization: Bearer <token>``)
        public_key: กุญแจสาธารณะของศูนย์ยืนยันตัวตนหลัก สำหรับตรวจลายเซ็น
        expected_issuer: ค่า ``iss`` ที่คาดหวัง ต้องตรงกันแบบทุกตัวอักษร
        expected_audience: ค่า ``aud`` ที่คาดหวัง ต้องตรงกันแบบทุกตัวอักษร

    Returns:
        พจนานุกรมของ claims ทั้งหมดในโทเค็น หากผ่านการตรวจสอบทุกขั้นตอน

    Raises:
        JWTValidationError: หากส่วนหัวระบุ ``alg: none``, ลายเซ็นไม่ถูกต้อง,
            โทเค็นหมดอายุ, โทเค็นยังไม่ถึงเวลาที่มีผล, หรือ ``iss``/``aud``
            ไม่ตรงกับค่าที่คาดหวัง
    """
    # ขั้นที่ 1-2: อ่าน header แบบไม่ตรวจลายเซ็น เพื่อคัดกรอง alg เสี่ยงก่อน
    try:
        unverified_header = jwt.get_unverified_header(token)
    except jwt.DecodeError as exc:
        raise JWTValidationError(f"โครงสร้างโทเค็นไม่ถูกต้อง: {exc}") from exc

    declared_alg = unverified_header.get("alg", "")
    if declared_alg.lower() == "none":
        raise JWTValidationError(
            "ปฏิเสธโทเค็น: ตรวจพบ alg='none' ซึ่งเป็นความพยายามปลอมแปลงโทเค็น "
            "(OWASP API2:2023 - Broken Authentication)"
        )
    if declared_alg not in _ALLOWED_ALGORITHMS:
        raise JWTValidationError(
            f"ปฏิเสธโทเค็น: อัลกอริทึม '{declared_alg}' ไม่อยู่ใน allowlist "
            f"ที่อนุญาต {_ALLOWED_ALGORITHMS}"
        )

    # ขั้นที่ 3-4: ตรวจลายเซ็นจริงพร้อม claim มาตรฐานทั้งหมดในการเรียกเดียว
    # PyJWT จะตรวจ exp/nbf ให้อัตโนมัติเมื่อพบ claim เหล่านี้ในโทเค็น
    try:
        claims = jwt.decode(
            token,
            key=public_key,
            algorithms=[declared_alg],
            issuer=expected_issuer,
            audience=expected_audience,
            options={
                "require": ["exp", "nbf", "iss", "aud"],
                "verify_signature": True,
                "verify_exp": True,
                "verify_nbf": True,
                "verify_iss": True,
                "verify_aud": True,
            },
        )
    except jwt.ExpiredSignatureError as exc:
        raise JWTValidationError("ปฏิเสธโทเค็น: หมดอายุการใช้งานแล้ว (exp)") from exc
    except jwt.ImmatureSignatureError as exc:
        raise JWTValidationError("ปฏิเสธโทเค็น: ยังไม่ถึงเวลาที่มีผล (nbf)") from exc
    except jwt.InvalidIssuerError as exc:
        raise JWTValidationError("ปฏิเสธโทเค็น: ผู้ออกโทเค็น (iss) ไม่ตรงกับที่คาดหวัง") from exc
    except jwt.InvalidAudienceError as exc:
        raise JWTValidationError(
            "ปฏิเสธโทเค็น: ผู้รับปลายทาง (aud) ไม่ตรงกับที่คาดหวัง"
        ) from exc
    except jwt.InvalidSignatureError as exc:
        raise JWTValidationError("ปฏิเสธโทเค็น: ลายเซ็นดิจิทัลไม่ถูกต้อง") from exc
    except jwt.MissingRequiredClaimError as exc:
        raise JWTValidationError(f"ปฏิเสธโทเค็น: claim ที่จำเป็นขาดหายไป — {exc}") from exc

    return claims


if __name__ == "__main__":
    keypair = generate_issuer_keypair()
    token = issue_jwt(
        keypair,
        subject="user-42",
        issuer="https://auth.example.com",
        audience="https://api.example.com",
    )
    print(f"ออกโทเค็นสำเร็จ: {token[:40]}...")

    claims = validate_jwt(
        token,
        public_key=keypair.public_key,
        expected_issuer="https://auth.example.com",
        expected_audience="https://api.example.com",
    )
    print(f"ตรวจสอบผ่าน claims: {claims}")

    # สาธิตการปฏิเสธโทเค็นที่ alg เป็น none
    forged_token = jwt.encode(
        {"sub": "attacker", "iss": "https://auth.example.com"},
        key="",
        algorithm="none",
    )
    try:
        validate_jwt(
            forged_token,
            public_key=keypair.public_key,
            expected_issuer="https://auth.example.com",
            expected_audience="https://api.example.com",
        )
    except JWTValidationError as exc:
        print(f"ปฏิเสธโทเค็นปลอมสำเร็จ: {exc}")
