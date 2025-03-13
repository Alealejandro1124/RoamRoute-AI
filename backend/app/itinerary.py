"""
itinerary.py

Manages endpoints related to itinerary creation, retrieval, and feedback.
Uses a dictionary of suggestions for each activity type, which can be replaced
with a real AI or external data in production.
"""

import logging
from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import random
from .schemas import Itinerary as ItinerarySchema
from .models import Itinerary
from .database import get_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Hardcoded suggestions for demonstration
suggestions: Dict[str, List[Dict[str, Any]]] = {
    "Breakfast": [
        # ...
    ],
    "Early Morning Activity": [
        # ...
    ],
    "Lunch": [
        # ...
    ],
    "Afternoon Activity": [
        # ...
    ],
    "Dinner": [
        # ...
    ],
    "Evening Activity": [
        # ...
    ],
}

@router.post("/itinerary/{user_id}", response_model=ItinerarySchema)
async def generate_auto_itinerary(user_id: int, db: Session = Depends(get_db)):
    """
    Creates a single itinerary for the specified user_id, picking one random
    suggestion per time window (Breakfast, Lunch, etc.). Raises 400 if an
    itinerary already exists for that user.
    """
    try:
        existing_itinerary = db.query(Itinerary).filter(Itinerary.user_id == user_id).first()
        if existing_itinerary:
            raise HTTPException(status_code=400, detail="Itinerary already exists for this user.")
        
        # Build an itinerary with a random suggestion per activity type
        schedule = [
            random.choice(suggestions["Breakfast"]),
            random.choice(suggestions["Early Morning Activity"]),
            random.choice(suggestions["Lunch"]),
            random.choice(suggestions["Afternoon Activity"]),
            random.choice(suggestions["Dinner"]),
            random.choice(suggestions["Evening Activity"]),
        ]

        itinerary_data = {
            "user_id": user_id,
            "schedule": schedule,
        }
        db_itinerary = Itinerary(**itinerary_data)
        db.add(db_itinerary)
        db.commit()
        db.refresh(db_itinerary)
        return db_itinerary
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating itinerary: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/itinerary/{user_id}", response_model=ItinerarySchema)
async def get_itinerary(user_id: int, db: Session = Depends(get_db)):
    """
    Fetches the itinerary for a given user_id. Raises 404 if none found.
    """
    try:
        db_itinerary = db.query(Itinerary).filter(Itinerary.user_id == user_id).first()
        if not db_itinerary:
            raise HTTPException(status_code=404, detail="Itinerary not found.")
        return db_itinerary
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching itinerary: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/itinerary/{user_id}/feedback", response_model=dict)
async def update_activity_feedback(
    user_id: int,
    activity: str = Body(...),
    rating: int = Body(...),
    db: Session = Depends(get_db)
):
    """
    Provides feedback for a specific activity in the user's itinerary.
    - rating=2 (thumbs up): Returns a thank-you message without changing the itinerary.
    - rating=1 (thumbs down): Replaces the disliked activity with a new random suggestion.
    """
    itinerary = db.query(Itinerary).filter(Itinerary.user_id == user_id).first()
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found.")
    
    updated = False
    new_suggestion = None
    for idx, item in enumerate(itinerary.schedule):
        if item.get("activity") == activity:
            if rating == 2:
                return {
                    "message": "Thank you! Your positive feedback has been recorded.\n"
                               "RoamRoute AI will continue to build excellent itinerary suggestions for you."
                }
            elif rating == 1:
                # Filter out the current suggestion
                current_suggestion = item.get("suggestion")
                possible_suggestions = suggestions.get(activity, [])
                possible_suggestions = [
                    alt for alt in possible_suggestions
                    if alt.get("suggestion") != current_suggestion
                ]
                if not possible_suggestions:
                    raise HTTPException(status_code=404, detail="No alternative suggestions available.")
                
                # Pick a new random suggestion
                new_suggestion = random.choice(possible_suggestions)
                itinerary.schedule[idx] = new_suggestion
                updated = True
                break

    if updated:
        db.commit()
        db.refresh(itinerary)
        logger.info(f"Updated itinerary schedule: {itinerary.schedule}")
        return {
            "message": "Thank you for your feedback! The activity has been updated.\n"
                       "RoamRoute AI will use your feedback to better tailor activities you enjoy.",
            "updated_activity": new_suggestion
        }
    else:
        raise HTTPException(status_code=400, detail="Activity not found in the itinerary.")
