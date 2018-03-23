const isNumber = require('is-number');

const getParamsFromRequest = ({
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

module.exports = { getParamsFromRequest };
