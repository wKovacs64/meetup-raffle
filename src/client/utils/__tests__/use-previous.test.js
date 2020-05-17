import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { usePrevious } from '../use-previous';

describe('usePrevious', () => {
  it('returns the value of a variable from the previous render', () => {
    function Comp() {
      const [currentValue, setCurrentValue] = React.useState(0);
      const previousValue = usePrevious(currentValue);

      function increment() {
        setCurrentValue((value) => value + 1);
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

    render(<Comp />);
    expect(screen.getByTestId('previous')).toHaveTextContent('');
    expect(screen.getByTestId('current')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('increment'));

    expect(screen.getByTestId('previous')).toHaveTextContent('0');
    expect(screen.getByTestId('current')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('increment'));

    expect(screen.getByTestId('previous')).toHaveTextContent('1');
    expect(screen.getByTestId('current')).toHaveTextContent('2');
  });
});
