import json
from datetime import datetime
import os

class GameStats:
    def __init__(self):
        self.stats_file = GAME_CONFIG['FILE_PATHS']['GUEST_STATS']
        self._ensure_data_directory()
        self.stats = self._load_stats()

    def _ensure_data_directory(self):
        os.makedirs(os.path.dirname(self.stats_file), exist_ok=True)

    def _load_stats(self):
        try:
            with open(self.stats_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {
                'games_played': 0,
                'wins': 0,
                'best_score': 0,
                'average_attempts': 0,
                'history': []
            }

    def update_stats(self, won: bool, attempts: int, time_taken: float):
        """Update game statistics for guest players"""
        score = self._calculate_score(attempts, time_taken) if won else 0
        
        # Update basic stats
        self.stats['games_played'] += 1
        if won:
            self.stats['wins'] += 1
        
        # Update average attempts
        total_attempts = (self.stats['average_attempts'] * (self.stats['games_played'] - 1) + attempts)
        self.stats['average_attempts'] = round(total_attempts / self.stats['games_played'], 2)
        
        # Update best score
        if score > self.stats['best_score']:
            self.stats['best_score'] = score
            
        # Add to history
        self.stats['history'].append({
            'date': datetime.now().strftime("%Y-%m-%d %H:%M"),
            'won': won,
            'attempts': attempts,
            'time': int(time_taken),
            'score': score
        })
        
        # Make sure to save to file
        self._save_stats()

    def _save_stats(self):
        """Save stats to file with error handling"""
        try:
            os.makedirs(os.path.dirname(self.stats_file), exist_ok=True)
            with open(self.stats_file, 'w') as f:
                json.dump(self.stats, f, indent=2)
        except Exception as e:
            print(f"Error saving stats: {e}")

    def display_stats(self):
        win_rate = (self.stats['wins'] / self.stats['games_played'] * 100) if self.stats['games_played'] > 0 else 0
        print(f"\nGame Statistics:")
        print(f"Games Played: {self.stats['games_played']}")
        print(f"Win Rate: {win_rate:.1f}%")
        print(f"Best Score: {self.stats['best_score']}")
        print(f"Average Attempts: {self.stats['average_attempts']}")
