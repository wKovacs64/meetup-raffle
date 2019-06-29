// N.B. This exists in the __tests__ subfolder (rather than colocated next to
// draw.js) to avoid being treated as a function by Netlify.
import mockAxios from 'axios';
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
  it('handles invalid requests', async () => {
    expect(await draw({})).toMatchSnapshot();
  });

  it('handles Meetup not found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 404 }),
    );
    expect(await draw({ meetup: 'meetup-not-found' })).toMatchSnapshot();
  });

  it('handles no upcoming Events found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: [] }),
    );
    expect(await draw({ meetup: 'no-events' })).toMatchSnapshot();
  });

  it('handles Event not found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 404 }),
    );
    expect(
      await draw({ meetup: MEETUP, specificEventId: 'no-events' }),
    ).toMatchSnapshot();
  });

  it('handles Event not public', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          id: 'private-event',
          visibility: 'public_limited',
        },
      }),
    );
    expect(
      await draw({ meetup: MEETUP, specificEventId: 'private-event' }),
    ).toMatchSnapshot();
  });

  it('handles unexpected data', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 204,
        data: {
          id: 'unexpected',
          visibility: 'public',
        },
      }),
    );
    expect(
      await draw({ meetup: MEETUP, specificEventId: 'unexpected' }),
    ).toMatchSnapshot();
  });

  it('handles a valid Meetup Event', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 204,
        data: {
          id: EVENT_ID,
          visibility: 'public',
        },
      }),
    );
    expect(await draw({ meetup: MEETUP })).toMatchSnapshot();
  });
});
