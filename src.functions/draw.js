const axios = require('axios');
const meetupRandomizer = require('meetup-randomizer');
const {
  getParamsFromRequest,
  getIdFromEvent,
  getRsvpsUrl,
  parseEventsResponse,
  validateStatus,
} = require('./helpers');

exports.handler = async (request, context, callback) => {
  const headers =
    process.env.NODE_ENV === 'development'
      ? { 'Access-Control-Allow-Origin': '*' }
      : {};

  try {
    const {
      meetup,
      count,
      specificEventId,
      meetupApiKey,
    } = getParamsFromRequest(request);

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
      statusCode: 400,
      body: JSON.stringify({ error: { message: err.message } }),
    });
  }
};
