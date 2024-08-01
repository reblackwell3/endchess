// src/App.js
import React from 'react';
import './App.css';
import Puzzle from './components/Puzzle';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Puzzle />
      </header>
    </div>
  );
};

export default App;
