const mongoose = require('mongoose');
const { parsePgn } = require('./parsePgn');
const Game = require('./gameModel');
const connectDB = require('../config/db');

// Load environment variables from .env file
require('dotenv').config();

connectDB();
importGames();

async function importGames() {
  try {
    await Game.deleteMany({});
    console.log('Cleared existing game data');
    const pgns = await parsePgn('./data/lichess_db_standard_rated_2016-03.pgn'); // Await the parsePgn promise
    const games = pgns.map(pgn => buildGame(pgn)).filter(game => game !== null);
    console.log('All games have been built');
    await Promise.all(games.map(game => game.save())); // Ensure that all games are saved
    console.log('PGN file successfully processed and data imported');
  } catch (err) {
    console.error(`Error importing games: ${err.message}`);
  } finally {
    mongoose.connection.close(); // Close the connection after import
  }
}

function buildGame(pgn) {
  const chess = new Chess();
  const pgnText = pgn.join('\n');
  try {
    if (chess.loadPgn(pgnText)) {
      const headers = chess.header();
      return new Game({
        GameId: `game_${headers.White}_${headers.Black}_${headers.UTCDate}`,
        WhitePlayer: headers.White || '',
        BlackPlayer: headers.Black || '',
        Result: headers.Result || '',
        Date: headers.UTCDate || '',
        Opening: headers.Opening || '',
        Moves: chess.history().join(' '),
        PGN: pgnText,
        WhiteElo: headers.WhiteElo || '',
        BlackElo: headers.BlackElo || '',
        WhiteRatingDiff: headers.WhiteRatingDiff || '',
        BlackRatingDiff: headers.BlackRatingDiff || '',
        ECO: headers.ECO || '',
        TimeControl: headers.TimeControl || '',
        Termination: headers.Termination || ''
      });
    }
  } catch (error) {
    console.error('Failed to load PGN:', error);
  }
  return null;
}
