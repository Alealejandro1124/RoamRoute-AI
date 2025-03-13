"""
feedback.py

A simple demonstration of how feedback could be handled in-memory.
This file is not fully integrated into the database but shows how
you might structure feedback endpoints.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Feedback(BaseModel):
    """
    Basic feedback model:
    - user_id: ID of the user giving feedback
    - activity_id: ID of the activity being rated
    - rating: 1 (thumbs down) or 2 (thumbs up)
    """
    user_id: int
    activity_id: int
    rating: int

# In-memory storage for demonstration
feedback_storage = []

@router.post("/feedback/", response_model=Feedback)
async def submit_feedback(feedback: Feedback):
    """
    Stores feedback in an in-memory list (feedback_storage).
    Returns the submitted feedback.
    """
    feedback_storage.append(feedback)
    return feedback

@router.get("/feedback/", response_model=List[Feedback])
async def get_feedback():
    """
    Returns all stored feedback items.
    """
    return feedback_storage

@router.get("/feedback/{activity_id}", response_model=List[Feedback])
async def get_feedback_by_activity(activity_id: int):
    """
    Returns all feedback for a specific activity_id.
    Raises 404 if no feedback is found.
    """
    activity_feedback = [f for f in feedback_storage if f.activity_id == activity_id]
    if not activity_feedback:
        raise HTTPException(status_code=404, detail="No feedback found for this activity")
    return activity_feedback
