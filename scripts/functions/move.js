import { getActivePlayer, nextPlayer } from "./turn.js";
import { highestValueIndexInArray } from "./helper.js";
import { easyAI } from "./ai.js";
import * as matrix from "./matrix.js";
import * as rules from "./rules.js";

export function executeMove(match, row, col) {
  if (match.result.draw === true || match.result.win === true) {
    return;
  }

  const player = getActivePlayer(match.turn, match.players);
  const row_ = highestValueIndexInArray(matrix.getCol(match.board, col), 0);

  if (!rules.checkValidMove(match.board, player.id, row_, col)) {
    return;
  }

  matrix.setCell(match.board, player.id, row_, col);

  if (rules.checkMoveWinCondition(match.board, player.id, row_, col)) {
    match.result.win = true;
  } else if (rules.checkDrawCondition(match.board)) {
    match.result.draw = true;
  } else {
    nextPlayer(match.turn);
  }
  checkAi(match);
}

export function checkAi(match) {
  const player = getActivePlayer(match.turn, match.players);
  if (player.type === "ai-easy") {
    const move = easyAI(match);
    executeMove(match, move.row, move.col);
  }
}
