import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const CountdownTimer = props => (
  <Timer direction={-1} {...props} />
)

CountdownTimer.propTypes = {
  autoStart: PropTypes.bool,
  controls: PropTypes.bool,
  from: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
  storageKey: PropTypes.string.isRequired,
}

CountdownTimer.defaultProps = {
  autoStart: false,
  controls: true,
  onComplete: undefined,
}

export default CountdownTimer;
