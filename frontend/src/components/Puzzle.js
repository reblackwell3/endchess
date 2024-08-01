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
        console.log(FEN);
        console.log(Moves);
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

  const showNextMove = () => {
    setCurrentMoveIndex((prevIndex) => {
      if (prevIndex < solution.length) {
        const move = solution[prevIndex];
        chess.move(move);
        setPosition(chess.fen());
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };

  useEffect(() => {
    const startSolution = () => {
      const intervalId = setInterval(() => {
        showNextMove();
        if (currentMoveIndex >= solution.length) {
          clearInterval(intervalId);
        }
      }, 1000);
    };

    const timerId = setTimeout(startSolution, 3000);

    return () => {
      clearTimeout(timerId);
      clearInterval(startSolution);
    };
  }, [solution, chess, currentMoveIndex]);

  return (
    <div className="puzzle-container">
      <div className="chessboard-container">
        <Chessboard position={position} />
      </div>
    </div>
  );
};

export default Puzzle;
