// backend/puzzles/puzzleRoutes.js
const express = require('express');
const router = express.Router();
const {
  getRandomPuzzle,
  getNextPuzzle,
  getPuzzleById,
} = require('./puzzleController');

// Get a random puzzle
router.get('/random', getRandomPuzzle);

// Get the next puzzle based on elo and player ID
router.get('/next', getNextPuzzle);

// Get a single puzzle by ID
router.get('/:id', getPuzzleById);

module.exports = router;
