import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import store from '../store/index';
import SingleLayout from '../components/layouts/Single';

const createClientApp = () => {
  console.log('!!createClientApp!!');
  return routes => {
    loadableReady(() => {
      console.log('!!createApp loadableReady!!');
      hydrate(
        <Provider store={store}>
          <BrowserRouter>{SingleLayout(routes)}</BrowserRouter>
        </Provider>,
        document.getElementById('app'),
      );
    });
  };
};
export default createClientApp;
