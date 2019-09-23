import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SESSION_TIME_KEY = 'nsk-timer';
const SESSION_RUNNING_KEY = `${SESSION_TIME_KEY}-running`;
const TWO_MINUTES = 1000 * 60 * 2;
const INTERVAL = 100;

const fmt = d => d < 10 ? `0${d}` : d;

const sessionTime = window.sessionStorage.getItem(SESSION_TIME_KEY);
const isRunning = window.sessionStorage.getItem(SESSION_RUNNING_KEY);

const App = () => {
  const [time, setTime] = useState(sessionTime || TWO_MINUTES);
  const [running, setRunning] = useState(isRunning || false);
  let timer = useRef();

  const start = () => {
    setRunning(true);
    timer.current = setInterval(() => setTime(t => t-INTERVAL), INTERVAL);
    window.sessionStorage.setItem(SESSION_RUNNING_KEY, true);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(timer.current);
    window.sessionStorage.removeItem(SESSION_RUNNING_KEY);
  }

  const reset = () => setTime(TWO_MINUTES);

  useEffect(() => {
    if (isRunning) {
      start();
    }
  }, []);

  useEffect(() => {
    if (time <= 0) {
      window.sessionStorage.removeItem(SESSION_TIME_KEY);
      stop();
    } else {
      window.sessionStorage.setItem(SESSION_TIME_KEY, time);
    }
  }, [time]);

  const min = Math.trunc(time/1000/60);
  const sec = Math.trunc((time/1000)-(min*60));
  const msec = ((time/1000)-(min*60)-sec).toFixed(1).replace(/^0/, '');

  const disableReset = !running && time < TWO_MINUTES ? false : true;

  return (
    <div className="App">
      <div className="time">{min}:{fmt(sec)}{msec}</div>
      <div>
        {!running && <button className="start" onClick={start}>Start</button>}
        {running && <button className="stop" onClick={stop}>Stop</button>}
        <button className="reset" disabled={disableReset} onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
