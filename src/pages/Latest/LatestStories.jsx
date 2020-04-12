/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../../components/composite/Listing/Listing';
import Pagination from '../../components/composite/Pagination/Pagination';
import Page from '../../components/core/Page/Page';

class LatestStories extends Component {
  componentDidMount() {
    const { match, items } = this.props;
    if (!items.length) {
      this.props.fetchLatestStories(match);
    }
  }

  componentDidUpdate(prev) {
    const { params } = this.props.match;
    const { params: prevParams } = prev.match;
    if (prevParams.page !== params.page) {
      this.props.fetchLatestStories(this.props.match);
    }
  }

  render() {
    const { items, loader, current, total } = this.props;
    return (
      <Page title="Latest Stories">
        <Listing items={items} loader={loader} />
        <Pagination current={current} total={total} target="/newest" />
      </Page>
    );
  }
}

LatestStories.propTypes = {
  items: PropTypes.array.isRequired,
  fetchLatestStories: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
};

export default LatestStories;
