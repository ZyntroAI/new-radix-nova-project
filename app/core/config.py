from pydantic_settings import BaseSettings
 from typing import Optional
 class Settings(BaseSettings):
     # ─────────────── JWT ───────────────
     JWT_SECRET: str = "CHANGE_ME_TO_VERY_LONG_RANDOM_SECRET_IN_ENV"
     JWT_ALGORITHM: str = "HS256"
     JWT_ISSUER: str = "myapp.local"
     
     # Lifetimes
     JWT_EXPIRE_MINUTES: int = 30       # Access token — short-lived
     JWT_REFRESH_DAYS: int = 7          # Refresh token — longer-lived
     
     # ─────────────── Redis ───────────────
     REDIS_URL: str = "redis://localhost:6379/0"
     REDIS_PASSWORD: Optional[str] = None
     
     class Config:
         env_file = ".env"
         case_sensitive = True
 settings = Settings()