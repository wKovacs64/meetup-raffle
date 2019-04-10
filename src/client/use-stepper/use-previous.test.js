import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import usePrevious from './use-previous';

describe('usePrevious', () => {
  it('returns the value of a variable from the previous render', () => {
    function Comp() {
      const [currentValue, setCurrentValue] = React.useState(0);
      const previousValue = usePrevious(currentValue);

      function increment() {
        setCurrentValue(value => value + 1);
      }

      return (
        <div>
          <span data-testid="previous">{previousValue}</span>
          <span data-testid="current">{currentValue}</span>
          <button type="button" onClick={increment}>
            increment
          </button>
        </div>
      );
    }

    const { getByTestId, getByText } = render(<Comp />);
    expect(getByTestId('previous').textContent).toBe('');
    expect(getByTestId('current').textContent).toBe('0');
    fireEvent.click(getByText('increment'));
    expect(getByTestId('previous').textContent).toBe('0');
    expect(getByTestId('current').textContent).toBe('1');
    fireEvent.click(getByText('increment'));
    expect(getByTestId('previous').textContent).toBe('1');
    expect(getByTestId('current').textContent).toBe('2');
  });
});
