from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    message: str
    temperature: Optional[float] = 0.1
    max_tokens: Optional[int] = 4096

class ChatResponse(BaseModel):
    response: str
