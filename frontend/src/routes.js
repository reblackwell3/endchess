import React from 'react';
import { useRoutes } from 'react-router-dom';
import PlayerPage from './pages/PlayerPage'; // Import the new page

const AppRoutes = () => {
  const routes = [
    { path: '/random-puzzles-player', element: <PlayerPage positionUrl='http://localhost:5000/api/puzzles/random' /> }, 
    { path: '/random-games-player', element: <PlayerPage positionUrl='http://localhost:5000/api/games/random' /> }, 
  ];

  return useRoutes(routes);
};

export default AppRoutes;
