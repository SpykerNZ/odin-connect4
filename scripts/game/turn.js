import { shuffleArray } from "./helper.js";

const TurnOrder = (order) => {
  const number = 0;
  return { order, number };
};

export function generate(playerCount) {
  return TurnOrder([...Array(playerCount).keys()]);
}

export function randomize(turn) {
  turn.order = shuffleArray(turn.order);
  console.table(turn.order);
}

export function getActivePlayerIndex(turn) {
  return turn.order[turn.number];
}

export function nextPlayer(turn) {
  turn.number = (turn.number + 1) % turn.order.length;
}
