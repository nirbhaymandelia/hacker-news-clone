import { matchRoutes } from 'react-router-config';
import withCaching from './withCaching';

function getCacheId(url) {
  if (url === '/') {
    return 'top';
  }
  return url.split('/').filter(Boolean).join('_');
}

export default function fetchServerData(req, routes, dispatch) {
  const { cachedData } = req.app.locals;
  const matchedRoutes = matchRoutes(routes, req.url);
  const dataRequirements = matchedRoutes.map(({ route, match }) => {
    const cacheId = getCacheId(req.url);
    return route.component.fetchData
      ? dispatch(
          route.component.fetchData(
            match,
            withCaching(cachedData, cacheId, route.cacheDuration)
          )
        )
      : Promise.resolve(null);
  }); // map to components
  return Promise.all(dataRequirements);
}
