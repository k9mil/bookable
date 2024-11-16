from pydantic import BaseModel
from typing import Optional


class CurrentState(BaseModel):
    core_product_purpose: Optional[str] = None
    key_stakeholders: Optional[str] = None
    product_description: Optional[str] = None


class ChatRequest(BaseModel):
    current_state: CurrentState
    user_message: str


class ChatResponse(BaseModel):
    done: bool
    current_state: CurrentState
    main_response: str
