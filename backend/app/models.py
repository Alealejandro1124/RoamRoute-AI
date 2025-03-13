"""
models.py

Defines the SQLAlchemy ORM models for the application:
User, Itinerary, and Feedback. Each class maps to a database table.
"""

from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    """
    Represents a user in the system.
    Stores username, email, and hashed_password for authentication.
    """
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # One-to-many relationship: a user can have multiple itineraries
    itineraries = relationship("Itinerary", back_populates="owner")

class Itinerary(Base):
    """
    Represents an itinerary associated with a user.
    The schedule field is stored as JSON, containing multiple activity suggestions.
    """
    __tablename__ = 'itineraries'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    schedule = Column(JSON)  # store the daily schedule as a JSON list

    # Relationship back to User
    owner = relationship("User", back_populates="itineraries")

class Feedback(Base):
    """
    Represents a feedback entry for a given itinerary or user.
    rating = 1 (thumbs down), 2 (thumbs up)
    """
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey('itineraries.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    rating = Column(Integer)

    # Relationship to itinerary and user (optional if needed)
    itinerary = relationship("Itinerary")
    user = relationship("User")
