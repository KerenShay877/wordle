from colorama import Fore, Style, init
import time
import random
from src.config import GAME_CONFIG, COLORS
from src.utils import fetch_word_of_day, get_word_definition, load_word_set
from src.stats import GameStats
from wordle import Wordle
from database.connection import get_db
from database.db_manager import DatabaseManager

class WordleGame:
    def __init__(self):
        self.wordle = None
        self.start_time = None
        self.words_set = None
        self.db = next(get_db())
        self.db_manager = DatabaseManager(self.db)
        self.current_user = None

    def load_words(self):
        """Load word set with better error handling"""
        try:
            self.words_set = load_word_set("data/wordle_words.txt")
            return True
        except FileNotFoundError:
            print(Fore.RED + "\nError: Word list file not found!" + Fore.RESET)
            return False
        except Exception as e:
            print(Fore.RED + f"\nError loading words: {str(e)}" + Fore.RESET)
            return False

    def initialize_game(self):
        """Setup game based on selected mode"""
        # Add the ASCII title
        print(Fore.GREEN + r"""
__        ______  _____  ____  _     _____ 
\ \      / / __ \|  __ \|  _ \| |   |  ___|
 \ \ /\ / / |  | | |__) | | | | |   |  ___|
  \ V  V /| |__| |  _  /| |_| | |___| |___ 
   \_/\_/  \____/|_| \_\|____/|_____|_____|
    """ + Fore.RESET)

        while True:
            print(Fore.CYAN + "\nGame Modes:")
            print("1. Word of the Day")
            print("2. Random Word")
            print("3. View Statistics" + Fore.RESET)
            
            mode = input("\nSelect mode (1/2/3): ").strip()
            
            if mode == '3':
                self.stats.display_stats()
                continue
            if mode in ['1', '2']:
                break
            print(Fore.RED + "Please enter 1, 2, or 3" + Fore.RESET)

        secret = self._get_secret_word(mode)
        self.wordle = Wordle(secret)
        self.start_time = time.time()
        self._show_instructions()
        return True

    def _show_instructions(self):
        print(Fore.CYAN + "\nInstructions:")
        print("- Green letters are in correct position")
        print("- Yellow letters exist in word but wrong position")
        print("- White letters are not in the word")
        print("- Type 'HINT' for a hint (costs 1 attempt)")
        print("- Type 'QUIT' to exit\n" + Fore.RESET)

    def _get_secret_word(self, mode):
        """Get secret word based on game mode"""
        if mode == "1":
            secret = fetch_word_of_day()
            if secret:
                # Add word to local list if it's not there
                self.words_set.add(secret)
                return secret
        return random.choice(list(self.words_set))

    def handle_guess(self, guess):
        """Process player's guess"""
        if not guess:
            return True
            
        guess = guess.upper().strip()
        
        if guess == "QUIT":
            return False
            
        if guess == "HINT":
            return self._handle_hint()
            
        if not self._validate_guess(guess):
            return True
        
        result = self.wordle.attempt(guess)  # Store the result
        self._display_result()
        return True

    def _validate_guess(self, guess):
        """Validate player's guess"""
        word_length = GAME_CONFIG['WORD_LENGTH']  # Get from config instead of Wordle object
        
        if len(guess) != word_length:
            print(Fore.RED + f"\nWord must be {word_length} letters long!" + Fore.RESET)
            return False
            
        if not guess.isalpha():
            print(Fore.RED + "\nPlease enter letters only!" + Fore.RESET)
            return False
            
        if guess not in self.words_set:
            print(Fore.RED + "\nNot in word list!" + Fore.RESET)
            return False
            
        return True

    def _display_result(self):
        """Display the current game state"""
        print("\nYour progress:")
        for word in self.wordle.attempts:
            result = self.wordle.guess(word)
            print(self._convert_result_to_color(result))
        
        print(f"\nAttempts remaining: {self.wordle.remaining_attempts}")

    def _convert_result_to_color(self, result):
        result_with_color = []
        for letter in result:
            if letter.is_in_position:
                color = Fore.GREEN
            elif letter.is_in_word:
                color = Fore.YELLOW
            else:
                color = Fore.WHITE
            colored_letter = color + letter.char + Fore.RESET
            result_with_color.append(colored_letter)
        return " ".join(result_with_color)

    def show_game_over(self):
        """Save game results and show stats"""
        game_time = time.time() - self.start_time
        
        # Save game to database
        if self.current_user:
            self.db_manager.save_game(
                user_id=self.current_user.id,
                word=self.wordle.secret,
                attempts=len(self.wordle.attempts),
                time_taken=game_time,
                won=self.wordle.is_solved
            )

        # Show game results
        if self.wordle.is_solved:
            print(f"\nCongratulations! You solved it in {len(self.wordle.attempts)} attempts!")
        else:
            print(f"\nGame Over! The word was {self.wordle.secret}")

        # Show updated stats
        self._show_stats()

    def _show_stats(self):
        """Show user statistics"""
        if self.current_user:
            stats = self.db_manager.get_user_stats(self.current_user.id)
            print("\nYour Statistics:")
            print(f"Total Games: {stats['total_games']}")
            print(f"Games Won: {stats['games_won']}")
            print(f"Win Rate: {stats['win_rate']:.1f}%")
            print(f"Average Attempts: {stats['average_attempts']}")

    def _calculate_score(self, game_time):
        base_score = GAME_CONFIG['SCORE_SETTINGS']['BASE_SCORE']
        attempt_penalty = (len(self.wordle.attempts) - 1) * GAME_CONFIG['SCORE_SETTINGS']['ATTEMPT_PENALTY']
        time_penalty = game_time // GAME_CONFIG['SCORE_SETTINGS']['TIME_PENALTY_INTERVAL']
        return max(0, base_score - attempt_penalty - time_penalty)

    def start_game(self):
        """Start game with user login/registration"""
        print("\nWelcome to Wordle!")
        print("1. Login")
        print("2. Register")
        choice = input("Choose an option (1/2): ")

        if choice == "1":
            return self._login()
        else:
            return self._register()

    def _login(self):
        """Handle user login"""
        username = input("Username: ")
        password = input("Password: ")  
        
        user = self.db_manager.verify_user(username, password)
        if user:
            self.current_user = user
            print(f"\nWelcome back, {username}!")
            self._show_stats()
            return True
        else:
            print("Invalid username or password")
            return self._login()

    def _register(self):
        """Handle user registration"""
        username = input("Choose a username: ")
        password = input("Choose a password: ")
        
        if self.db_manager.get_user(username):
            print("Username already exists!")
            return self._register()
        else:
            user = self.db_manager.create_user(username, password)
            self.current_user = user
            print(f"\nWelcome, {username}!")
            return True

    def handle_login(self):
        """Handle user login or registration"""
        print("\nWelcome to Wordle!")
        print("1. Login")
        print("2. Register")
        print("3. Play as Guest")
        
        choice = input("\nChoose an option (1/2/3): ")
        
        if choice == "1":
            return self._login()
        elif choice == "2":
            return self._register()
        elif choice == "3":
            print("\nPlaying as guest (progress won't be saved)")
            return True
        else:
            print("Invalid choice!")
            return self.handle_login()

    def end_game(self, won: bool, attempts: int, time_taken: float):
        if self.current_user:  # Logged in user
            self.db_manager.update_user_stats(
                user_id=self.current_user.id,
                word=self.wordle.secret,
                attempts=attempts,
                time_taken=time_taken,
                won=won
            )
        else:  # Guest player
            self.stats.update_stats(
                won=won,
                attempts=len(self.wordle.attempts),
                time_taken=time_taken
            )
