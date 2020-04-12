import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../core/Link/Link';
import styles from './pagination.module.css';

function Pagination({ current, total, target }) {
  if (current + 1 >= total) {
    return null;
  }
  const nextPage = current + 1;
  return (
    <div className="pagination py1 pl2">
      <Link
        type="soft"
        variation="primary-large"
        href={`${target}/${nextPage}`}
        className={styles.moreBtn}
        title={`Page ${current + 1} of ${total}`}
      >
        More
      </Link>
    </div>
  );
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  target: PropTypes.string.isRequired,
};

export default Pagination;
