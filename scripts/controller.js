export const Controller = function (model, view) {
  view.bindStartGame(handleStartGame);
  view.bindEndGame(handleEndGame);
  view.bindRestartGame(handleRestartGame);

  view.setPlayerSettings(model.players);

  function handleStartGame() {
    view.getPlayerSettings(model.players);
    view.createGameBoard(model.gameboard);
    view.bindGameboard(handleGameboardCellPressed);
    view.changeToGamePage();
    // get the info from the view
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
