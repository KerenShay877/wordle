import styled, { css, keyframes } from "styled-components";
import { LetterState } from "../types/game";

const popIn = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  40% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const flip = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

interface LetterProps {
  value: string;
  state: LetterState;
  $isRevealing: boolean;
}

const StyledLetter = styled.div<LetterProps>`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid #3a3a3c;
  border-radius: 4px;
  margin: 2px;
  aspect-ratio: 1;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: background-color 0.3s ease;

  ${({ state }) => {
    switch (state) {
      case "correct":
        return css`
          background-color: #538d4e;
          border-color: #538d4e;
          color: white;
        `;
      case "present":
        return css`
          background-color: #b59f3b;
          border-color: #b59f3b;
          color: white;
        `;
      case "absent":
        return css`
          background-color: #3a3a3c;
          border-color: #3a3a3c;
          color: white;
        `;
      default:
        return css`
          background-color: transparent;
          color: white;
        `;
    }
  }}

  ${({ value, $isRevealing }) => {
    if (value && !$isRevealing) {
      return css`
        animation: ${popIn} 0.1s ease-in-out forwards;
      `;
    }
    if (value && $isRevealing) {
      return css`
        animation: ${flip} 0.6s ease forwards;
      `;
    }
    return "";
  }}
`;

const Letter: React.FC<LetterProps> = ({ value, state, $isRevealing }) => {
  return (
    <StyledLetter value={value} state={state} $isRevealing={$isRevealing}>
      {value}
    </StyledLetter>
  );
};

export default Letter;
