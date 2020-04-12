import { matchRoutes } from 'react-router-config';

export default function fetchServerData(url, routes, dispatch) {
  const matchedRoutes = matchRoutes(routes, url);
  const dataRequirements = matchedRoutes.map(({ route, match }) => {
    return route.component.fetchData
      ? dispatch(route.component.fetchData(match))
      : Promise.resolve(null);
  }); // map to components
  return Promise.all(dataRequirements);
}
