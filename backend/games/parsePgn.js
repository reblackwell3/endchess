const fs = require('fs');
const readline = require('readline');
const pgnParser = require('pgn-parser');

function parsePgn(filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let pgnData = '';

    rl.on('line', (line) => {
      pgnData += line + '\n';
    });

    rl.on('close', () => {
      try {
        const parsedPgns = pgnParser.parse(pgnData).map(parsedPgn => {
          const headers = parsedPgn.headers.reduce((acc, header) => {
            acc[header.name] = header.value;
            return acc;
          }, {});
          return { ...parsedPgn, headers, raw: pgnData };
        });
        resolve(parsedPgns);
      } catch (error) {
        reject(error);
      }
    });

    rl.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = { parsePgn };
