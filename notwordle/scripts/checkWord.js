import { wordLength, appState } from "./appState.js";

const checkWord = async (word, keys) => {
  keys = [...keys];
  const guess = word.map((letter) => letter.textContent).join("");

  try {
    const res = await fetch(`http://notwordle.ru/api/games/${appState.gameId}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: guess }),
    });

    const data = await res.json();
    console.log(data);

    const result = data["result"];
    for (let i = 0; i < wordLength; i++) {
      const item = result[i];
      const letter = word[i];
      letter.classList.remove("letter-complete");

      const targetKey = keys.find((k) => k.textContent === letter.textContent);

      if (item === 2) {
        letter.classList.add("right");
        targetKey.classList.add("right");
        appState.solveMask[i] = letter.textContent;
        appState.solve[i] = true;
      } else if (item === 1) {
        letter.classList.add("semi-right");
        targetKey.classList.add("semi-right");
        appState.solve[i] = false;
      } else {
        letter.classList.add("wrong");
        targetKey.classList.add("wrong");
        appState.solve[i] = false;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default checkWord;
