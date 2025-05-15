import { wordLength,appState } from "./appState.js";
import createGameboard from "./createGameboard.js";
import createKeyboard from "./createKeyboard.js";
import handleKeyboardInput from "./handleKeyboardInput.js";
import { WORDS } from "./words.js";
import getRandomInt from "./getRandomInt.js";
import cleareGame from "./cleareGame.js";

const newGame = () => {
  appState.hiddenWord = WORDS[getRandomInt(0, WORDS.length)];
  cleareGame();
  createGameboard(wordLength);
  createKeyboard();
  appState.inputAvailability = true;
  appState.currentAttemptIndex = 0;
  appState.solveMask = Array(wordLength).fill("");
  const attempts = document.querySelectorAll(".word-attempt");
  handleKeyboardInput(attempts);
  console.log(appState.hiddenWord);
};

export default newGame;