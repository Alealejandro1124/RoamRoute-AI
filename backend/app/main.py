"""
main.py

Entry point for the FastAPI application. Defines the FastAPI app,
configures CORS, and includes the main router (combining auth, itinerary, etc.).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as api_router

app = FastAPI()

# Allow CORS from any origin for simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the combined router (auth, itinerary, etc.)
app.include_router(api_router)

@app.get("/")
def read_root():
    """
    Root endpoint. Returns a simple welcome message.
    """
    return {"message": "Welcome to RoamRoute AI!"}

if __name__ == "__main__":
    import uvicorn
    # Run with "python main.py" for local testing
    uvicorn.run(app, host="0.0.0.0", port=8000)
