/**
 * Extracts an event object from a Meetup API "events" query response.
 *
 * @param {Object} response an Axios response object
 * @returns {Object} an event object
 * @throws {Error} proper event data is expected in the given response
 * @see https://github.com/mzabriskie/axios#response-schema
 * @see https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get
 */
export const parseEventsResponse = response => {
  // This case covers invalid Meetup group names as well as invalid event IDs.
  if (response.status === 404) {
    throw new Error("Sorry, I couldn't find any information on that.");
  }

  if (response.data.length) {
    return response.data[0];
  } else if (response.data && !Array.isArray(response.data)) {
    return response.data;
  }

  throw new Error("Sorry, I couldn't find any upcoming events.");
};
