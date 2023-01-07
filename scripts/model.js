import { matrix, highestIndexOf } from "./game/matrix.js";
import { connect4 as rules } from "./game/rules.js";
import { PlayerFactory } from "./game/players.js";
import { turn } from "./game/turn.js";
import { State } from "./game/state.js";

export const Model = function () {
  const _playerFactory = PlayerFactory();

  const state = State();

  state.players = _playerFactory.createMultiple(2);

  function executeMove(row, col) {
    const player = turn.getActivePlayer(state);
    const row_ = highestIndexOf(matrix.getCol(state.board, col), 0);

    if (rules.checkValidMove(state.board, player.id, row_, col)) {
      matrix.setCell(state.board, player.id, row_, col);
    } else {
      console.log("invalid!");
      return;
    }

    if (rules.checkMoveWinCondition(state.board, player.id, row_, col)) {
      console.log("winner!");
    } else if (rules.checkDrawCondition(state.board)) {
      console.log("draw!");
    } else {
      console.log("next player turn");
      turn.nextPlayer(state);
    }
  }

  function resetGame() {
    state.reset();
    turn.randomize(state);
  }

  return {
    resetGame,
    executeMove,
    state,
  };
};
