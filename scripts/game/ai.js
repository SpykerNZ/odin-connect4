function easyAI(gameboard, value) {
  // Add all avaliable placement options to a list
  options = [];
  for (let i = 0; i < board.getNumberCols(); i++) {
    if (gameboard.getCol(i)[0] == 0) {
      options.push(i);
    }
  }
  // return a random option
  return options[Math.floor(Math.random() * options.length)];
}

function mediumAI(board, value) {
  // TODO
}

function hardAI(board, value) {
  // TODO
}
