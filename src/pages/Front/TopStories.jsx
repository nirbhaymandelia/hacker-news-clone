/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../../components/composite/Listing/Listing';
import Pagination from '../../components/composite/Pagination/Pagination';
import Page from '../../components/core/Page/Page';

class TopStories extends Component {
  componentDidMount() {
    const { match, items, current } = this.props;
    const matchedPage = match.params.page || 0;
    if (!items.length || current !== matchedPage) {
      this.props.fetchTopStories(match);
    }
  }

  componentDidUpdate(prev) {
    const { params } = this.props.match;
    const { params: prevParams } = prev.match;
    if (prevParams.page !== params.page) {
      this.props.fetchTopStories(this.props.match);
    }
  }

  render() {
    const { items, loader, current, total } = this.props;
    return (
      <Page title="Top Stories">
        <Listing items={items} loader={loader} />
        <Pagination current={current} total={total} target="/top" />
      </Page>
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
