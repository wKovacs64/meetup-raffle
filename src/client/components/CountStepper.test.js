import React from 'react';
import { renderIntoDocument, cleanup, fireEvent } from 'react-testing-library';
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
  afterAll(cleanup);

  const { container, getByLabelText, getByTestId } = renderIntoDocument(
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
    fireEvent.click(getByTestId('increment-button'));
    expect(
      parseInt(getByLabelText(countStepperProps.labelText).value, 10),
    ).toBe(initialValue + 1);
  });

  it('decrements', () => {
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
