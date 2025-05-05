import { WORDS } from "./words.js"
import createKeyboard from "./createKeyboard.js";
import createGameboard from "./createGameboard.js";

createGameboard(5);

createKeyboard();

const langButton = document.getElementById("lang-button");
const settingsButton = document.getElementById("settings-button");
const helpButton = document.getElementById("help-button");

langButton.addEventListener("click", () => {alert("В данный момент доступен только русский язык.")});

settingsButton.addEventListener("click", () => {alert("Настройки будут добавлены позже.")});

helpButton.addEventListener("click", () => {alert("Правила игры будут добавлены позже.")});

const attempts = document.querySelectorAll("word-attempt");

// TODO сделать словарь вида {номер попытки: все буквы текущей попытки (5 элементов)}
// TOOD придумать как реализовать проход по объекту: цикл? просто переменная?
// const wordsMap = new Map()

const keys = document.querySelectorAll('.key');
const letters = document.querySelectorAll('.letter');


keys.forEach(key => {
  key.addEventListener("click", () => {
    const firstEmptyLetter = Array.from(letters).find(
      container => container.textContent.trim() === ""
    );
    
    if (firstEmptyLetter) {
      firstEmptyLetter.textContent = key.textContent;
    } else {
      console.log("Все контейнеры уже заполнены!");
    }
  });
});

// TODO Доделать реализацию backspace
// const backspace = document.querySelector("backspace-button");

// backspace.addEventListener("click", () => {

// })

console.log(keys);

