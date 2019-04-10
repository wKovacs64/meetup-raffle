import React from 'react';

function usePrevious(value) {
  const previousValue = React.useRef();
  React.useEffect(() => {
    previousValue.current = value;
  }, [value]);
  return previousValue.current;
}

export default usePrevious;
