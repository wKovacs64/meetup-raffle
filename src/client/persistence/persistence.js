export function restore(key) {
  if (global.window.localStorage) {
    return global.window.localStorage.getItem(key);
  }
  return undefined;
}

export function persist(key, value) {
  if (global.window.localStorage) {
    global.window.localStorage.setItem(key, value);
  }
}
