import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.connection import get_db
from database.models import User

def delete_all_users():
    """Delete all users from the database"""
    db = next(get_db())
    try:
        # Delete all users
        num_deleted = db.query(User).delete()
        db.commit()
        print(f"Successfully deleted {num_deleted} users!")
    except Exception as e:
        print(f"Error deleting users: {e}")
        db.rollback()

def delete_specific_user(username):
    """Delete a specific user by username"""
    db = next(get_db())
    try:
        user = db.query(User).filter(User.username == username).first()
        if user:
            db.delete(user)
            db.commit()
            print(f"Successfully deleted user: {username}")
        else:
            print(f"User '{username}' not found!")
    except Exception as e:
        print(f"Error deleting user: {e}")
        db.rollback()

if __name__ == "__main__":
    choice = input("Delete all users or specific user? (all/specific): ").lower()
    
    if choice == 'all':
        confirm = input("Are you sure you want to delete ALL users? (yes/no): ").lower()
        if confirm == 'yes':
            delete_all_users()
    elif choice == 'specific':
        username = input("Enter username to delete: ")
        delete_specific_user(username)
    else:
        print("Invalid choice!") 