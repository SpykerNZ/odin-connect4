import { Board, highestIndexOf } from "./game/board.js";
import { Connect4 } from "./game/rules.js";
import { PlayerFactory } from "./game/players.js";
import { Turn } from "./game/turn.js";
import { State } from "./game/state.js";

export const Model = function () {
  const _playerFactory = PlayerFactory();
  const players = _playerFactory.createMultiple(2);
  const rules = Connect4();
  const gameboard = Board(6, 7);
  const state = State();
  const turn = Turn();

  function executeMove(row, col) {
    const player = players[state.activePlayerIndex];

    const row_ = highestIndexOf(gameboard.getCol(col), 0);

    if (rules.checkValidMove(gameboard, player.id, row_, col)) {
      gameboard.setCell(player.id, row_, col);
    } else {
      console.log("invalid!");
      return;
    }

    if (rules.checkMoveWinCondition(gameboard, player.id, row_, col)) {
      console.log("winner!");
    } else if (rules.checkDrawCondition(gameboard)) {
      console.log("draw!");
    } else {
      console.log("next player turn");
      state.activePlayerIndex = turn.nextPlayer(
        state.activePlayerIndex,
        players.length
      );
    }
  }
  return {
    executeMove,
    gameboard,
    players,
  };
};
