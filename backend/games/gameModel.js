const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  GameId: { type: String, required: true },
  WhitePlayer: { type: String, required: true },
  BlackPlayer: { type: String, required: true },
  Result: { type: String, required: true },
  Date: { type: String, required: true },
  Opening: { type: String, required: false },
  Moves: { type: Array, required: true },
  PGN: { type: String, required: true },
  WhiteElo: { type: String, required: false },
  BlackElo: { type: String, required: false },
  WhiteRatingDiff: { type: String, required: false },
  BlackRatingDiff: { type: String, required: false },
  ECO: { type: String, required: false },
  TimeControl: { type: String, required: false },
  Termination: { type: String, required: false }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
