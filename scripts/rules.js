export const Connect4 = function () {
  function checkValidMove(board, value, row, col) {
    return board.getCol(col)[row] === 0;
  }

  function checkMoveWinCondition(board, value, row, col) {
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

  function checkDrawCondition(board) {
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
    checkValidMove,
    checkMoveWinCondition,
    checkDrawCondition,
  };
};
