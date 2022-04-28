import * as React from 'react';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import RingLoader from 'react-spinners/RingLoader';
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

const raffleMachine = createMachine(
  {
    id: 'raffle',
    initial: 'initializing',
    context: initialContext,
    states: {
      initializing: {
        entry: 'restoreSettings',
        always: 'enteringData',
      },
      enteringData: {
        id: 'enteringData',
        entry: 'reset',
        on: {
          SET_COUNT: {
            actions: ['assignCount'],
          },
          SET_MEETUP: {
            actions: ['assignMeetup'],
          },
          SUBMIT: {
            target: 'submission',
            cond: 'isFormValid',
          },
        },
        type: 'parallel',
        states: {
          count: {
            initial: 'invalid',
            states: {
              invalid: {
                always: [
                  {
                    target: 'valid',
                    cond: 'isCountValid',
                  },
                ],
              },
              valid: {
                always: [
                  {
                    target: 'invalid',
                    cond: 'isCountInvalid',
                  },
                ],
              },
            },
          },
          meetup: {
            initial: 'invalid',
            states: {
              invalid: {
                always: [
                  {
                    target: 'valid',
                    cond: 'isMeetupValid',
                  },
                ],
              },
              valid: {
                always: [
                  {
                    target: 'invalid',
                    cond: 'isMeetupInvalid',
                  },
                ],
              },
            },
          },
        },
      },
      submission: {
        entry: ['reset', 'persistSettings'],
        initial: 'pending',
        states: {
          pending: {
            invoke: {
              id: 'fetchRaffleWinners',
              src: 'fetchRaffleWinners',
              onDone: {
                actions: ['assignWinners'],
                target: 'idle.success',
              },
              onError: {
                actions: ['assignError'],
                target: 'idle.failure',
              },
            },
          },
          idle: {
            states: {
              success: {},
              failure: {},
            },
            on: {
              RESET: '#enteringData',
              RETRY: 'pending',
            },
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
    devTools: process.env.NODE_ENV === 'development',
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

  if (state.matches('submission.pending')) {
    return (
      <div className="mt-4 flex flex-shrink-0 flex-grow flex-wrap items-center justify-center sm:mt-8 sm:items-start">
        <div className="h-32 w-32" data-testid="RingLoader">
          <RingLoader size={128} color="#00449e" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-8">
      {state.matches('submission.idle.success') && (
        <Winners winners={winners} />
      )}
      {state.matches('submission.idle.failure') && (
        <ErrorMessage problemText={error} />
      )}
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
