import { EVENT_ID, MEETUP } from './fixtures';

const run = (meetupName, eventId, winnersAmount) => {
  if (meetupName === MEETUP && eventId === EVENT_ID && winnersAmount === 1) {
    return Promise.resolve([
      {
        name: 'Tiny Rick',
        photoURL: 'https://i.imgur.com/rgDv1wB.jpg',
        profileURL: 'http://rickandmorty.wikia.com/wiki/Tiny_Rick',
      },
    ]);
  }
  return Promise.resolve([]);
};

export default {
  run,
  setCustomApiUrl: jest.fn(),
};
