import createServerApp from './createServerApp';

const requestHandler = async (req, res) => {
  const context = {};
  const markup = await createServerApp(req, res, context);
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(markup);
  }
};

export default requestHandler;

// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  module.hot.accept('./createServerApp');
}
