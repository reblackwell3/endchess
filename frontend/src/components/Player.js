import React, { useEffect, useState, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import axios from 'axios';
import { Chess } from 'chess.js';
import './Player.css';

const Player = ({ positionNum, incrementPositionNum, positionUrl }) => {
  const [position, setPosition] = useState('');
  const [solution, setSolution] = useState([]);
  const [chess, setChess] = useState(new Chess());
  const intervalIdRef = useRef(null);
  const moveIndexRef = useRef(0);

  const fetchPosition = async (positionUrl) => {
    try {
      console.log('fetching url '+ positionUrl);
      const response = await axios.get(positionUrl);
      // console.log(JSON.stringify(response, null, 2));
      const { FEN, Moves } = response.data;
      console.log('Fetched FEN:', FEN);
      console.log('Fetched Moves:', Moves);
      const newChess = FEN ? new Chess(FEN) : new Chess();
      setChess(newChess);
      setPosition(FEN);
      setSolution(Moves.split(' '));
      moveIndexRef.current = 0; // Reset move index for the new puzzle
    } catch (error) {
      console.error('Error fetching position:', error);
    }
  };

  const showNextMove = () => {
    if (moveIndexRef.current < solution.length) {
      const move = solution[moveIndexRef.current];
      console.log('show next move = ' + move);
      chess.move(move);
      setPosition(chess.fen());
      moveIndexRef.current += 1;
      if (moveIndexRef.current === solution.length) {
        setTimeout(() => incrementPositionNum(), 3000);
        clearInterval(intervalIdRef.current); // Clear the interval
      }
    }
  };

  useEffect(() => {
    fetchPosition(positionUrl);
  }, [positionNum]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      intervalIdRef.current = setInterval(() => {
        showNextMove();
      }, 1000);
    }, 3000);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalIdRef.current);
    };
  }, [solution]);

  return (
    <div className="puzzle-container">
      <div className="chessboard-container">
        <Chessboard position={position} />
      </div>
    </div>
  );
};

export default Player;
