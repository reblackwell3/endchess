import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import axios from 'axios';
import { Chess } from 'chess.js';
import './Puzzle.css';

const Puzzle = () => {
  const [position, setPosition] = useState('');
  const [solution, setSolution] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [chess, setChess] = useState(new Chess());

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/puzzles/random');
        const { FEN, Moves } = response.data;
        const newChess = new Chess(FEN);
        setChess(newChess);
        setPosition(FEN);
        setSolution(Moves.split(' '));
      } catch (error) {
        console.error('Error fetching puzzle:', error);
      }
    };

    fetchPuzzle();
  }, []);

  const handleShowNextMove = () => {
    if (currentMoveIndex < solution.length) {
      const move = solution[currentMoveIndex];
      chess.move(move);
      setPosition(chess.fen());
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  return (
    <div className="puzzle-container">
      <div className="chessboard-container">
        <Chessboard position={position} />
      </div>
      <button onClick={handleShowNextMove}>Show Next Move</button>
    </div>
  );
};

export default Puzzle;
