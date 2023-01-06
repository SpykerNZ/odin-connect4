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

  function getDiagTopDown(row, col) {
    let result = [];
    while (row > 0 && col > 0) {
      // is space to move (top/left)?
      row--;
      col--;
    }
    while (row < getNumberRows() && col < getNumberCols()) {
      // are items in the range to collect?
      result.push(_grid[row][col]);
      row++;
      col++;
    }
    return result;
  }

  function getDiagBottomUp(row, col) {
    let result = [];
    while (row > 0 && col + 1 < getNumberCols()) {
      // is space to move (top/right)?
      row--;
      col++;
    }
    while (row < getNumberRows() && col >= 0) {
      // are items in the range to collect?
      result.push(_grid[row][col]);
      row++;
      col--;
    }
    return result;
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
    getDiagTopDown,
    getDiagBottomUp,
    setCell,
    reset,
    getNumberRows,
    getNumberCols,
  };
})(6, 7);

const connect4 = (function () {
  let lastMove = {
    row: null,
    col: null,
    value: null,
  };

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
    lastMove.row = targetRow;
    lastMove.col = targetCol;
    lastMove.value = value;
    board.setCell(value, targetRow, targetCol);
  }

  function checkWinCondition(board) {
    // check for 4 consective values of the same type in a row
    const consecutiveCount = 4;
    const directions = {
      row: board.getRow(lastMove.row),
      col: board.getCol(lastMove.col),
      diagBottomUp: board.getDiagBottomUp(lastMove.row, lastMove.col),
      diagTopDown: board.getDiagTopDown(lastMove.row, lastMove.col),
    };

    for (const key in directions) {
      if (_isConsecutive(directions[key], lastMove.value, consecutiveCount)) {
        console.log(key);
        return true;
      }
    }
  }

  function checkDrawCondition(board) {
    // If the entire top row is filled, it is a draw
    return board.getRow(0).includes(0);
  }

  function _isConsecutive(arr, value, count) {
    let consecutiveCount = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        consecutiveCount += 1;
        if (consecutiveCount === count) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }
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

const playerFactory = (() => {
  let _id = 1;

  function create(username, color, type) {
    return Player(username, color, type, _id++);
  }
  return { create };
})();

const player1 = playerFactory.create("Player 1", "#0000FF", "human");
const player2 = playerFactory.create("Player 2", "#FF0000", "human");

const setupController = (function (players) {
  const gameElem = document.querySelector(".game");
  const setupElem = document.querySelector(".setup");
  const playersElem = setupElem.querySelectorAll(".player");
  const startButtonElem = setupElem.querySelector("button.start");
  const playerElems = _loadPlayers();

  startButtonElem.addEventListener("click", startGame);

  function _loadPlayers() {
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

  function startGame() {
    for (let i = 0; i < playerElems.length; i++) {
      players[i].type = playerElems[i].typeElem.value;
      players[i].username = playerElems[i].usernameElem.value;
      players[i].color = playerElems[i].colorElem.value;
      setupElem.style.display = "none";
      gameElem.style.display = "flex";
    }
  }
  return {
    startGame,
  };
})([player1, player2]);

const game = (function (board, rules, players) {
  let activePlayerIndex = Math.floor(Math.random() * players.length);

  function getActivePlayerIndex() {
    return activePlayerIndex;
  }

  function executeMove(row, col) {
    // Check Move is Valid
    if (!rules.checkValidMove(board, row, col)) {
      return;
    }
    // Execute the move
    rules.executeMove(board, players[activePlayerIndex].id, row, col);

    // Check for win condition
    rules.checkWinCondition(board);

    // Check for lost condition
    rules.checkDrawCondition(board);

    // Update the current player index
    activePlayerIndex = (activePlayerIndex + 1) % players.length;

    // If the next player is an AI, select a move after a delay
  }

  return {
    board,
    players,
    executeMove,
    getActivePlayerIndex,
  };
})(gameboard, connect4, [player1, player2]);

const gameController = (function (game) {
  const gameboardElem = document.querySelector(".gameboard");
  const statusTextElem = document.querySelector(".status-text");

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

  function updateStatusText() {
    statusTextElem.textContent = `${
      game.players[game.getActivePlayerIndex()].username
    }'s turn!`;
  }

  function gameboardCellPressed(e) {
    let colIndex = e.target.dataset.index % game.board.getNumberCols();
    let rowIndex =
      (e.target.dataset.index - colIndex) / game.board.getNumberCols();
    console.log(`${rowIndex} ${colIndex}`);
    game.executeMove(rowIndex, colIndex);
    updateGameboard();
    updateStatusText();
  }

  return {
    createGameboard,
    updateGameboard,
    destroyGameboard,
    updateStatusText,
  };
})(game);

gameController.createGameboard();
gameController.updateStatusText();
