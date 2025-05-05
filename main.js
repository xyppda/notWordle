import { WORDS } from "./words.js";
import createKeyboard from "./createKeyboard.js";
import createGameboard from "./createGameboard.js";

const appState = {
  lastFullLetterIndex: -1,
  currentAttemptIndex: 0,
};

let wordLength = 5;

createGameboard(wordLength);

createKeyboard();

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

const setupKeyboardInput = (attempts) => {
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
        attempt[firstEmptyLetterIndex].textContent = key.textContent;
        appState.lastFullLetterIndex = firstEmptyLetterIndex;
      } else {
        console.log("Все контейнеры уже заполнены!");
      }
    });
  });

  backspace.addEventListener("click", () => {
    const attempt = [...attempts[appState.currentAttemptIndex].children];
    const lastFullLetterIndex = attempt.findLastIndex(
      (container) => container.textContent !== ""
    );
    if (lastFullLetterIndex !== -1) {
      attempt[lastFullLetterIndex].textContent = "";
      appState.lastFullLetterIndex -= 1;
    } else {
      console.log("Все контейнеры пусты!");
    }
  });

  enterButton.addEventListener("click", () => {
    if (appState.lastFullLetterIndex === wordLength - 1) {
      appState.currentAttemptIndex++;
      appState.lastFullLetterIndex = -1;

      if (appState.currentAttemptIndex < attempts.length) {
        alert("Переход к следующей попытке...");
      } else {
        alert("Попытки закончились!");
      }
    } else {
      alert("Заполните слово, перед переходом к следующей попытке.");
    }
  });
};

const attempts = document.querySelectorAll(".word-attempt");
setupKeyboardInput(attempts);
