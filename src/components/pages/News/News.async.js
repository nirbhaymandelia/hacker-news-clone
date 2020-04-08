import loadable from '@loadable/component';

const AsyncNews = loadable(() =>
  import(/* webpackChunkName: "news" */ './News.connect')
);

export default AsyncNews;
