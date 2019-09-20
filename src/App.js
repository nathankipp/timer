import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SESSION_STORAGE_KEY = 'nsk-timer';
const TWO_MINUTES = 1000 * 60 * 70;

const fmt = d => d < 10 ? `0${d}` : d;

const App = () => {
  const [time, setTime] = useState(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || TWO_MINUTES);
  let timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => setTime(t => t-1000), 1000);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      clearInterval(timer.current);
    } else {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, time);
    }
  }, [time]);

  const min = Math.trunc(time/60/1000);
  const sec = (time/1000)-(min*60);

  return <>{fmt(min)}:{fmt(sec)}</>;
};

export default App;
