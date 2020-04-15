import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../core/BodyCopy/BodyCopy';
import styles from './footer.module.css';
import Link from '../../core/Link/Link';

function Footer({ text, developer, devUrl }) {
  return (
    <div className={`flex p2 justify-center ${styles.footer}`}>
      <BodyCopy type="secondary">
        {text} <i>developed by </i>
        <Link variation="primary-small" href={devUrl}>
          {developer}
        </Link>
      </BodyCopy>
    </div>
  );
}

Footer.propTypes = {
  text: PropTypes.string,
  developer: PropTypes.string,
  devUrl: PropTypes.string,
};

Footer.defaultProps = {
  text: 'Hacker News Boilerplate',
  developer: 'Nirbhay Mandelia',
  devUrl: 'https://github.com/nirbhaymandelia/hacker-news-clone',
};

export default Footer;
