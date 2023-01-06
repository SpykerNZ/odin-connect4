import { Gameboard } from "./scripts/gameboard.js";
import { Connect4 } from "./scripts/rules.js";
import { Player, PlayerFactory } from "./scripts/players.js";

const model = (function () {
  const playerFactory = PlayerFactory();
  const gameboard = Gameboard(6, 7);
  const connect4 = Connect4();
})();

const view = (function () {
  const containerElem = document.querySelector(".container");
  const setupPageElem = containerElem.querySelector(".setup");
  const gamePageElem = containerElem.querySelector(".game");

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
    for (
      let i = 0;
      i < gameboard.getNumberRows() * gameboard.getNumberCols();
      i++
    ) {
      const elemDiv = document.createElement("div");
      elemDiv.classList.add("cell");
      elemDiv.dataset.index = `${i}`;
      elemDiv.addEventListener("click", gameboardCellPressed);
      gameboardElem.appendChild(elemDiv);
    }
  }

  function gameboardCellPressed(e) {
    let colIndex = e.target.dataset.index % game.board.getNumberCols();
    let rowIndex =
      (e.target.dataset.index - colIndex) / game.board.getNumberCols();
    console.log(`${rowIndex} ${colIndex}`);
    // how will we execute the game move here?
    const result = game.executeMove(rowIndex, colIndex);
    // how do we pass the color array and gameboard here?
    updateGameboard();
  }

  function updateGameboard(gameboard, colorArray) {
    let color = colorArray[0];
    const boardState = gameboard.getState();
    for (var i = 0; i < gameboard.getNumberRows(); i++) {
      for (var j = 0; j < gameboard.getNumberCols(); j++) {
        gameboardElem.children[
          j + i * game.board.getNumberCols()
        ].style.backgroundColor = color[boardState[i][j]];
      }
    }
  }
})();

const Presenter = (function (model, view) {})(model, view);
