import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
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

    user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByTestId('previous')).toHaveTextContent('0');
    expect(screen.getByTestId('current')).toHaveTextContent('1');

    user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByTestId('previous')).toHaveTextContent('1');
    expect(screen.getByTestId('current')).toHaveTextContent('2');
  });
});
