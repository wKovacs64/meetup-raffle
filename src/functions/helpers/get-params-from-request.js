import isNumber from 'is-number';

/**
 * Extracts Meetup API parameters from a Netlify Functions request.
 *
 * @param {Object} request an object representing a Netlify Functions request
 * @param {string} request.httpMethod the HTTP method of the request (e.g.
 * 'GET')
 * @param {Object} request.queryStringParameters the query parameters from a
 * Netlify Functions request
 * @param {string} request.queryStringParameters.meetup the Meetup name
 * @param {number} [request.queryStringParameters.count] the number of winners
 * to draw (default: 1)
 * @param {string} [request.queryStringParameters.specificEventId] a Meetup
 * event ID for a specific event (default: latest upcoming/in-progress event)
 * @returns {Object} an object containing the required Meetup API parameters
 * @throws {Error} query parameters must be valid
 */
export const getParamsFromRequest = ({
  httpMethod,
  queryStringParameters: { meetup, count = 1, specificEventId = '' },
}) => {
  if (httpMethod !== 'GET') {
    throw new Error('This API only accepts HTTP GET requests.');
  }

  if (!meetup || typeof meetup !== 'string') {
    throw new Error(
      'The "meetup" query parameter is required and must be a string.',
    );
  }

  if (!isNumber(count)) {
    throw new Error('The "count" query parameter must be a number.');
  }

  if (typeof specificEventId !== 'string') {
    throw new Error('The "specificEventId" query parameter must be a string.');
  }

  return {
    meetup,
    count,
    specificEventId,
  };
};
