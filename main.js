import { WORDS } from "./words.js";
import createKeyboard from "./createKeyboard.js";
import createGameboard from "./createGameboard.js";
import getRandomInt from "./getRandomInt.js";

// TODO добавить выбор длины слов

let wordLength = 5;

const appState = {
  lastFullLetterIndex: -1,
  currentAttemptIndex: 0,
  hiddenWord: "",
  inputAvailability: false,
  solve: Array(wordLength).fill(false),
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

helpButton.addEventListener("click", () => {
  alert("Правила игры будут добавлены позже.");
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
          (container) => container.textContent.trim() === ""
        );

        if (firstEmptyLetterIndex !== -1) {
          const target = attempt[firstEmptyLetterIndex];
          target.textContent = key.textContent;
          appState.lastFullLetterIndex = firstEmptyLetterIndex;

          target.classList.remove("letter-animated");
          void target.offsetWidth;
          target.classList.add("letter-animated");
          target.classList.add("letter-complete");
        }
      });
    });

    backspace.addEventListener("click", () => {
      const attempt = [...attempts[appState.currentAttemptIndex].children];
      const lastFullLetterIndex = attempt.findLastIndex(
        (container) => container.textContent !== ""
      );
      if (lastFullLetterIndex !== -1) {
        const target = attempt[lastFullLetterIndex];
        target.textContent = "";
        target.classList.remove("letter-complete");
        appState.lastFullLetterIndex -= 1;
      } else {
        console.log("Все контейнеры пусты!");
      }
    });

    enterButton.addEventListener("click", () => {
      if (appState.lastFullLetterIndex === wordLength - 1) {
        if (appState.currentAttemptIndex < attempts.length) {
          const word = [...attempts[appState.currentAttemptIndex].children];
          checkWord(word);
          if (appState.solve.every(Boolean)) {
            win(attempts);
          } else {
            appState.currentAttemptIndex++;
            appState.lastFullLetterIndex = -1;
          }
        } else {
          gameOver();
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
  console.log(appState.hiddenWord);
  cleareGame();
  createGameboard(wordLength);
  createKeyboard();
  appState.inputAvailability = true;
  appState.currentAttemptIndex = 0;
  const attempts = document.querySelectorAll(".word-attempt");
  setupKeyboardInput(attempts);
};

newGame();

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
      letter.classList.add("letter-muted");
    });
  }
  createNewGameButton();
  appState.inputAvailability = false;
};

// TODO Проверка слова. Вызывается по нажатию Enter

const checkWord = (word) => {
  for (let i = 0; i < wordLength; i++) {
    const letter = word[i];
    const letterText = letter.textContent;
    letter.classList.remove("letter-complete");
    if (letterText === appState.hiddenWord[i]) {
      letter.classList.add("letter-right");
      appState.solve[i] = true;
    } else if (appState.hiddenWord.includes(letterText)) {
      letter.classList.add("letter-semi-right");
      appState.solve[i] = false;
    } else {
      letter.classList.add("letter-wrong");
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
