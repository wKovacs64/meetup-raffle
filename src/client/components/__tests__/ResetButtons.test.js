import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetButtons from '../ResetButtons';

describe('ResetButtons', () => {
  const onReset = jest.fn();
  const onRetry = jest.fn();

  it('renders', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /draw again/i }),
    ).toBeInTheDocument();
  });

  it('calls onReset appropriately', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(onReset).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onRetry appropriately', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(onRetry).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByText('Draw Again'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
