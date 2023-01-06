export const Controller = function (model, view) {
  view.bindStartGame(handleStartGame);
  view.bindEndGame(handleEndGame);
  view.bindRestartGame(handleRestartGame);

  function handleStartGame() {
    view.changeToGamePage();
    view.createGameBoard(model.gameboard);
    view.bindGameboard(handleGameboardCellPressed);
    // TODO - modify the players object based on the setup
  }

  function handleEndGame() {
    view.changeToSetupPage();
    view.destroyGameboard();
  }

  function handleRestartGame() {
    model.gameboard.reset();
    view.updateGameboard(model.gameboard);
  }

  function handleGameboardCellPressed(row, col) {
    console.log(`row: ${row} col: ${col}`);
    model.executeMove(row, col);
    view.updateGameboard(model.gameboard);
  }
};
