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
    expect(await draw({})).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"The \\\\\\"meetup\\\\\\" query parameter is required and must be a string.\\"}}",
        "headers": Object {},
        "statusCode": 400,
      }
    `);
  });

  it('handles Meetup not found', async () => {
    mockFetch.getAny(404);

    expect(await draw({ meetup: 'meetup-not-found' })).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any information on that.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles no upcoming Events found', async () => {
    mockFetch.getAny([]);

    expect(await draw({ meetup: 'no-events' })).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any upcoming events.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles Event not found', async () => {
    mockFetch.getAny(404);

    expect(await draw({ meetup: MEETUP, specificEventId: 'no-events' }))
      .toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any information on that.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles Event not public', async () => {
    mockFetch.getAny({
      id: 'private-event',
      visibility: 'public_limited',
    });

    expect(await draw({ meetup: MEETUP, specificEventId: 'private-event' }))
      .toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, their members list is private.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles unexpected data', async () => {
    mockFetch.getAny({
      status: 204,
      body: {
        id: 'unexpected',
        visibility: 'public',
      },
    });

    expect(await draw({ meetup: MEETUP, specificEventId: 'unexpected' }))
      .toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, we received unexpected data for that request.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles a valid Meetup Event', async () => {
    mockFetch.getAny({
      status: 204,
      body: {
        id: EVENT_ID,
        visibility: 'public',
      },
    });

    expect(await draw({ meetup: MEETUP })).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"winners\\":[{\\"name\\":\\"Tiny Rick\\",\\"photoURL\\":\\"https://i.imgur.com/rgDv1wB.jpg\\",\\"profileURL\\":\\"http://rickandmorty.wikia.com/wiki/Tiny_Rick\\"}]}",
        "headers": Object {},
        "statusCode": 200,
      }
    `);
  });
});
