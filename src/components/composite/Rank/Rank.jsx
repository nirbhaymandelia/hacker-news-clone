import React from 'react';
import PropTypes from 'prop-types';
import styles from './rank.module.css';
import BodyCopy from '../../core/BodyCopy/BodyCopy';

const alignClassMap = {
  center: 'center',
  left: 'left-align',
  right: 'right-align',
  justify: 'justify',
};

/**
 * Renders a rank.
 *
 * Usage:
 * ```js
 * <Rank value={5} align="left" className="my-rank"/>
 * ```
 */
function Rank({ value, align, className }) {
  return (
    <div className={`${styles.rank} ${alignClassMap[align]} ${className}`}>
      <BodyCopy type="primary">{value}</BodyCopy>
    </div>
  );
}

Rank.propTypes = {
  value: PropTypes.number.isRequired,
  align: PropTypes.oneOf(['center', 'left', 'right', 'justify']),
  className: PropTypes.string,
};

Rank.defaultProps = {
  align: 'left',
  className: '',
};
export default Rank;
