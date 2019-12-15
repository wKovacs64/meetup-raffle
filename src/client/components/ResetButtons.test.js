import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetButtons from './ResetButtons';

describe('ResetButtons', () => {
  const onReset = jest.fn();
  const onSubmit = jest.fn();

  it('renders', () => {
    const { container } = render(
      <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(container.firstChild).toMatchSnapshot();
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
