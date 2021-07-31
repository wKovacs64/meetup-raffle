/** @jsx jsx */
import * as React from 'react';
import { jsx, useThemeUI, Box, Label, Input, Flex, Button } from 'theme-ui';
import { createModel } from 'xstate/lib/model';
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

const creators = {
  events: {
    setCount: (count) => ({ count }),
    setMeetup: (meetup) => ({ meetup }),
    submit: () => ({}),
    reset: () => ({}),
    retry: () => ({}),
  },
};

const raffleModel = createModel(initialContext, creators);

function isCountValid(ctx) {
  return ctx.count.length > 0 && parseInt(ctx.count, 10) > 0;
}

function isMeetupValid(ctx) {
  return ctx.meetup.length > 0;
}

const raffleMachine = raffleModel.createMachine(
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
          setCount: { actions: ['setCount'] },
          setMeetup: { actions: ['setMeetup'] },
          submit: {
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
                actions: ['setWinners'],
                target: 'idle.success',
              },
              onError: {
                actions: ['setError'],
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
              reset: '#enteringData',
              retry: 'pending',
            },
          },
        },
      },
    },
  },
  {
    actions: {
      reset: raffleModel.assign({
        winners: initialContext.winners,
        error: initialContext.error,
        lastKnownGoodCount: (ctx) => parseInt(ctx.count, 10),
      }),
      setCount: raffleModel.assign({ count: (_, event) => event.count }),
      setMeetup: raffleModel.assign({ meetup: (_, event) => event.meetup }),
      setWinners: raffleModel.assign({ winners: (_, event) => event.data }),
      setError: raffleModel.assign({ error: (_, event) => event.data.message }),
      persistSettings: (ctx) => {
        persist('count', ctx.count);
        persist('meetup', ctx.meetup);
      },
      restoreSettings: raffleModel.assign({
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

        const res = await fetch(drawUrl);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error?.message || res.statusText);
        if (!data.winners) throw new Error('Malformed response received.');

        return data.winners;
      },
    },
  },
);

function Raffle() {
  const { theme } = useThemeUI();
  const [state, send] = useMachine(raffleMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });
  const { meetup, winners, error, lastKnownGoodCount } = state.context;

  const handleNewCountValue = React.useCallback(
    (newCount) => {
      send(raffleModel.events.setCount(newCount));
    },
    [send],
  );

  function handleMeetupChange(e) {
    send(raffleModel.events.setMeetup(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    send(raffleModel.events.submit());
  }

  if (state.matches('enteringData')) {
    const isFormInvalid = [
      'enteringData.count.invalid',
      'enteringData.meetup.invalid',
    ].some(state.matches);

    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: [3, 4], mb: 4 }}>
          <Label htmlFor="meetup">Meetup name (from your URL):</Label>
          <Input
            sx={{
              fontSize: [3, 4],
              borderWidth: '0.5rem',
              borderColor: 'muted',
              mt: 3,
              p: 2,
              width: '100%',
            }}
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
        </Box>
        <Flex
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['center', 'flex-end'],
            justifyContent: ['normal', 'space-around'],
            my: 4,
          }}
        >
          <CountStepper
            inputId="count"
            labelText="Number of winners:"
            min={1}
            max={9}
            defaultValue={lastKnownGoodCount}
            onNewValue={handleNewCountValue}
          />
          <Box sx={{ my: [4, 0], width: ['100%', 'auto'] }}>
            <Button type="submit" disabled={isFormInvalid}>
              Draw
            </Button>
          </Box>
        </Flex>
      </form>
    );
  }

  if (state.matches('submission.pending')) {
    return (
      <Flex
        sx={{
          flexWrap: 'wrap',
          flexGrow: 1,
          flexShrink: 0,
          justifyContent: 'center',
          alignItems: ['center', 'flex-start'],
          mt: [3, 4],
        }}
      >
        <Box sx={{ height: 4, width: 4 }}>
          <RingLoader size={128} color={theme.colors.primary} />
        </Box>
      </Flex>
    );
  }

  return (
    <Box sx={{ mt: [3, 4] }}>
      {state.matches('submission.idle.success') && (
        <Winners winners={winners} />
      )}
      {state.matches('submission.idle.failure') && (
        <ErrorMessage problemText={error} />
      )}
      <ResetButtons
        onReset={() => {
          send(raffleModel.events.reset());
        }}
        onRetry={() => {
          send(raffleModel.events.retry());
        }}
      />
    </Box>
  );
}

Raffle.displayName = 'Raffle';

export default Raffle;
