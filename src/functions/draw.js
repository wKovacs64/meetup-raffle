import axios from 'axios';
import meetupRandomizer from 'meetup-randomizer';
import {
  getParamsFromRequest,
  getIdFromEvent,
  getRsvpsUrl,
  parseEventsResponse,
  validateStatus,
} from './helpers';

const handler = async (request, context, callback) => {
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
    return callback(null, {
      headers,
      statusCode: 400,
      body: JSON.stringify({ error: { message: err.message } }),
    });
  }

  try {
    const baseUrl = `https://api.meetup.com/${encodeURIComponent(
      meetup,
    )}/events`;
    const eventUrlSuffix = '?status=upcoming&only=id,visibility';
    const eventUrl = `${baseUrl}/${encodeURIComponent(
      specificEventId,
    )}${eventUrlSuffix}`;

    const response = await axios.get(eventUrl, { validateStatus });
    const eventId = getIdFromEvent(parseEventsResponse(response));

    meetupRandomizer.setCustomApiUrl(
      getRsvpsUrl(baseUrl, eventId, meetupApiKey),
    );
    const winners = await meetupRandomizer.run(meetup, eventId, count);

    if (Array.isArray(winners) && winners.length) {
      return callback(null, {
        headers,
        statusCode: 200,
        body: JSON.stringify({ winners }),
      });
    }

    throw new Error('Sorry, we received unexpected data for that request.');
  } catch (err) {
    return callback(null, {
      headers,
      statusCode: 404,
      body: JSON.stringify({ error: { message: err.message } }),
    });
  }
};

export { handler };
