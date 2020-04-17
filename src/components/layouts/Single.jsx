import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from '../../routes/routes';

import Footer from '../composite/Footer/Footer';
import Header from '../composite/Header/Header';
import '../../styles/index.css';

const SingleLayout = () => {
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

export default SingleLayout;
