import { connect } from 'react-redux';
import { fetchLatestStories } from './latestStories.slice';
import LatestStories from './LatestStories';

const mapStateToProps = (state) => {
  return {
    items: state.latestStories.items,
    loader: state.latestStories.loading,
    current: state.latestStories.currentPage,
    total: state.latestStories.totalPages,
  };
};

const mapDispatchToProps = { fetchLatestStories };

export default connect(mapStateToProps, mapDispatchToProps)(LatestStories);
