import React from 'react';
import PropTypes from 'prop-types';
import styles from './paragraph.module.css';

const getStyle = (type) => {
  return styles[type] || '';
};

function Paragraph({ type, children, className }) {
  return <p className={`${getStyle(type)} ${className}`}>{children}</p>;
}

Paragraph.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Paragraph.defaultProps = {
  type: 'primary',
  className: '',
};

export default Paragraph;
