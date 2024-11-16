import json

from fastapi import HTTPException, APIRouter
from api.openai.openai_schemas import ChatRequest, ChatResponse, CurrentState
from api.openai.openai_wrapper import OpenAIWrapper


openai_router = APIRouter()
done_flag = False


try:
    openai_wrapper = OpenAIWrapper()
except Exception as e:
    print(f"Failed to initialize OpenAI wrapper: {e}")
    raise

@openai_router.post("/api/v1/model", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
            response = openai_wrapper.prompt_chat(
                current_state=request.current_state.model_dump(),
                user_message=request.user_message,
            )
            cleaned_response = response.strip()

            try:
                parsed_response = json.loads(cleaned_response)
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}")
                raise HTTPException(status_code=500, detail="Invalid JSON response format")
            
            parsed_response = json.loads(response)

            return ChatResponse(
                done=parsed_response["done"],
                current_state=CurrentState(**parsed_response["current_state"]),
                main_response=parsed_response["main_response"],
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))