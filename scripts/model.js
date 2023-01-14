import { Setup } from "./models/setup.js";
import { PlayerFactory } from "./models/players.js";

export const Model = function () {
  const setup = Setup(PlayerFactory().createMultiple(2));

  const match = undefined;
  return {
    setup,
    match,
  };
};
