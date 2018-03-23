/**
 * Extracts the event ID from the given Meetup API "event" object.
 *
 * @param {Object} event an object representing a Meetup API "event"
 * @returns {string} the event ID
 * @throws {Error} event visibility must be "public"
 * @see https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get
 */
export const getIdFromEvent = event => {
  if (event.visibility && event.visibility === 'public') {
    return event.id;
  }
  throw new Error('Sorry, their members list is private.');
};
