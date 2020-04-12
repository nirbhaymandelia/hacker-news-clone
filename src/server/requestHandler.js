import createServerApp from './createServerApp';
import routes from '../routes/routes';

const requestHandler = async (req, res) => {
  // We pass store to renderer
  // const promises = fetchServerData(req, store)
  // Wait for all the loadData functions, if they are resolved, send the rendered html to browser.
  // Promise.all(promises).then(() => {

  const context = {};
  const markup = await createServerApp(req, res, context)(routes);

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(markup);
  }

  // });
};

export default requestHandler;
