import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Letter from "./Letter";
import { WORD_LENGTH } from "../constants/game";

// Shake animation for incorrect guesses
const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

// Row of letters in the board
const Row = styled.div<{ $isIncorrect: boolean }>`
  display: flex;
  justify-content: center;
  gap: 5px;
  ${({ $isIncorrect }) =>
    $isIncorrect &&
    css`
      animation: ${shakeAnimation} 0.6s ease;
    `};
`;

// Container for the entire board
const BoardContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 5px;
  padding: 10px;
  margin: 20px auto;
  max-width: 600px;
  width: 90%;
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

interface GameBoardProps {
  guesses: string[];
  solution: string;
  onKeyPress: (key: string) => void;
  currentGuess: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  solution,
  onKeyPress,
  currentGuess,
}) => {
  const [invalidWordMessage, setInvalidWordMessage] = useState("");
  const totalRows = 6;

  // Handle keydown events for letter input and actions like submit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      onKeyPress(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress]);

  // Display invalid word message for 2 seconds when needed
  useEffect(() => {
    if (invalidWordMessage) {
      setTimeout(() => setInvalidWordMessage(""), 2000);
    }
  }, [invalidWordMessage]);

  // Determine the state for each letter in a guess
  const getLetterState = (letter: string, index: number) => {
    if (solution[index] === letter) return "correct";
    if (solution.includes(letter)) return "present";
    return "absent";
  };

  return (
    <BoardContainer tabIndex={0}>
      {invalidWordMessage && <p>{invalidWordMessage}</p>}

      {/* Render completed guesses */}
      {guesses.map((guess, rowIndex) => (
        <Row key={`guess-${rowIndex}`} $isIncorrect={guess !== solution}>
          {guess.split("").map((letter, colIndex) => (
            <Letter
              key={`guess-${rowIndex}-${colIndex}`}
              value={letter}
              state={getLetterState(letter, colIndex)}
              $isRevealing={true}
            />
          ))}
        </Row>
      ))}

      {/* Render current guess row */}
      {guesses.length < totalRows && (
        <Row key="current" $isIncorrect={false}>
          {currentGuess.split("").map((letter, i) => (
            <Letter
              key={`current-${i}`}
              value={letter}
              state="empty"
              $isRevealing={false}
            />
          ))}
          {Array.from({ length: WORD_LENGTH - currentGuess.length }, (_, i) => (
            <Letter
              key={`current-empty-${i}`}
              value=""
              state="empty"
              $isRevealing={false}
            />
          ))}
        </Row>
      )}

      {/* Render remaining empty rows */}
      {Array.from({ length: totalRows - guesses.length - 1 }, (_, rowIndex) => (
        <Row key={`empty-row-${rowIndex}`} $isIncorrect={false}>
          {Array.from({ length: WORD_LENGTH }, (_, colIndex) => (
            <Letter
              key={`empty-${rowIndex}-${colIndex}`}
              value=""
              state="empty"
              $isRevealing={false}
            />
          ))}
        </Row>
      ))}
    </BoardContainer>
  );
};

export default GameBoard;
