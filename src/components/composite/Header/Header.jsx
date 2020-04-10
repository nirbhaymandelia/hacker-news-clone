import React from 'react';
// import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';
import logoSrc from '../../../assets/y18.gif';
import Link from '../../core/Link/Link';
import styles from './header.module.css';

function Header() {
  return (
    <div className={`flex flex-wrap ${styles.header}`}>
      <Link
        variation="primary"
        className="p1"
        href="https://news.ycombinator.com"
        aria-label="logo"
      >
        <img src={logoSrc} alt="logo" className="color-white border" />
      </Link>
      {/* <b className="hnname py1 pr1">
        <Link className="logo-text" variation="primary" href="news">
          Hacker News
        </Link>
      </b> */}
      <Navigation />
    </div>
  );
}

export default Header;
