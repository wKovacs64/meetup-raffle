import type { UpcomingEvent } from '~/types';

export function getEventFromResponseData(
  data: UpcomingEvent | Array<UpcomingEvent>,
) {
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  } else if (data && !Array.isArray(data)) {
    return data;
  }
  return null;
}
