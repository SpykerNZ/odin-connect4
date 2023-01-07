export function getActivePlayer(state) {
  return state.players[state.activePlayerIndex];
}

export function randomize(state) {
  state.activePlayerIndex = Math.floor(Math.random() * state.players.length);
}

export function nextPlayer(state) {
  state.activePlayerIndex =
    (state.activePlayerIndex + 1) % state.players.length;
}
