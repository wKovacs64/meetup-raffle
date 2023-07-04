import { rest, delay, passthrough } from 'msw';
import {
  EVENTS_ENDPOINT,
  RSVPS_ENDPOINT,
  UPCOMING_EVENTS,
  EVENT_RSVPS,
} from './fixtures';

const ARTIFICIAL_DELAY_MS = 50;

export const handlers = [
  //
  // Remix dev server
  //
  rest.post(`${process.env.REMIX_DEV_HTTP_ORIGIN}/ping`, () => passthrough()),
  //
  // Raffle action function -> Meetup API
  //
  rest.get(EVENTS_ENDPOINT, async ({ request }) => {
    const url = new URL(request.url);
    if (url.pathname.includes('404')) {
      await delay(ARTIFICIAL_DELAY_MS);
      return new Response(
        JSON.stringify({
          error: { message: "Sorry, I couldn't find any information on that." },
        }),
        {
          status: 404,
        },
      );
    }
    if (url.pathname.includes('500')) {
      throw new Error('Oh no, 💥 explosion detected!');
    }
    await delay(ARTIFICIAL_DELAY_MS);
    return new Response(JSON.stringify(UPCOMING_EVENTS));
  }),
  rest.get(RSVPS_ENDPOINT, async () => {
    await delay(ARTIFICIAL_DELAY_MS);
    return new Response(JSON.stringify(EVENT_RSVPS));
  }),
];
