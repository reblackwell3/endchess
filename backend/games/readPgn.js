const fs = require('fs');
const readline = require('readline');
const { Chess } = require('chess.js');
const Game = require('./gameModel'); // Adjust the path as needed

async function readPgn(filePath) {
  const pgns = await parsePgn(filePath);
  console.log(pgns);
  const games = pgns.map(pgn => buildGame(pgn)).filter(game => game !== null);
  console.log(games);
  return games;
}

function parsePgn(filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    const pgns = [];
    let pgn = [];
    let endOfHeaders = false;

    rl.on('line', (line) => {
      if (line.startsWith('[')) {
        if (endOfHeaders) {
          pgns.push(pgn);
          pgn = [];
          endOfHeaders = false;
        }
      } else {
        endOfHeaders = true;
      }
      pgn.push(line);
    });

    rl.on('close', () => {
      if (pgn.length > 0) {
        pgns.push(pgn);
      }
      resolve(pgns);
    });

    rl.on('error', (error) => {
      reject(error);
    });
  });
}

function buildGame(pgn) {
  const chess = new Chess();
  const pgnText = pgn.join('\n');
  try {
    if (chess.loadPgn(pgnText)) {
      console.log('loaded ' + pgnText);
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

module.exports = { readPgn };
