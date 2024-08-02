import React, { useEffect, useState, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import axios from 'axios';
import { Chess } from 'chess.js';
import './Puzzle.css';

const Puzzle = ({ puzzleNum, incrementPuzzleNum }) => {
  const [position, setPosition] = useState('');
  const [solution, setSolution] = useState([]);
  const [chess, setChess] = useState(new Chess());
  const intervalIdRef = useRef(null);
  const moveIndexRef = useRef(0);

  const fetchPuzzle = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/puzzles/random');
      const { FEN, Moves } = response.data;
      console.log('Fetched FEN:', FEN);
      console.log('Fetched Moves:', Moves);
      const newChess = new Chess(FEN);
      setChess(newChess);
      setPosition(FEN);
      setSolution(Moves.split(' '));
      moveIndexRef.current = 0; // Reset move index for the new puzzle
    } catch (error) {
      console.error('Error fetching puzzle:', error);
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
        setTimeout(() => incrementPuzzleNum(), 3000);
        clearInterval(intervalIdRef.current); // Clear the interval
      }
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, [puzzleNum]);

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

export default Puzzle;
