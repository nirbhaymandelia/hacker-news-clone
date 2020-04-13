import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../core/Button/Button';

function ItemButton({ className, text, onClick }) {
  return (
    <div className={`sub-text ${className}`}>
      [
      <Button variation="secondary" type="button" onClick={onClick}>
        {text}
      </Button>
      ]
    </div>
  );
}

ItemButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

ItemButton.defaultProps = {
  className: 'pl1 pb1 md-pt1',
  text: 'Button',
  onClick: () => {},
};

export default ItemButton;
