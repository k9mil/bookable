from fastapi import HTTPException, APIRouter
from api.openai.openai_schemas import ChatRequest, ChatResponse
from api.openai.openai_wrapper import OpenAIWrapper


openai_router = APIRouter()


try:
    openai_wrapper = OpenAIWrapper()
except Exception as e:
    print(f"Failed to initialize OpenAI wrapper: {e}")
    raise

@openai_router.post("/api/v1/model", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        response = openai_wrapper.prompt_chat(
            user_message=request.message,
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
