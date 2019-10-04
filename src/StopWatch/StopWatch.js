import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const StopWatch = props => (
  <Timer direction={1} from="0:00" {...props} />
)

StopWatch.propTypes = {
  autoStart: PropTypes.bool,
  controls: PropTypes.bool,
  limit: PropTypes.string,
  onComplete: PropTypes.func,
  storageKey: PropTypes.string.isRequired,
}

StopWatch.defaultProps = {
  autoStart: false,
  controls: true,
  limit: undefined,
  onComplete: undefined,
}

export default StopWatch;
