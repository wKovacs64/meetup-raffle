import mockAxios from 'axios';
import { MEETUP, EVENT_ID } from './__mocks__/fixtures';
import { handler } from './draw';

const draw = async (
  { meetup, specificEventId = '', meetupApiKey = '', count = 1 },
  cb,
) =>
  handler(
    {
      httpMethod: 'GET',
      queryStringParameters: { meetup, specificEventId, meetupApiKey, count },
    },
    {},
    cb,
  );

describe('draw', () => {
  const cb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('handles invalid requests', async () => {
    await draw({}, cb);
    expect(cb.mock.calls).toMatchSnapshot();
  });

  it('handles Meetup not found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 404 }),
    );
    await draw({ meetup: 'meetup-not-found' }, cb);
    expect(cb.mock.calls).toMatchSnapshot();
  });

  it('handles no upcoming Events found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: [] }),
    );
    await draw({ meetup: 'no-events' }, cb);
    expect(cb.mock.calls).toMatchSnapshot();
  });

  it('handles Event not found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 404 }),
    );
    await draw({ meetup: MEETUP, specificEventId: 'no-events' }, cb);
    expect(cb.mock.calls).toMatchSnapshot();
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
    await draw({ meetup: MEETUP, specificEventId: 'private-event' }, cb);
    expect(cb.mock.calls).toMatchSnapshot();
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
    await draw({ meetup: MEETUP, specificEventId: 'unexpected' }, cb);
    expect(cb.mock.calls).toMatchSnapshot();
  });

  it('handles a winner for a valid Meetup Event', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 204,
        data: {
          id: EVENT_ID,
          visibility: 'public',
        },
      }),
    );
    await draw({ meetup: MEETUP }, cb);
    expect(cb.mock.calls).toMatchSnapshot();
  });
});
