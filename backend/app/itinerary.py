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
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Try avocado toast with fresh juice at The Green Table.", "location": "Uptown"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Savor a stack of blueberry pancakes at Pancake Paradise.", "location": "Maple Street"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Indulge in a continental breakfast at The Grand Hotel.", "location": "Central Plaza"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Sample a vegan breakfast bowl at Healthy Bites.", "location": "Eco District"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Relish classic eggs benedict at Brunch Club.", "location": "Old Town"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Enjoy croissants and café au lait at French Corner.", "location": "Parisian Lane"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Taste an exotic fusion breakfast at Spice Route.", "location": "Chinatown"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Dig into a savory breakfast burrito at Taco Sunrise.", "location": "Mexican Market"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Have a protein-packed smoothie bowl at Fit Fuel.", "location": "Gym District"},
        {"time": "7-8am", "activity": "Breakfast", "suggestion": "Feast on a full English breakfast at The Royal Diner.", "location": "Kings Road"},
    ],
    "Early Morning Activity": [
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Join a sunrise hot air balloon ride.", "location": "Skyview Park"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Take a kayaking trip along the river.", "location": "Riverfront"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Embark on a guided jogging tour of the park.", "location": "Green Park"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Enjoy a peaceful meditation session outdoors.", "location": "Zen Garden"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Take a scenic segway tour by the water.", "location": "Harborfront"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Join a group cycling adventure.", "location": "Bikeway Trail"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Go birdwatching in a local nature reserve.", "location": "Woodland Park"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Discover street art on an urban walking tour.", "location": "Creative District"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Participate in a morning photography workshop.", "location": "Old Town"},
        {"time": "8:30-11:30am", "activity": "Early Morning Activity", "suggestion": "Relax with a Tai Chi session at dawn.", "location": "Serenity Gardens"},
    ],
    "Lunch": [
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Savor gourmet tacos at the Food Fiesta Truck.", "location": "Central Plaza"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Indulge in a handcrafted gourmet burger at Burger Loft.", "location": "Downtown"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Enjoy a fresh salad and artisan bread at Garden Bistro.", "location": "Sunset Avenue"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Taste Mediterranean flavors at Olive & Thyme.", "location": "Harborfront"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Relish a spicy ramen bowl at Noodle House.", "location": "Chinatown"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Grab a delicious wrap from the Urban Kitchen Food Cart.", "location": "Market Square"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Dig into a classic club sandwich at Deli Delight.", "location": "Downtown"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Enjoy a poke bowl at Island Fresh.", "location": "Beachside"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Feast on wood-fired pizza at Rustic Oven.", "location": "Old Town"},
        {"time": "12-1pm", "activity": "Lunch", "suggestion": "Sample fusion cuisine at the Trendy Food Lab.", "location": "Innovation District"},
    ],
    "Afternoon Activity": [
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Explore an immersive interactive art exhibit.", "location": "Creative Hub"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Join a local cooking class to learn regional recipes.", "location": "Culinary Studio"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Take a historical walking tour of the old quarter.", "location": "Heritage District"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Visit an independent film screening at an art house cinema.", "location": "Film Center"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Discover a quirky vintage market.", "location": "Retro Row"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Relax in a lush botanical garden.", "location": "Botanical Gardens"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Participate in a pottery workshop.", "location": "Artisan Loft"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Enjoy a street performance festival.", "location": "Central Square"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Tour a quirky, modern art installation.", "location": "Gallery District"},
        {"time": "1:30-5:30pm", "activity": "Afternoon Activity", "suggestion": "Join a craft beer tasting at a local microbrewery.", "location": "Brewery Row"},
    ],
    "Dinner": [
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Dine on fusion cuisine at an avant-garde bistro.", "location": "Fusion Plaza"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Enjoy a rustic farm-to-table meal at The Harvest Inn.", "location": "Countryside"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Relish spicy street food at Urban Spice Market.", "location": "Downtown"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Savor Italian specialties at Mama Mia Trattoria.", "location": "Little Italy"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Experience modern sushi at Sashimi Studio.", "location": "Sushi District"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Feast on gourmet burgers at Burger Republic.", "location": "Central Park"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Enjoy spicy curries at Curry Kingdom.", "location": "Market Street"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Dine on creative tapas at Little Spain.", "location": "Sunset Boulevard"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Savor modern Mexican dishes at Cantina Viva.", "location": "Downtown"},
        {"time": "6-7:30pm", "activity": "Dinner", "suggestion": "Indulge in classic French cuisine at Le Petit Bistro.", "location": "Parisian Quarter"},
    ],
    "Evening Activity": [
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Catch an indie film screening at a retro cinema.", "location": "Retro Theatre"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Dance the night away at an underground jazz club.", "location": "Jazz Alley"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Enjoy a poetry slam at the local bookstore café.", "location": "Literary Lane"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Participate in a board game night at a quirky bar.", "location": "Game Bar"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Relax with a live acoustic set at a hidden speakeasy.", "location": "Secret Lounge"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Watch a local theater performance outdoors.", "location": "Open-Air Stage"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Join a midnight street food crawl.", "location": "Night Market"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Sip craft cocktails at a rooftop bar.", "location": "Skyline Terrace"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Attend a themed costume party at a vintage club.", "location": "Vintage Vault"},
        {"time": "8-10:30pm", "activity": "Evening Activity", "suggestion": "Experience an interactive improv comedy show.", "location": "Improv Theater"},
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
