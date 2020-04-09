import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Footer from '../composite/Footer/Footer';
import Header from '../composite/Header/Header';
import '../../styles/index.css';

const SingleLayout = ({ routes }) => {
  return (
    <div className="container hn-main">
      <Header />
      {renderRoutes(routes)}
      <Footer />
    </div>
  );
};

SingleLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  routes: PropTypes.array.isRequired,
};
export default SingleLayout;
