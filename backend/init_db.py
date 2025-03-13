"""
init_db.py

This script initializes (creates) all database tables based on the models
defined in the app.models module. It's typically run once to set up the
database schema before starting the server, or whenever you need to reset
the schema.
"""

from app.database import engine, Base
from app.models import User, Itinerary, Feedback  # Import the SQLAlchemy models

# Create all tables associated with the Base metadata on the connected engine.
Base.metadata.create_all(bind=engine)
print("Database tables created successfully.")
