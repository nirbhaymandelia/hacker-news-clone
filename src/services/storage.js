export function getStorageData(key) {
  // eslint-disable-next-line no-undef
  if (IS_CLIENT_BUILD) {
    return window.localStorage.getItem(key) || '';
  }
  return '';
}

export function setStorageData(key, data) {
  // eslint-disable-next-line no-undef
  if (IS_CLIENT_BUILD) {
    window.localStorage.setItem(key, data);
  }
}
