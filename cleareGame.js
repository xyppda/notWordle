const cleareGame = () => {
  document.querySelector(".game-board").innerHTML = "";
  document.querySelector(".keyboard").innerHTML = "";
  document.querySelector(".new-game-placeholder").innerHTML = "";
};

export default cleareGame;