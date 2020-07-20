/** @jsx jsx */
import React from 'react';
import fetch from 'unfetch';
import { jsx, useThemeUI, Box, Label, Input, Flex, Button } from 'theme-ui';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { RingLoader } from 'react-spinners';
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
    initial: 'init',
    context: initialContext,
    states: {
      init: {
        entry: 'restoreSettings',
        always: 'idle',
      },
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
      submitting: {
        entry: ['reset', 'persistSettings'],
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
        lastKnownGoodCount: (ctx) => parseInt(ctx.count, 10),
      }),
      setCount: assign({ count: (_, event) => event.data }),
      setMeetup: assign({ meetup: (_, event) => event.data }),
      setWinners: assign({ winners: (_, event) => event.data }),
      setError: assign({ error: (_, event) => event.data.message }),
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
  const [current, send] = useMachine(raffleMachine);
  const { meetup, winners, error, lastKnownGoodCount } = current.context;

  const handleNewCountValue = React.useCallback(
    (newCount) => {
      send({ type: 'SET_COUNT', data: newCount });
    },
    [send],
  );

  function handleMeetupChange(e) {
    send({ type: 'SET_MEETUP', data: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    send('SUBMIT');
  }

  if (current.matches('idle')) {
    const isSubmitDisabled =
      current.matches('idle.count.invalid') ||
      current.matches('idle.meetup.invalid');

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
            <Button type="submit" disabled={isSubmitDisabled}>
              Draw
            </Button>
          </Box>
        </Flex>
      </form>
    );
  }

  if (current.matches('submitting')) {
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
    </Box>
  );
}

Raffle.displayName = 'Raffle';

export default Raffle;
