import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationGrid.css'; // Import the CSS file for styling

const NavigationGrid = () => {
  return (
    <div className="grid-container">
      <Link to="/random-puzzles-player" className="grid-item">
        Puzzles
      </Link>
      <Link to="/random-puzzles-rated-player" className="grid-item">
        Hard Puzzles
      </Link>
      <Link to="/random-games-player" className="grid-item">
        Games
      </Link>
      <Link to="/random-games-rated-player" className="grid-item">
        Top Games
      </Link>
    </div>
  );
};

export default NavigationGrid;
