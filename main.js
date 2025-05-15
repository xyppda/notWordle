import newGame from "./scripts/newGame.js";
import createHelp from "./scripts/createHelp.js";


// TODO исправить вывод правил (сделать поверх, не нужно запускать новую игру каждый раз)
// TODO добавить выбор длины слов
// TODO добавить выбор языка
// TODO добавить настройки в целом
// TODO нельзя повторно вводить слова
// TODO если бува желтая длина-1 раз на разных позициях, то отображать серой (можно сделать объект где для каждой желтой буквы хранится ее маска (
// то есть если буква встречается, то в объект добавлется ключ по букве и массив, где отмечаются позиции, где этой буквы нет))

// TODO new (counter)

// const counter = (arr) => {
//   const counted = new Map();
//     arr.forEach((letter) => {
//     if (counted.includes(letter)) {
//       counted[letter]++;
//     } else {
//       counted.append(letter);
//     }
//   })
// }

// end new

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
  if (!document.querySelector(".close-button")) {
    createHelp();
  } else {
    close();
  }
});

// Запуск игры.

newGame();

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
