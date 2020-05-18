/** @jsx jsx */
import React from 'react';
import fetch from 'unfetch';
import { jsx, css } from '@emotion/core';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { RingLoader } from 'react-spinners';
import { restore, preserve } from '../persistence';
import CountStepper from './CountStepper';
import ErrorMessage from './ErrorMessage';
import ResetButtons from './ResetButtons';
import Winners from './Winners';

const initialContext = {
  count: restore('count') ?? '1',
  meetup: restore('meetup') ?? '',
  winners: [],
  error: '',
};

const isCountValid = (ctx) =>
  ctx.count.length > 0 && parseInt(ctx.count, 10) > 0;
const isMeetupValid = (ctx) => ctx.meetup.length > 0;

const raffleMachine = createMachine(
  {
    id: 'raffle',
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        entry: 'reset',
        on: {
          SET_COUNT: { actions: ['setCount'] },
          SET_MEETUP: { actions: ['setMeetup'] },
          SUBMIT: {
            target: 'submitting',
            cond: 'isFormValid',
          },
        },
        type: 'parallel',
        states: {
          count: {
            initial: 'invalid',
            states: {
              invalid: {
                on: {
                  '': {
                    target: 'valid',
                    cond: 'isCountValid',
                  },
                },
              },
              valid: {
                on: {
                  '': {
                    target: 'invalid',
                    cond: 'isCountInvalid',
                  },
                },
              },
            },
          },
          meetup: {
            initial: 'invalid',
            states: {
              invalid: {
                on: {
                  '': {
                    target: 'valid',
                    cond: 'isMeetupValid',
                  },
                },
              },
              valid: {
                on: {
                  '': {
                    target: 'invalid',
                    cond: 'isMeetupInvalid',
                  },
                },
              },
            },
          },
        },
      },
      submitting: {
        entry: 'reset',
        invoke: {
          id: 'fetchRaffleWinners',
          src: 'fetchRaffleWinners',
          onDone: {
            target: 'success',
            actions: ['setWinners'],
          },
          onError: {
            target: 'failure',
            actions: ['setError'],
          },
        },
      },
      success: {
        on: {
          RESET: 'idle',
          RETRY: 'submitting',
        },
      },
      failure: {
        on: {
          RESET: 'idle',
          RETRY: 'submitting',
        },
      },
    },
  },
  {
    actions: {
      reset: assign({
        winners: initialContext.winners,
        error: initialContext.error,
      }),
      setCount: assign({ count: (_, event) => event.data }),
      setMeetup: assign({ meetup: (_, event) => event.data }),
      setWinners: assign({ winners: (_, event) => event.data }),
      setError: assign({ error: (_, event) => event.data.message }),
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
        preserve({ meetup, count });

        const drawUrl = new URL(
          '/.netlify/functions/draw',
          window.location.href,
        );
        drawUrl.search = new URLSearchParams({ meetup, count }).toString();

        const res = await fetch(drawUrl);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error?.message || res.statusText);
        if (!data.winners) throw new Error('Malformed response received.');

        return data.winners;
      },
    },
  },
);

const Raffle = () => {
  const [current, send] = useMachine(raffleMachine);
  const { meetup, winners, error } = current.context;

  const handleNewCountValue = React.useCallback(
    (newCount) => {
      send({ type: 'SET_COUNT', data: newCount });
    },
    [send],
  );

  const handleMeetupChange = React.useCallback(
    (e) => {
      send({ type: 'SET_MEETUP', data: e.target.value });
    },
    [send],
  );

  if (current.matches('idle')) {
    const isSubmitDisabled =
      current.matches('idle.count.invalid') ||
      current.matches('idle.meetup.invalid');

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send('SUBMIT');
        }}
      >
        <div className="mt3 mb4 mv4-ns">
          <label className="f4 f3-ns lh-copy dark-blue" htmlFor="meetup">
            Meetup name (from your URL):
          </label>
          <input
            className="input-reset f4 f3-ns near-black ba bw3 b--moon-gray mt3 pa2 w-100"
            type="text"
            id="meetup"
            name="meetup"
            value={meetup}
            onChange={handleMeetupChange}
            onFocus={(e) => {
              e.target.select();
            }}
            placeholder="required"
            required
          />
        </div>
        <div className="flex flex-column flex-row-ns items-end-ns justify-around-ns mv4">
          <CountStepper
            className="self-center"
            inputId="count"
            labelText="Number of winners:"
            min={1}
            max={9}
            defaultValue={parseInt(restore('count') ?? '1', 10)}
            onNewValue={handleNewCountValue}
          />
          <div className="mv4 mv0-ns">
            <button
              className="db center-ns w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-white hover-bg-moon-gray pointer ph5 pv3 shadow-5"
              type="submit"
              disabled={isSubmitDisabled}
              css={css`
                &:disabled {
                  cursor: not-allowed;
                  opacity: 0.5;
                }
              `}
            >
              Draw
            </button>
          </div>
        </div>
      </form>
    );
  }

  if (current.matches('submitting')) {
    return (
      <div className="flex flex-grow-1 flex-shrink-0 justify-center items-center items-start-ns mt3 mt4-ns">
        <div className="h4 w4">
          <RingLoader size={128} color="#00449e" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt3 mt4-ns">
      {current.matches('success') && <Winners winners={winners} />}
      {current.matches('failure') && <ErrorMessage problemText={error} />}
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
};

Raffle.displayName = 'Raffle';

export default Raffle;
