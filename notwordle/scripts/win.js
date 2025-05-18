import createNewGameButton from "./createNewGameButton.js";
import { appState } from "./appState.js";

const win = (attempts) => {
  const attemptIndex = appState.currentAttemptIndex + 1;
  if (attemptIndex >= 5) {
    alert(`Ура! Вы смогли угадать слово за ${attemptIndex} попыток!`);
  } else if (attemptIndex >= 2) {
    alert(`Ура! Вы смогли угадать слово за ${attemptIndex} попытки!`);
  } else {
    alert("Удача на Вашей стороне, Вы смогли угадать слово c первой попытки!");
  }
  for (let i = attemptIndex; i < attempts.length; i++) {
    const target = [...attempts[i].children];
    target.forEach((letter) => {
      letter.classList.add("muted");
    });
  }
  createNewGameButton();
  appState.inputAvailability = false;
};

export default win;