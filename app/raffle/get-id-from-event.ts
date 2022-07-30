import type { UpcomingEvent } from '~/types';

export function getIdFromEvent(event: UpcomingEvent) {
  if (event.visibility && event.visibility === 'public') {
    return event.id;
  }
  return null;
}
