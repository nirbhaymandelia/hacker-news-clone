/* eslint-disable no-console, no-param-reassign */

const LIMIT = 50;

/**
 * This function delete the last least hit cache when cache get full
 * @param {object} cacheObj
 * @param {number} deleteCount num of least hit cache to delete
 */
function garbageCollectCache(cacheObj, deleteCount) {
  const cacheIds = Object.keys(cacheObj);
  const LowestHits = cacheIds
    .map((id) => cacheObj[id].hits)
    .sort((a, b) => a - b)
    .slice(0, deleteCount);
  const LowestHitSet = new Set(LowestHits);
  cacheIds.forEach((id) => {
    if (LowestHitSet.has(cacheObj[id].hits)) {
      // eslint-disable-next-line no-param-reassign
      delete cacheObj[id];
    }
  });
}

const withCaching = (cacheObj, id, duration = 5000) => async (fn, params) => {
  const cache = cacheObj[id];
  const currentTimestamp = Date.now();
  if (cache && cache.timestamp > currentTimestamp) {
    console.log('Serving From Cache::', id);
    cache.hits += 1;
    return Promise.resolve(cache.data);
  }
  const data = await fn(params);
  if (cache) {
    console.log(`Cache Expired after ${duration}ms busting cache::`, id);
    cache.timestamp = Date.now() + duration;
    cache.data = data;
    cache.hits += 1;
    return Promise.resolve(data);
  }
  if (cacheObj.cacheCount < LIMIT) {
    console.log('Creating Cache::', id);
    const nextTimeStamp = Date.now() + duration;
    cacheObj[id] = {
      timestamp: nextTimeStamp,
      hits: 0,
      data,
    };
    cacheObj.cacheCount += 1;
    return Promise.resolve(data);
  }
  console.log('Cache limit reached! Garbage collecting cache..');
  garbageCollectCache(cacheObj, 10);
  return Promise.resolve(data);
};

export default withCaching;
