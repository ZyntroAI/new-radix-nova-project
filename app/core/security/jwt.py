from datetime import datetime, timedelta, timezone
from typing import Any, Optional, Tuple
import uuid

import jwt
from jwt import (
    ExpiredSignatureError,
    InvalidTokenError,
    ImmatureSignatureError,
    InvalidIssuerError,
)
import redis
from redis.connection import ConnectionPool

from app.core.config import settings


# ──────────────────────────────────────
# � Custom Exceptions
# ──────────────────────────────────────
class TokenError(Exception):
    """Base exception for JWT errors."""


# ──────────────────────────────────────
# 📦 Token Pair Data Class
# ──────────────────────────────────────
from dataclasses import dataclass

@dataclass
class TokenPair:
    access_token: str
    refresh_token: str
    access_expires_at: datetime
    refresh_expires_at: datetime

    def to_dict(self) -> dict:
        return {
            "access_token": self.access_token,
            "refresh_token": self.refresh_token,
            "access_expires_at": self.access_expires_at.isoformat(),
            "refresh_expires_at": self.refresh_expires_at.isoformat(),
        }


# ──────────────────────────────────────
# 🗄️ Redis Blacklist Setup
# ──────────────────────────────────────
_redis_pool = ConnectionPool.from_url(
    settings.REDIS_URL,
    password=settings.REDIS_PASSWORD,
    decode_responses=True,
)
redis_client = redis.Redis(connection_pool=_redis_pool)

# Reserved claims — cannot be set in user data
_RESERVED_CLAIMS = {"iss", "iat", "nbf", "exp", "aud", "jti", "type"}


def blacklist_token(jti: str, expires_in: timedelta) -> None:
    """Store token ID in Redis until it naturally expires."""
    key = f"revoked:jti:{jti}"
    redis_client.setex(key, int(expires_in.total_seconds()), "1")


def is_token_blacklisted(jti: str) -> bool:
    """Check if token has been revoked."""
    return redis_client.exists(f"revoked:jti:{jti}") > 0


# ──────────────────────────────────────
# 🔧 Internal Helpers
# ──────────────────────────────────────
def _create_token(
    data: dict[str, Any],
    expires_delta: timedelta,
    token_type: str,
) -> Tuple[str, datetime]:
    """Create a signed JWT with type marker and unique jti."""
    if _RESERVED_CLAIMS & data.keys():
        raise TokenError(
            "Payload contains reserved JWT claim names: "
            f"{_RESERVED_CLAIMS & data.keys()}"
        )

    now = datetime.now(timezone.utc)
    expires_at = now + expires_delta

    payload = {
        **data,
        "jti": str(uuid.uuid4()),
        "iss": settings.JWT_ISSUER,
        "iat": now,
        "nbf": now,
        "exp": expires_at,
        "type": token_type,
    }
    return (
        jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM),
        expires_at,
    )


def _decode_token(token: str, expected_type: str) -> dict[str, Any]:
    """Decode, validate type, and check blacklist."""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
            options={"require": ["exp", "iat", "jti", "type"]},
            issuer=settings.JWT_ISSUER,
        )
    except ExpiredSignatureError as exc:
        raise TokenError("Token has expired") from exc
    except ImmatureSignatureError as exc:
        raise TokenError("Token is not yet valid") from exc
    except InvalidIssuerError as exc:
        raise TokenError("Token was issued by an unrecognized authority") from exc
    except InvalidTokenError as exc:
        raise TokenError("Token is invalid or malformed") from exc

    if payload.get("type") != expected_type:
        raise TokenError(
            f"Invalid token type: expected '{expected_type}', "
            f"got '{payload.get('type')}'"
        )

    # Calculate remaining lifetime for accurate TTL checks
    remaining = datetime.fromtimestamp(payload["exp"], tz=timezone.utc) - datetime.now(timezone.utc)
    if is_token_blacklisted(payload["jti"]):
        raise TokenError("Token has been revoked")

    return payload


# ──────────────────────────────────────
# 📤 Public API — Create Tokens
# ──────────────────────────────────────
def create_access_token(
    data: dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> Tuple[str, datetime]:
    """Create a short-lived access token."""
    expiry = expires_delta or timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    return _create_token(data, expiry, token_type="access")


def create_refresh_token(
    data: dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> Tuple[str, datetime]:
    """Create a long-lived refresh token."""
    expiry = expires_delta or timedelta(days=settings.JWT_REFRESH_DAYS)
    return _create_token(data, expiry, token_type="refresh")


def create_token_pair(data: dict[str, Any]) -> TokenPair:
    """Create access + refresh token pair in one call."""
    access_token, access_exp = create_access_token(data)
    refresh_token, refresh_exp = create_refresh_token(data)
    return TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        access_expires_at=access_exp,
        refresh_expires_at=refresh_exp,
    )


# ──────────────────────────────────────
# 📥 Public API — Decode & Operations
# ──────────────────────────────────────
def decode_access_token(token: str) -> dict[str, Any]:
    """Validate and decode an access token."""
    return _decode_token(token, expected_type="access")


def decode_refresh_token(token: str) -> dict[str, Any]:
    """Validate and decode a refresh token."""
    return _decode_token(token, expected_type="refresh")


def refresh_access_token(
    refresh_token: str,
    rotate_refresh: bool = True,
) -> Tuple[str, datetime, Optional[str], Optional[datetime]]:
    """
    Refresh using a valid refresh token.
    
    Args:
        refresh_token: The refresh token from client
        rotate_refresh: If True, invalidate old token and issue a new refresh token
    
    Returns:
        (new_access_token, access_expiry, new_refresh_token | None, refresh_expiry | None)
    """
    payload = decode_refresh_token(refresh_token)

    # Invalidate the used refresh token
    exp_dt = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
    remaining = exp_dt - datetime.now(timezone.utc)
    blacklist_token(payload["jti"], remaining)

    # Extract user data (remove JWT claims)
    user_data = {k: v for k, v in payload.items() if k not in _RESERVED_CLAIMS}

    # Issue new access token
    new_access, access_exp = create_access_token(user_data)

    # Optionally rotate refresh token
    new_refresh, refresh_exp = None, None
    if rotate_refresh:
        new_refresh, refresh_exp = create_refresh_token(user_data)

    return new_access, access_exp, new_refresh, refresh_exp


def revoke_token_pair(access_token: str, refresh_token: str) -> int:
    """
    Revoke both tokens (use on logout).
    Returns count of successfully revoked tokens.
    """
    revoked_count = 0

    for token, decoder in [
        (access_token, decode_access_token),
        (refresh_token, decode_refresh_token),
    ]:
        try:
            payload = decoder(token)
            exp_dt = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
            remaining = exp_dt - datetime.now(timezone.utc)
            blacklist_token(payload["jti"], remaining)
            revoked_count += 1
        except TokenError:
            pass  # Token already invalid — safe to skip

    return revoked_count
