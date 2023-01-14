export function MatchFactory(board, players) {
  return Match(board, players);
}

export const Match = function (board, players) {
  let turn = Turn([...Array(players.length).keys()]);
  let result = Result();
  return {
    board,
    players,
    result,
    turn,
  };
};

export const Turn = (order) => {
  const number = 0;
  return { order, number };
};

export const Result = () => {
  let draw = false;
  let win = false;
  return { draw, win };
};
