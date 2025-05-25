import { wordLength, appState } from "./appState.js";
import createGameboard from "./createGameboard.js";
import createKeyboard from "./createKeyboard.js";
import handleKeyboardInput from "./handleKeyboardInput.js";
import { WORDS } from "./words.js";
import cleareGame from "./cleareGame.js";

const newGame = () => {
  fetch("http://notwordle.ru/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "normal" }),
  })
    .then((response) => response.json())
    .then((data) => {
      const gameId = data.id;

      appState.gameId = gameId;

      cleareGame();
      createGameboard(wordLength);
      createKeyboard();
      appState.inputAvailability = true;
      appState.currentAttemptIndex = 0;
      appState.solveMask = Array(wordLength).fill("");
      const attempts = document.querySelectorAll(".word-attempt");
      handleKeyboardInput(attempts);

      console.log("Game ID:", gameId);
    })
    .catch((err) => {
      console.error("Ошибка при создании игры:", err);
    });
};

export default newGame;
