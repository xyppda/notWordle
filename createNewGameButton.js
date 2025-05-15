import newGame from "./newGame.js";

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

export default createNewGameButton;