import React from 'react';
import { renderRoutes } from 'react-router-config';
import Footer from '../composite/Footer/Footer';
import Header from '../composite/Header/Header';

const SingleLayout = routes => {
  return (
    <div>
      <Header />
      {renderRoutes(routes)}
      <Footer />
    </div>
  );
};

export default SingleLayout;
