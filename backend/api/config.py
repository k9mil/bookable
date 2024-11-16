import os


class Config:
    DATABASE_URL: str | None = os.environ.get("EF_DATABASE")

class DevelopmentConfig(Config):
    DEVELOPMENT: bool = True
    DEBUG: bool = True
    ENV: str = "debug"
