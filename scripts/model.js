import { Setup } from "./models/setup.js";
import { PlayersFactory } from "./models/players.js";

export const Model = function () {
  const setup = Setup(PlayersFactory().create(2));

  const match = undefined;
  return {
    setup,
    match,
  };
};
