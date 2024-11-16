from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.openai.openai_controller import openai_router

from api.config import DevelopmentConfig


def create_app() -> FastAPI:
    app = FastAPI()
    config = DevelopmentConfig()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(openai_router, tags=["sample_router"])

    app.state.config = config

    return app
