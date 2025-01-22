import React from "react";
import { KEYBOARD_ROWS } from "../constants/game";
import styled, { keyframes } from "styled-components";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

interface KeyboardButtonProps {
  width: string;
}

const pressAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const KeyboardButton = styled.button<KeyboardButtonProps>`
  width: ${({ width }) => width};
  height: 40px;
  margin: 0 2px;
  font-size: 16px;
  cursor: pointer;
  background-color: #818384;
  color: white;
  border: none;
  border-radius: 5px;
  transition: "background-color 0.2s, transform 0.2s, box-shadow 0.2s";
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    animation: ${pressAnimation} 0.2s ease;
  }
`;

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{ display: "flex", justifyContent: "center", margin: "5px 0" }}
        >
          {row.map((key) => (
            <KeyboardButton
              key={key}
              onClick={() => onKeyPress(key)}
              width={key === "ENTER" || key === "BACKSPACE" ? "80px" : "40px"}
            >
              {key === "BACKSPACE" ? "←" : key}
            </KeyboardButton>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
