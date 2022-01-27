import { faker } from '@faker-js/faker';

// API routes
export const EVENTS_ENDPOINT = 'https://api.meetup.com/:meetup/events';
export const RSVPS_ENDPOINT =
  'https://api.meetup.com/:meetup/events/:eventId/rsvps';

// Initialize some data up front for reusability
const eventId = faker.random.alphaNumeric(13);
const meetupName = 'some-meetup';

// Mock responses
export const UPCOMING_EVENTS = [{ visibility: 'public', id: eventId }];
export const EVENT_RSVPS = [
  {
    response: 'yes',
    member: {
      id: faker.datatype.number(100000000, 999999999),
      name: faker.name.firstName(),
      role: 'organizer',
      event_context: { host: true },
    },
    group: { urlname: meetupName },
  },
  {
    response: 'yes',
    member: {
      id: faker.datatype.number(100000000, 999999999),
      name: faker.name.findName(),
      photo: {
        id: faker.datatype.number(100000000, 999999999),
        highres_link: faker.internet.avatar(),
        photo_link: faker.internet.avatar(),
        thumb_link: faker.internet.avatar(),
        type: 'member',
        base_url: 'https://secure.meetupstatic.com',
      },
      role: 'coorganizer',
      event_context: { host: true },
    },
    group: { urlname: meetupName },
  },
  {
    response: 'yes',
    member: {
      id: faker.datatype.number(100000000, 999999999),
      name: faker.name.findName(),
      photo: {
        id: faker.datatype.number(100000000, 999999999),
        highres_link: faker.internet.avatar(),
        photo_link: faker.internet.avatar(),
        thumb_link: faker.internet.avatar(),
        type: 'member',
        base_url: 'https://secure.meetupstatic.com',
      },
      type: 'member',
      event_context: { host: false },
    },
    group: { urlname: meetupName },
  },
  {
    response: 'yes',
    member: {
      id: faker.datatype.number(100000000, 999999999),
      name: faker.name.findName(),
      photo: {
        id: faker.datatype.number(100000000, 999999999),
        highres_link: faker.internet.avatar(),
        photo_link: faker.internet.avatar(),
        thumb_link: faker.internet.avatar(),
        type: 'member',
        base_url: 'https://secure.meetupstatic.com',
      },
      type: 'member',
      event_context: { host: false },
    },
    group: { urlname: meetupName },
  },
];
