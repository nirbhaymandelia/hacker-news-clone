import React from 'react';
import PropTypes from 'prop-types';
import styles from './vote.module.css';

const getColorClass = (votes) => {
  if (votes >= 100) {
    return styles.high;
  }
  if (votes >= 70) {
    return styles.modrate;
  }
  return styles.low;
};

function Vote({ voteLink, votes, className }) {
  return (
    <div className={`${styles.vote} ${className}`}>
      <div className={`${getColorClass(votes)} votecount`}>{votes}</div>
      <div className="votelinks">
        <a href={voteLink}>
          <div className={styles.votearrow} title="upvote" />
        </a>
      </div>
    </div>
  );
}

Vote.propTypes = {
  votes: PropTypes.number.isRequired,
  voteLink: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Vote.defaultProps = {
  className: '',
};

export default Vote;
