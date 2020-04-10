import React from 'react';
import Link from '../../core/Link/Link';
import styles from './navigation.module.css';

function Navigation() {
  return (
    <nav className={`flex flex-wrap ${styles.nav}`}>
      <Link
        variation="primary"
        className={`${styles.selected} p1`}
        href="newest"
      >
        new
      </Link>
      <span className={`py1 ${styles.sep}`}>|</span>
      <Link variation="primary" className="p1" href="front">
        past
      </Link>
    </nav>
  );
}

export default Navigation;
