import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    console.log('!!Footer Constructor!!', props);
  }

  render() {
    console.log('!!Footer render!!', this.props);
    return (
      <div className="container footer border">
        <h2>Footer</h2>
      </div>
    );
  }
}

export default Footer;
