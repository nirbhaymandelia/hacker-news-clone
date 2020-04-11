import TopStories from '../pages/Front/TopStories.async';
import LatestStories from '../pages/Latest/LatestStories.async';

const routes = [
  {
    path: '/',
    component: TopStories,
    exact: true,
  },
  {
    path: '/top/:page?',
    component: TopStories,
    exact: true,
  },
  {
    path: '/newest/:page?',
    component: LatestStories,
    exact: true,
  },
];

export default routes;
