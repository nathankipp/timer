import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  computeMillis,
  getTime,
  getItem,
  setItem,
  removeItem,
} from '../lib';
import Controls from '../Controls';

const INTERVAL = 100;

const Timer = ({ id, countdown, stopwatch, autoStart }) => {
  const STORAGE_KEY =  id;
  const RUNNING_KEY = `${STORAGE_KEY}.running`;

  const sessionTime = getItem(STORAGE_KEY);
  const initialTime = stopwatch ? 0 : computeMillis(countdown);
  const isRunning = getItem(RUNNING_KEY);

  const [time, setTime] = useState(sessionTime ? Number(sessionTime) : initialTime);
  const [running, setRunning] = useState(isRunning || false);
  let timer = useRef();

  const start = () => {
    setRunning(true);
    const dir = countdown ? -1 : 1;
    timer.current = setInterval(() => setTime(t => t + dir * INTERVAL), INTERVAL);
    setItem(RUNNING_KEY, true);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(timer.current);
    removeItem(RUNNING_KEY);
  };

  const reset = () => {
    setTime(initialTime);
    removeItem(STORAGE_KEY);
    removeItem(RUNNING_KEY);
  }

  useEffect(() => {
    if (isRunning || autoStart) {
      start();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (countdown && time <= 0) {
      stop();
    }
    setItem(STORAGE_KEY, time);
  }, [time]);  // eslint-disable-line react-hooks/exhaustive-deps

  const disabled = {
    start: countdown && time <= 0,
    reset: !!running || time === initialTime,
  };

  return (
    <>
      <div className="time">{getTime(time)}</div>
      <Controls
        running={running}
        disabled={disabled}
        start={start}
        stop={stop}
        reset={reset}
      />
    </>
  );
};

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  countdown: PropTypes.string,
  stopwatch: PropTypes.bool,
  type: function(props) {
    if (!props.countdown && !props.stopwatch) {
      return new Error('Timer must have the "countdown" OR "stopwatch" prop');
    }
    if (props.countdown && props.stopwatch) {
      return new Error('Timer cannot be both "countdown" AND "stopwatch"');
    }
  },
  countdownValue: function(props) {
    const { countdown } = props;
    if (countdown && !countdown.match(/^\d+:\d\d\.?\d?$/)) {
      return Error('The "countdown" prop must be of the format 99#:##.9 ("9" digits optional)')
    }
  },
  autoStart: PropTypes.bool,
}

Timer.defaultProps = {
  countdown: undefined,
  stopwatch: false,
  autoStart: false,
}

export default Timer;
