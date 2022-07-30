import { rest } from 'msw';
import {
  EVENTS_ENDPOINT,
  RSVPS_ENDPOINT,
  UPCOMING_EVENTS,
  EVENT_RSVPS,
} from './fixtures';

const ARTIFICIAL_DELAY_MS = 50;

export const handlers = [
  //
  // Raffle action function -> Meetup API
  //
  rest.get(EVENTS_ENDPOINT, async (req, res, ctx) => {
    if (req.url.pathname.includes('404')) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(404),
        ctx.json({
          error: { message: "Sorry, I couldn't find any information on that." },
        }),
      );
    }
    if (req.url.pathname.includes('500')) {
      throw new Error('Oh no, 💥 explosion detected!');
    }
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(UPCOMING_EVENTS));
  }),
  rest.get(RSVPS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(EVENT_RSVPS));
  }),
];
