import * as matrix from "./matrix.js";
import * as turnOrder from "./turn.js";
import { PlayerFactory } from "./players.js";

export const State = function () {
  let gameComplete;
  let gameDraw;
  let winnerPlayerIndex;

  let board;
  let players;
  let turn;

  return {
    gameComplete,
    gameDraw,
    winnerPlayerIndex,
    turn,
    board,
    players,
  };
};

export const init = function () {
  const playerFactory = PlayerFactory();
  const state = State();
  state.board = matrix.generate(6, 7);
  state.players = playerFactory.createMultiple(2);
  state.turn = turnOrder.generate(state.players.length);
  turnOrder.randomize(state.turn);
  state.gameComplete = false;
  state.gameDraw = false;
  state.winnerPlayerIndex = null;
  return state;
};
