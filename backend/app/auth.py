"""
auth.py

Handles user authentication and signup endpoints using FastAPI.
Includes token-based login (OAuth2PasswordBearer) and user registration.
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .models import User
from .database import get_db
from .utils import verify_password, create_access_token, hash_password
from pydantic import BaseModel

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserCreate(BaseModel):
    """
    Pydantic model for user creation (signup).
    """
    username: str
    email: str
    password: str

@router.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Login endpoint for user authentication.

    - Expects form data (username, password).
    - Verifies user credentials.
    - Returns an access token (JWT) if valid, otherwise raises 400 error.
    """
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup")
async def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Signup endpoint to create a new user.

    - Checks if username is already taken.
    - Hashes the provided password.
    - Inserts a new User record into the database.
    - Returns basic user info upon success.
    """
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"username": new_user.username, "email": new_user.email}
