import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { getByText } = render(
      <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(onReset).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('Reset'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit appropriately', () => {
    const { getByText } = render(
      <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(onSubmit).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('Draw Again'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
