from pydantic import BaseModel
from typing import Optional, List


class CurrentState(BaseModel):
    core_product_purpose: Optional[str] = None
    key_stakeholders: Optional[str] = None
    product_description: Optional[str] = None


class ChatRequest(BaseModel):
    current_state: Optional[CurrentState] = None
    current_requirements: Optional[List[str]] = None
    user_message: str


class ChatResponse(BaseModel):
    done: bool
    current_state: CurrentState
    main_response: str

class FinalState(BaseModel):
    suggested_requirements: List[str]
    main_response: str
