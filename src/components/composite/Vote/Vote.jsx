import React from 'react';
import PropTypes from 'prop-types';
import styles from './vote.module.css';
import Button from '../../core/Button/Button';

const getColorClass = (votes) => {
  if (votes >= 100) {
    return styles.high;
  }
  if (votes >= 70) {
    return styles.modrate;
  }
  return styles.low;
};

function Vote({ onVote, votes, className, isVoted }) {
  return (
    <div className={`${styles.vote} ${className}`}>
      <div className={`${getColorClass(votes)} votecount`}>{votes}</div>
      <div className="votelinks">
        {isVoted ? (
          <span className={`${styles.votearrowhide}`} />
        ) : (
          <Button onClick={onVote} type="button">
            <span className={styles.votearrow} title="upvote" />
          </Button>
        )}
      </div>
    </div>
  );
}

Vote.propTypes = {
  votes: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
  className: PropTypes.string,
  isVoted: PropTypes.bool,
};

Vote.defaultProps = {
  className: '',
  isVoted: false,
};

export default Vote;
