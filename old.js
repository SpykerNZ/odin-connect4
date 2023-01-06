"use strict";

const player1 = playerFactory.create("Player 1", "#0000FF", "human");
const player2 = playerFactory.create("Player 2", "#FF0000", "human");

const gameController = (function (game) {
  const gameElem = document.querySelector(".game");
  const setupElem = document.querySelector(".setup");

  const statusTextElem = document.querySelector(".status-text");
  const gameoverElem = document.querySelector(".gameover");
  const restartButtonElem = document.querySelector("button.restart");
  const backButtonElem = document.querySelector("button.back");

  restartButtonElem.addEventListener("click", resetGame);
  backButtonElem.addEventListener("click", quitGame);

  function startGame() {
    createGameboard();
    updateStatusText();
    gameoverElem.style.display = "none";
    updateGameboard();
  }

  function endGame() {
    gameoverElem.style.display = "flex";
  }

  function resetGame() {
    game.board.reset();
    updateGameboard();
    gameoverElem.style.display = "none";
  }

  function quitGame() {
    setupElem.style.display = "flex";
    gameElem.style.display = "none";
  }

  function updateStatusText() {
    statusTextElem.textContent = `${
      game.players[game.getActivePlayerIndex()].username
    }'s turn!`;
  }

  return {
    updateStatusText,
    startGame,
    endGame,
    quitGame,
  };
})(game);

const setupController = (function (gameController, players) {
  function startGame() {
    for (let i = 0; i < playerElems.length; i++) {
      players[i].type = playerElems[i].typeElem.value;
      players[i].username = playerElems[i].usernameElem.value;
      players[i].color = playerElems[i].colorElem.value;
    }
    gameController.startGame();
  }
  return {
    startGame,
  };
})(gameController, [player1, player2]);
