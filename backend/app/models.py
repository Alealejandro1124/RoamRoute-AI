from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    itineraries = relationship("Itinerary", back_populates="owner")

class Itinerary(Base):
    __tablename__ = 'itineraries'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    schedule = Column(JSON)  # Store schedule as JSON

    owner = relationship("User", back_populates="itineraries")

class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey('itineraries.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    rating = Column(Integer)  # 1 for thumbs down, 2 for thumbs up

    itinerary = relationship("Itinerary")
    user = relationship("User")
