import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-primitive';

const CountStepper = ({
  inputId,
  labelText,
  field,
  form: { setFieldValue },
}) => (
  <Stepper
    enableReinitialize
    min={1}
    max={9}
    defaultValue={parseInt(field.value, 10)}
    onChange={value => setFieldValue(field.name, value)}
    render={({ getInputProps, getIncrementProps, getDecrementProps }) => (
      <Fragment>
        {labelText && (
          <div className="mb3">
            <label className="f4 f3-ns lh-copy dark-blue" htmlFor={inputId}>
              {labelText}
            </label>
          </div>
        )}
        <span className="flex flex-row">
          <button
            aria-label="decrement"
            type="button"
            className="bn bg-transparent near-black h3 w3 pointer"
            data-testid="decrement-button"
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
            data-testid="increment-button"
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
      </Fragment>
    )}
  />
);

CountStepper.propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  field: PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

CountStepper.defaultProps = {
  labelText: '',
};

CountStepper.displayName = 'CountStepper';

export default CountStepper;
