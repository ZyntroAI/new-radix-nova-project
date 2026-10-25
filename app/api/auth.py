from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Body

from app.core.security.jwt import (
    create_token_pair,
    refresh_access_token,
    revoke_token_pair,
    TokenError,
)
from app.core.dependencies import get_current_user


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(username: str = Body(...), password: str = Body(...)):
    """🔑 Login — returns access + refresh token pair."""
    # ✅ Validate user credentials here
    if not (username == "admin" and password == "secret"):  # Replace with real check
        raise HTTPException(status_code=401, detail="Invalid credentials")

    tokens = create_token_pair({
        "sub": f"user:{username}",
        "username": username,
        "role": "admin",
    })
    return tokens.to_dict()


@router.post("/refresh")
def refresh(refresh_token: str = Body(embed=True)):
    """🔄 Get new access token using refresh token."""
    try:
        new_access, exp, new_refresh, ref_exp = refresh_access_token(refresh_token)
        return {
            "access_token": new_access,
            "access_expires_at": exp.isoformat(),
            "refresh_token": new_refresh,
            "refresh_expires_at": ref_exp.isoformat(),
        }
    except TokenError as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.post("/logout")
def logout(
    access_token: str = Body(embed=True),
    refresh_token: str = Body(embed=True),
):
    """🚪 Logout — revoke both tokens."""
    count = revoke_token_pair(access_token, refresh_token)
    return {"message": "Logged out successfully", "revoked_count": count}


@router.get("/me")
def me(user = Depends(get_current_user)):
    """👤 Example protected route."""
    return {
        "user_id": user["sub"],
        "username": user.get("username"),
        "role": user.get("role"),
    }
