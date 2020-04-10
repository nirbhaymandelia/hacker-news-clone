import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

const getVariation = (type) => {
  return `${styles.btn} ${styles[type]}` || styles.btn;
};

function Button({ type, children, className, onClick, variation }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={`${getVariation(variation)} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variation: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: 'btn',
  variation: 'btn-primary',
  onClick: () => {},
};

export default Button;
