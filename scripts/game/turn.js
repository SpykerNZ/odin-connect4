export const turn = (function () {
  function getActivePlayer(state) {
    return state.players[state.activePlayerIndex];
  }

  function randomize(numberOfPlayers) {
    return Math.floor(Math.random() * numberOfPlayers);
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
