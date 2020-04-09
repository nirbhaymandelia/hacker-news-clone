import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';

function Listing({ items }) {
  return (
    <div className="listing">
      {items.map((item) => {
        // const rank = index + 1;
        return (
          <ListItem
            key={item.objectID}
            id={item.objectID}
            rank={item.num_comments}
            voteLink={`vote?id=${item.id}`}
            link={item.url}
            title={item.title}
            votes={item.points}
            author={item.author}
            createdAt={item.created_at}
            commentCount={item.num_comments}
          />
        );
      })}
    </div>
  );
}
Listing.propTypes = {
  items: PropTypes.array.isRequired,
};
export default Listing;
