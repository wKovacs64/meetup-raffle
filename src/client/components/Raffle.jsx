import * as React from 'react';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { SpinnerRoundOutlined } from 'spinners-react';
import { persist, restore } from '../persistence';
import CountStepper from './CountStepper';
import ErrorMessage from './ErrorMessage';
import ResetButtons from './ResetButtons';
import Winners from './Winners';

const initialContext = {
  count: '1',
  meetup: '',
  winners: [],
  error: '',
  lastKnownGoodCount: undefined,
};

function isCountValid(ctx) {
  return ctx.count.length > 0 && parseInt(ctx.count, 10) > 0;
}

function isMeetupValid(ctx) {
  return ctx.meetup.length > 0;
}

const raffleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCcCGAzdAbMA6AlgHb4Au+qW+AXkVAMSKgAOA9rKfi4YyAB6IAmAAwBWXEIAsATgCMADgDs8mcKkSBAGhABPRAFphuAGwCFAZiMq5QhZNsSAvg61pMOXGEIkwyWgBFUElRcAGMWAFcvAkIANwp8CAYkEFZ2Mi4efgQ5GVwZGWkJOREzMxkpUxEtXQQRQyFTIzNTAUVzIycXDGw8T29fQigAoNCIqLjKRJ5UjgzkrIUxEVk6mWWZEyMJKp1BBSljDaLZBQEjSRkzTpBXHo8vH39A4IBbMDAScKZoiYSk5jYs2480QUjM4iEzSkcgElzkclKCmqoLkRmMZTBZgUShECiMcmut3cfUeg2Gr3en2+vymyRm6WBoCyilwEn2ihUpzKOORCAURWMQlRzSM+0ukMJ3WJDwGQ2edAAygBRAAqAH0AMIAeQAqgA5FXTQEMzKIZpyXA5fmLASyCQqIy8vQSIR5UxmOqLaFNNmSty9GVPIKK1VqgCyStVOoACka0pxGXwzQJLdYBEURAVIVIFHInS63eZPcthb7nDcpQH+kHUIqdQAhMMASUNdONCdNtRkrtKtvTMlz60kvK2B1aIjkUmWkknZgJ5aJeGQcHCWBIsFwEA+PheRFoACUV2v-il23MmYg4RJjHjjqOJGYpI7dggjEYxLnttCcgIyhs-Xcy6wKu650Puqr7gAmnGQKdvkIiuu+qJpgOUhCmYvITmIaEIWYQj4ZczSOAula4EBIGwGBSrKq2ALxueSYIGskKslIOaXCID4iMsSIvvaPYCMIj42JCQhbB0JH+rgwEAEa7iQZCDHQEBcHgRAxCwADWeAQGgADuMEmiCTEqCmtoVDmphFA+EgjhIaKtPZlxNPIdgAe4snyYp9A+MgLDILgTBYIE6D+S8m76YZHbGfkzTiNYlgiPiorQryiyuo5TSPtisLSE45aECwW7wMki7RBw8Q0IMUUMVkHGstx6hsvY8gVE6GzglOb5CGoc6nN2IjuVWpJyiMYSRCQPzxBANWJnVGyWtIGJCosFgPry6gWiURRYpCMJqEN9zVmSzyjBNuA0rNna2haCLSHUagVLFz41JtuDbQithzraxFdFJJKyuSZ1eFdxmZu9KywusmwSPZvLCGilhbLOCI9dsAiHQDNa4G8HxfFNkygxeTFmNe+FQo+20mHmL6TharS5XhLlToNkl3FjJ0jLjVIXdNROMa0aJqN1IrFAjvJ07gDMFEzGK4pjgacxSeNMPzWRNKy7JKC03JrDsNSimI5zCq0k4mGJCvHaNqBq3sENrFDsgw3DtMpkjbIIcISWcazf2AUe66btuyC7sQgyHsBa62yTti4I9iiiIseI0zUuIHC6ntwmm2yHeRa4bsBIQhHAJV0bBMUZ5aTTQpmk6tG1tPLHkb7FJmdQPo+ucBxuvn+dHaxse9yj4e+MMYS+Si5JllwVNZuZd5H6796TQvSAnuK4vimFiayogNAPxQFMUh2eaQ3nR+YuT5PktjFGxQq2S+WVS3fzTZpYUhDdH4LrKs0NnLDF6+hfxCySucCoDNZb5QcEAA */
  createMachine(
    {
      context: initialContext,
      id: 'raffle',
      initial: 'initializing',
      states: {
        initializing: {
          entry: 'restoreSettings',
          always: {
            target: 'enteringData',
          },
        },
        enteringData: {
          entry: 'reset',
          type: 'parallel',
          states: {
            count: {
              initial: 'invalid',
              states: {
                invalid: {
                  always: {
                    cond: 'isCountValid',
                    target: 'valid',
                  },
                },
                valid: {
                  always: {
                    cond: 'isCountInvalid',
                    target: 'invalid',
                  },
                },
              },
            },
            meetup: {
              initial: 'invalid',
              states: {
                invalid: {
                  always: {
                    cond: 'isMeetupValid',
                    target: 'valid',
                  },
                },
                valid: {
                  always: {
                    cond: 'isMeetupInvalid',
                    target: 'invalid',
                  },
                },
              },
            },
          },
          on: {
            SET_COUNT: {
              actions: 'assignCount',
            },
            SET_MEETUP: {
              actions: 'assignMeetup',
            },
            SUBMIT: {
              cond: 'isFormValid',
              target: 'submitting',
            },
          },
        },
        submitting: {
          entry: ['reset', 'persistSettings'],
          invoke: {
            src: 'fetchRaffleWinners',
            id: 'draw',
            onDone: [
              {
                actions: 'assignWinners',
                target: 'results',
              },
            ],
            onError: [
              {
                actions: 'assignError',
                target: 'results',
              },
            ],
          },
        },
        results: {
          initial: 'determiningResult',
          states: {
            determiningResult: {
              always: [
                {
                  cond: 'hasError',
                  target: 'error',
                },
                {
                  target: 'success',
                },
              ],
            },
            success: {},
            error: {},
          },
          on: {
            RETRY: {
              target: 'submitting',
            },
            RESET: {
              target: 'enteringData',
            },
          },
        },
      },
    },
    {
      actions: {
        reset: assign({
          winners: initialContext.winners,
          error: initialContext.error,
          lastKnownGoodCount: (ctx) => parseInt(ctx.count, 10),
        }),
        assignCount: assign({ count: (_, event) => event.count }),
        assignMeetup: assign({ meetup: (_, event) => event.meetup }),
        assignWinners: assign({ winners: (_, event) => event.data }),
        assignError: assign({ error: (_, event) => event.data.message }),
        persistSettings: (ctx) => {
          persist('count', ctx.count);
          persist('meetup', ctx.meetup);
        },
        restoreSettings: assign({
          count: () => restore('count') ?? initialContext.count,
          meetup: () => restore('meetup') ?? initialContext.meetup,
        }),
      },
      guards: {
        isCountValid,
        isCountInvalid: (ctx) => !isCountValid(ctx),
        isMeetupValid,
        isMeetupInvalid: (ctx) => !isMeetupValid(ctx),
        // TODO: remove once XState `cond` accepts an array of guards
        isFormValid: (ctx) => isCountValid(ctx) && isMeetupValid(ctx),
        hasError: (ctx) => ctx.error.length > 0,
      },
      services: {
        fetchRaffleWinners: async (ctx) => {
          const { count, meetup } = ctx;
          const drawUrl = new URL(
            '/.netlify/functions/draw',
            window.location.href,
          );
          drawUrl.search = new URLSearchParams({ meetup, count }).toString();

          const res = await window.fetch(drawUrl);
          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data?.error?.message || /* c8 ignore next */ res.statusText,
            );
          }
          if (!data.winners) throw new Error('Malformed response received.');

          return data.winners;
        },
      },
    },
  );

function Raffle() {
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
              className="w-full border border-solid border-current bg-white py-4 px-16 font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:w-64 sm:text-xl"
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

Raffle.displayName = 'Raffle';

export default Raffle;
