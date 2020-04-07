import { matchRoutes } from "react-router-config";
import Routes from "../routes/routes";

export default function fetchServerData(req, store) {
  const params = req.params[0].split("/");
  const id = params[2];
  // Checks the given path, matches with component and returns array of items about to be rendered
  const routes = matchRoutes(Routes, req.path);

  // Execute all loadData functions inside given urls and wrap promises with new promises to be able to render pages all the time
  // Even if we get an error while loading data, we will still attempt to render page.
  return routes
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, id) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });
}
