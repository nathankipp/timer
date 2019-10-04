import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  keyGen,
  computeMillis,
  getTime,
  getItem,
  setItem,
  removeItem,
} from '../lib';
import Controls from '../Controls';

const INTERVAL = 100;
const round = ms => Math.round(ms/INTERVAL) * INTERVAL;
const nowish = () => round(Date.now());

const CountdownTimer = ({
  autoStart,
  controls,
  from,
  onComplete,
  storageKey,
}) => {
  const { STORAGE_KEY, STARTED_KEY, RUNNING_KEY } = keyGen(storageKey);

  const isRunning = !!getItem(RUNNING_KEY);
  const [running, setRunning] = useState(isRunning);

  const sessionStarted = Number(getItem(STARTED_KEY));
  const [started, setStarted] = useState(sessionStarted);

  const initialTime = computeMillis(from);
  const sessionTime = getItem(STORAGE_KEY);
  let defaultTime;
  if (sessionTime) {
    defaultTime = started
      ? initialTime - (nowish() - started)
      : Number(sessionTime);
  } else {
    defaultTime = initialTime;
  }
  const [time, setTime] = useState(defaultTime);

  let timer = useRef();

  const start = () => {
    timer.current = setInterval(() => setTime(t => t - INTERVAL), INTERVAL);
    if (!started) {
      const elapsed = initialTime - (Number(sessionTime) || initialTime);
      const startedAt = nowish() - elapsed;
      setStarted(startedAt);
      setItem(STARTED_KEY, startedAt);
    }
    setRunning(true);
    setItem(RUNNING_KEY, true);
  };

  const stop = () => {
    clearInterval(timer.current);
    setRunning(false);
    setStarted(0);
    [RUNNING_KEY, STARTED_KEY].forEach(removeItem);
  };

  const reset = () => {
    setTime(initialTime);
  }

  useEffect(() => {
    if (running || autoStart) {
      start();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (time <= 0) {
      if (running) {
        onComplete();
      }
      stop();
    }
    setItem(STORAGE_KEY, time);
  }, [time]);  // eslint-disable-line react-hooks/exhaustive-deps

  const disabled = {
    start: time <= 0,
    reset: running || time === initialTime,
  };

  return (
    <>
      <div className="time">{getTime(time)}</div>
      {controls && (
        <Controls
          running={running}
          disabled={disabled}
          start={start}
          stop={stop}
          reset={reset}
        />
      )}
    </>
  );
};

CountdownTimer.propTypes = {
  autoStart: PropTypes.bool,
  controls: PropTypes.bool,
  from: PropTypes.string.isRequired,
  fromValue: function(props) {
    if (!props.from.match(/^\d+:\d\d\.?\d?$/)) {
      return Error('The "from" prop must be of the format 99#:##.9 ("9" digits optional)')
    }
  },
  onComplete: PropTypes.func.isRequired,
  storageKey: PropTypes.string.isRequired,
}

CountdownTimer.defaultProps = {
  autoStart: false,
  controls: true,
}

export default CountdownTimer;
