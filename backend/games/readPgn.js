// readPgn.js
const fs = require('fs');
const readline = require('readline');
const { Chess } = require('chess.js');

function parsePgnFile(filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let gameData = '';
    let games = [];
    let inGame = false;

    rl.on('line', (line) => {
      if (line.startsWith('[')) {
        if (inGame && gameData) {
          games.push(gameData.trim());
          gameData = '';
        }
        inGame = true;
      }

      if (inGame) {
        gameData += line + '\n';
      }
    });

    rl.on('close', () => {
      if (gameData) {
        games.push(gameData.trim());
      }
      resolve(games);
    });

    rl.on('error', (error) => {
      reject(error);
    });
  });
}

async function readPgn(filePath) {
  const games = await parsePgnFile(filePath);
  const chess = new Chess();
  const parsedGames = [];

  games.forEach((game) => {
    if (chess.loadPgn(game)) {
      parsedGames.push({
        headers: chess.header(),
        moves: chess.history(),
        pgn: game
      });
    }
  });

  return parsedGames;
}

module.exports = { readPgn };
