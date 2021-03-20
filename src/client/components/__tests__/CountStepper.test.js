import React from 'react';
import { render, screen, user } from '../../../test/utils';
import CountStepper from '../CountStepper';

const countStepperProps = {
  defaultValue: 5,
  inputId: 'foo',
  labelText: 'Count:',
};

describe('CountStepper', () => {
  it('increments', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialIntValue = parseInt(input.value, 10);

    user.click(screen.getByRole('button', { name: /increment/i }));

    expect(parseInt(input.value, 10)).toBe(initialIntValue + 1);
  });

  it('decrements', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialIntValue = parseInt(input.value, 10);

    user.click(screen.getByRole('button', { name: /decrement/i }));

    expect(parseInt(input.value, 10)).toBe(initialIntValue - 1);
  });

  it('accepts manual user input', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    expect(input).not.toHaveValue('3');

    user.type(input, '3');
    user.tab();

    expect(input).toHaveValue('3');
  });

  it('coerces invalid input to the default value', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);

    user.type(input, '-');
    user.tab();

    expect(parseInt(input.value, 10)).toBe(countStepperProps.defaultValue);
  });

  it('maintains current value on blur when no changes were made', () => {
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialValue = input.value;

    user.click(input);
    user.tab();

    expect(input).toHaveValue(initialValue);
  });
});
