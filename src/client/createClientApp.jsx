/* eslint-disable no-underscore-dangle */
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import configureStore from '../store/configureStore';
import SingleLayout from '../components/layouts/Single';

const App = hot(SingleLayout);

const createClientApp = (routes) => {
  loadableReady(() => {
    const preloadedState = window.__INITIAL_STATE__;
    const store = configureStore(preloadedState);
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App routes={routes} />
        </BrowserRouter>
      </Provider>,
      document.getElementById('app')
    );
  });
};

export default createClientApp;
