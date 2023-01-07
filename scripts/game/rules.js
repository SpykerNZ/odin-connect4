import { matrix } from "./matrix.js";

export const connect4 = (function () {
  function checkValidMove(board, value, row, col) {
    return matrix.getCol(board, col)[row] === 0;
  }

  function checkMoveWinCondition(board, value, row, col) {
    // check for 4 consective values of the same type in a row
    const consecutiveCount = 4;
    const directions = {
      row: matrix.getRow(board, row),
      col: matrix.getCol(board, col),
      diagBottomUp: matrix.getDiagBottomUp(board, row, col),
      diagTopDown: matrix.getDiagTopDown(board, row, col),
    };

    for (const key in directions) {
      if (_isConsecutive(directions[key], value, consecutiveCount)) {
        return true;
      }
    }
  }

  function checkDrawCondition(board) {
    // If the entire top row is filled, it is a draw
    return !matrix.getRow(board, 0).includes(0);
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
})();
