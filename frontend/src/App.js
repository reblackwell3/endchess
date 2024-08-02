import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // Import the AppRoutes component

const App = () => {
  return (
    <Router>
      <AppRoutes /> {/* Render the AppRoutes component */}
    </Router>
  );
};

export default App;
