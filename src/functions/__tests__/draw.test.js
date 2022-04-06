/* global vi */
import meetupRandomizer from 'meetup-randomizer';
import { EVENTS_ENDPOINT } from '../../mocks/fixtures';
import { server, rest } from '../../mocks/server';
import { handler } from '../draw';

async function draw({ meetup, count = 1 }) {
  return handler(
    {
      httpMethod: 'GET',
      queryStringParameters: { meetup, count },
    },
    {},
  );
}

describe('draw', () => {
  it('handles invalid requests', async () => {
    expect(await draw({})).toMatchInlineSnapshot(`
      {
        "body": "{\\"error\\":{\\"message\\":\\"The \\\\\\"meetup\\\\\\" query parameter is required and must be a string.\\"}}",
        "headers": {},
        "statusCode": 400,
      }
    `);
  });

  it('handles Meetup or Event not found', async () => {
    server.use(
      rest.get(EVENTS_ENDPOINT, (req, res, ctx) => {
        return res.once(ctx.status(404));
      }),
    );

    expect(await draw({ meetup: 'not-found' })).toMatchInlineSnapshot(`
      {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any information on that.\\"}}",
        "headers": {},
        "statusCode": 404,
      }
    `);
  });

  it('handles no upcoming Events found', async () => {
    server.use(
      rest.get(EVENTS_ENDPOINT, (req, res, ctx) => {
        return res.once(ctx.json([]));
      }),
    );

    expect(await draw({ meetup: 'no-events' })).toMatchInlineSnapshot(`
      {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any upcoming events.\\"}}",
        "headers": {},
        "statusCode": 404,
      }
    `);
  });

  it('handles a limited visibility Event', async () => {
    server.use(
      rest.get(EVENTS_ENDPOINT, (req, res, ctx) => {
        return res.once(
          ctx.json([
            {
              id: 'private-member-list',
              visibility: 'public_limited',
            },
          ]),
        );
      }),
    );

    expect(await draw({ meetup: 'private-event' })).toMatchInlineSnapshot(`
      {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, their members list is private.\\"}}",
        "headers": {},
        "statusCode": 404,
      }
    `);
  });

  it('handles unexpected data', async () => {
    vi.spyOn(meetupRandomizer, 'run').mockResolvedValueOnce('unexpected');

    expect(await draw({ meetup: 'unexpected-data' })).toMatchInlineSnapshot(`
      {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, we received unexpected data for that request.\\"}}",
        "headers": {},
        "statusCode": 404,
      }
    `);
  });

  it('handles a valid Meetup Event', async () => {
    const drawResponse = await draw({ meetup: 'valid-meetup' });
    expect(drawResponse).toEqual({
      body: expect.any(String),
      headers: expect.any(Object),
      statusCode: 200,
    });

    const body = JSON.parse(drawResponse.body);
    expect(body).toEqual({ winners: [expect.any(Object)] });
    expect(body.winners).toEqual(expect.any(Array));
    expect(body.winners.length).toBeGreaterThan(0);
    body.winners.forEach((winner) => {
      expect(winner).toEqual({
        name: expect.any(String),
        photoURL: expect.any(String),
        profileURL: expect.any(String),
      });
    });
  });
});
