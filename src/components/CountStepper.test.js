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
  const { container, getByTestId } = render(
    <CountStepper {...countStepperProps} />,
  );

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it('increments', () => {
    const initialValue = parseInt(getByTestId('count-input').value, 10);
    Simulate.click(getByTestId('increment-button'));
    expect(parseInt(getByTestId('count-input').value, 10)).toBe(
      initialValue + 1,
    );
  });

  it('decrements', () => {
    const initialValue = parseInt(getByTestId('count-input').value, 10);
    Simulate.click(getByTestId('decrement-button'));
    expect(parseInt(getByTestId('count-input').value, 10)).toBe(
      initialValue - 1,
    );
  });
});
