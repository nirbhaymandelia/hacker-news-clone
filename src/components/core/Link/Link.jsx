import React from 'react';
import PropTypes from 'prop-types';
import styles from './link.module.css';

function getStyle(style) {
  return styles[style] || '';
}

function Link({ href, type, variation, children, className }) {
  if (type === 'soft') {
    return (
      <a href={href} className={`${getStyle(variation)} ${className} soft`}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={`${getStyle(variation)} ${className}`}>
      {children}
    </a>
  );
}

Link.propTypes = {
  type: PropTypes.oneOf(['soft', 'hard']),
  variation: PropTypes.oneOf([
    'primary',
    'primary-small',
    'primary-large',
    'secondary',
    'secondary-small',
    'secondary-large',
  ]),
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = {
  type: 'hard',
  variation: 'primary',
  className: '',
};

export default Link;