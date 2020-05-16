import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetButtons from '../ResetButtons';

describe('ResetButtons', () => {
  const onReset = jest.fn();
  const onSubmit = jest.fn();

  it('renders', () => {
    render(<ResetButtons onReset={onReset} onSubmit={onSubmit} />);

    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /draw again/i }),
    ).toBeInTheDocument();
  });

  it('calls onReset appropriately', () => {
    render(<ResetButtons onReset={onReset} onSubmit={onSubmit} />);

    expect(onReset).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit appropriately', () => {
    render(<ResetButtons onReset={onReset} onSubmit={onSubmit} />);

    expect(onSubmit).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByText('Draw Again'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
