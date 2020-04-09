import React from 'react';
import PropTypes from 'prop-types';
import styles from './body-copy.module.css';

const getStyle = (type) => {
  return styles[type] || '';
};

function BodyCopy({ type, children, className }) {
  return <span className={`${getStyle(type)} ${className}`}>{children}</span>;
}

BodyCopy.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BodyCopy.defaultProps = {
  type: 'title',
  className: '',
};

export default BodyCopy;
