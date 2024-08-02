import React from 'react';
import { useRoutes } from 'react-router-dom';
import PuzzlePlayerPage from './pages/PuzzlePlayerPage'; // Import the new page

const AppRoutes = () => {
  const routes = [
    { path: '/puzzle-player', element: <PuzzlePlayerPage /> }, // Add the new route
    // Add other routes here as needed
  ];

  return useRoutes(routes);
};

export default AppRoutes;
