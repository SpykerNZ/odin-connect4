export const matrix = (function () {
  function generate(rows, cols) {
    return Array(rows)
      .fill()
      .map(() => Array(cols).fill(0));
  }

  function setAll(matrix, value) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  function getRow(matrix, row) {
    return matrix[row];
  }

  function getCol(matrix, col) {
    return matrix.map(function (value, index) {
      return value[col];
    });
  }

  function getDiagTopDown(matrix, row, col) {
    let result = [];
    while (row > 0 && col > 0) {
      // is space to move (top/left)?
      row--;
      col--;
    }
    while (row < getNumberRows(matrix) && col < getNumberCols(matrix)) {
      // are items in the range to collect?
      result.push(matrix[row][col]);
      row++;
      col++;
    }
    return result;
  }

  function getDiagBottomUp(matrix, row, col) {
    let result = [];
    while (row > 0 && col + 1 < getNumberCols(matrix)) {
      // is space to move (top/right)?
      row--;
      col++;
    }
    while (row < getNumberRows(matrix) && col >= 0) {
      // are items in the range to collect?
      result.push(matrix[row][col]);
      row++;
      col--;
    }
    return result;
  }

  function setCell(matrix, value, row, col) {
    matrix[row][col] = value;
  }

  function getCell(matrix, row, col) {
    return matrix[row][col];
  }

  function getNumberRows(matrix) {
    return matrix.length;
  }

  function getNumberCols(matrix) {
    return matrix[0].length;
  }

  return {
    generate,
    setAll,
    setCell,
    getCell,
    getRow,
    getCol,
    getDiagTopDown,
    getDiagBottomUp,
    getNumberRows,
    getNumberCols,
  };
})();

export function highestIndexOf(array, value) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === value) {
      return i;
    }
  }
  return null;
}
