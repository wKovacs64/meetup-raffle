/**
 * Crafts a custom URL for the Meetup API "rsvps" endpoint if an API key is
 * provided.
 *
 * @param {string} baseUrl the base API URL for a particular Meetup group
 * @param {string} eventId the event ID
 * @param {string} apiKey a Meetup API key
 * @returns {string|null} a custom "rsvps" API endpoint URL, or null if no
 * custom URL is necessary
 */
const getRsvpsUrl = (baseUrl, eventId, apiKey) =>
  apiKey
    ? `${baseUrl}/${eventId}/rsvps?only=group.urlname,member,response&key=${encodeURIComponent(
        apiKey,
      )}&sign=true`
    : null;

module.exports = { getRsvpsUrl };
