// Adapted from https://github.com/ajoslin/react-stepper-primitive
import React from 'react';
import mergeRefs from './merge-refs';
import callAll from './call-all';
import usePrevious from './use-previous';

function useStepper({
  defaultValue = 0,
  step = 1,
  min = -Number.MAX_VALUE,
  max = Number.MAX_VALUE,
  enableReinitialize = false,
  onNewValue = () => {},
  reducer: userReducer,
} = {}) {
  const previousDefaultValue = usePrevious(defaultValue);
  const inputRef = React.useRef();

  const validValueClosestTo = React.useCallback(
    newValue => {
      return Math.min(max, Math.max(newValue, min));
    },
    [max, min],
  );

  const initialState = { value: defaultValue };

  const defaultReducer = React.useCallback(
    (state, action) => {
      switch (action.type) {
        case useStepper.actionTypes.increment: {
          const newValue = validValueClosestTo(state.value + step);
          if (newValue !== state.value) {
            return { value: newValue };
          }
          return state;
        }
        case useStepper.actionTypes.decrement: {
          const newValue = validValueClosestTo(state.value - step);
          if (newValue !== state.value) {
            return { value: newValue };
          }
          return state;
        }
        case useStepper.actionTypes.coerce: {
          const newValue = validValueClosestTo(
            Number.isNaN(action.payload) ? defaultValue : action.payload,
          );
          if (newValue !== state.value) {
            return { value: newValue };
          }
          return state;
        }
        case useStepper.actionTypes.setValue: {
          if (action.payload !== state.value) {
            return { value: action.payload };
          }
          return state;
        }
        /* istanbul ignore next: this will never happen */
        default:
          throw new Error(`Unsupported action type: ${action.type}`);
      }
    },
    [validValueClosestTo, defaultValue, step],
  );

  // Expose our internal/default reducer
  useStepper.defaultReducer = defaultReducer;

  const [{ value }, dispatch] = React.useReducer(
    userReducer || defaultReducer,
    initialState,
  );

  const setValue = React.useCallback(newValue => {
    dispatch({
      type: useStepper.actionTypes.setValue,
      payload: newValue,
    });
  }, []);

  const setValueClosestTo = React.useCallback(
    newValue => {
      setValue(validValueClosestTo(newValue));
    },
    [validValueClosestTo, setValue],
  );

  function handleIncrement() {
    dispatch({ type: useStepper.actionTypes.increment });
  }

  function handleDecrement() {
    dispatch({ type: useStepper.actionTypes.decrement });
  }

  function handleFocus() {
    inputRef.current.value = value;
    inputRef.current.select();
  }

  function handleBlur() {
    dispatch({
      type: useStepper.actionTypes.coerce,
      payload: parseFloat(inputRef.current.value),
    });
  }

  function handleChange(ev) {
    setValue(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    inputRef.current.blur();
  }

  function getFormProps(formProps = {}) {
    const { onSubmit, ...otherFormProps } = formProps;
    return {
      ...otherFormProps,
      onSubmit: callAll(handleSubmit, onSubmit),
    };
  }

  function getIncrementProps(incrementProps = {}) {
    const { onClick, ...otherIncrementProps } = incrementProps;
    return {
      ...otherIncrementProps,
      onClick: callAll(handleIncrement, onClick),
    };
  }

  function getDecrementProps(decrementProps = {}) {
    const { onClick, ...otherDecrementProps } = decrementProps;
    return {
      ...otherDecrementProps,
      onClick: callAll(handleDecrement, onClick),
    };
  }

  function getInputProps(inputProps = {}) {
    const { ref, onBlur, onFocus, onChange, ...otherInputProps } = inputProps;
    return {
      ...otherInputProps,
      type: 'text',
      value: String(value),
      ref: mergeRefs(ref, inputRef),
      onBlur: callAll(handleBlur, onBlur),
      onFocus: callAll(handleFocus, onFocus),
      onChange: callAll(handleChange, onChange),
    };
  }

  // Notify the caller when the value has been updated to a valid number
  React.useEffect(() => {
    const numericValue = parseFloat(value);
    if (!Number.isNaN(numericValue)) {
      onNewValue(numericValue);
    }
  }, [onNewValue, value]);

  // If the `defaultValue` parameter changes and the current value is still the
  // original default value (e.g. the user hasn't changed it), update the value
  // to the new default. This behavior is enabled via the `enableReinitialize`
  // parameter.
  React.useEffect(() => {
    if (
      enableReinitialize &&
      previousDefaultValue !== defaultValue &&
      previousDefaultValue === value
    ) {
      setValue(validValueClosestTo(defaultValue));
    }
  }, [
    enableReinitialize,
    defaultValue,
    previousDefaultValue,
    value,
    validValueClosestTo,
    setValue,
  ]);

  return {
    value: String(value),
    setValue: setValueClosestTo,
    increment: handleIncrement,
    decrement: handleDecrement,
    getFormProps,
    getInputProps,
    getIncrementProps,
    getDecrementProps,
  };
}

// useStepper reducer action types
useStepper.actionTypes = {
  increment: 'increment',
  decrement: 'decrement',
  coerce: 'coerce',
  setValue: 'setValue',
};

export default useStepper;
