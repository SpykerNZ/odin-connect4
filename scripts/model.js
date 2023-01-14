import { Setup } from "./models/setup.js";
import { PlayerFactory } from "./models/players.js";
import { ColorScheme } from "./models/color-scheme.js";

export const Model = function () {
  const setup = Setup(PlayerFactory().createMultiple(2), ColorScheme());

  const match = undefined;
  return {
    setup,
    match,
  };
};
