import { expect } from 'chai';
import path from 'path';
import { fileURLToPath } from 'url';
import { readPgn } from '../../games/readPgn.js';  // Adjust the path as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('readPgn', () => {
  it('should parse a PGN file with multiple games correctly', async () => {
    const pgnPath = path.resolve(__dirname, '../data/two-games.pgn');
    const games = await readPgn(pgnPath);

    expect(games).to.have.lengthOf(2);

    const game1 = games[0];
    expect(game1.headers.White).to.equal('borgs');
    expect(game1.headers.Black).to.equal('IntiTupac');
    expect(game1.headers.Result).to.equal('0-1');
    expect(game1.moves).to.have.lengthOf(92);

    const game2 = games[1];
    expect(game2.headers.White).to.equal('BrettDale');
    expect(game2.headers.Black).to.equal('Viriskensoshir');
    expect(game2.headers.Result).to.equal('0-1');
    expect(game2.moves).to.have.lengthOf(54);
  });
});
