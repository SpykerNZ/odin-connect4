import { Board, highestIndexOf } from "./scripts/board.js";
import { Connect4 } from "./scripts/rules.js";
import { PlayerFactory } from "./scripts/players.js";
import { Turn } from "./scripts/turn.js";
import { State } from "./scripts/state.js";

const model = (function () {
  const _playerFactory = PlayerFactory();
  const players = _playerFactory.createMultiple(2);
  const rules = Connect4();
  const gameboard = Board(6, 7);
  const state = State();
  const turn = Turn();

  function executeMove(row, col) {
    const player = players[state.activePlayerIndex];

    const row_ = highestIndexOf(gameboard.getCol(col), 0);

    if (rules.checkValidMove(gameboard, player.id, row_, col)) {
      gameboard.setCell(player.id, row_, col);
    } else {
      console.log("invalid!");
      return;
    }

    if (rules.checkMoveWinCondition(gameboard, player.id, row_, col)) {
      console.log("winner!");
    } else if (rules.checkDrawCondition(gameboard)) {
      console.log("draw!");
    } else {
      console.log("next player turn");
      state.activePlayerIndex = turn.nextPlayer(
        state.activePlayerIndex,
        players.length
      );
    }
  }

  return {
    executeMove,
    gameboard,
    players,
  };
})();

const view = (function () {
  const containerElem = document.querySelector(".container");
  const setupPageElem = containerElem.querySelector(".setup");
  const gamePageElem = containerElem.querySelector(".game");

  const startButtonElem = setupPageElem.querySelector("button.start");
  const endButtonElem = gamePageElem.querySelector("button.end");
  const restartButtonElem = gamePageElem.querySelector("button.restart");

  const gameboardElem = gamePageElem.querySelector(".gameboard");

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
    updateGameboard(gameboard);
  }

  function updateGameboard(gameboard) {
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
    createGameBoard,
    destroyGameboard,
    updateGameboard,
    bindStartGame,
    bindEndGame,
    bindRestartGame,
    bindGameboard,
  };
})();

const controller = (function (model, view) {
  view.bindStartGame(handleStartGame);
  view.bindEndGame(handleEndGame);
  view.bindRestartGame(handleRestartGame);

  function handleStartGame() {
    view.changeToGamePage();
    view.createGameBoard(model.gameboard);
    view.bindGameboard(handleGameboardCellPressed);
    // TODO - modify the players object based on the setup
  }

  function handleEndGame() {
    view.changeToSetupPage();
    view.destroyGameboard();
  }

  function handleRestartGame() {
    view.updateGameboard(model.gameboard);
  }

  function handleGameboardCellPressed(row, col) {
    console.log(`row: ${row} col: ${col}`);
    model.executeMove(row, col);
    view.updateGameboard(model.gameboard);
  }
})(model, view);
