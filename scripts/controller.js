export const Controller = function (model, view) {
  view.bindStartGame(handleStartGame);
  view.bindEndGame(handleEndGame);
  view.bindRestartGame(handleRestartGame);

  view.setPlayerSettings(model.players);

  function handleStartGame() {
    view.getPlayerSettings(model.players);
    view.createGameBoard(model.gameboard);
    view.bindGameboard(handleGameboardCellPressed);
    view.updateGameState(model.gameboard, model.state);
    view.changeToGamePage();
    // get the info from the view
    // TODO - modify the players object based on the setup
  }

  function handleEndGame() {
    model.gameboard.reset();
    view.changeToSetupPage();
    view.destroyGameboard();
  }

  function handleRestartGame() {
    model.gameboard.reset();
    view.updateGameState(model.gameboard, model.state);
  }

  function handleGameboardCellPressed(row, col) {
    console.log(`row: ${row} col: ${col}`);
    model.executeMove(row, col);
    view.updateGameState(model.gameboard, model.state);
  }
};
