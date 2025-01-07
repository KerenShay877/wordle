import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.connection import get_db
from database.models import User
from tabulate import tabulate

def view_all_users():
    """Display all users in the database"""
    db = next(get_db())
    users = db.query(User).all()
    
    if not users:
        print("\nNo users found in database!")
        return

    # Prepare data for tabulate
    headers = ["ID", "Username", "Games Played", "High Score", "Created At"]
    data = [[
        user.id,
        user.username,
        user.games_played,
        user.high_score,
        user.created_at.strftime("%Y-%m-%d %H:%M")
    ] for user in users]
    
    print("\n=== Registered Users ===")
    print(tabulate(data, headers=headers, tablefmt="grid"))

if __name__ == "__main__":
    view_all_users() 