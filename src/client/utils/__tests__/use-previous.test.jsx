import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePrevious } from '../use-previous';

describe('usePrevious', () => {
  it('returns the value of a variable from the previous render', async () => {
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
    const user = userEvent.setup();

    render(<Comp />);
    expect(screen.getByTestId('previous')).toHaveTextContent('');
    expect(screen.getByTestId('current')).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByTestId('previous')).toHaveTextContent('0');
    expect(screen.getByTestId('current')).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByTestId('previous')).toHaveTextContent('1');
    expect(screen.getByTestId('current')).toHaveTextContent('2');
  });
});
