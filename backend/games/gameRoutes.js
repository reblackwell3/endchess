// backend/games/gameRoutes.js
const express = require('express');
const router = express.Router();
const {
  getRandomGame,
  getGameById,
} = require('./gameController');

// Get a random game
router.get('/random', getRandomGame);

// Get a single game by ID
router.get('/:id', getGameById);

module.exports = router;
