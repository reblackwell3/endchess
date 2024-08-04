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
    expect(game1.WhitePlayer).to.equal('borgs');
    expect(game1.BlackPlayer).to.equal('IntiTupac');
    expect(game1.Result).to.equal('0-1');
    expect(game1.Moves).to.contain('c4 e6 Nf3 a6');
    expect(game1.WhiteElo).to.equal('1726');
    expect(game1.BlackElo).to.equal('1702');
    expect(game1.WhiteRatingDiff).to.equal('-12');
    expect(game1.BlackRatingDiff).to.equal('+14');
    expect(game1.ECO).to.equal('A13');
    expect(game1.TimeControl).to.equal('600+0');
    expect(game1.Termination).to.equal('Time forfeit');

    const game2 = games[1];
    expect(game2.WhitePlayer).to.equal('BrettDale');
    expect(game2.BlackPlayer).to.equal('Viriskensoshir');
    expect(game2.Result).to.equal('0-1');
    expect(game2.Moves).to.contain('e4 c5 Nf3 d6');
    expect(game2.WhiteElo).to.equal('1905');
    expect(game2.BlackElo).to.equal('1949');
    expect(game2.WhiteRatingDiff).to.equal('-10');
    expect(game2.BlackRatingDiff).to.equal('+10');
    expect(game2.ECO).to.equal('B72');
    expect(game2.TimeControl).to.equal('180+0');
    expect(game2.Termination).to.equal('Normal');
  });
});
