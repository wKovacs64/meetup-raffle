// Adapted from https://github.com/ajoslin/react-stepper-primitive
import React from 'react';
import mergeRefs from './merge-refs';
import callAll from './call-all';
import usePrevious from './use-previous';

function useStepper({
  value: controlledValue,
  defaultValue = 0,
  step = 1,
  min = -Number.MAX_VALUE,
  max = Number.MAX_VALUE,
  onChange = () => {},
  enableReinitialize = false,
} = {}) {
  const [currentValue, setCurrentValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const previousDefaultValue = usePrevious(defaultValue);
  const inputRef = React.useRef();

  const isControlled = React.useCallback(() => controlledValue !== undefined, [
    controlledValue,
  ]);

  const setValue = React.useCallback(
    newValue => {
      const adjustedValue = Math.min(max, Math.max(newValue, min));
      if (!isControlled()) {
        setCurrentValue(adjustedValue);
      }
      onChange(adjustedValue);
    },
    [isControlled, max, min, onChange],
  );

  function getValue() {
    return isControlled() ? controlledValue : currentValue;
  }

  function increment() {
    setValue(getValue() + step);
  }

  function decrement() {
    setValue(getValue() - step);
  }

  function handleFocus() {
    /* istanbul ignore if: just a sanity check */
    if (!inputRef.current) {
      return;
    }

    setFocused(true);
    inputRef.current.value = getValue();
    inputRef.current.setSelectionRange(0, 9999);
  }

  function handleBlur() {
    /* istanbul ignore if: just a sanity check */
    if (!inputRef.current) {
      return;
    }

    inputRef.current.blur();
    setFocused(false);

    const inputValue = parseFloat(inputRef.current.value);
    if (Number.isNaN(inputValue) || inputValue === getValue()) {
      return;
    }

    setValue(inputValue);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    handleBlur();
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
      onClick: callAll(onClick, increment),
    };
  }

  function getDecrementProps(decrementProps = {}) {
    const { onClick, ...otherDecrementProps } = decrementProps;
    return {
      ...otherDecrementProps,
      onClick: callAll(onClick, decrement),
    };
  }

  function getInputProps(inputProps = {}) {
    const { ref, onBlur, onFocus, ...otherInputProps } = inputProps;
    return {
      ...otherInputProps,
      type: 'text',
      ref: mergeRefs(ref, inputRef),
      onBlur: callAll(onBlur, handleBlur),
      onFocus: callAll(onFocus, handleFocus),
      // When the input is focused, let the user type freely.
      // When it isn't, lock it to the current value.
      ...(focused ? {} : { value: getValue() }),
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
      previousDefaultValue === currentValue
    ) {
      setValue(defaultValue);
    }
  }, [
    enableReinitialize,
    defaultValue,
    previousDefaultValue,
    currentValue,
    setValue,
  ]);

  return {
    value: getValue(),
    setValue,
    focused,
    increment,
    decrement,
    getFormProps,
    getInputProps,
    getIncrementProps,
    getDecrementProps,
  };
}

export default useStepper;
