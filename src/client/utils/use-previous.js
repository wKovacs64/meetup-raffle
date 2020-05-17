import React from 'react';

export const usePrevious = (value) => {
  const previousValue = React.useRef();
  React.useEffect(() => {
    previousValue.current = value;
  }, [value]);
  return previousValue.current;
};
