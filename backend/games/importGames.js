const mongoose = require('mongoose');
const { parsePgn } = require('./parsePgn');
const Game = require('./gameModel');
const connectDB = require('../config/db');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
connectDB();

// Get the filename from the command line arguments
const path = process.argv[2];

if (!path) {
  console.error('Please provide a file name as an argument');
  process.exit(1);
}

// Call importGames with the provided path
importGames(path);

async function importGames(path) {
  try {
    const parsedPgns = await parsePgn(path);
    const games = parsedPgns.map(parsedPgn => buildGame(parsedPgn)).filter(game => game !== null);
    console.log(`${games.length} games have been built`);
    await Promise.all(games.map(game => game.save()));
    console.log('PGN file successfully processed and data imported');
  } catch (err) {
    console.error(`Error importing games: ${err.message}`);
  }
}

function buildGame(parsedPgn) {
  try {
    const headers = parsedPgn.headers;

    return new Game({
      GameId: `game_${headers.White}_${headers.Black}_${headers.UTCDate}`,
      WhitePlayer: headers.White || '',
      BlackPlayer: headers.Black || '',
      Result: headers.Result || '',
      Date: headers.UTCDate || '',
      Opening: headers.Opening || '',
      Moves: parsedPgn.moves.map(move => move.move).join(' '),
      PGN: parsedPgn.raw || '',
      WhiteElo: headers.WhiteElo || '',
      BlackElo: headers.BlackElo || '',
      WhiteRatingDiff: headers.WhiteRatingDiff || '',
      BlackRatingDiff: headers.BlackRatingDiff || '',
      ECO: headers.ECO || '',
      TimeControl: headers.TimeControl || '',
      Termination: headers.Termination || ''
    });
  } catch (error) {
    console.error('Failed to build game:', error);
  }
  return null;
}

module.exports = { importGames, buildGame };
