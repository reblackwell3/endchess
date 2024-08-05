import React, { useState } from 'react';
import Player from '../components/Player';

const PlayerPage = ( {positionUrl} ) => {
  const [positionNum, setPositionNum] = useState(0);

  const incrementPositionNum = () => {
    console.log('incrementPositionNum');
    setPositionNum((prev) => prev + 1); // Trigger next puzzle by changing the state
  };

  return (
    <div>
      <Player positionNum={positionNum} incrementPositionNum={incrementPositionNum} positionUrl={positionUrl} />
    </div>
  );
};

export default PlayerPage;
