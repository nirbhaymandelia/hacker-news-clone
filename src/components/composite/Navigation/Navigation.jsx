import React from 'react';
import Link from '../../core/Link/Link';

function Navigation() {
  return (
    <nav className="pagetop flex flex-wrap">
      <Link variation="primary" className="p1" href="newest">
        new
      </Link>
      <span className="sep py1">|</span>
      <Link variation="primary" className="p1" href="front">
        past
      </Link>
    </nav>
  );
}

export default Navigation;
