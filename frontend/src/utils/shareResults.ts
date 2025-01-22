export const generateShareText = (guesses: string[], solution: string) => {
  const won = guesses[guesses.length - 1] === solution;
  const header = `Wordle ${won ? guesses.length : "X"}/6`;

  const grid = guesses
    .map((guess) =>
      guess
        .split("")
        .map((letter, i) => {
          if (letter === solution[i]) return "🟩";
          if (solution.includes(letter)) return "🟨";
          return "⬜";
        })
        .join("")
    )
    .join("\n");

  return `${header}\n\n${grid}`;
};

export const shareResults = (won: boolean, solution: string) => {
  const text = `I ${
    won ? "won" : "lost"
  } the Wordle! The word was ${solution}.`;
  navigator.share({
    title: "Wordle Results",
    text: text,
  });
};
