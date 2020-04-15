/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getStorageData, setStorageData } from './storage';

const apiUrls = {
  top: 'https://hn.algolia.com/api/v1/search',
  latest: 'https://hn.algolia.com/api/v1/search_by_date',
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

export async function getHiddenItems() {
  const items = getStorageData('hiddenItem');
  if (items) {
    return JSON.parse(items);
  }
  return [];
}

export async function getUpVotedItems() {
  const items = getStorageData('upVotedItem');
  if (items) {
    return JSON.parse(items);
  }
  return [];
}

export async function hideItem(item) {
  const items = await getHiddenItems();
  if (items.indexOf(item) < 0) {
    items.push(item);
    setStorageData('hiddenItem', JSON.stringify(items));
  }
  return items;
}

export async function voteItem(item) {
  const items = await getUpVotedItems();
  if (items.indexOf(item) < 0) {
    items.push(item);
    setStorageData('upVotedItem', JSON.stringify(items));
  }
  return items;
}

export async function unVoteItem(item) {
  const items = await getUpVotedItems();
  const index = items.indexOf(item);
  if (index >= 0) {
    items.splice(index, 1);
    setStorageData('upVotedItem', JSON.stringify(items));
  }
  return items;
}
