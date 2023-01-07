import * as matrix from "./matrix.js";

export const State = function () {
  let gameComplete = false;
  let gameDraw = false;
  let winnerPlayerIndex = null;
  let activePlayerIndex = 0;
  let board = matrix.generate(6, 7);
  let players = [];

  return {
    gameComplete,
    winnerPlayerIndex,
    activePlayerIndex,
    board,
    players,
  };
};
