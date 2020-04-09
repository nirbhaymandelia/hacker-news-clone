import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../core/BodyCopy/BodyCopy';

function Footer({ text, developer }) {
  return (
    <div className="footer flex p2 justify-center">
      <BodyCopy type="secondary">
        {text} <i>developed by {developer}</i>
      </BodyCopy>
    </div>
  );
}

Footer.propTypes = {
  text: PropTypes.string,
  developer: PropTypes.string,
};

Footer.defaultProps = {
  text: 'Hacker News Clone',
  developer: 'Nirbhay Mandelia',
};

export default Footer;
