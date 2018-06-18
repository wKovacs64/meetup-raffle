import React from 'react';
import { renderIntoDocument, cleanup, fireEvent } from 'react-testing-library';
import ResetButtons from './ResetButtons';

describe('ResetButtons', () => {
  const onReset = jest.fn();
  const onSubmit = jest.fn();

  afterAll(cleanup);

  it('renders', () => {
    const { container } = renderIntoDocument(
      <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onReset appropriately', () => {
    const { getByText } = renderIntoDocument(
      <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(onReset).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('Reset'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit appropriately', () => {
    const { getByText } = renderIntoDocument(
      <ResetButtons onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(onSubmit).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('Draw Again'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
