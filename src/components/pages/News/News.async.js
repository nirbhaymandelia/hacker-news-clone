import loadable from "@loadable/component";

const AsyncNews = loadable(() =>
  import(/* webpackChunkName: "news" */ "./News")
);

export default AsyncNews;
