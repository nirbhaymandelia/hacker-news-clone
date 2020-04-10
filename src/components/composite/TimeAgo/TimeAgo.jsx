import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../core/BodyCopy/BodyCopy';

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}

function TimeAgo({ createdAt, className }) {
  const dateCreated = new Date(createdAt);
  return (
    <div className={className}>
      <BodyCopy type="secondary">{timeSince(dateCreated)} ago</BodyCopy>
    </div>
  );
}

TimeAgo.propTypes = {
  createdAt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TimeAgo.defaultProps = {
  className: 'pb1 pl1 md-pb1',
};

export default TimeAgo;
