from pydantic import BaseModel
from typing import Optional, List


class CurrentState(BaseModel):
    core_product_purpose: Optional[str] = None
    product_description: Optional[str] = None
    users_of_system: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None


class ChatRequest(BaseModel):
    current_state: Optional[CurrentState] = None
    current_requirements: Optional[List[str]] = None
    rejected_requirements: Optional[List[str]] = None
    user_message: str


class ChatResponse(BaseModel):
    done: bool
    current_state: CurrentState
    main_response: str


class FinalState(BaseModel):
    suggested_requirements: List[str]
    main_response: str


class PRDRequest(BaseModel):
    requirements: List[str]
    current_state: CurrentState


class PRDResponse(BaseModel):
    prd: str


class DashboardResponse(BaseModel):
    requirements: List[dict] = []
    milestones: List[dict] = []
    budget: int = 0
