import React from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-primitive';

const CountStepper = ({ inputId, field, form: { setFieldValue } }) => (
  <Stepper
    min={1}
    max={9}
    defaultValue={field.value}
    onChange={value => setFieldValue(field.name, value)}
    render={({ getInputProps, getIncrementProps, getDecrementProps }) => (
      <span className="flex flex-row">
        <button
          aria-label="decrement"
          type="button"
          className="bn bg-transparent near-black h3 w3 pointer"
          {...getDecrementProps()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 40 40"
            preserveAspectRatio="xMidYMid meet"
          >
            <g>
              <path d="m22.5 17.5v-5h-5v5h-5l7.5 10 7.5-10h-5z" />
            </g>
          </svg>
        </button>
        <input
          id={inputId}
          className="tc near-black w3 f3 pv1"
          {...field}
          {...getInputProps()}
        />
        <button
          aria-label="increment"
          type="button"
          className="bn bg-transparent near-black h3 w3 pointer"
          {...getIncrementProps()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 40 40"
            preserveAspectRatio="xMidYMid meet"
          >
            <g>
              <path d="m20 12.5l-7.5 10h5v5h5v-5h5l-7.5-10z" />
            </g>
          </svg>
        </button>
      </span>
    )}
  />
);

CountStepper.propTypes = {
  inputId: PropTypes.string.isRequired,
  field: PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default CountStepper;
