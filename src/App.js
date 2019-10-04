import React from 'react';
import './App.css';
import Timer from './Timer';
import CountdownTimer from './CountdownTimer';

const App = () => (
  <div className="App">
    <CountdownTimer
      from="0:20.0"
      onComplete={() => alert('done')}
      storageKey="my-timer"
    />
  </div>
);

export default App;

// <Timer
//   id="timer"
//   countdown="0:00.9"
// />
// <hr />
// <Timer
//   id="timer-autoStart"
//   countdown="0:01.9"
//   autoStart
// />
// <hr />
// <Timer
//   id="stopwatch"
//   stopwatch
//   autoStart
// />
// <hr />
