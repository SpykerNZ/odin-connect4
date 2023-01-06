export const View = function () {
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
};
