import { connect } from 'react-redux';
import { fetchLatestStories } from './latestStories.slice';
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

const mapDispatchToProps = { fetchLatestStories };

const LatestStoriesConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestStories);

export default LatestStoriesConnect;
