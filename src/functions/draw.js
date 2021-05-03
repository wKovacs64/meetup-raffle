import fetch from 'node-fetch';
import meetupRandomizer from 'meetup-randomizer';
import {
  getParamsFromRequest,
  getEventFromResponseData,
  getIdFromEvent,
} from './helpers';

async function handler(request /* , context */) {
  const headers =
    process.env.NODE_ENV === 'development'
      ? /* istanbul ignore next */ { 'Access-Control-Allow-Origin': '*' }
      : {};

  let meetup;
  let count;

  try {
    ({ meetup, count } = getParamsFromRequest(request));
  } catch (err) {
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({ error: { message: err.message } }),
    };
  }

  try {
    const eventUrl = `https://api.meetup.com/${encodeURIComponent(
      meetup,
    )}/events?status=upcoming&only=id,visibility`;

    const res = await fetch(eventUrl);

    // This case covers invalid Meetup group names as well as invalid event IDs.
    if (res.status === 404) {
      throw new Error("Sorry, I couldn't find any information on that.");
    }

    const data = await res.json();
    const eventId = getIdFromEvent(getEventFromResponseData(data));
    const winners = await meetupRandomizer.run(meetup, eventId, count);

    if (Array.isArray(winners) && winners.length) {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify({ winners }),
      };
    }

    throw new Error('Sorry, we received unexpected data for that request.');
  } catch (err) {
    return {
      headers,
      statusCode: 404,
      body: JSON.stringify({ error: { message: err.message } }),
    };
  }
}

export { handler };
