import { shuffleArray } from "./helper.js";

export function getActivePlayer(turn, players) {
  return players[turn.order[turn.number]];
}

export function randomize(turn) {
  turn.order = shuffleArray(turn.order);
}

export function nextPlayer(turn) {
  turn.number = (turn.number + 1) % turn.order.length;
}
