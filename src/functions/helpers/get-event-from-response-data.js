/**
 * Extracts an event object from a Meetup API "events" query response.
 *
 * @param {Object} data a JSON object from response.json()
 * @returns {Object} an event object
 * @throws {Error} proper event data is expected in the given response
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Body/json
 * @see https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get
 */
export function getEventFromResponseData(data) {
  if (data.length) {
    return data[0];
  } else if (data && !Array.isArray(data)) {
    return data;
  }
  throw new Error("Sorry, I couldn't find any upcoming events.");
}
