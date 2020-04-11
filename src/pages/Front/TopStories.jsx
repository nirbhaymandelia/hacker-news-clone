/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../../components/composite/Listing/Listing';
import Pagination from '../../components/composite/Pagination/Pagination';

class TopStories extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    params.page = params.page || 0;
    this.props.fetchTopStories(params);
  }

  componentDidUpdate(prev) {
    const { params } = this.props.match;
    const { params: prevParams } = prev.match;
    if (prevParams.page !== params.page) {
      this.props.fetchTopStories(params);
    }
  }

  render() {
    const { items, loader, current, total } = this.props;
    return (
      <div>
        <Listing items={items} loader={loader} />
        <Pagination current={current} total={total} target="/top" />
      </div>
    );
  }
}

TopStories.propTypes = {
  items: PropTypes.array.isRequired,
  fetchTopStories: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
};

export default TopStories;
