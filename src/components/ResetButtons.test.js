import React from 'react';
import { render, Simulate } from 'react-testing-library';
import ResetButtons from './ResetButtons';

describe('ResetButtons', () => {
  const onReset = jest.fn();
  const onSubmit = jest.fn();

  const { container, getByTestId } = render(
    <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
  );

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it('calls onReset appropriately', () => {
    expect(onReset).toHaveBeenCalledTimes(0);
    Simulate.click(getByTestId('reset-button'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit appropriately', () => {
    expect(onSubmit).toHaveBeenCalledTimes(0);
    Simulate.click(getByTestId('submit-button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
