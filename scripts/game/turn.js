export const turn = (function () {
  function getActivePlayer(state) {
    return state.players[state.activePlayerIndex];
  }

  function randomize(state) {
    state.activePlayerIndex = Math.floor(Math.random() * state.players.length);
  }

  function nextPlayer(state) {
    state.activePlayerIndex =
      (state.activePlayerIndex + 1) % state.players.length;
  }

  return {
    getActivePlayer,
    randomize,
    nextPlayer,
  };
})();
