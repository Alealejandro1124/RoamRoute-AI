from fastapi import APIRouter
from .auth import router as auth_router
from .itinerary import router as itinerary_router

router = APIRouter()

# Include authentication routes if needed
router.include_router(auth_router, tags=["auth"])

# Include the updated itinerary router
router.include_router(itinerary_router, tags=["itinerary"])
