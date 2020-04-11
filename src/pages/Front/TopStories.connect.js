import { connect } from 'react-redux';
import { fetchTopStories } from './topStories.slice';
import TopStories from './TopStories';

const mapStateToProps = (state) => {
  return {
    items: state.topStories.items,
    loader: state.topStories.loading,
    current: state.topStories.currentPage,
    total: state.topStories.totalPages,
  };
};

const mapDispatchToProps = { fetchTopStories };

export default connect(mapStateToProps, mapDispatchToProps)(TopStories);
