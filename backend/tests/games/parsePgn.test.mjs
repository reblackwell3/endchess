import { expect } from 'chai';
import path from 'path';
import { fileURLToPath } from 'url';
import { parsePgn } from '../../games/parsePgn.js';  // Adjust the path as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('parsePgn', () => {
  it('should parse a PGN file with multiple games correctly', async () => {
    const pgnPath = path.resolve(__dirname, '../data/two-games.pgn');
    const games = await parsePgn(pgnPath);

    // console.log('Parsed PGN Data:', JSON.stringify(games, null, 2));

    expect(games).to.have.lengthOf(2);

    const game0 = games[0];
    const headers0 = game0.headers.reduce((acc, header) => {
      acc[header.name] = header.value;
      return acc;
    }, {});

    expect(headers0.White).to.equal('borgs');
    expect(headers0.Black).to.equal('IntiTupac');
    expect(headers0.Result).to.equal('0-1');
    expect(headers0.UTCDate).to.equal('2016.02.29');
    expect(headers0.WhiteElo).to.equal('1726');
    expect(headers0.BlackElo).to.equal('1702');
    expect(headers0.WhiteRatingDiff).to.equal('-12');
    expect(headers0.BlackRatingDiff).to.equal('+14');
    expect(headers0.ECO).to.equal('A13');
    expect(headers0.TimeControl).to.equal('600+0');
    expect(headers0.Termination).to.equal('Time forfeit');
    expect(game0.moves.map(move => move.move).join(' ')).to.contain('c4 e6 Nf3 a6');

    const game1 = games[1];
    const headers1 = game1.headers.reduce((acc, header) => {
      acc[header.name] = header.value;
      return acc;
    }, {});

    expect(headers1.White).to.equal('BrettDale');
    expect(headers1.Black).to.equal('Viriskensoshir');
    expect(headers1.Result).to.equal('0-1');
    expect(headers1.UTCDate).to.equal('2016.02.29');
    expect(headers1.WhiteElo).to.equal('1905');
    expect(headers1.BlackElo).to.equal('1949');
    expect(headers1.WhiteRatingDiff).to.equal('-10');
    expect(headers1.BlackRatingDiff).to.equal('+10');
    expect(headers1.ECO).to.equal('B72');
    expect(headers1.TimeControl).to.equal('180+0');
    expect(headers1.Termination).to.equal('Normal');
    expect(game1.moves.map(move => move.move).join(' ')).to.contain('e4 c5 Nf3 d6');
  });
});
