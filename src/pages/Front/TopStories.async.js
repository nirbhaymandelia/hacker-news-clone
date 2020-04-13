import loadable from '@loadable/component';
import { fetchTopStories } from '../../slices/topStories.slice';

const TopStoriesAsync = loadable(() =>
  import(/* webpackChunkName: "top" */ './TopStories.connect')
);

TopStoriesAsync.fetchData = fetchTopStories;

export default TopStoriesAsync;
