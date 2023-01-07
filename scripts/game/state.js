import * as matrix from "./matrix.js";
import * as turnOrder from "./turn.js";
import * as matchResult from "./result.js";
import { PlayerFactory } from "./players.js";

export const State = function () {
  let result;
  let board;
  let players;
  let turn;

  return {
    result,
    turn,
    board,
    players,
  };
};

export const generate = function () {
  const state = State();
  const playerFactory = PlayerFactory();
  state.board = matrix.generate(6, 7);
  state.players = playerFactory.createMultiple(2);
  state.turn = turnOrder.generate(state.players.length);
  state.result = matchResult.generate();
  return state;
};

export const reset = function (state) {
  matrix.setAll(state.board, 0);
  turnOrder.randomize(state.turn);
  matchResult.reset(state.result);
};
