// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const puzzleRoutes = require('./puzzles/puzzleRoutes');
const playerRoutes = require('./players/playerRoutes');

dotenv.config({ path: '.env' });

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use puzzle routes
app.use('/api/puzzles', puzzleRoutes);

// Use player routes
app.use('/api/players', playerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
