import json
from typing import Union, List
from fastapi import HTTPException, APIRouter, Body, UploadFile, File
from io import BytesIO
from api.openai.openai_schemas import ChatResponse, CurrentState, FinalState, ChatRequest, PRDRequest, PRDResponse
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

    if parsed_response["done"] == True:
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
        current_requirements=request.current_requirements if request.current_requirements else [],
        rejected_requirements=request.rejected_requirements if request.rejected_requirements else [],
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

@openai_router.post("/api/v1/generate-prd", response_model=PRDResponse)
async def generate_prd(request: PRDRequest = Body(...)):
    try:
        if not request.requirements:
            raise HTTPException(
                status_code=400, 
                detail="Requirements list is required"
            )
            
        prd_content = openai_wrapper.generate_prd(request.requirements)
        return PRDResponse(prd=prd_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@openai_router.post("/api/v1/audio")
async def transcribe_audio_endpoint(file: UploadFile = File(...)):
    file_content = file.file.read()

    buffer = BytesIO(file_content)
    buffer.name = "_user_audio_file.mp3"

    open_ai_wrapper = OpenAIWrapper()
    transcription_result = open_ai_wrapper.transcribe_audio(buffer)
    
    return {"openai_transcript_output": transcription_result}
