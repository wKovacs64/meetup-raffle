import entries from 'core-js-pure/es/object/entries';

export const restore = key => {
  if (global.window.localStorage) {
    return global.window.localStorage.getItem(key);
  }
  return undefined;
};

export const preserve = data => {
  if (global.window.localStorage) {
    entries(data).forEach(([key, value]) => {
      global.window.localStorage.setItem(key, value);
    });
  }
};
