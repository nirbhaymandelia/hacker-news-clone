import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem.connect';
import ListItemLoader from '../ListItem/ListItemLoader';
import styles from './listing.module.css';

const getListingLoader = () => {
  return (
    <div className="listing">
      {[...Array(30).keys()].map((itemId) => {
        return <ListItemLoader key={itemId} className={styles.listItem} />;
      })}
    </div>
  );
};
function Listing({ items, loader }) {
  if (loader) {
    return getListingLoader();
  }
  return (
    <div className="listing">
      {items.map((item) => {
        // const rank = index + 1;
        return (
          <ListItem
            key={item.objectID}
            id={item.objectID}
            rank={item.num_comments || 0}
            link={item.url}
            title={item.title}
            votes={item.points}
            author={item.author}
            createdAt={item.created_at}
            commentCount={item.num_comments || 0}
            className={styles.listItem}
          />
        );
      })}
    </div>
  );
}

Listing.propTypes = {
  items: PropTypes.array.isRequired,
  loader: PropTypes.bool,
};

Listing.defaultProps = {
  loader: false,
};

export default Listing;
