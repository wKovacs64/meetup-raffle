export function loadDevTools(cb) {
  const explicitlyDisabled = window.location.search.includes('devTools=false');
  if (process.env.NODE_ENV === 'development' && !explicitlyDisabled) {
    import('./install')
      .then((devTools) => devTools.install())
      .finally(cb);
  } else {
    cb();
  }
}
