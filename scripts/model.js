import * as matrix from "./game/matrix.js";
import * as rules from "./game/rules.js";
import * as turnOrder from "./game/turn.js";
import * as gameState from "./game/state.js";
import { highestValueIndexInArray } from "./game/helper.js";
import { easyAI } from "./game/ai.js";

export const Model = function () {
  const state = gameState.generate();
  gameState.reset(state);

  function executeMove(row, col) {
    if (state.result.draw === true || state.result.win === true) {
      return;
    }

    const playerIndex = turnOrder.getActivePlayerIndex(
      state.turn,
      state.players
    );
    const player = state.players[playerIndex];
    const row_ = highestValueIndexInArray(matrix.getCol(state.board, col), 0);

    if (!rules.checkValidMove(state.board, player.id, row_, col)) {
      return;
    }

    matrix.setCell(state.board, player.id, row_, col);

    if (rules.checkMoveWinCondition(state.board, player.id, row_, col)) {
      state.result.winningPlayerIndex = playerIndex;
      state.result.win = true;
    } else if (rules.checkDrawCondition(state.board)) {
      state.result.draw = true;
    } else {
      turnOrder.nextPlayer(state.turn);
    }
    _checkAi();
  }

  function resetGame() {
    gameState.reset(state);
    _checkAi();
  }

  function _checkAi() {
    const playerIndex = turnOrder.getActivePlayerIndex(
      state.turn,
      state.players
    );
    const player = state.players[playerIndex];
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
