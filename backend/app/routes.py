"""
routes.py

Combines multiple routers (e.g., auth_router, itinerary_router)
into a single APIRouter for easy inclusion in main.py.
"""

from fastapi import APIRouter
from .auth import router as auth_router
from .itinerary import router as itinerary_router

router = APIRouter()

# Authentication endpoints (login, signup)
router.include_router(auth_router, tags=["auth"])

# Itinerary endpoints (create itinerary, get itinerary, feedback)
router.include_router(itinerary_router, tags=["itinerary"])
