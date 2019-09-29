import React from 'react';
import './App.css';
import Timer from './Timer';

const App = () => (
  <div className="App">
    <Timer
      id="timer"
      countdown="0:00.9"
    />
    <hr />
    <Timer
      id="timer-autoStart"
      countdown="0:01.9"
      autoStart
    />
    <hr />
    <Timer
      id="stopwatch"
      stopwatch
    />
  </div>
);

export default App;
