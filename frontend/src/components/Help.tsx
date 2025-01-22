import React from "react";
import styled from "styled-components";

const HelpContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1a1a1b;
  border-radius: 12px;
  border: 2px solid #538d4e;
  color: white;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #538d4e;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  margin: 1rem 0;
  max-width: 300px;
`;

const ExampleTile = styled.div<{ $state?: "correct" | "present" | "absent" }>`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 2px solid
    ${(props) => {
      switch (props.$state) {
        case "correct":
          return "#538d4e";
        case "present":
          return "#b59f3b";
        case "absent":
          return "#3a3a3c";
        default:
          return "#3a3a3c";
      }
    }};
  background-color: ${(props) => {
    switch (props.$state) {
      case "correct":
        return "#538d4e";
      case "present":
        return "#b59f3b";
      case "absent":
        return "#3a3a3c";
      default:
        return "transparent";
    }
  }};
`;

const Help: React.FC = () => {
  return (
    <HelpContainer>
      <Title>How to Play</Title>

      <Section>
        <h3>Game Rules</h3>
        <ul>
          <li>Guess the word in 6 tries or less</li>
          <li>Each guess must be a valid 5-letter word</li>
          <li>
            The color of the tiles will change to show how close your guess was
          </li>
        </ul>
      </Section>

      <Section>
        <h3>Examples</h3>
        <p>WEARY</p>
        <ExampleGrid>
          <ExampleTile $state="correct">W</ExampleTile>
          <ExampleTile>E</ExampleTile>
          <ExampleTile>A</ExampleTile>
          <ExampleTile>R</ExampleTile>
          <ExampleTile>Y</ExampleTile>
        </ExampleGrid>
        <p>W is in the word and in the correct spot</p>

        <p>PILOT</p>
        <ExampleGrid>
          <ExampleTile>P</ExampleTile>
          <ExampleTile $state="present">I</ExampleTile>
          <ExampleTile>L</ExampleTile>
          <ExampleTile>O</ExampleTile>
          <ExampleTile>T</ExampleTile>
        </ExampleGrid>
        <p>I is in the word but in the wrong spot</p>

        <p>VAGUE</p>
        <ExampleGrid>
          <ExampleTile>V</ExampleTile>
          <ExampleTile>A</ExampleTile>
          <ExampleTile $state="absent">G</ExampleTile>
          <ExampleTile>U</ExampleTile>
          <ExampleTile>E</ExampleTile>
        </ExampleGrid>
        <p>G is not in the word in any spot</p>
      </Section>

      <Section>
        <h3>Tips</h3>
        <ul>
          <li>Start with words that have common letters</li>
          <li>
            Pay attention to letters that have been marked as present or absent
          </li>
          <li>Remember that letters can be used more than once</li>
        </ul>
      </Section>
    </HelpContainer>
  );
};

export default Help;
