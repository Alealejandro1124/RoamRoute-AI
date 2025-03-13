"""
database.py

Manages the SQLAlchemy engine, session, and Base metadata for the entire application.
Loads environment variables from .env, including the DATABASE_URL.
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables from .env if present
load_dotenv()

# Retrieve DATABASE_URL from environment or default to a local SQLite DB
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Create the SQLAlchemy engine
# For SQLite, "check_same_thread=False" allows usage across multiple threads.
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a configured SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our models
Base = declarative_base()

def get_db():
    """
    Yields a database session to be used by FastAPI endpoints.
    Ensures the session is closed after usage.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
