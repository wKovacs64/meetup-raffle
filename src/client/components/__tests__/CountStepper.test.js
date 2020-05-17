import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountStepper from '../CountStepper';

const countStepperProps = {
  defaultValue: 5,
  inputId: 'foo',
  labelText: 'Count:',
};

describe('CountStepper', () => {
  it('increments', () => {
    render(<CountStepper {...countStepperProps} />);
    const initialValue = parseInt(
      screen.getByLabelText(countStepperProps.labelText).value,
      10,
    );

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    expect(
      parseInt(screen.getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue + 1);
  });

  it('decrements', () => {
    render(<CountStepper {...countStepperProps} />);
    const initialValue = parseInt(
      screen.getByLabelText(countStepperProps.labelText).value,
      10,
    );

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));

    expect(
      parseInt(screen.getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue - 1);
  });

  it('accepts manual user input', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialValue = parseInt(input.value, 10);
    expect(initialValue).not.toEqual(3);

    input.focus();
    fireEvent.change(input, { target: { value: '3' } });
    input.blur();

    expect(parseInt(input.value, 10)).toBe(3);
  });

  it('coerces invalid input to the default value', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);

    input.focus();
    fireEvent.change(input, { target: { value: '-' } });
    input.blur();

    expect(parseInt(input.value, 10)).toBe(countStepperProps.defaultValue);
  });

  it('maintains current value on blur when no changes were made', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialValue = input.value;

    input.focus();
    input.blur();

    expect(input.value).toBe(initialValue);
  });
});
