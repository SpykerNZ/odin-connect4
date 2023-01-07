export const View = function (containerElem) {
  const setupPageElem = containerElem.querySelector(".setup");
  const gamePageElem = containerElem.querySelector(".game");

  const playerElems = setupPageElem.querySelectorAll(".player");

  const playerSettingElems = [];
  for (let i = 0; i < playerElems.length; i++) {
    playerSettingElems.push({
      type: playerElems[i].querySelector("select.type"),
      username: playerElems[i].querySelector("input.name"),
      color: playerElems[i].querySelector("input.color"),
    });
  }

  const startButtonElem = setupPageElem.querySelector("button.start");

  const endButtonElem = gamePageElem.querySelector("button.end");
  const restartButtonElem = gamePageElem.querySelector("button.restart");
  const gameboardElem = gamePageElem.querySelector(".gameboard");
  const statusTextElem = gamePageElem.querySelector(".status-text");

  const gameboardColors = {
    emptyCell: "#FFFFFF",
    background: "#000000",
    playerArray: ["#FFFF00", "#FF0000"],
  };

  function changeToSetupPage() {
    setupPageElem.style.display = "flex";
    gamePageElem.style.display = "none";
  }

  function changeToGamePage() {
    setupPageElem.style.display = "none";
    gamePageElem.style.display = "flex";
  }

  function setPlayerSettings(players) {
    for (let i = 0; i < playerSettingElems.length; i++) {
      playerSettingElems[i].type.value = players[i].type;
      playerSettingElems[i].username.value = players[i].username;
      playerSettingElems[i].color.value = gameboardColors.playerArray[i];
    }
  }

  function getPlayerSettings(players) {
    for (let i = 0; i < playerSettingElems.length; i++) {
      players[i].type = playerSettingElems[i].type.value;
      players[i].username = playerSettingElems[i].username.value;
      gameboardColors.playerArray[i] = playerSettingElems[i].color.value;
    }
  }

  function destroyGameboard() {
    gameboardElem.innerHTML = "";
  }

  function createGameBoard(gameboard) {
    destroyGameboard();
    for (var i = 0; i < gameboard.getNumberRows(); i++) {
      for (var j = 0; j < gameboard.getNumberCols(); j++) {
        const elemDiv = document.createElement("div");
        elemDiv.classList.add("cell");
        elemDiv.dataset.row = `${i}`;
        elemDiv.dataset.col = `${j}`;
        gameboardElem.appendChild(elemDiv);
      }
    }
  }

  function updateGameState(gameboard, state) {
    _updateGameboard(gameboard);
    _updateStatusText("TESTING");
  }

  function _updateGameboard(gameboard) {
    let colorArray = [gameboardColors.emptyCell];
    gameboardColors.playerArray.forEach((color) => {
      colorArray.push(color);
    });
    const boardState = gameboard.getState();
    for (var i = 0; i < gameboard.getNumberRows(); i++) {
      for (var j = 0; j < gameboard.getNumberCols(); j++) {
        gameboardElem.children[
          j + i * gameboard.getNumberCols()
        ].style.backgroundColor = colorArray[boardState[i][j]];
      }
    }
  }

  function _updateStatusText(str) {
    statusTextElem.textContent = str;
  }

  function bindStartGame(handler) {
    startButtonElem.addEventListener("click", (e) => {
      handler();
    });
  }

  function bindEndGame(handler) {
    endButtonElem.addEventListener("click", (e) => {
      handler();
    });
  }

  function bindRestartGame(handler) {
    restartButtonElem.addEventListener("click", (e) => {
      handler();
    });
  }

  function bindGameboard(handler) {
    const cellElems = gameboardElem.querySelectorAll(".cell");
    for (let i = 0; i < cellElems.length; i++) {
      const cellElem = cellElems[i];
      cellElem.addEventListener("click", () =>
        handler(cellElem.dataset.row, cellElem.dataset.col)
      );
    }
  }

  return {
    changeToGamePage,
    changeToSetupPage,
    setPlayerSettings,
    getPlayerSettings,
    createGameBoard,
    destroyGameboard,
    updateGameState,
    bindStartGame,
    bindEndGame,
    bindRestartGame,
    bindGameboard,
  };
};
