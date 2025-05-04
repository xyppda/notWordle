const createGameboard = (wordLength) => {
  const gameBoard = document.querySelector(".game-board");
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "word-attempt";
    for (let i = 0; i < wordLength; i++) {
      const letter = document.createElement("div");
      letter.className = "letter";
      row.append(letter);
    }
    gameBoard.append(row);
  }
}

export default createGameboard;