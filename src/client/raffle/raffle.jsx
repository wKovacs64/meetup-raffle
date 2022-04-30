import * as React from 'react';
import { useMachine } from '@xstate/react';
import { SpinnerRoundOutlined } from 'spinners-react';
import CountStepper from './count-stepper';
import ErrorMessage from './error-message';
import ResetButtons from './reset-buttons';
import Winners from './winners';
import { raffleMachine } from './raffle-machine';

export default function Raffle() {
  const [state, send] = useMachine(raffleMachine, {
    devTools: import.meta.env.DEV,
  });
  const { meetup, winners, error, lastKnownGoodCount } = state.context;

  const handleNewCountValue = React.useCallback(
    (newCount) => {
      send({ type: 'SET_COUNT', count: newCount });
    },
    [send],
  );

  function handleMeetupChange(e) {
    send({ type: 'SET_MEETUP', meetup: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    send('SUBMIT');
  }

  if (state.matches('enteringData')) {
    const isFormInvalid = [
      'enteringData.count.invalid',
      'enteringData.meetup.invalid',
    ].some(state.matches);

    return (
      <form onSubmit={handleSubmit}>
        <div className="mt-4 mb-8 sm:mt-8">
          <label
            className="block cursor-pointer text-xl text-primary sm:text-2xl"
            htmlFor="meetup"
          >
            Meetup name (from your URL):
          </label>
          <input
            className="mt-4 w-full border-8 border-gray-300 p-2 text-xl sm:text-2xl"
            type="text"
            id="meetup"
            name="meetup"
            value={meetup}
            onChange={handleMeetupChange}
            onFocus={(e) => {
              e.target.select();
            }}
            placeholder="required"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            required
          />
        </div>
        <div className="my-8 flex flex-col items-center sm:flex-row sm:items-end sm:justify-around">
          <CountStepper
            inputId="count"
            labelText="Number of winners:"
            min={1}
            max={9}
            defaultValue={lastKnownGoodCount}
            onNewValue={handleNewCountValue}
          />
          <div className="my-8 w-full sm:my-0 sm:w-auto">
            <button
              className="w-full border border-solid border-current bg-white py-4 px-16 font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64 sm:text-xl"
              type="submit"
              disabled={isFormInvalid}
            >
              Draw
            </button>
          </div>
        </div>
      </form>
    );
  }

  if (state.matches('submitting')) {
    return (
      <div className="mt-4 flex flex-shrink-0 flex-grow flex-wrap items-center justify-center sm:mt-8 sm:items-start">
        <div className="h-32 w-32 text-primary" data-testid="loading">
          <SpinnerRoundOutlined size={128} color="currentColor" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-8">
      {state.matches('results.success') && <Winners winners={winners} />}
      {state.matches('results.error') && <ErrorMessage problemText={error} />}
      <ResetButtons
        onReset={() => {
          send('RESET');
        }}
        onRetry={() => {
          send('RETRY');
        }}
      />
    </div>
  );
}
