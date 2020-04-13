import { connect } from 'react-redux';
import { hideItem } from '../../../slices/hiddenItem.slice';
import { vote, unVote } from '../../../slices/voting.slice';

import ListItem from './ListItem';

const mapStateToProps = (state, props) => {
  return {
    isVoted: state.votedItems.items.indexOf(props.id) >= 0,
    isHidden: state.hiddenItems.items.indexOf(props.id) >= 0,
  };
};

const mapDispatchToProps = {
  onVote: vote,
  onUnVote: unVote,
  onHide: hideItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
