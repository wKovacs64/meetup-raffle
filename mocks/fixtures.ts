import { faker } from '@faker-js/faker';

//
// API routes
//
export const EVENTS_ENDPOINT = 'https://api.meetup.com/:meetup/events';
export const RSVPS_ENDPOINT =
  'https://api.meetup.com/:meetup/events/:eventId/rsvps';

//
// Mock responses
//
export const UPCOMING_EVENTS = [
  { visibility: 'public', id: faker.string.alphanumeric(13) },
];

export const EVENT_RSVPS = [
  ...generateOrganizers(1),
  ...generateCoOrganizers(1),
  ...generateMembers(20),
];

//
// Convenience functions to generate data
//
function generateOrganizers(count: number) {
  return Array.from(Array(count), () => ({
    response: 'yes',
    member: {
      id: faker.number.int({ min: 100000000, max: 999999999 }),
      name: faker.person.firstName(),
      role: 'organizer',
      event_context: { host: true },
    },
    group: { urlname: faker.company.buzzNoun() },
  }));
}

function generateCoOrganizers(count: number) {
  return Array.from(Array(count), () => ({
    response: 'yes',
    member: {
      id: faker.number.int({ min: 100000000, max: 999999999 }),
      name: faker.person.fullName(),
      photo: {
        id: faker.number.int({ min: 100000000, max: 999999999 }),
        highres_link: faker.internet.avatar(),
        photo_link: faker.internet.avatar(),
        thumb_link: faker.internet.avatar(),
        type: 'member',
        base_url: 'https://secure.meetupstatic.com',
      },
      role: 'coorganizer',
      event_context: { host: true },
    },
    group: { urlname: faker.company.buzzNoun() },
  }));
}

function generateMembers(count: number) {
  return Array.from(Array(count), () => ({
    response: 'yes',
    member: {
      id: faker.number.int({ min: 100000000, max: 999999999 }),
      name: faker.person.fullName(),
      photo: {
        id: faker.number.int({ min: 100000000, max: 999999999 }),
        highres_link: faker.internet.avatar(),
        photo_link: faker.internet.avatar(),
        thumb_link: faker.internet.avatar(),
        type: 'member',
        base_url: 'https://secure.meetupstatic.com',
      },
      type: 'member',
      event_context: { host: false },
    },
    group: { urlname: faker.company.buzzNoun() },
  }));
}
