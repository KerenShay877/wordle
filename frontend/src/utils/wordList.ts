const WORD_LIST = [
  "REACT",
  "WORLD",
  "PLANE",
  "BRAIN",
  "STEAM", // Add more words
];

export const isValidWord = (word: string): boolean => {
  return WORD_LIST.includes(word.toUpperCase());
};
