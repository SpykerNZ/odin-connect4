import { matrix } from "./matrix.js";

export const State = function () {
  let activePlayerIndex = 0;
  let board = matrix.generate(6, 7);
  let players = [];

  function reset() {
    matrix.setAll(board, 0);
  }

  return {
    activePlayerIndex,
    board,
    players,
    reset,
  };
};
