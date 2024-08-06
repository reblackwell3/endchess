// src/pages/PlayerPage.js
import React, { useState, useEffect } from 'react';
import Player from '../components/Player';

const PlayerPage = ({ positionUrl }) => {
  const [positionNum, setPositionNum] = useState(0);

  const incrementPositionNum = () => {
    setPositionNum((prev) => prev + 1); // Trigger next puzzle by changing the state
  };

  useEffect(() => {
    console.log(`Position URL changed to: ${positionUrl}`);
    // Reset positionNum or perform any necessary actions when positionUrl changes
    setPositionNum(0);
  }, [positionUrl]);

  return (
    <div>
      <Player positionNum={positionNum} incrementPositionNum={incrementPositionNum} positionUrl={positionUrl} />
    </div>
  );
};

export default PlayerPage;
