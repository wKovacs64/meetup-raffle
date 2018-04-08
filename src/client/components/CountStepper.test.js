import React from 'react';
import { render, Simulate } from 'react-testing-library';
import CountStepper from './CountStepper';

const countStepperProps = {
  inputId: 'foo',
  labelText: 'Count:',
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
  const { container, getByLabelText, getByTestId } = render(
    <CountStepper {...countStepperProps} />,
  );

  it('renders', () => {
    expect(container.firstChild).toMatchSnapshot();
  });

  it('increments', () => {
    const initialValue = parseInt(
      getByLabelText(countStepperProps.labelText).value,
      10,
    );
    Simulate.click(getByTestId('increment-button'));
    expect(
      parseInt(getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue + 1);
  });

  it('decrements', () => {
    const initialValue = parseInt(
      getByLabelText(countStepperProps.labelText).value,
      10,
    );
    Simulate.click(getByTestId('decrement-button'));
    expect(
      parseInt(getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue - 1);
  });
});
