import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import logoSrc from '../../../assets/y18.gif';

class Header extends Component {
  constructor(props) {
    super(props);
    console.log('!!Header Constructor!!', props);
  }

  render() {
    console.log('!!Header Render!!', this.props);
    return (
      <div className="header border">
        <a href="https://news.ycombinator.com" aria-label="logo">
          <img src={logoSrc} alt="logo" className="sitelogo" />
        </a>
        <b className="hnname">
          <a href="news">Hacker News</a>
        </b>
        <Navigation />
      </div>
    );
  }
}

export default Header;
