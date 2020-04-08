import { connect } from 'react-redux';
import { fetchHits } from '../../../slices/hitsSlice';
import News from './News';

const mapStateToProps = (state) => {
  return {
    items: state.news.items,
  };
};

const mapDispatchToProps = { fetchHits };

export default connect(mapStateToProps, mapDispatchToProps)(News);
