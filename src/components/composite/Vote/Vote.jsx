import React from 'react';
import PropTypes from 'prop-types';
import styles from './vote.module.css';

function Vote({ voteLink, votes, className }) {
  return (
    <div className={`${styles.vote} ${className}`}>
      <div className="votecount">{votes}</div>
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
