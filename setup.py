import subprocess
import sys
import os

def setup():
    """Setup the Wordle game environment"""
    print("Setting up Wordle game...")
    
    # Create necessary directories
    directories = ['data', 'logs', 'database', 'src', 'src/utils']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        # Create __init__.py in each directory
        init_file = os.path.join(directory, '__init__.py')
        if not os.path.exists(init_file):
            with open(init_file, 'w') as f:
                pass
        print(f"Created directory: {directory}")

    # Install requirements
    print("\nInstalling required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Successfully installed required packages!")
    except subprocess.CalledProcessError as e:
        print(f"Error installing packages: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error during setup: {e}")
        return False

    # Run database migration
    print("\nSetting up database...")
    try:
        from database.connection import init_db
        init_db()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False

    # Create empty word list file if it doesn't exist
    word_list_path = os.path.join('data', 'wordle_words.txt')
    if not os.path.exists(word_list_path):
        with open(word_list_path, 'w') as f:
            pass
        print(f"\nCreated empty word list file: {word_list_path}")

    print("\nSetup complete! You can now run the game with: python main.py")
    return True

if __name__ == "__main__":
    if setup():
        print("\nSetup completed successfully!")
    else:
        print("\nSetup failed. Please check the errors above.")
