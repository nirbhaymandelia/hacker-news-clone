import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../core/BodyCopy/BodyCopy';
import styles from './footer.module.css';

function Footer({ text, developer }) {
  return (
    <div className={`flex p2 justify-center ${styles.footer}`}>
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
