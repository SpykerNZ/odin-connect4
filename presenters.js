const GameboardPresenter = function () {
  const gameboardElem = document.querySelector(".gameboard");
  function destroyGameboard() {
    gameboardElem.innerHTML = "";
  }

  function createGameboard() {
    destroyGameboard();
    for (
      let i = 0;
      i < game.board.getNumberRows() * game.board.getNumberCols();
      i++
    ) {
      const elemDiv = document.createElement("div");
      elemDiv.classList.add("cell");
      elemDiv.dataset.index = `${i}`;
      elemDiv.addEventListener("click", gameboardCellPressed);
      gameboardElem.appendChild(elemDiv);
    }
  }

  function updateGameboard() {
    let color = "black";
    const boardState = game.board.getState();
    for (var i = 0; i < game.board.getNumberRows(); i++) {
      for (var j = 0; j < game.board.getNumberCols(); j++) {
        game.players.every((player) => {
          if (boardState[i][j] === player.id) {
            color = player.color;
            return false;
          } else {
            color = "black";
            return true;
          }
        });
        gameboardElem.children[
          j + i * game.board.getNumberCols()
        ].style.backgroundColor = color;
      }
    }
  }
  function gameboardCellPressed(e) {
    let colIndex = e.target.dataset.index % game.board.getNumberCols();
    let rowIndex =
      (e.target.dataset.index - colIndex) / game.board.getNumberCols();
    console.log(`${rowIndex} ${colIndex}`);
    // TODO - how will this execute moves?
    const result = game.executeMove(rowIndex, colIndex);
    updateGameboard();
  }
};

const GameStatePresenter = function () {};

const SetupPresenter = function () {
  const setupElem = document.querySelector(".setup");
  const playersElem = setupElem.querySelectorAll(".player");
  const playerElemArray = _loadPlayers(playersElem);

  function _loadPlayers(playersElem) {
    const playerElems = [];
    for (let i = 0; i < playersElem.length; i++) {
      const playerElem = {
        typeElem: playersElem[i].querySelector("select.type"),
        usernameElem: playersElem[i].querySelector("input.name"),
        colorElem: playersElem[i].querySelector("input.color"),
      };
      playerElem.typeElem.value = players[i].type;
      playerElem.usernameElem.value = players[i].username;
      playerElem.colorElem.value = players[i].color;
      playerElems.push(playerElem);
    }
    return playerElems;
  }
};

const ViewPresenter = function () {
  const gameElem = document.querySelector(".game");
  const setupElem = document.querySelector(".setup");

  function startGame() {
    setupElem.style.display = "none";
    gameElem.style.display = "flex";
  }

  function endGame() {
    setupElem.style.display = "flex";
    gameElem.style.display = "none";
  }
};
