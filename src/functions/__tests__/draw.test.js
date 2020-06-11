import meetupRandomizer from 'meetup-randomizer';
import { server, rest } from '../../test/server';
import { EVENTS_ENDPOINT } from '../../test/fixtures';
import { handler } from '../draw';

const draw = async ({ meetup, count = 1 }) =>
  handler(
    {
      httpMethod: 'GET',
      queryStringParameters: { meetup, count },
    },
    {},
  );

describe('draw', () => {
  it('handles invalid requests', async () => {
    expect(await draw({})).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"The \\\\\\"meetup\\\\\\" query parameter is required and must be a string.\\"}}",
        "headers": Object {},
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
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any information on that.\\"}}",
        "headers": Object {},
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
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, I couldn't find any upcoming events.\\"}}",
        "headers": Object {},
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
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, their members list is private.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles unexpected data', async () => {
    jest.spyOn(meetupRandomizer, 'run').mockResolvedValueOnce('unexpected');

    expect(await draw({ meetup: 'some-meetup' })).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"error\\":{\\"message\\":\\"Sorry, we received unexpected data for that request.\\"}}",
        "headers": Object {},
        "statusCode": 404,
      }
    `);
  });

  it('handles a valid Meetup Event', async () => {
    const drawResponse = await draw({ meetup: 'some-meetup' });
    expect(drawResponse).toMatchObject({
      body: expect.any(String),
      headers: expect.any(Object),
      statusCode: 200,
    });

    const body = JSON.parse(drawResponse.body);
    expect(body).toMatchObject({ winners: [expect.any(Object)] });
    expect(body.winners).toEqual(expect.any(Array));
    expect(body.winners.length).toBeGreaterThan(0);
    body.winners.forEach((winner) => {
      expect(winner).toMatchObject({
        name: expect.any(String),
        photoURL: expect.any(String),
        profileURL: expect.any(String),
      });
    });
  });
});
