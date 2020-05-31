import React from 'react';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { render } from '../../../../test/utils';
import ResetButtons from '../ResetButtons';

describe('ResetButtons', () => {
  const onReset = jest.fn();
  const onRetry = jest.fn();

  it('renders', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(
      screen.getByRole('button', { name: 'Start Over' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Draw Again' }),
    ).toBeInTheDocument();
  });

  it('calls onReset appropriately', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(onReset).toHaveBeenCalledTimes(0);
    user.click(screen.getByRole('button', { name: 'Start Over' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onRetry appropriately', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(onRetry).toHaveBeenCalledTimes(0);
    user.click(screen.getByRole('button', { name: 'Draw Again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
