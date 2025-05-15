import { wordLength, appState } from "./appState.js";

const checkWord = (word, keys) => {
  keys = [...keys];
  for (let i = 0; i < wordLength; i++) {
    const letter = word[i];
    const letterText = letter.textContent;
    letter.classList.remove("letter-complete");
    const targetKey = keys.find((key) => key.textContent === letterText);
    if (letterText === appState.hiddenWord[i]) {
      letter.classList.add("right");
      targetKey.classList.add("right");
      appState.solveMask[i] = letterText;
      appState.solve[i] = true;
    } else if (appState.hiddenWord.includes(letterText)) {
      letter.classList.add("semi-right");
      targetKey.classList.add("semi-right");
      appState.solve[i] = false;
    } else {
      letter.classList.add("wrong");
      targetKey.classList.add("wrong");
      appState.solve[i] = false;
    }
  }
};

export default checkWord;