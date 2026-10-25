from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.security.jwt import decode_access_token, TokenError


security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """FastAPI dependency — returns decoded user data or raises 401."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization token",
        )

    try:
        return decode_access_token(credentials.credentials)
    except TokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


async def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict | None:
    """Optional auth — returns None if no valid token."""
    if not credentials:
        return None
    try:
        return decode_access_token(credentials.credentials)
    except TokenError:
        return None
