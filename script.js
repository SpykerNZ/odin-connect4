"use strict";

const gameboard = (function (rows, columns) {
  const _grid = _create(rows, columns);

  function _create(rows, cols) {
    return Array(rows)
      .fill()
      .map(() => Array(cols).fill(0));
  }

  function reset() {
    for (var i = 0; i < _grid.length; i++) {
      for (var j = 0; j < _grid[i].length; j++) {
        _grid[i][j] = 0;
      }
    }
  }

  function getState() {
    return _grid;
  }

  function getRow(row) {
    return _grid[row];
  }

  function getCol(col) {
    return _grid.map(function (value, index) {
      return value[col];
    });
  }

  function setCell(value, row, col) {
    _grid[row][col] = value;
  }

  function getNumberRows() {
    return _grid.length;
  }

  function getNumberCols() {
    return _grid[0].length;
  }

  return {
    getState,
    getRow,
    getCol,
    setCell,
    reset,
    getNumberRows,
    getNumberCols,
  };
})(6, 7);

const connect4 = (function () {
  function checkValidMove(board, row, col) {
    return board.getCol(col)[row] === 0;
  }

  function executeMove(board, value, row, col) {
    let targetCol = col;
    let targetRow = 0;
    // Iterate over column backwards and place at first free spot
    for (let i = board.getNumberRows() - 1; i >= 0; i--) {
      if (board.getState()[i][col] === 0) {
        targetRow = i;
        break;
      }
    }
    board.setCell(value, targetRow, targetCol);
  }

  function checkWinCondition(board) {
    // TODO
  }

  function checkDrawCondition(board) {
    // TODO
  }
  return {
    checkValidMove,
    executeMove,
    checkWinCondition,
    checkDrawCondition,
  };
})();

const Player = (username, color, type, id) => {
  return { username, color, type, id };
};

const player1 = Player("P1", "#0000FF", null, 1);
const player2 = Player("P2", "#FF0000", null, 2);

const game = (function (board, rules, players) {
  let activePlayerIndex = 0;

  function playerMove(row, col) {
    if (!rules.checkValidMove(board, row, col)) {
      return;
    }
    rules.executeMove(board, players[activePlayerIndex].id, row, col);
    activePlayerIndex = (activePlayerIndex + 1) % players.length;
  }

  return {
    board,
    players,
    playerMove,
  };
})(gameboard, connect4, [player1, player2]);

const displayController = (function (game) {
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
    for (var i = 0; i < boardState.length; i++) {
      for (var j = 0; j < boardState[i].length; j++) {
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
          j + i * boardState[i].length
        ].style.backgroundColor = color;
      }
    }
  }

  function gameboardCellPressed(e) {
    let rowIndex = e.target.dataset.index % game.board.getNumberRows();
    let colIndex = e.target.dataset.index % game.board.getNumberCols();
    game.playerMove(rowIndex, colIndex);
    updateGameboard();
  }

  return {
    createGameboard,
    updateGameboard,
    destroyGameboard,
  };
})(game);

displayController.createGameboard();
