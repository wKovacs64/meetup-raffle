import * as React from 'react';
import { render, screen, userEvent } from '../../../../test/utils';
import CountStepper from '../CountStepper';

const countStepperProps = {
  defaultValue: 5,
  inputId: 'foo',
  labelText: 'Count:',
};

describe('CountStepper', () => {
  it('increments', async () => {
    const user = userEvent.setup();
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialIntValue = parseInt(input.value, 10);

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(parseInt(input.value, 10)).toBe(initialIntValue + 1);
  });

  it('decrements', async () => {
    const user = userEvent.setup();
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialIntValue = parseInt(input.value, 10);

    await user.click(screen.getByRole('button', { name: /decrement/i }));

    expect(parseInt(input.value, 10)).toBe(initialIntValue - 1);
  });

  it('accepts manual user input', async () => {
    const user = userEvent.setup();
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    expect(input).not.toHaveValue('3');

    await user.type(input, '3');
    await user.tab();

    expect(input).toHaveValue('3');
  });

  it('coerces invalid input to the default value', async () => {
    const user = userEvent.setup();
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);

    await user.type(input, '-');
    await user.tab();

    expect(parseInt(input.value, 10)).toBe(countStepperProps.defaultValue);
  });

  it('maintains current value on blur when no changes were made', async () => {
    const user = userEvent.setup();
    render(<CountStepper {...countStepperProps} />);
    const input = screen.getByLabelText(countStepperProps.labelText);
    const initialValue = input.value;

    await user.click(input);
    await user.tab();

    expect(input).toHaveValue(initialValue);
  });
});
