export const Setup = function (players, colorScheme) {
  let board = {
    width: 6,
    height: 7,
  };

  return {
    board,
    players,
    colorScheme,
  };
};
