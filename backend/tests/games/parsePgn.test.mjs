import { expect } from 'chai';
import path from 'path';
import { fileURLToPath } from 'url';
import { parsePgn } from '../../games/parsePgn.js';  // Adjust the path as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('parsePgn', () => {
  it('should parse a PGN file with multiple games correctly', async () => {
    const pgnPath = path.resolve(__dirname, '../data/two-games.pgn');
    const pgns = await parsePgn(pgnPath);

    expect(pgns).to.have.lengthOf(2);

    const pgn0 = pgns[0].join('\n');
    expect(pgn0).to.contain('borgs');
    expect(pgn0).to.contain('IntiTupac');
    expect(pgn0).to.contain('0-1');
    expect(pgn0).to.contain('1. c4 e6 2. Nf3 a6');
    expect(pgn0).to.contain('1726');
    expect(pgn0).to.contain('1702');
    expect(pgn0).to.contain('-12');
    expect(pgn0).to.contain('+14');
    expect(pgn0).to.contain('A13');
    expect(pgn0).to.contain('600+0');
    expect(pgn0).to.contain('Time forfeit');

    const pgn1 = pgns[1].join('\n');
    expect(pgn1).to.contain('BrettDale');
    expect(pgn1).to.contain('Viriskensoshir');
    expect(pgn1).to.contain('0-1');
    expect(pgn1).to.contain('1. e4 c5 2. Nf3 d6');
    expect(pgn1).to.contain('1905');
    expect(pgn1).to.contain('1949');
    expect(pgn1).to.contain('-10');
    expect(pgn1).to.contain('+10');
    expect(pgn1).to.contain('B72');
    expect(pgn1).to.contain('180+0');
    expect(pgn1).to.contain('Normal');
  });
});
