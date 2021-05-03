import faker from 'faker';
import { rest } from 'msw';
import {
  EVENTS_ENDPOINT,
  RSVPS_ENDPOINT,
  UPCOMING_EVENTS,
  EVENT_RSVPS,
} from './fixtures';

function generateWinners(count = 1) {
  return Array.from(Array(count), () => ({
    name: faker.name.findName(),
    photoURL: faker.internet.avatar(),
    profileURL: faker.internet.url(),
  }));
}

const err400 = 'Sorry, something went wrong.';
const err404 = "Sorry, I couldn't find any information on that.";

export const handlers = [
  //
  // client -> serverless function
  //
  rest.get(`/.netlify/functions/draw`, (req, res, ctx) => {
    // handle special meetup names '400' and '404' to facilitate manually
    // triggering the corresponding errors so you can observe them in the UI
    // during development
    const meetup = req.url.searchParams.get('meetup');
    switch (meetup) {
      case '400': {
        return res(ctx.status(400), ctx.json({ error: { message: err400 } }));
      }
      case '404': {
        return res(ctx.status(404), ctx.json({ error: { message: err404 } }));
      }
      default: {
        const count = parseInt(req.url.searchParams.get('count'), 10);
        const winners = generateWinners(count);
        return res(ctx.json({ winners }));
      }
    }
  }),
  //
  // serverless function -> remote API
  //
  rest.get(EVENTS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(UPCOMING_EVENTS));
  }),
  rest.get(RSVPS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(EVENT_RSVPS));
  }),
];
