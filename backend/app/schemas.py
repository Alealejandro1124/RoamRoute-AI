"""
schemas.py

Defines Pydantic models (schemas) for request/response validation.
These schemas ensure consistent data formats for FastAPI endpoints.
"""

from pydantic import BaseModel
from typing import List

class ScheduleItem(BaseModel):
    """
    Represents a single item in the itinerary schedule:
    - time: e.g., "7-8am"
    - activity: e.g., "Breakfast"
    - suggestion: recommended place or meal
    - location: location or area
    """
    time: str
    activity: str
    suggestion: str
    location: str

class Itinerary(BaseModel):
    """
    The main Itinerary schema:
    - id: unique ID of the itinerary
    - user_id: ID of the user who owns this itinerary
    - schedule: list of ScheduleItems
    """
    id: int
    user_id: int
    schedule: List[ScheduleItem]

    class Config:
        from_attributes = True  # For Pydantic V2, ensures correct ORM mapping

class User(BaseModel):
    """
    Schema representing a User:
    - id, username, email
    - itineraries: optional list of Itineraries
    """
    id: int
    username: str
    email: str
    itineraries: List[Itinerary] = []

    class Config:
        from_attributes = True

class Feedback(BaseModel):
    """
    Basic feedback schema:
    - user_id, activity_id, rating
    """
    user_id: int
    activity_id: int
    rating: int

    class Config:
        from_attributes = True
