import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.config import GAME_CONFIG

# Create the database directory if it doesn't exist
os.makedirs('data', exist_ok=True)

# Create database connection using the path from config
DATABASE_URL = f"sqlite:///{GAME_CONFIG['FILE_PATHS']['DATABASE']}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for database models
Base = declarative_base()

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize the database"""
    from database.models import Base
    Base.metadata.create_all(bind=engine)
