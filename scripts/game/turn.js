export const Turn = function () {
  function randomize(numberOfPlayers) {
    return Math.floor(Math.random() * numberOfPlayers);
  }

  function nextPlayer(activePlayerIndex, numberOfPlayers) {
    return (activePlayerIndex + 1) % numberOfPlayers;
  }

  return {
    randomize,
    nextPlayer,
  };
};
