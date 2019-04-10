import React from 'react';
import { render, fireEvent } from 'react-testing-library';
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
  it('renders', () => {
    const { container } = render(<CountStepper {...countStepperProps} />);
    expect(container).toMatchSnapshot();
  });

  it('increments', () => {
    const { getByLabelText, getByTestId } = render(
      <CountStepper {...countStepperProps} />,
    );
    const initialValue = parseInt(
      getByLabelText(countStepperProps.labelText).value,
      10,
    );
    fireEvent.click(getByTestId('increment-button'));
    expect(
      parseInt(getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue + 1);
  });

  it('decrements', () => {
    const { getByLabelText, getByTestId } = render(
      <CountStepper {...countStepperProps} />,
    );
    const initialValue = parseInt(
      getByLabelText(countStepperProps.labelText).value,
      10,
    );
    fireEvent.click(getByTestId('decrement-button'));
    expect(
      parseInt(getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue - 1);
  });
});
