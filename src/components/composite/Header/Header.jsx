import React, { Component } from 'react';
// import Navigation from '../Navigation/Navigation';

class Header extends Component {
  constructor(props) {
    super(props);
    console.log('!!Header Constructor!!', props);
  }

  render() {
    console.log('!!Header Render!!', this.props);
    return (
      <div className="container header border">
        <h2>Header</h2>
        {/* <Navigation /> */}
      </div>
    );
  }
}

export default Header;
