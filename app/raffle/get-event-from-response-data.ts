import type { UpcomingEvent } from '~/types';

export function getEventFromResponseData(data: unknown) {
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as UpcomingEvent;
  }

  if (data && !Array.isArray(data)) {
    return data as UpcomingEvent;
  }

  return null;
}
