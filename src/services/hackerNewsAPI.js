/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiUrls = {
  top: 'http://hn.algolia.com/api/v1/search',
  latest: 'http://hn.algolia.com/api/v1/search_by_date',
};

function getRequestUrl(endpoint, params) {
  return Object.keys(params).reduce((url, item, index) => {
    return index === 0
      ? `${url}?${item}=${params[item]}`
      : `${url}&${item}=${params[item]}`;
  }, endpoint);
}

export async function getTopStories(params) {
  const defaultParams = {
    tags: 'front_page',
    hitsPerPage: 30,
  };
  const url = getRequestUrl(apiUrls.top, { ...defaultParams, ...params });
  const hitsResponse = await axios.get(url);
  return hitsResponse.data;
}

export async function getLatestStories(params) {
  const defaultParams = {
    tags: 'story',
    hitsPerPage: 30,
  };
  const url = getRequestUrl(apiUrls.latest, { ...defaultParams, ...params });
  const hitsResponse = await axios.get(url);
  return hitsResponse.data;
}
