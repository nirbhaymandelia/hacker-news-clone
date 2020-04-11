import loadable from '@loadable/component';

const LatestStoriesAsync = loadable(() =>
  import(/* webpackChunkName: "news" */ './LatestStories.connect')
);

export default LatestStoriesAsync;
