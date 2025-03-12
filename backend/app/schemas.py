from pydantic import BaseModel
from typing import List

class ScheduleItem(BaseModel):
    time: str
    activity: str
    suggestion: str
    location: str

class Itinerary(BaseModel):
    id: int
    user_id: int
    schedule: List[ScheduleItem]

    class Config:
        from_attributes = True  # Updated for Pydantic V2

class User(BaseModel):
    id: int
    username: str
    email: str
    itineraries: List[Itinerary] = []

    class Config:
        from_attributes = True  # Updated for Pydantic V2

class Feedback(BaseModel):
    user_id: int
    activity_id: int
    rating: int

    class Config:
        from_attributes = True  # Updated for Pydantic V2
