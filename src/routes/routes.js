import TopStories from '../pages/Front/TopStories.async';
import LatestStories from '../pages/Latest/LatestStories.async';

const routes = [
  {
    path: '/',
    component: TopStories,
    exact: true,
    cacheDuration: 60 * 1000 * 2,
  },
  {
    path: '/top/:page?',
    component: TopStories,
    exact: true,
    cacheDuration: 60 * 1000 * 2,
  },
  {
    path: '/newest/:page?',
    component: LatestStories,
    exact: true,
    cacheDuration: 60 * 1000 * 2,
  },
];

export default routes;
