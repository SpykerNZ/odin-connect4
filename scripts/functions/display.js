import { getActivePlayer } from "./turn.js";

export function getMatchStatusString(match) {
  const player = getActivePlayer(match.turn, match.players);
  let statusText = null;
  if (match.result.win) {
    statusText = `${player.username}'s Wins!`;
  } else if (match.result.draw) {
    statusText = "Game Draw!";
  } else {
    statusText = `${player.username}'s Turn!`;
  }
  return statusText;
}

export function getMatchStatusColor(match) {
  const player = getActivePlayer(match.turn, match.players);
  return player.color;
}
