const mongoose = require('mongoose');
const { parsePgn } = require('./parsePgn');
const Game = require('./gameModel');
const { Chess } = require('chess.js');
const connectDB = require('../config/db');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
connectDB();

// Get the filename from the command line arguments
const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a file name as an argument');
  process.exit(1);
}

// Call importGames with the provided filename
importGames(fileName);
  
async function importGames(fileName) {
  try {
    await Game.deleteMany({}); // todo will have to remove this and figure out how to dedup
    console.log('Cleared existing game data');
    const pgns = await parsePgn(`./data/${fileName}.pgn`); // Use template literal here
    const games = pgns.map(pgn => buildGame(pgn)).filter(game => game !== null);
    console.log(games.length + ' games have been built');
    await Promise.all(games.map(game => game.save())); // Ensure that all games are saved
    console.log('PGN file successfully processed and data imported');
  } catch (err) {
    console.error(`Error importing games: ${err.message}`);
  } finally {
    mongoose.connection.close(); // Close the connection after import
  }
}

function buildGame(pgn) {
  try {
    const chess = new Chess();
    const pgnText = pgn.join('\n');
    chess.loadPgn(pgnText);
    const headers = chess.header();
    return new Game({
      GameId: `game_${headers.White}_${headers.Black}_${headers.UTCDate}`,
      WhitePlayer: headers.White || '',
      BlackPlayer: headers.Black || '',
      Result: headers.Result || '',
      Date: headers.UTCDate || '',
      Opening: headers.Opening || '',
      Moves: chess.moves(),
      PGN: pgnText,
      WhiteElo: headers.WhiteElo || '',
      BlackElo: headers.BlackElo || '',
      WhiteRatingDiff: headers.WhiteRatingDiff || '',
      BlackRatingDiff: headers.BlackRatingDiff || '',
      ECO: headers.ECO || '',
      TimeControl: headers.TimeControl || '',
      Termination: headers.Termination || ''
    });
  } catch (error) {
    console.error('Failed to load PGN:', error);
  }
  return null;
}
