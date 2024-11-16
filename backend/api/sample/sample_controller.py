from fastapi import APIRouter

sample_router = APIRouter()

@sample_router.get("/api/v1/model")
def process_audio():
    return {"message": "Hello World"}
