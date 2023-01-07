const Result = () => {
  let draw = false;
  let win = false;
  let winningPlayerIndex = null;
  return { draw, win, winningPlayerIndex };
};

export function generate() {
  return Result();
}

export function reset(result) {
  result.draw = false;
  result.win = false;
  result.winningPlayerIndex = null;
}
