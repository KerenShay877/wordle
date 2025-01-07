from sqlalchemy.orm import Session
from database.models import User, GameHistory
from datetime import datetime
from src.utils.security import hash_password, verify_password

class DatabaseManager:
    def __init__(self, session: Session):
        self.session = session

    def create_user(self, username: str, password: str) -> User:
        """Create a new user with hashed password"""
        hashed_password = hash_password(password)
        user = User(
            username=username,
            password=hashed_password
        )
        self.session.add(user)
        self.session.commit()
        return user

    def verify_user(self, username: str, password: str) -> User:
        """Verify user credentials"""
        user = self.session.query(User).filter(User.username == username).first()
        if user and verify_password(password, user.password):
            return user
        return None

    def get_user(self, username: str) -> User:
        """Get user by username"""
        return self.session.query(User).filter(User.username == username).first()

    def save_game(self, user_id: int, word: str, attempts: int, 
                 time_taken: float, won: bool) -> GameHistory:
        """Save a completed game"""
        game = GameHistory(
            user_id=user_id,
            word=word,
            attempts=attempts,
            time_taken=time_taken,
            won=won
        )
        self.session.add(game)
        
        # Update user's stats
        user = self.session.query(User).filter(User.id == user_id).first()
        if user:
            user.games_played += 1
            if won:
                score = self._calculate_score(attempts, time_taken)
                user.high_score = max(user.high_score, score)
        
        self.session.commit()
        return game

    def get_user_stats(self, user_id: int) -> dict:
        """Get user statistics"""
        games = self.session.query(GameHistory).filter(
            GameHistory.user_id == user_id
        ).all()
        
        total_games = len(games)
        games_won = len([g for g in games if g.won])
        avg_attempts = sum(g.attempts for g in games) / total_games if total_games > 0 else 0
        
        return {
            "total_games": total_games,
            "games_won": games_won,
            "win_rate": (games_won / total_games * 100) if total_games > 0 else 0,
            "average_attempts": round(avg_attempts, 2)
        }

    def _calculate_score(self, attempts: int, time_taken: float) -> int:
        """Calculate game score based on attempts and time"""
        base_score = 100
        attempt_penalty = (attempts - 1) * 10
        time_penalty = int(time_taken / 10)
        return max(0, base_score - attempt_penalty - time_penalty)
