import React from 'react';
import PropTypes from 'prop-types';
import Vote from '../Vote/Vote';

function ListItem({ rank, id, voteLink, link, title, site, fromSite }) {
  return (
    <div className="athing" id={id}>
      <div className="title">
        <span className="rank">{rank}</span>
      </div>
      <Vote voteLink={voteLink} />
      <div className="title">
        <a href={link} className="storylink">
          {' '}
          {title}
        </a>
        <span className="sitebit comhead">
          ({' '}
          <a href={fromSite}>
            <span className="sitestr">{site}</span>
          </a>{' '}
          )
        </span>
      </div>
    </div>
  );
}
ListItem.defaultProps = {
  id: 22808208,
  rank: 1,
  voteLink: 'vote?id=22808208&amp;how=up&amp;goto=news',
  link: 'https://www.billiontoone.com/covid-19',
  title: 'We’re working on 1M Covid-19 testing capacity per day',
  fromSite: 'from?site=billiontoone.com',
  site: 'billiontoone.com',
};

ListItem.propTypes = {
  id: PropTypes.number,
  rank: PropTypes.number,
  voteLink: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  fromSite: PropTypes.string,
  site: PropTypes.string,
};

export default ListItem;
