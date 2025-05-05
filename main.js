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
        const target = attempt[firstEmptyLetterIndex];
        target.textContent = key.textContent;
        appState.lastFullLetterIndex = firstEmptyLetterIndex;

        target.classList.remove("letter-animated");
        void target.offsetWidth;
        target.classList.add("letter-animated");
        target.classList.add("letter-complete");
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

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const virtualKeys = document.querySelectorAll(".key");

  // Поиск обычной буквы
  const letterButton = Array.from(virtualKeys).find(
    (btn) => btn.textContent.toLowerCase() === key
  );

  // ENTER
  if (key === "enter") {
    const enterButton = document.querySelector(".enter-button");
    if (enterButton) {
      enterButton.classList.add("active");
      enterButton.click();
      setTimeout(() => enterButton.classList.remove("active"), 100);
    }
  }

  // BACKSPACE
  else if (key === "backspace") {
    const backspaceButton = document.querySelector(".backspace-button");
    if (backspaceButton) {
      backspaceButton.classList.add("active");
      backspaceButton.click();
      setTimeout(() => backspaceButton.classList.remove("active"), 100);
    }
  }

  // Буквенная клавиша
  else if (letterButton) {
    letterButton.classList.add("active");
    letterButton.click();
    setTimeout(() => letterButton.classList.remove("active"), 100);
  }
});
