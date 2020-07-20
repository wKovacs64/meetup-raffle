import React from 'react';

export function usePrevious(value) {
  const previousValue = React.useRef();
  React.useEffect(() => {
    previousValue.current = value;
  }, [value]);
  return previousValue.current;
}
