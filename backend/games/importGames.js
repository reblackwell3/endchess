// backend/games/importGames.js
const mongoose = require('mongoose');
const { readPgn } = require('./readPgn');
const Game = require('./gameModel');
const connectDB = require('../config/db');

// Load environment variables from .env file
require('dotenv').config();

connectDB();
importGames();

async function importGames() {
  try {
    // Clear existing data
    await Game.deleteMany({});
    console.log('Cleared existing game data');

    const games = await readPgn('./data/lichess_db_standard_rated_2016-03.pgn');

    for (let i = 0; i < games.length; i++) {
      const { headers, moves, pgn } = games[i];
      const game = new Game({
        GameId: i + 1,
        WhitePlayer: headers.White,
        BlackPlayer: headers.Black,
        Result: headers.Result,
        Date: headers.UTCDate,
        Opening: headers.Opening,
        Moves: moves.join(' '),
        PGN: pgn
      });

      console.log('import = ' i);
      // Save game to database
      await game.save();
    }

    console.log('PGN file successfully processed and data imported');
  } catch (err) {
    console.error(`Error importing games: ${err.message}`);
  }
}
