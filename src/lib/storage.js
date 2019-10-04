const getItem = key => window.sessionStorage.getItem(key);
const setItem = (key, value) => window.sessionStorage.setItem(key, value);
const removeItem = key => window.sessionStorage.removeItem(key);

export {
  getItem,
  setItem,
  removeItem,
};
