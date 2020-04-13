import React from 'react';
import PropTypes from 'prop-types';
import Vote from '../Vote/Vote';
import TimeAgo from '../TimeAgo/TimeAgo';
import ItemButton from '../ItemButton/ItemButton';
import Rank from '../Rank/Rank';
import ItemTitle from '../ItemTitle/ItemTitle';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import CommentMeta from '../CommentMeta/CommentMeta';

const noop = () => {};
// Using closure and functional programming concepts to supply id.
const callWithId = (fn, id) => () => fn(id);
function ListItem({
  rank,
  id,
  votes,
  voteLink,
  link,
  title,
  author,
  createdAt,
  commentCount,
  className,
  isVoted,
  onVote,
  onUnVote,
  onHide,
  isHidden,
}) {
  if (isHidden) {
    return null;
  }
  return (
    <div className={`flex ${className}`} id={id}>
      <div className="flex flex-wrap ">
        <Rank value={rank} align="right" className="py1 pl1" />
        <Vote
          votes={votes}
          voteLink={voteLink}
          className="pt1 pl1 flex md-pb1"
          isVoted={isVoted}
          onVote={callWithId(onVote, id)}
        />
      </div>
      <div className="flex flex-wrap">
        <ItemTitle link={link} title={title} className="pl1 pt1 md-pb1" />
        <AuthorInfo author={author} className="pl1 pb1 md-pt1" />
        <TimeAgo createdAt={createdAt} className="pl1 pb1 md-pt1" />
        <CommentMeta
          commentCount={commentCount}
          className="pl1 pb1 md-pt1 lg-hide"
        />
        <ItemButton
          className="pl1 pb1 md-pt1"
          text="hide"
          onClick={callWithId(onHide, id)}
        />
        {isVoted ? (
          <ItemButton
            className="pl1 pb1 md-pt1"
            text="unvote"
            onClick={callWithId(onUnVote, id)}
          />
        ) : null}
      </div>
    </div>
  );
}

ListItem.defaultProps = {
  id: 22808208,
  rank: 1,
  votes: 0,
  voteLink: 'vote?id=22808208&amp;how=up&amp;goto=news',
  link: 'https://www.billiontoone.com/covid-19',
  title: 'We’re working on 1M Covid-19 testing capacity per day',
  commentCount: 0,
  className: '',
  isVoted: false,
  isHidden: false,
  onVote: noop,
  onUnVote: noop,
  onHide: noop,
};

ListItem.propTypes = {
  id: PropTypes.string,
  rank: PropTypes.number,
  votes: PropTypes.number,
  commentCount: PropTypes.number,
  voteLink: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  className: PropTypes.string,
  isVoted: PropTypes.bool,
  isHidden: PropTypes.bool,
  onVote: PropTypes.func,
  onUnVote: PropTypes.func,
  onHide: PropTypes.func,
};

export default ListItem;
