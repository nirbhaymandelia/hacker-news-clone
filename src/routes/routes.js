import News from '../components/pages/News/News.async';
import Comments from '../components/pages/Comments/Comments.async';

const routes = [
  {
    path: '/',
    component: News,
    exact: true,
  },
  {
    path: '/newest',
    component: News,
    exact: true,
  },
  {
    path: '/comments',
    component: Comments,
    exact: true,
  },
];

export default routes;
