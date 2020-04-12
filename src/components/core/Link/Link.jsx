import React from 'react';
import PropTypes from 'prop-types';
import { Link as SoftLink } from 'react-router-dom';
import styles from './link.module.css';

function getStyle(style) {
  return styles[style] || '';
}

function Link({ href, type, variation, children, className, title }) {
  if (type === 'soft') {
    return (
      <SoftLink
        to={href}
        className={`${getStyle(variation)} ${className}`}
        title={title}
      >
        {children}
      </SoftLink>
    );
  }
  return (
    <a
      href={href}
      className={`${getStyle(variation)} ${className}`}
      title={title}
    >
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
  title: PropTypes.string,
};

Link.defaultProps = {
  type: 'hard',
  variation: 'primary',
  className: '',
  title: '',
};

export default Link;
