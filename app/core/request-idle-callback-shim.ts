// TODO: remove once requestIdleCallback is available in Safari
// https://caniuse.com/requestidlecallback
export function requestIdleCallbackShim(cb: () => void) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(cb);
  }
  return window.setTimeout(cb, 1);
}
