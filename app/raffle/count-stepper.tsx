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
  const [state, send] = useMachine(
    numberInput.machine({
      id: inputId,
      name: inputName,
      value: defaultValue,
      minFractionDigits: 0,
      maxFractionDigits: 0,
      min,
      max,
      onFocus: ({ srcElement }) => {
        if (isInputElement(srcElement)) {
          srcElement.select();
        }
      },
    }),
  );

  const api = numberInput.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps}>
      <label
        className="mb-4 block cursor-pointer text-xl text-primary sm:text-2xl"
        {...api.labelProps}
      >
        {labelText}
      </label>
      <div className="flex">
        <button
          type="button"
          className="h-16 w-16 cursor-pointer p-2 disabled:cursor-not-allowed disabled:opacity-20"
          data-testid="decrement-button"
          {...api.decrementButtonProps}
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
          className="w-16 border border-solid border-current py-1 text-center text-2xl"
          id={inputId}
          name={inputName}
          inputMode="numeric"
          pattern="[0-9]*"
          {...api.inputProps}
        />
        <button
          type="button"
          className="h-16 w-16 cursor-pointer p-2 disabled:cursor-not-allowed disabled:opacity-20"
          data-testid="increment-button"
          {...api.incrementButtonProps}
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

function isInputElement(
  element: HTMLElement | null,
): element is HTMLInputElement {
  return element !== null && element.tagName === 'INPUT';
}
