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
 * @param {string} [request.queryStringParameters.meetupApiKey] a Meetup API key
 * (default: none)
 * @returns {Object} an object containing the required Meetup API parameters
 * @throws {Error} query parameters must be valid
 */
export const getParamsFromRequest = ({
  httpMethod,
  queryStringParameters: {
    meetup,
    count = 1,
    specificEventId = '',
    meetupApiKey = '',
  },
}) => {
  if (
    httpMethod === 'GET' &&
    meetup &&
    typeof meetup === 'string' &&
    isNumber(count) &&
    typeof specificEventId === 'string' &&
    typeof meetupApiKey === 'string'
  ) {
    return {
      meetup,
      count,
      specificEventId,
      meetupApiKey,
    };
  }
  throw new Error('Invalid request, check your query parameters.');
};
