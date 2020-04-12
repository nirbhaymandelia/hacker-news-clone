import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Footer from '../composite/Footer/Footer';
import Header from '../composite/Header/Header';
import '../../styles/index.css';

const SingleLayout = ({ routes }) => {
  return (
    <div className="container hn-main">
      <a className="skip-link" href="#main">
        Skip to main
      </a>
      <Header />
      {renderRoutes(routes)}
      <Footer />
    </div>
  );
};

SingleLayout.propTypes = {
  routes: PropTypes.array.isRequired,
};
export default SingleLayout;
