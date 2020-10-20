function set(key, value) {
  window.localStorage.setItem(key, value);
}
function get(key) {
  return window.localStorage.getItem(key);
}

export default {
  set,
  get
};
