import { PlayersFactory } from "./models/players.js";
import * as matrix from "./functions/matrix.js";

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
      playerSettingElems[i].type.value = players.getByIndex(i).type;
      playerSettingElems[i].username.value = players.getByIndex(i).username;
      playerSettingElems[i].color.value = players.getByIndex(i).color;
    }
  }

  function getPlayerSettings() {
    const numberOfPlayers = playerSettingElems.length;
    const players = PlayersFactory().create(numberOfPlayers);
    for (let i = 0; i < numberOfPlayers; i++) {
      players.getByIndex(i).type = playerSettingElems[i].type.value;
      players.getByIndex(i).username = playerSettingElems[i].username.value;
      players.getByIndex(i).color = playerSettingElems[i].color.value;
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

  function updateGameboard(board, players) {
    let color = null;

    for (var i = 0; i < matrix.getNumberRows(board); i++) {
      for (var j = 0; j < matrix.getNumberCols(board); j++) {
        const cellId = matrix.getCell(board, i, j);
        cellId === 0
          ? (color = "#FFFFFF")
          : (color = players.getById(cellId).color);
        gameboardElem.children[
          j + i * matrix.getNumberCols(board)
        ].style.backgroundColor = color;
      }
    }
  }

  function setStatusText(text) {
    statusTextElem.textContent = text;
  }

  function setStatusColor(bgColor) {
    statusTextElem.style.backgroundColor = bgColor;
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
    updateGameboard,
    setStatusText,
    setStatusColor,
    bindStartGame,
    bindEndGame,
    bindRestartGame,
    bindGameboard,
  };
};
