import { wordLength, appState } from "./appState.js";
import { ALL_WORDS } from "./words.js";
import checkWord from "./checkWord.js";
import win from "./win.js";
import gameOver from "./gameOver.js";

const handleKeyboardInput = (attempts) => {
  if (appState.inputAvailability) {
    const keys = document.querySelectorAll(".key");
    const backspace = document.querySelector(".backspace-button");
    const enterButton = document.querySelector(".enter-button");

    keys.forEach((key) => {
      key.addEventListener("click", () => {
        const attempt = [...attempts[appState.currentAttemptIndex].children];
        const firstEmptyLetterIndex = attempt.findIndex(
          (container) =>
            container.textContent.trim() === "" ||
            container.classList.contains("clue")
        );

        if (firstEmptyLetterIndex !== -1) {
          const target = attempt[firstEmptyLetterIndex];
          target.textContent = key.textContent;
          target.classList.remove("clue");
          appState.lastFullLetterIndex = firstEmptyLetterIndex;
          target.classList.remove("letter-animated");
          void target.offsetWidth;
          target.classList.add("letter-animated");
          target.classList.add("letter-complete");
        }
      });
    });

    backspace.addEventListener("click", () => {
      if (appState.inputAvailability) {
        const attempt = [...attempts[appState.currentAttemptIndex].children];
        const lastFullLetterIndex = attempt.findLastIndex((container) =>
          container.classList.contains("letter-complete")
        );
        if (lastFullLetterIndex !== -1) {
          const target = attempt[lastFullLetterIndex];
          target.textContent = appState.solveMask[lastFullLetterIndex];
          target.classList.remove("letter-complete");
          target.classList.add("clue");
          appState.lastFullLetterIndex -= 1;
        }
      }
    });

    enterButton.addEventListener("click", async () => {
      if (!appState.inputAvailability) return;
      if (appState.lastFullLetterIndex !== wordLength - 1) return;

      const wordElements = [...attempts[appState.currentAttemptIndex].children];
      const currentAttemptWord = wordElements
        .map((el) => el.textContent)
        .join("");

      try {
        const existsRes = await fetch("http://notwordle.ru/api/words/exists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word: currentAttemptWord }),
        });

        const existsData = await existsRes.json();
        const isCurrentWordExists = existsData.exists;

        if (!isCurrentWordExists) {
          alert("Слово не найдено в словаре.");
          return;
        }

        await checkWord(wordElements, keys);

        if (appState.solve.every(Boolean)) {
          await checkWord(wordElements, keys); // ← теперь ждем

          if (appState.solve.every(Boolean)) {
            const gameRes = await fetch(
              `http://notwordle.ru/api/games/${appState.gameId}`
            );
            const gameData = await gameRes.json();

            if (gameData.status !== "active") {
              appState.hiddenWord = gameData.word || "";
              console.log("Загаданное слово:", appState.hiddenWord);
            }

            win(attempts);
          }
        } else {
          if (appState.currentAttemptIndex < attempts.length - 1) {
            appState.currentAttemptIndex++;
            appState.lastFullLetterIndex = -1;

            const nextWord = [
              ...attempts[appState.currentAttemptIndex].children,
            ];
            for (let i = 0; i < wordLength; i++) {
              const letter = nextWord[i];
              letter.classList.add("clue");
              letter.textContent = appState.solveMask[i];
            }
          } else {
            const gameRes = await fetch(
              `http://notwordle.ru/api/games/${appState.gameId}`
            );
            if (!gameRes.ok)
              throw new Error("Не удалось получить информацию об игре");

            const gameData = await gameRes.json();
            if (gameData.status !== "active") {
              appState.hiddenWord = gameData.word || "";
              console.log("Загаданное слово:", appState.hiddenWord);
            }

            gameOver();
          }
        }
      } catch (error) {
        console.error("Ошибка при обработке ввода:", error);
      }
    });
  }
};

export default handleKeyboardInput;
