import React from 'react';
import './App.css';
import CountdownTimer from './CountdownTimer';
import StopWatch from './StopWatch';

const App = () => (
  <div className="App">
    <CountdownTimer
      from="0:04.1"
      storageKey="my-timer"
    />
    <hr />
    <StopWatch
      limit="0:05.1"
      storageKey="my-stopwatch"
    />
  </div>
);

export default App;
