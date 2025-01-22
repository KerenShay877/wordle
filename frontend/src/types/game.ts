export type LetterState = "correct" | "present" | "absent" | "empty";

export interface Letter {
  value: string;
  state: LetterState;
}

export interface GameState {
  currentGuess: string;
  guesses: string[];
  gameOver: boolean;
  won: boolean;
}
