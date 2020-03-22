/**
 * Determines if a given HTTP status code should be considered a success (i.e.,
 * not an error).
 *
 * @param {number} status an HTTP status code
 * @returns {boolean} boolean value of whether or not the given HTTP status code
 * should be considered a success (non-error)
 */
export const validateStatus = (status) =>
  (status >= 200 && status < 300) || status === 404;
