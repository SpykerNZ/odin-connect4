export const Board = function (rows, columns) {
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
};

export function highestIndexOf(array, value) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === value) {
      return i;
    }
  }
  return null;
}
