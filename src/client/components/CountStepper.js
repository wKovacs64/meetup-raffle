import React from 'react';
import PropTypes from 'prop-types';
import useStepper from '../use-stepper';

const CountStepper = ({
  inputId,
  labelText,
  min,
  max,
  field,
  form: { setFieldValue },
}) => {
  const {
    getInputProps,
    getIncrementProps,
    getDecrementProps,
    value,
  } = useStepper({
    min,
    max,
    enableReinitialize: true,
    defaultValue: parseInt(field.value, 10) || 1,
    onNewValue: newValue => setFieldValue(field.name, newValue),
  });

  return (
    <React.Fragment>
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
          disabled={value <= min}
          className={`bn bg-transparent h3 w3 pointer ${
            value <= min ? 'silver' : 'near-black'
          }`}
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
          pattern="[0-9]*"
          {...getInputProps({ ...field })}
        />
        <button
          aria-label="increment"
          type="button"
          disabled={value >= max}
          className={`bn bg-transparent h3 w3 pointer ${
            value >= max ? 'silver' : 'near-black'
          }`}
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
    </React.Fragment>
  );
};

CountStepper.propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
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
  min: 1,
  max: 9,
};

CountStepper.displayName = 'CountStepper';

export default CountStepper;
