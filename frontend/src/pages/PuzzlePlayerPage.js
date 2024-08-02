import React, { useState } from 'react';
import Puzzle from '../components/Puzzle';

const PuzzlePlayer = () => {
  const [puzzleNum, setPuzzleNum] = useState(0);

  const incrementPuzzleNum = () => {
    console.log('incrementPuzzleNum');
    setPuzzleNum((prev) => prev + 1); // Trigger next puzzle by changing the state
  };

  return (
    <div>
      <Puzzle puzzleNum={puzzleNum} incrementPuzzleNum={incrementPuzzleNum} />
    </div>
  );
};

export default PuzzlePlayer;
