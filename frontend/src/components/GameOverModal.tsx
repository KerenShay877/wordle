import React from "react";
import styled, { keyframes } from "styled-components";
import { shareResults } from "../utils/shareResults";

const modalEntranceAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #121213;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #3a3a3c;
  max-width: 90%;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  animation: ${modalEntranceAnimation} 0.3s ease;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: #ffffff;
  }
`;

const Button = styled.button`
  background-color: #538d4e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a7d4a;
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface GameOverModalProps {
  won: boolean;
  solution: string;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  won,
  solution,
  onPlayAgain,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{won ? "You Won!" : "You Lost!"}</h2>
        <p>The word was: {solution}</p>
        <Button onClick={onPlayAgain}>Play Again</Button>
        <Button onClick={() => shareResults(won, solution)}>Share</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GameOverModal;
