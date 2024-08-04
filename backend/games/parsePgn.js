const fs = require('fs');
const readline = require('readline');

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

module.exports = { parsePgn };
