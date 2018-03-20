import React from 'react';
import { render, Simulate } from 'react-testing-library';
import CountStepper from './CountStepper';

const countStepperProps = {
  inputId: 'foo',
  field: {
    name: 'foo',
    value: 5,
    onChange: jest.fn(),
  },
  form: {
    setFieldValue: jest.fn(),
  },
};

describe('CountStepper', () => {
  const { container, queryByTestId } = render(
    <CountStepper {...countStepperProps} />,
  );

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it('increments', () => {
    const initialValue = parseInt(queryByTestId('count-input').value, 10);
    Simulate.click(queryByTestId('increment-button'));
    expect(parseInt(queryByTestId('count-input').value, 10)).toBe(
      initialValue + 1,
    );
  });

  it('decrements', () => {
    const initialValue = parseInt(queryByTestId('count-input').value, 10);
    Simulate.click(queryByTestId('decrement-button'));
    expect(parseInt(queryByTestId('count-input').value, 10)).toBe(
      initialValue - 1,
    );
  });
});
