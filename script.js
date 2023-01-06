import { Model } from "./scripts/model.js";
import { View } from "./scripts/view.js";
import { Controller } from "./scripts/controller.js";

const model = Model();
const view = View();
const controller = Controller(model, view);
