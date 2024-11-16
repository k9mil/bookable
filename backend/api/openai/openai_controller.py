import json
from typing import Union
from fastapi import HTTPException, APIRouter
from api.openai.openai_schemas import ChatResponse, CurrentState, FinalState, ChatRequest
from api.openai.openai_wrapper import OpenAIWrapper


openai_router = APIRouter()
done_flag = False  # Tracks if we're in the final state

try:
    openai_wrapper = OpenAIWrapper()
except Exception as e:
    print(f"Failed to initialize OpenAI wrapper: {e}")
    raise


def handle_initial_state(request: ChatRequest):
    """
    Handles the initial state where we either gather the current state or message.
    """
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

    # If the response indicates done, set done_flag to True
    if parsed_response["done"]:
        global done_flag
        done_flag = True
        return handle_final_state(request)

    return ChatResponse(
        done=parsed_response["done"],
        current_state=CurrentState(**parsed_response["current_state"]),
        main_response=parsed_response["main_response"],
    )

def handle_final_state(request: ChatRequest):
    """
    Handles the final state where we gather the suggested requirements.
    """
    response = openai_wrapper.suggestion_gathering(
        current_requirements=request.current_requirements,
        user_message=request.user_message,
    )
    cleaned_response = response.strip()

    try:
        parsed_response = json.loads(cleaned_response)
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        raise HTTPException(status_code=500, detail="Invalid JSON response format")

    return FinalState(
        suggested_requirements=parsed_response["suggested_requirements"],
        main_response=parsed_response["main_response"],
    )

@openai_router.post("/api/v1/model", response_model=Union[ChatResponse, FinalState])
async def chat(request: ChatRequest) -> Union[ChatResponse, FinalState]:
    global done_flag

    try:
        if not done_flag: return handle_initial_state(request)
        else: return handle_final_state(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
