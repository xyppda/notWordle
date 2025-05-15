import cleareGame from "./cleareGame.js";
import newGame from "./newGame.js";

const close = () => {
  document.querySelector(".placeholder").innerHTML = "";
  newGame();
};

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

export default createHelp;