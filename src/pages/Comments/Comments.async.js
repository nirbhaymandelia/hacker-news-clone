import loadable from '@loadable/component';

const AsyncComments = loadable(() =>
  import(/* webpackChunkName: "news" */ './Comments')
);

export default AsyncComments;
