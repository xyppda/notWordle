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
const keys = document.querySelectorAll('.key');
const letters = document.querySelectorAll('.letter');

keys.forEach(key => {
  key.addEventListener('click', () => {
    const firstEmptyLetter = Array.from(letters).find(
      container => container.textContent.trim() === ''
    );
    
    if (firstEmptyLetter) {
      firstEmptyLetter.textContent = key.textContent;
    } else {
      console.log('Все контейнеры уже заполнены!');
    }
  });
});


console.log(keys);

