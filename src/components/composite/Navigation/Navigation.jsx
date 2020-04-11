import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

function isActive(match, location) {
  if (location.pathname === '/' || location.pathname === '/top') {
    return true;
  }
  return false;
}

function Navigation() {
  return (
    <nav className={`flex flex-wrap ${styles.nav}`}>
      <NavLink
        className="p1"
        activeClassName={styles.active}
        to="/top"
        isActive={isActive}
      >
        top
      </NavLink>
      <span className={`py1 ${styles.sep}`}>|</span>
      <NavLink className="p1" activeClassName={styles.active} to="/newest">
        new
      </NavLink>
    </nav>
  );
}

export default Navigation;
