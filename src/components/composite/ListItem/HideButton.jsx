import React from 'react';
import PropTypes from 'prop-types';

function HideButton({ className }) {
  return (
    <div className={`sub-text ${className}`}>
      [
      <button className="btn-link" type="button">
        hide
      </button>
      ]
    </div>
  );
}

HideButton.propTypes = {
  className: PropTypes.string,
};

HideButton.defaultProps = {
  className: 'pl1 pb1 md-pt1',
};

export default HideButton;
