import { connect } from 'react-redux';
import { fetchTopStories } from '../../slices/topStories.slice';
import { fetchHiddenItems } from '../../slices/hiddenItem.slice';
import { fetchVotedItems } from '../../slices/voting.slice';

import TopStories from './TopStories';

const mapStateToProps = (state) => {
  return {
    items: state.topStories.items,
    loader: state.topStories.loading,
    current: state.topStories.currentPage,
    total: state.topStories.totalPages,
    error: state.topStories.error,
  };
};

const mapDispatchToProps = {
  fetchTopStories,
  fetchHiddenItems,
  fetchVotedItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopStories);
