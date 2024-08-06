import React from 'react';
import { useRoutes } from 'react-router-dom';
import PlayerPage from './pages/PlayerPage'; // Import the new page

const AppRoutes = () => {
  const routes = [
    { path: '/random-puzzles-player', element: <PlayerPage positionUrl='http://localhost:5000/api/puzzles/random' /> }, 
    { path: '/random-puzzles-rated-player', element: <PlayerPage positionUrl='http://localhost:5000/api/puzzles/random-rated/2500' /> },      
    { path: '/random-games-player', element: <PlayerPage positionUrl='http://localhost:5000/api/games/random' /> }, 
    { path: '/random-games-rated-player', element: <PlayerPage positionUrl='http://localhost:5000/api/games/random-rated/2500' /> }, 
  ];

  return useRoutes(routes);
};

export default AppRoutes;
