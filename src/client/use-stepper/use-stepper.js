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
  onNewValue = () => {},
  enableReinitialize = false,
} = {}) {
  const [value, setValue] = React.useState(defaultValue);
  const previousDefaultValue = usePrevious(defaultValue);
  const inputRef = React.useRef();

  const setValueAndNotify = React.useCallback(
    newValue => {
      setValue(newValue);
      onNewValue(parseFloat(newValue));
    },
    [onNewValue],
  );

  const setValueClosestTo = React.useCallback(
    newValue => {
      const adjustedValue = Math.min(max, Math.max(newValue, min));
      setValueAndNotify(adjustedValue);
    },
    [max, min, setValueAndNotify],
  );

  function handleIncrement() {
    setValueClosestTo(value + step);
  }

  function handleDecrement() {
    setValueClosestTo(value - step);
  }

  function handleFocus() {
    inputRef.current.value = value;
    inputRef.current.select();
  }

  function handleBlur() {
    const inputValue = parseFloat(inputRef.current.value);
    setValueClosestTo(Number.isNaN(inputValue) ? defaultValue : inputValue);
  }

  function handleChange(ev) {
    setValueAndNotify(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    inputRef.current.blur();
  }

  function getFormProps(formProps = {}) {
    const { onSubmit, ...otherFormProps } = formProps;
    return {
      ...otherFormProps,
      onSubmit: callAll(onSubmit, handleSubmit),
    };
  }

  function getIncrementProps(incrementProps = {}) {
    const { onClick, ...otherIncrementProps } = incrementProps;
    return {
      ...otherIncrementProps,
      onClick: callAll(onClick, handleIncrement),
    };
  }

  function getDecrementProps(decrementProps = {}) {
    const { onClick, ...otherDecrementProps } = decrementProps;
    return {
      ...otherDecrementProps,
      onClick: callAll(onClick, handleDecrement),
    };
  }

  function getInputProps(inputProps = {}) {
    const { ref, onBlur, onFocus, onChange, ...otherInputProps } = inputProps;
    return {
      ...otherInputProps,
      type: 'text',
      ref: mergeRefs(ref, inputRef),
      onBlur: callAll(onBlur, handleBlur),
      onFocus: callAll(onFocus, handleFocus),
      onChange: callAll(onChange, handleChange),
      value,
    };
  }

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
      setValueClosestTo(defaultValue);
    }
  }, [
    enableReinitialize,
    defaultValue,
    previousDefaultValue,
    value,
    setValueClosestTo,
  ]);

  return {
    value,
    setValue: setValueClosestTo,
    increment: handleIncrement,
    decrement: handleDecrement,
    getFormProps,
    getInputProps,
    getIncrementProps,
    getDecrementProps,
  };
}

export default useStepper;
