import { appState } from "./appState.js";
import newGame from "./newGame.js";
import createNewGameButton from "./createNewGameButton.js";

const gameOver = () => {
  if (
    confirm(
      `Вы проиграли. Загаданное слово: ${appState.hiddenWord}. Попробовать еще раз?`
    )
  ) {
    newGame();
  } else {
    createNewGameButton();
    appState.inputAvailability = false;
  }
};

export default gameOver;