import { useState } from "react";
import { LetterState, GameState } from "../types/game";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export const useWordle = (solution: string) => {
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: "",
    guesses: [],
    gameOver: false,
    won: false,
  });
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>(
    {}
  );
  const [gameHistory, setGameHistory] = useState<any[]>([]);

  const addLetter = (letter: string) => {
    if (gameState.currentGuess.length < WORD_LENGTH) {
      setGameState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess + letter,
      }));
    }
  };

  const removeLetter = () => {
    setGameState((prev) => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  };

  const submitGuess = async () => {
    if (gameState.currentGuess.length !== WORD_LENGTH) {
      return;
    }

    try {
      const newGuesses = [...gameState.guesses, gameState.currentGuess];
      const won = gameState.currentGuess === solution;
      const gameOver = newGuesses.length === MAX_ATTEMPTS || won;

      setGameState((prev) => ({
        ...prev,
        guesses: newGuesses,
        currentGuess: "",
        gameOver,
        won,
      }));

      updateLetterStates(gameState.currentGuess);

      if (gameOver) {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const saveResponse = await fetch(
            "http://localhost:8000/game/save_game",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                secretWord: solution,
                attempts: newGuesses.length,
                timeTaken: 0,
                isWon: won,
              }),
            }
          );

          if (saveResponse.ok) {
            await fetchGameHistory();
          }
        } catch (error) {
          console.error("Error saving game:", error);
        }
      }
    } catch (error) {
      console.error("Error in submitGuess:", error);
    }
  };

  const updateLetterStates = (guess: string) => {
    const newLetterStates = { ...letterStates };
    guess.split("").forEach((letter, i) => {
      if (solution[i] === letter) {
        newLetterStates[letter] = "correct";
      } else if (solution.includes(letter)) {
        newLetterStates[letter] =
          newLetterStates[letter] === "correct" ? "correct" : "present";
      } else {
        newLetterStates[letter] =
          newLetterStates[letter] === "correct" ||
          newLetterStates[letter] === "present"
            ? newLetterStates[letter]
            : "absent";
      }
    });
    setLetterStates(newLetterStates);
  };

  const resetGame = () => {
    setGameState({
      currentGuess: "",
      guesses: [],
      gameOver: false,
      won: false,
    });
    setLetterStates({});
  };

  const fetchGameHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "http://localhost:8000/game/get_user_games",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGameHistory(data);
      }
    } catch (error) {
      console.error("Error fetching game history:", error);
      setGameHistory([]);
    }
  };

  return {
    gameState,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
    fetchGameHistory,
    gameHistory,
  };
};
