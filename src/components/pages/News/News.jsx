/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../../composite/Listing/Listing';
import Pagination from '../../composite/Pagination/Pagination';

class News extends Component {
  componentDidMount() {
    this.props.fetchHits();
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        <Listing items={items} />
        <Pagination />
      </div>
    );
  }
}

News.propTypes = {
  items: PropTypes.array.isRequired,
  fetchHits: PropTypes.func.isRequired,
};

export default News;
