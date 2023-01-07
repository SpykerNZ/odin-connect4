import { PlayerFactory } from "./game/players.js";
import { matrix } from "./game/matrix.js";
import { turn } from "./game/turn.js";

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

  const gameColors = {
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
      playerSettingElems[i].color.value = gameColors.playerArray[i];
    }
  }

  function getPlayerSettings() {
    const numberOfPlayers = playerSettingElems.length;
    const players = PlayerFactory().createMultiple(numberOfPlayers);
    for (let i = 0; i < numberOfPlayers; i++) {
      players[i].type = playerSettingElems[i].type.value;
      players[i].username = playerSettingElems[i].username.value;
      gameColors.playerArray[i] = playerSettingElems[i].color.value;
    }
    return players;
  }

  function destroyGameboard() {
    gameboardElem.innerHTML = "";
  }

  function createGameBoard(board) {
    destroyGameboard();
    for (var i = 0; i < matrix.getNumberRows(board); i++) {
      for (var j = 0; j < matrix.getNumberCols(board); j++) {
        const elemDiv = document.createElement("div");
        elemDiv.classList.add("cell");
        elemDiv.dataset.row = `${i}`;
        elemDiv.dataset.col = `${j}`;
        gameboardElem.appendChild(elemDiv);
      }
    }
  }

  function updateGameState(state) {
    _updateGameboard(state.board);
    const player = turn.getActivePlayer(state);
    statusTextElem.textContent = `${player.username}'s Turn!`;
    statusTextElem.style.backgroundColor =
      gameColors.playerArray[state.activePlayerIndex];
  }

  function _updateGameboard(board) {
    let colorArray = [gameColors.emptyCell];
    gameColors.playerArray.forEach((color) => {
      colorArray.push(color);
    });
    for (var i = 0; i < matrix.getNumberRows(board); i++) {
      for (var j = 0; j < matrix.getNumberCols(board); j++) {
        gameboardElem.children[
          j + i * matrix.getNumberCols(board)
        ].style.backgroundColor = colorArray[matrix.getCell(board, i, j)];
      }
    }
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
