let wordLength = 5;

const appState = {
  gameId: 0,
  lastFullLetterIndex: -1,
  currentAttemptIndex: 0,
  hiddenWord: "",
  inputAvailability: false,
  solve: Array(wordLength).fill(false),
  solveMask: Array(wordLength).fill(""),
};

export { wordLength, appState };