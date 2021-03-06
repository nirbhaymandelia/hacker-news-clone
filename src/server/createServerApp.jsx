import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';
import configureStore from '../store/configureStore';
import htmlTemplate from './htmlTemplate';
import SingleLayout from '../components/layouts/Single';
import fetchServerData from './fetchServerData';
import routes from '../routes/routes';

async function createServerApp(req, res, context) {
  const { stats } = req.app.locals;
  const { url } = req;
  // create new store for request
  const store = configureStore();
  // We create an extractor from the statsFile
  const extractor = new ChunkExtractor({ stats });
  await fetchServerData(req, routes, store.dispatch);
  // Wrap your application using "collectChunks"
  const app = extractor.collectChunks(<SingleLayout />);
  // fetch server data
  // Render your application
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        {app}
      </StaticRouter>
    </Provider>
  );
  const initialData = JSON.stringify(store.getState());
  // You can now collect your script tags
  const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
  // You can also collect your "preload/prefetch" links
  const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
  // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();
  const helmet = Helmet.renderStatic();
  return htmlTemplate(
    {
      html,
      scriptTags,
      linkTags,
      styleTags,
      initialData,
    },
    helmet
  );
}

export default createServerApp;
