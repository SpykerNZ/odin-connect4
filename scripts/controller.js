export const Controller = function (model, view) {
  view.bindStartGame(handleStartGame);
  view.bindEndGame(handleEndGame);
  view.bindRestartGame(handleRestartGame);

  view.setPlayerSettings(model.state.players);

  function handleStartGame() {
    model.state.players = view.getPlayerSettings();
    view.createGameBoard(model.state.board);
    view.bindGameboard(handleGameboardCellPressed);
    view.updateGameState(model.state);
    model.resetGame();
    view.changeToGamePage();
  }

  function handleEndGame() {
    model.resetGame();
    view.changeToSetupPage();
    view.destroyGameboard();
  }

  function handleRestartGame() {
    model.resetGame();
    view.updateGameState(model.state);
  }

  function handleGameboardCellPressed(row, col) {
    console.log(`row: ${row} col: ${col}`);
    model.executeMove(row, col);
    view.updateGameState(model.state);
  }
};
