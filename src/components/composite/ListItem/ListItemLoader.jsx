import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const ListItemLoader = ({ className }) => (
  <div className={`flex p1 ${className}`}>
    <ContentLoader
      speed={2}
      height={20}
      width="100%"
      backgroundColor="#d3d3d3"
      foregroundColor="#e3e3e3"
    >
      <rect x="120" y="5" rx="0" ry="0" width="60%" height="10" />
      <rect x="60" y="5" rx="0" ry="0" width="50" height="10" />
      <rect x="10" y="5" rx="0" ry="0" width="40" height="10" />
    </ContentLoader>
  </div>
);

ListItemLoader.propTypes = {
  className: PropTypes.string,
};

ListItemLoader.defaultProps = {
  className: '',
};

export default ListItemLoader;
