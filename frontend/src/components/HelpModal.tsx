import styled from "styled-components";

const HelpContainer = styled.div`
  padding: 1rem;
  background-color: #121213;
  border-radius: 8px;
  border: 2px solid #3a3a3c;
`;

const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <HelpContainer>
    <h2>How to Play</h2>
    <p>Guess the five-letter word within six attempts.</p>
    <p>
      After each guess, the color of the tiles will change to show how close
      your guess was to the word.
    </p>
    <button onClick={onClose}>Close</button>
  </HelpContainer>
);

export default HelpModal;
