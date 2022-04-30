function hasLocalStorage() {
  return typeof window !== 'undefined' && window.localStorage;
}

export function restore(key) {
  if (hasLocalStorage()) {
    return window.localStorage.getItem(key);
  }
  return undefined;
}

export function persist(key, value) {
  if (hasLocalStorage()) {
    window.localStorage.setItem(key, value);
  }
}
