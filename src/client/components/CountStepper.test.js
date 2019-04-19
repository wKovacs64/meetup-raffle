import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import CountStepper from './CountStepper';

const countStepperProps = {
  defaultValue: 5,
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

  it('accepts manual user input', () => {
    const { getByLabelText } = render(<CountStepper {...countStepperProps} />);
    const input = getByLabelText(countStepperProps.labelText);
    const initialValue = parseInt(input.value, 10);
    expect(initialValue).not.toEqual(3);

    input.focus();
    fireEvent.change(input, { target: { value: '3' } });
    input.blur();

    expect(parseInt(input.value, 10)).toBe(3);
  });

  it('coerces invalid input to the default value', () => {
    const { getByLabelText } = render(<CountStepper {...countStepperProps} />);
    const input = getByLabelText(countStepperProps.labelText);

    input.focus();
    fireEvent.change(input, { target: { value: '-' } });
    input.blur();

    expect(parseInt(input.value, 10)).toBe(countStepperProps.defaultValue);
  });

  it('maintains current value on blur when no changes were made', () => {
    const { getByLabelText } = render(<CountStepper {...countStepperProps} />);
    const input = getByLabelText(countStepperProps.labelText);
    const initialValue = input.value;

    input.focus();
    input.blur();

    expect(input.value).toBe(initialValue);
  });
});
