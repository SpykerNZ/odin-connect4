import * as matrix from "./matrix.js";
import { checkAi } from "./move.js";
import { randomize } from "./turn.js";

export function resetMatch(match) {
  matrix.setAll(match.board, 0);
  match.result.draw = false;
  match.result.win = false;
  startMatch(match);
}

export function startMatch(match) {
  randomize(match.turn);
  checkAi(match);
}
