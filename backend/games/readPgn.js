const fs = require('fs');
const readline = require('readline');
const { Chess } = require('chess.js');
const Game = require('./gameModel'); // Adjust the path as needed

async function readPgn(filePath) {
  const pgnTexts = await parsePgn(filePath);
  console.log(pgnTexts);
  const games = pgnTexts.map(pgnText => buildGame(pgnText)).filter(game => game !== null);
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

    const pgnTexts = [];
    let pgnText = '';
    let endOfHeaders = false;

    rl.on('line', (line) => {
      if (line.startsWith('[')) {
        if (endOfHeaders) {
          pgnTexts.push(pgnText.trim());
          pgnText = '';
          endOfHeaders = false;
        }
      } else {
        endOfHeaders = true;
      }
      pgnText += line + '\n';
    });

    rl.on('close', () => {
      if (pgnText) {
        pgnTexts.push(pgnText.trim());
      }
      resolve(pgnTexts);
    });

    rl.on('error', (error) => {
      reject(error);
    });
  });
}

function buildGame(pgnText) {
  const chess = new Chess();
  if (chess.loadPgn(pgnText)) {
    console.log('loaded' + pgnText);
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
  return null;
}

module.exports = { readPgn };
