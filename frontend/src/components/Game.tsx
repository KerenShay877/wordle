import React, { useState, useEffect } from "react";
import { useWordle } from "../hooks/useWordle";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import styled from "styled-components";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const getRandomWord = async () => {
  try {
    const response = await fetch("http://localhost:8000/game/random-word", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch word from API");
      return "REACT"; // Fallback word
    }

    const data = await response.json();
    return data.word.toUpperCase();
  } catch (error) {
    console.error("Error fetching word:", error);
    return "REACT"; // Fallback word
  }
};

const Game: React.FC = () => {
  const [solution, setSolution] = useState<string>("REACT");
  const [showModal, setShowModal] = useState(false);

  const { gameState, addLetter, removeLetter, submitGuess, resetGame } =
    useWordle(solution);

  // Fetch initial word when component mounts
  useEffect(() => {
    const initializeGame = async () => {
      const word = await getRandomWord();
      setSolution(word);
    };
    initializeGame();
  }, []);

  useEffect(() => {
    if (gameState.gameOver) {
      setShowModal(true);
    }
  }, [gameState.gameOver]);

  const handleKeyPress = (key: string) => {
    if (gameState.gameOver) return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACKSPACE" || key === "←") {
      removeLetter();
    } else if (/^[A-Za-z]$/.test(key)) {
      addLetter(key.toUpperCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else if (event.key === "Enter") {
        handleKeyPress("ENTER");
      } else {
        handleKeyPress(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState.gameOver, handleKeyPress]);

  const handleReset = async () => {
    const newWord = await getRandomWord();
    setSolution(newWord);
    resetGame();
    setShowModal(false);
  };

  return (
    <GameContainer>
      <GameBoard
        guesses={gameState.guesses}
        solution={solution}
        onKeyPress={handleKeyPress}
        currentGuess={gameState.currentGuess}
      />
      <Keyboard onKeyPress={handleKeyPress} />
      {showModal && (
        <GameOverModal
          won={gameState.won}
          solution={solution}
          onPlayAgain={handleReset}
        />
      )}
    </GameContainer>
  );
};

export default Game;
