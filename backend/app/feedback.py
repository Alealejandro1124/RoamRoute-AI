from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Feedback(BaseModel):
    user_id: int
    activity_id: int
    rating: int  # 1 for thumbs down, 2 for thumbs up

# In-memory storage for feedback (for demonstration purposes)
feedback_storage = []

@router.post("/feedback/", response_model=Feedback)
async def submit_feedback(feedback: Feedback):
    feedback_storage.append(feedback)
    return feedback

@router.get("/feedback/", response_model=List[Feedback])
async def get_feedback():
    return feedback_storage

@router.get("/feedback/{activity_id}", response_model=List[Feedback])
async def get_feedback_by_activity(activity_id: int):
    activity_feedback = [f for f in feedback_storage if f.activity_id == activity_id]
    if not activity_feedback:
        raise HTTPException(status_code=404, detail="No feedback found for this activity")
    return activity_feedback