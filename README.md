# Wordle CLI Game

A command-line implementation of the popular word-guessing game Wordle with user accounts and statistics tracking.

## Description

This is a text-based version of Wordle where players attempt to guess a five-letter word within six attempts. After each guess, the game provides feedback using colors:

- 🟩 **Green**: Letter is in the correct position
- 🟨 **Yellow**: Letter exists in the word but in a different position
- ⬜ **Gray**: Letter is not in the word

## Features

- User account system (register/login)
- Game statistics tracking
- Word of the Day mode
- Random Word mode
- Color-coded feedback
- Database integration for persistent data
- Player statistics (win rate, average attempts, etc.)
- Automatic word list synchronization

## Installation

1. Clone the repository
2. Run the setup script:
   python setup.py

## How to Play

1. Run the game:
   python main.py

2. Choose your game mode:

   - Login to existing account
   - Register new account
   - Play as guest

3. Select game mode:

   - Word of the Day
   - Random Word

4. Enter five-letter word guesses
5. Use the color feedback to inform your next guess
6. Try to solve the word in six attempts or fewer

## Game Modes

- **Word of the Day**: Everyone gets the same word (syncs with online API)
- **Random Word**: Random word from the local dictionary

## Statistics Tracked

- Games played
- Win rate
- Average attempts
- Best scores
- Game history

## Technical Details

- Built with Python
- SQLAlchemy for database management
- Colorama for terminal colors
- User authentication system
- Word synchronization between local and API sources

## Contributing

Feel free to submit issues and pull requests.

## Author

- **Keren Shay**

## License

This project is licensed under the MIT License - see the LICENSE file for details.
