import axios from 'axios';
import meetupRandomizer from 'meetup-randomizer';
import {
  getParamsFromRequest,
  getIdFromEvent,
  getRsvpsUrl,
  parseEventsResponse,
  validateStatus,
} from './helpers';

const handler = (request, context, callback) => {
  const headers =
    process.env.NODE_ENV === 'development'
      ? { 'Access-Control-Allow-Origin': '*' }
      : {};

  let meetup;
  let count;
  let specificEventId;
  let meetupApiKey;

  try {
    ({ meetup, count, specificEventId, meetupApiKey } = getParamsFromRequest(
      request,
    ));
  } catch (err) {
    return Promise.resolve(
      callback(null, {
        headers,
        statusCode: 400,
        body: JSON.stringify({ error: { message: err.message } }),
      }),
    );
  }

  const baseUrl = `https://api.meetup.com/${encodeURIComponent(meetup)}/events`;
  const eventUrlSuffix = '?status=upcoming&only=id,visibility';
  const eventUrl = `${baseUrl}/${encodeURIComponent(
    specificEventId,
  )}${eventUrlSuffix}`;

  return axios
    .get(eventUrl, { validateStatus })
    .then(response => {
      const eventId = getIdFromEvent(parseEventsResponse(response));
      meetupRandomizer.setCustomApiUrl(
        getRsvpsUrl(baseUrl, eventId, meetupApiKey),
      );
      return meetupRandomizer.run(meetup, eventId, count);
    })
    .then(winners => {
      if (Array.isArray(winners) && winners.length) {
        return callback(null, {
          headers,
          statusCode: 200,
          body: JSON.stringify({ winners }),
        });
      }
      throw new Error('Sorry, we received unexpected data for that request.');
    })
    .catch(err =>
      callback(null, {
        headers,
        statusCode: 404,
        body: JSON.stringify({ error: { message: err.message } }),
      }),
    );
};

export { handler };
