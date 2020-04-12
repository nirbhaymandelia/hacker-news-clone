import loadable from '@loadable/component';
import { fetchLatestStories } from './latestStories.slice';

const LatestStoriesAsync = loadable(() =>
  import(/* webpackChunkName: "latest" */ './LatestStories.connect')
);

LatestStoriesAsync.fetchData = fetchLatestStories;

export default LatestStoriesAsync;
