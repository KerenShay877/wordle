# Wordle Game

A web-based implementation of the popular word-guessing game Wordle with user accounts and statistics tracking.

## Description

This is a web-based version of Wordle where players attempt to guess a five-letter word within six attempts. After each guess, the game provides feedback using colors:

- 🟩 **Green**: Letter is in the correct position
- 🟨 **Yellow**: Letter exists in the word but in a different position
- ⬜ **Gray**: Letter is not in the word

## Key Features

- **User Authentication**: Register and log in to track your game history and statistics.
- **Game Statistics**: Track your games played, win rate, and game history.
- **Random Word**: Play a new game with a random word.
- **Visual Feedback**: Color-coded letters to guide your guesses.
- **Persistent Data**: Game data is stored using a database.
- **Local Word List**: Uses a predefined list of words.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Navigate to the backend directory
   ```bash
   cd backend
   ```
4. Install backend dependencies
   ```bash
   npm install
   ```
5. Start the backend server
   ```bash
   npm start
   ```
6. Open a new terminal and navigate to the frontend directory
   ```bash
   cd frontend
   ```
7. Install frontend dependencies
   ```bash
   npm install
   ```
8. Start the frontend
   ```bash
   npm start
   ```

## How to Play

1. Open the game in your browser.
2. Choose your game mode:

   - Login to existing account
   - Register new account

3. Start playing.
4. Enter five-letter word guesses using the on-screen keyboard or your physical keyboard.
5. Use the color feedback to inform your next guess.
6. Try to solve the word in six attempts or fewer.

## Game Modes

- **Random Word**: A new random word is selected for each game.

## Statistics Tracked

- Games played
- Win rate
- Game history

## Technical Details

- Built with Node.js (backend) and React (frontend)
- Express.js for the backend framework
- Styled Components for frontend styling
- JSON Web Tokens (JWT) for user authentication
- Local word list

## Contributing

Feel free to submit issues and pull requests.

## Author

- **Keren Shay**

## License

This project is licensed under the MIT License - see the LICENSE file for details.
