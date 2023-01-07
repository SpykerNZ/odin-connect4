import * as matrix from "./matrix.js";
import * as turn from "./turn.js";
import * as rules from "./rules.js";
import { highestValueIndexInArray } from "./helper.js";

function getAvaliableMoves(board) {
  const options = [];
  // Iterate over all columns
  for (let i = 0; i < matrix.getNumberCols(board); i++) {
    // get a column array
    let columnArray = matrix.getCol(board, i);
    // If the top row is empty, there is an avaliable move
    if (columnArray[0] == 0) {
      // Store the move option, the highest index of that column
      options.push({ row: highestValueIndexInArray(columnArray, 0), col: i });
    }
  }
  return options;
}

export function easyAI(state) {
  const options = getAvaliableMoves(state.board);
  // do a random move
  return options[Math.floor(Math.random() * options.length)];
}

export function mediumAI(board, value) {
  // TODO
}

export function hardAI(board, value) {
  // TODO
}
