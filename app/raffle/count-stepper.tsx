import * as React from 'react';
import * as numberInput from '@zag-js/number-input';
import { useMachine, normalizeProps } from '@zag-js/react';

export default function CountStepper({
  inputId,
  inputName,
  labelText,
  min,
  max,
  defaultValue,
}: CountStepperProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [state, send] = useMachine(
    numberInput.machine({
      id: inputId,
      name: inputName,
      value: defaultValue,
      formatOptions: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      min,
      max,
      onFocusChange: ({ focused }) => {
        if (inputRef.current && focused) {
          inputRef.current.select();
        }
      },
    }),
  );

  const api = numberInput.connect(state, send, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      <label
        className="mb-4 block cursor-pointer text-xl text-primary sm:text-2xl"
        {...api.getLabelProps()}
      >
        {labelText}
      </label>
      <div className="flex">
        <button
          type="button"
          className="h-16 w-16 cursor-pointer p-2 disabled:cursor-not-allowed disabled:opacity-20"
          data-testid="decrement-button"
          {...api.getDecrementTriggerProps()}
        >
          <svg
            height="100%"
            width="100%"
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
          ref={inputRef}
          className="w-16 border border-solid border-current py-1 text-center text-2xl"
          id={inputId}
          name={inputName}
          inputMode="numeric"
          pattern="[0-9]*"
          required
          {...api.getInputProps()}
        />
        <button
          type="button"
          className="h-16 w-16 cursor-pointer p-2 disabled:cursor-not-allowed disabled:opacity-20"
          data-testid="increment-button"
          {...api.getIncrementTriggerProps()}
        >
          <svg
            height="100%"
            width="100%"
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
      </div>
    </div>
  );
}

interface CountStepperProps {
  inputId: string;
  inputName: string;
  labelText: string;
  min: number;
  max: number;
  defaultValue: string;
}
