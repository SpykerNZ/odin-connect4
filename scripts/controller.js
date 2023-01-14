import { MatchFactory } from "./models/match.js";
import { executeMove } from "./functions/move.js";
import { resetMatch, startMatch } from "./functions/match.js";
import * as display from "./functions/display.js";
import * as matrix from "./functions/matrix.js";

export const Controller = function (model, view) {
  view.bindStartGame(handleStartMatch);
  view.bindEndGame(handleEndMatch);
  view.bindRestartGame(handleRestartMatch);

  // Load the model settings into the view
  view.setPlayerSettings(model.setup.players);
  view.setColorScheme(model.setup.colorScheme);

  function handleStartMatch() {
    model.setup.players = view.getPlayerSettings();
    model.match = MatchFactory(
      matrix.generate(model.setup.board.width, model.setup.board.height),
      model.setup.players
    );
    startMatch(model.match);
    view.createGameBoard(model.match.board);
    view.bindGameboard(handleGameboardCellPressed);
    updateMatchState(model.match);
    view.changeToGamePage();
  }

  function handleEndMatch() {
    view.changeToSetupPage();
    model.match = null;
    view.destroyGameboard();
  }

  function handleRestartMatch() {
    resetMatch(model.match);
    startMatch(model.match);
    updateMatchState(model.match);
  }

  function handleGameboardCellPressed(row, col) {
    executeMove(model.match, row, col);
    updateMatchState(model.match);
  }

  function updateMatchState(match) {
    view.setStatusText(display.getMatchStatusString(match));
    view.setStatusColor(display.getMatchStatusColor(match));
    view.updateGameboard(match.board);
  }
};
