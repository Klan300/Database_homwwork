const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    word : String,
  },
  {
    versionKey: false,
  }
);

const gameModel = mongoose.model("Game", GameSchema);

module.exports = gameModel;