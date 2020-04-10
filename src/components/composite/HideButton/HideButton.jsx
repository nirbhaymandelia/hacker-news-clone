import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../core/Button/Button';

function HideButton({ className }) {
  return (
    <div className={`sub-text ${className}`}>
      [
      <Button variation="secondary" type="button">
        hide
      </Button>
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
