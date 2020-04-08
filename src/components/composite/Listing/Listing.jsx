import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';

function Listing({ items }) {
  return (
    <div className="listing">
      {items.map((item, index) => {
        let fromSite = '';
        let site = '';
        const rank = index + 1;
        if (item.url) {
          const siteUrl = new URL(item.url);
          site = siteUrl.host;
          fromSite = siteUrl.host;
        }
        return (
          <ListItem
            key={item.id}
            id={item.id}
            rank={rank}
            voteLink={`vote?id=${item.id}`}
            link={item.url}
            title={item.title}
            fromSite={fromSite}
            site={site}
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
