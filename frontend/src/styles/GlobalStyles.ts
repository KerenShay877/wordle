import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: "Helvetica Neue", Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: #ffffff;
    background-color: #121213;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    min-width: 320px;
    min-height: 100vh;
  }

  button {
    border-radius: 8px;
    border: 1px solid #818384;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    background-color: #818384;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #565758;
      transform: translateY(-2px);
    }
  }
`;
