/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const searchURL = 'http://hn.algolia.com/api/v1/search?tags=front_page';

export async function getHits() {
  const url = searchURL;
  const hitsResponse = await axios.get(url);
  return hitsResponse.data;
}
