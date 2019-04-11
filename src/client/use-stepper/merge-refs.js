const mergeRefs = (...refs) => ref => {
  refs.forEach(resolvableRef => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref);
    } else if (typeof resolvableRef === 'object' && resolvableRef !== null) {
      // eslint-disable-next-line no-param-reassign
      resolvableRef.current = ref;
    }
  });
};

export default mergeRefs;
