import React from 'react';

const Controls = props => {
  const { running, disabled, start, stop, reset } = props;
  return (
    <div>
    {!running && <button className="start" disabled={disabled.start} onClick={start}>Start</button>}
    {running && <button className="stop" onClick={stop}>Stop</button>}
    <button className="reset" disabled={disabled.reset} onClick={reset}>Reset</button>
    </div>
  );
}

export default Controls;
