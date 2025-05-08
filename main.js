import { WORDS, ALL_WORDS } from "./words.js";
import createKeyboard from "./createKeyboard.js";
import createGameboard from "./createGameboard.js";
import getRandomInt from "./getRandomInt.js";

// TODO добавить выбор длины слов
// TODO пофиксить, что энтер нажимается после завершения игры
// TODO как-то сделал, что невозможно проиграть

let wordLength = 5;

const appState = {
  lastFullLetterIndex: -1,
  currentAttemptIndex: 0,
  hiddenWord: "",
  inputAvailability: false,
  solve: Array(wordLength).fill(false),
  solveMask: Array(wordLength).fill(""),
};

const langButton = document.getElementById("lang-button");
const settingsButton = document.getElementById("settings-button");
const helpButton = document.getElementById("help-button");

langButton.addEventListener("click", () => {
  alert("В данный момент доступен только русский язык.");
});

settingsButton.addEventListener("click", () => {
  alert("Настройки будут добавлены позже.");
});

// Обработка ввода.

const setupKeyboardInput = (attempts) => {
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
        console.log(lastFullLetterIndex);
        if (lastFullLetterIndex !== -1) {
          const target = attempt[lastFullLetterIndex];
          target.textContent = appState.solveMask[lastFullLetterIndex];
          target.classList.remove("letter-complete");
          target.classList.add("clue");
          appState.lastFullLetterIndex -= 1;
        } else {
          console.log("Все контейнеры пусты!");
        }
      }
    });

    enterButton.addEventListener("click", () => {
      if (appState.inputAvailability) {
        if (appState.lastFullLetterIndex === wordLength - 1) {
          const word = [...attempts[appState.currentAttemptIndex].children];
          const currentAttemptWord = Array.from(
            word,
            (letter) => letter.textContent
          ).join("");
          if (ALL_WORDS.includes(currentAttemptWord)) {
            checkWord(word, keys);
            if (appState.solve.every(Boolean)) {
              win(attempts);
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
                gameOver();
              }
            }
          } else {
            alert("Слово не найдено в словаре.");
          }
        }
      }
    });
  }
};

// Рендер кнопки "новая игра"

const createNewGameButton = () => {
  const placeholder = document.querySelector(".new-game-placeholder");
  const button = document.createElement("button");
  button.className = "new-game-button";
  button.textContent = "Новая игра";
  placeholder.append(button);
  button.addEventListener("click", () => {
    newGame();
  });
};

// Запуск игры.

const cleareGame = () => {
  document.querySelector(".game-board").innerHTML = "";
  document.querySelector(".keyboard").innerHTML = "";
  document.querySelector(".new-game-placeholder").innerHTML = "";
};

const newGame = () => {
  appState.hiddenWord = WORDS[getRandomInt(0, WORDS.length)];
  cleareGame();
  createGameboard(wordLength);
  createKeyboard();
  appState.inputAvailability = true;
  appState.currentAttemptIndex = 0;
  const attempts = document.querySelectorAll(".word-attempt");
  setupKeyboardInput(attempts);
};

newGame();

// Закрытие справки/настроек

const close = () => {
  document.querySelector(".placeholder").innerHTML = "";
  newGame();
};

// Вывод правил

const createHelp = () => {
  cleareGame();
  const placeholder = document.querySelector(".placeholder");
  const closeButton = document.createElement("button");
  const helpHeader = document.createElement("div");
  helpHeader.className = "help-header";
  const helpHeaderText = document.createElement("div");
  helpHeaderText.className = "help-header-text";
  helpHeaderText.textContent = "Правила игры";
  closeButton.className = "close-button";
  const closeButtonSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  `;
  closeButton.insertAdjacentHTML("beforeend", closeButtonSvg);
  closeButton.addEventListener("click", () => close());
  helpHeader.append(helpHeaderText);
  helpHeader.append(closeButton);
  const mainHelp = document.createElement("div");
  mainHelp.className = "help-main";
  mainHelp.textContent =
    "Игрок за шесть попыток должен угадать загаданное пятибуквенное слово, вводя слова той же длины. После каждой попытки буквы подсвечиваются: зелёным — если буква на правильном месте, жёлтым — если есть в слове, но не той позиции, и серым — если её нет вовсе. Удачи!";
  placeholder.append(helpHeader);
  placeholder.append(mainHelp);
};

helpButton.addEventListener("click", () => {
  if (!document.querySelector(".close-button")) {
    createHelp();
  } else {
    close();
  }
});

// Поражение в игре.

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
    console.log(target);
    target.forEach((letter) => {
      letter.classList.add("muted");
    });
  }
  createNewGameButton();
  appState.inputAvailability = false;
};

// Проверка слова. Вызывается по нажатию Enter

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

// Эмуляция ввода.

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const virtualKeys = document.querySelectorAll(".key");

  const letterButton = Array.from(virtualKeys).find(
    (btn) => btn.textContent.toLowerCase() === key
  );

  if (key === "enter") {
    const enterButton = document.querySelector(".enter-button");
    if (enterButton) {
      enterButton.classList.add("active");
      enterButton.click();
      setTimeout(() => enterButton.classList.remove("active"), 100);
    }
  } else if (key === "backspace") {
    const backspaceButton = document.querySelector(".backspace-button");
    if (backspaceButton) {
      backspaceButton.classList.add("active");
      backspaceButton.click();
      setTimeout(() => backspaceButton.classList.remove("active"), 100);
    }
  } else if (letterButton) {
    letterButton.classList.add("active");
    letterButton.click();
    setTimeout(() => letterButton.classList.remove("active"), 100);
  }
});
