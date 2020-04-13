/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../../components/composite/Listing/Listing';
import Pagination from '../../components/composite/Pagination/Pagination';
import Page from '../../components/core/Page/Page';
import Paragraph from '../../components/core/Paragraph/Paragraph';

class LatestStories extends Component {
  componentDidMount() {
    const {
      match,
      items,
      fetchVotedItems,
      fetchHiddenItems,
      fetchLatestStories,
    } = this.props;
    if (!items.length) {
      fetchLatestStories(match);
    }
    fetchVotedItems();
    fetchHiddenItems();
  }

  componentDidUpdate(prev) {
    const { params } = this.props.match;
    const { params: prevParams } = prev.match;
    if (prevParams.page !== params.page) {
      this.props.fetchLatestStories(this.props.match);
    }
  }

  render() {
    const { items, loader, current, total, error } = this.props;
    if (error) {
      return (
        <Page title="Error 400">
          <Paragraph type="primary" className="p1">
            {error}
          </Paragraph>
        </Page>
      );
    }
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
  fetchVotedItems: PropTypes.func.isRequired,
  fetchHiddenItems: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  error: PropTypes.string,
};

LatestStories.defaultProps = {
  error: '',
};

export default LatestStories;
