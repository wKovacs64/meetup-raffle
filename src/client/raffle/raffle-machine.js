import { assign, createMachine } from 'xstate';
import { persist, restore } from '../persistence';

const initialContext = {
  count: '1',
  meetup: '',
  winners: [],
  error: '',
  lastKnownGoodCount: undefined,
};

export const raffleMachine =
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

function isCountValid(ctx) {
  return ctx.count.length > 0 && parseInt(ctx.count, 10) > 0;
}

function isMeetupValid(ctx) {
  return ctx.meetup.length > 0;
}
