import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';
import store from '../store/index';
import htmlTemplate from './htmlTemplate';
import Layout from '../components/layouts/Single';

const createServerApp = (
  context,
  url,
  statsFile
) => {
  return routes => {
    // We create an extractor from the statsFile
    const extractor = new ChunkExtractor({ statsFile });
    // Wrap your application using "collectChunks"
    const app = extractor.collectChunks(Layout(routes));
    // Render your application
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          {app}
        </StaticRouter>
      </Provider>,
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
      helmet,
    );
  };
};

export default createServerApp;
