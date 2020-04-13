import { connect } from 'react-redux';
import { fetchLatestStories } from '../../slices/latestStories.slice';
import { fetchHiddenItems } from '../../slices/hiddenItem.slice';
import { fetchVotedItems } from '../../slices/voting.slice';
import LatestStories from './LatestStories';

const mapStateToProps = (state) => {
  return {
    items: state.latestStories.items,
    loader: state.latestStories.loading,
    current: state.latestStories.currentPage,
    total: state.latestStories.totalPages,
    error: state.latestStories.error,
  };
};

const mapDispatchToProps = {
  fetchLatestStories,
  fetchHiddenItems,
  fetchVotedItems,
};

const LatestStoriesConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestStories);

export default LatestStoriesConnect;
