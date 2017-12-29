import React from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-primitive';

const CountStepper = ({ field, form: { setFieldValue } }) => (
  <Stepper
    min={1}
    max={9}
    defaultValue={field.value}
    onChange={value => setFieldValue(field.name, value)}
    render={({ getInputProps, getIncrementProps, getDecrementProps }) => (
      <span className="flex flex-row">
        <button
          type="button"
          className="bn bg-transparent h3 w3 pointer"
          {...getDecrementProps()}
        >
          <img src="/static/down.svg" alt="decrement" />
        </button>
        <input className="tc w3 f3 pv1" {...field} {...getInputProps()} />
        <button
          type="button"
          className="bn bg-transparent h3 w3 pointer"
          {...getIncrementProps()}
        >
          <img src="/static/up.svg" alt="increment" />
        </button>
      </span>
    )}
  />
);

CountStepper.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default CountStepper;
