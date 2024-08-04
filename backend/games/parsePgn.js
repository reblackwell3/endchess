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

    let currentPgn = [];
    let endOfHeaders = false;
    const pgns = [];

    rl.on('line', (line) => {
      if (line.startsWith('[')) {
        if (endOfHeaders) {
          pgns.push(currentPgn.join('\n').trim());
          currentPgn = [];
          endOfHeaders = false;
        }
      } else {
        endOfHeaders = true;
      }
      currentPgn.push(line);
    });

    rl.on('close', () => {

      handleLastPgn(pgns, currentPgn);

      try {
        const parsedPgns = pgns.map(pgn => augmentParsed(pgnParser.parse(pgn), pgn));
        resolve(parsedPgns.filter(pgn => pgn !== null));
      } catch (error) {
        reject(error);
      }
    });

    rl.on('error', (error) => {
      reject(error);
    });
  });
}

function handleLastPgn(pgns, currentPgn) {
  if (currentPgn.length > 0) {
    const currentPgnText = currentPgn.join('\n').trim();
    try {
      pgnParser.parse(currentPgnText);
      pgns.push(currentPgnText)
    } catch {
      console.log('Dropping last partial pgn = ' + currentPgnText);
    }
  }
}

function augmentParsed(parsed, raw) {
  if (parsed.length > 0) {
    const headers = buildHeaders(parsed[0].headers);
    return { ...parsed[0], headers, raw };
  }
  return null;
}

function buildHeaders(headersArray) {
  return headersArray.reduce((acc, header) => {
    acc[header.name] = header.value;
    return acc;
  }, {});
}

module.exports = { parsePgn };
