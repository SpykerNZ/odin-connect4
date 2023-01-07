import { matrix, highestIndexOf } from "./game/matrix.js";
import { connect4 as rules } from "./game/rules.js";
import { PlayerFactory } from "./game/players.js";
import { turn } from "./game/turn.js";
import { easyAI } from "./game/ai.js";
import { State } from "./game/state.js";

export const Model = function () {
  const _playerFactory = PlayerFactory();

  const state = State();

  state.players = _playerFactory.createMultiple(2);

  function executeMove(row, col) {
    if (state.gameComplete) {
      return;
    }

    const player = turn.getActivePlayer(state);
    const row_ = highestIndexOf(matrix.getCol(state.board, col), 0);

    if (!rules.checkValidMove(state.board, player.id, row_, col)) {
      return;
    }

    matrix.setCell(state.board, player.id, row_, col);

    if (rules.checkMoveWinCondition(state.board, player.id, row_, col)) {
      state.winnerPlayerIndex = state.activePlayerIndex;
      state.gameComplete = true;
    } else if (rules.checkDrawCondition(state.board)) {
      state.gameComplete = true;
      state.gameDraw = true;
    } else {
      turn.nextPlayer(state);
    }
    _checkAi();
  }

  function resetGame() {
    matrix.setAll(state.board, 0);
    state.gameComplete = false;
    state.winnerPlayerIndex = null;
    state.gameDraw = false;
    turn.randomize(state);
    _checkAi();
  }

  function _checkAi() {
    const player = turn.getActivePlayer(state);
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
