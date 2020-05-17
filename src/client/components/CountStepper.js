import React from 'react';
import PropTypes from 'prop-types';
import useStepper from 'use-stepper';
import { usePrevious } from '../utils';

const CountStepper = ({
  inputId,
  labelText,
  min,
  max,
  defaultValue,
  onNewValue,
  ...otherProps
}) => {
  function validValueClosestTo(newValue) {
    return String(Math.min(max, Math.max(newValue, min)));
  }

  function countReducer(state, action) {
    const integerValue = parseInt(state.value, 10);
    switch (action.type) {
      case useStepper.actionTypes.increment: {
        const newValue = validValueClosestTo(integerValue + 1);
        /* istanbul ignore else: just an optimization to avoid re-renders */
        if (newValue !== state.value) {
          return { value: newValue };
        }
        /* istanbul ignore next: not worth testing */
        return state;
      }
      case useStepper.actionTypes.decrement: {
        const newValue = validValueClosestTo(integerValue - 1);
        /* istanbul ignore else: just an optimization to avoid re-renders */
        if (newValue !== state.value) {
          return { value: newValue };
        }
        /* istanbul ignore next: not worth testing */
        return state;
      }
      case useStepper.actionTypes.coerce: {
        if (Number.isNaN(integerValue)) {
          return { value: String(defaultValue) };
        }
        /* istanbul ignore else: just an optimization to avoid re-renders */
        if (integerValue !== state.value) {
          return { value: validValueClosestTo(integerValue) };
        }
        /* istanbul ignore next: not worth testing */
        return state;
      }
      default:
        return useStepper.defaultReducer(state, action);
    }
  }

  const {
    getInputProps,
    getIncrementProps,
    getDecrementProps,
    value,
  } = useStepper({
    min,
    max,
    defaultValue,
    enableReinitialize: true,
    stateReducer: countReducer,
  });

  const previousValue = usePrevious(value);

  React.useEffect(() => {
    // only call back with a new value if there was a previous value to avoid
    // sending the initial value change to the raffle machine before it's ready
    if (previousValue) onNewValue(value);
  }, [onNewValue, previousValue, value]);

  const numericValue = parseFloat(value);

  return (
    <div {...otherProps}>
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
          disabled={numericValue <= min}
          className={`bn bg-transparent h3 w3 pointer ${
            numericValue <= min ? 'silver' : 'near-black'
          }`}
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
          {...getInputProps({
            onFocus: (e) => {
              e.target.select();
            },
          })}
        />
        <button
          aria-label="increment"
          type="button"
          disabled={numericValue >= max}
          className={`bn bg-transparent h3 w3 pointer ${
            numericValue >= max ? 'silver' : 'near-black'
          }`}
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
    </div>
  );
};

CountStepper.propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.number,
  onNewValue: PropTypes.func,
};

CountStepper.defaultProps = {
  labelText: '',
  min: 1,
  max: 9,
  defaultValue: 1,
  onNewValue: () => {},
};

CountStepper.displayName = 'CountStepper';

export default CountStepper;
