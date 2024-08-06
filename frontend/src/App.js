import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationGrid from './components/NavigationGrid';
import AppRoutes from './routes'; // Import the AppRoutes component

const App = () => {
  return (
    <Router>
      <div>
        <NavigationGrid />
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
