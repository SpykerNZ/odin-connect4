import * as matrix from "./game/matrix.js";
import * as rules from "./game/rules.js";
import * as turnOrder from "./game/turn.js";
import * as gameState from "./game/state.js";
import { highestValueIndexInArray } from "./game/helper.js";
import { easyAI } from "./game/ai.js";

export const Model = function () {
  const state = gameState.init();

  function executeMove(row, col) {
    if (state.gameComplete) {
      return;
    }

    const player = turnOrder.getActivePlayer(state.turn, state.players);
    const row_ = highestValueIndexInArray(matrix.getCol(state.board, col), 0);

    if (!rules.checkValidMove(state.board, player.id, row_, col)) {
      return;
    }

    matrix.setCell(state.board, player.id, row_, col);

    if (rules.checkMoveWinCondition(state.board, player.id, row_, col)) {
      state.winnerPlayerIndex = turnOrder.getActivePlayer(
        state.turn,
        state.players
      );
      state.gameComplete = true;
    } else if (rules.checkDrawCondition(state.board)) {
      state.gameComplete = true;
      state.gameDraw = true;
    } else {
      turnOrder.nextPlayer(state.turn);
    }
    _checkAi();
  }

  function resetGame() {
    matrix.setAll(state.board, 0);
    state.gameComplete = false;
    state.winnerPlayerIndex = null;
    state.gameDraw = false;
    _checkAi();
  }

  function _checkAi() {
    const player = turnOrder.getActivePlayer(state.turn, state.players);
    if (player.type === "ai-easy") {
      const move = easyAI(state);
      executeMove(move.row, move.col);
    }
  }

  return {
    resetGame,
    executeMove,
    state,
  };
};
