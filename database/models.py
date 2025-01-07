# These help us talk to the database
from sqlalchemy import create_engine  # Creates database connection
from sqlalchemy import Column         # Defines table columns
from sqlalchemy import Integer, String, DateTime, Boolean, Float, LargeBinary  # Column types

# This helps create database models (like templates for tables)
from sqlalchemy.ext.declarative import declarative_base

# This helps manage database connections
from sqlalchemy.orm import sessionmaker

# For timestamps
from datetime import datetime

# This is like a template for all database tables
# Every table class will inherit from this Base
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'  # The actual table name in the database
    
    # Each Column() defines what data we can store:
    id = Column(Integer, primary_key=True)  # Unique ID (like a passport number)
    username = Column(String, unique=True)  # Player name (must be unique)
    password = Column(LargeBinary)  # Hashed password
    high_score = Column(Integer, default=0) # Starts at 0
    games_played = Column(Integer, default=0)# Starts at 0
    created_at = Column(DateTime, default=datetime.utcnow)  # When account was created

class GameHistory(Base):
    __tablename__ = 'game_history'  # The actual table name in the database
    
    # Each game played will create one row with this information:
    id = Column(Integer, primary_key=True)  # Unique game ID
    user_id = Column(Integer)               # Which user played this game
    word = Column(String)                   # The word they had to guess
    attempts = Column(Integer)              # How many tries it took
    time_taken = Column(Float)              # How long the game took
    won = Column(Boolean)                   # Did they win?
    date_played = Column(DateTime, default=datetime.utcnow)  # When they played