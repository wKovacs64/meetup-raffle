import mockFetch from 'node-fetch';
import { MEETUP, EVENT_ID } from '../__mocks__/fixtures';
import { handler } from '../draw';

const draw = async ({ meetup, specificEventId = '', count = 1 }) =>
  handler(
    {
      httpMethod: 'GET',
      queryStringParameters: { meetup, specificEventId, count },
    },
    {},
  );

describe('draw', () => {
  beforeEach(() => {
    mockFetch.restore();
  });

  it('handles invalid requests', async () => {
    expect(await draw({})).toMatchSnapshot();
  });

  it('handles Meetup not found', async () => {
    mockFetch.getAny(404);
    expect(await draw({ meetup: 'meetup-not-found' })).toMatchSnapshot();
  });

  it('handles no upcoming Events found', async () => {
    mockFetch.getAny([]);
    expect(await draw({ meetup: 'no-events' })).toMatchSnapshot();
  });

  it('handles Event not found', async () => {
    mockFetch.getAny(404);
    expect(
      await draw({ meetup: MEETUP, specificEventId: 'no-events' }),
    ).toMatchSnapshot();
  });

  it('handles Event not public', async () => {
    mockFetch.getAny({
      id: 'private-event',
      visibility: 'public_limited',
    });
    expect(
      await draw({ meetup: MEETUP, specificEventId: 'private-event' }),
    ).toMatchSnapshot();
  });

  it('handles unexpected data', async () => {
    mockFetch.getAny({
      status: 204,
      body: {
        id: 'unexpected',
        visibility: 'public',
      },
    });
    expect(
      await draw({ meetup: MEETUP, specificEventId: 'unexpected' }),
    ).toMatchSnapshot();
  });

  it('handles a valid Meetup Event', async () => {
    mockFetch.getAny({
      status: 204,
      body: {
        id: EVENT_ID,
        visibility: 'public',
      },
    });
    expect(await draw({ meetup: MEETUP })).toMatchSnapshot();
  });
});
