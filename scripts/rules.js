export const Connect4 = function () {
  const moveResult = {
    invalid: "invalid",
    win: "win",
    draw: "draw",
    success: "success",
  };

  function executeMove(board, value, row, col) {
    if (!_checkValidMove(board, row, col)) {
      return moveResult.invalid;
    }

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

    if (_checkWinCondition(board, row, col)) {
      return moveResult.win;
    }
    if (_checkDrawCondition(board, row, col)) {
      return moveResult.draw;
    }
    return moveResult.success;
  }

  function _checkValidMove(board, row, col) {
    return board.getCol(col)[row] === 0;
  }

  function _checkWinCondition(board, value, row, col) {
    // check for 4 consective values of the same type in a row
    const consecutiveCount = 4;
    const directions = {
      row: board.getRow(row),
      col: board.getCol(col),
      diagBottomUp: board.getDiagBottomUp(row, col),
      diagTopDown: board.getDiagTopDown(row, col),
    };

    for (const key in directions) {
      if (_isConsecutive(directions[key], value, consecutiveCount)) {
        console.log(key);
        return true;
      }
    }
  }

  function _checkDrawCondition(board) {
    // If the entire top row is filled, it is a draw
    return !board.getRow(0).includes(0);
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
    executeMove,
  };
};
