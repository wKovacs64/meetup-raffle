// TODO: remove once requestIdleCallback is available in Safari
// https://caniuse.com/requestidlecallback
export function requestIdleCallbackShim(cb: () => void) {
  if (typeof requestIdleCallback === 'function') {
    return requestIdleCallback(cb);
  }
  return setTimeout(cb, 1);
}
