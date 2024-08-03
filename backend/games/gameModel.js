// backend/games/gameModel.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  GameId: String,
  WhitePlayer: String,
  BlackPlayer: String,
  Result: String,
  Date: String,
  Opening: String,
  Moves: String,
  PGN: String,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
