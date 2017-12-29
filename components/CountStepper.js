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
      <span className="mh3-ns">
        <button
          type="button"
          className="bn bg-transparent w2 pointer"
          {...getDecrementProps()}
        >
          <img src="/static/minus.svg" alt="minus" />
        </button>
        <input className="tc w2 pv1" {...field} {...getInputProps()} />
        <button
          type="button"
          className="bn bg-transparent w2 pointer"
          {...getIncrementProps()}
        >
          <img src="/static/plus.svg" alt="plus" />
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
