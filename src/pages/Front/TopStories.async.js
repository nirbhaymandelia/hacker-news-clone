import loadable from '@loadable/component';

const TopStoriesAsync = loadable(() =>
  import(/* webpackChunkName: "news" */ './TopStories.connect')
);

export default TopStoriesAsync;
