import { getParamsFromRequest } from '../get-params-from-request';

describe('getParamsFromRequest', () => {
  it('throws on unhandled HTTP methods', () => {
    expect(() =>
      getParamsFromRequest({
        httpMethod: 'POST',
        queryStringParameters: {
          meetup: 'meetup',
        },
      }),
    ).toThrow();
  });

  it('throws on invalid count', () => {
    expect(() =>
      getParamsFromRequest({
        httpMethod: 'GET',
        queryStringParameters: {
          meetup: 'meetup',
          count: 'foo',
        },
      }),
    ).toThrow();
  });

  it('throws on invalid specificEventId', () => {
    expect(() =>
      getParamsFromRequest({
        httpMethod: 'GET',
        queryStringParameters: {
          meetup: 'meetup',
          specificEventId: 6,
        },
      }),
    ).toThrow();
  });

  it('extracts query parameters successfully', () => {
    const queryStringParameters = {
      meetup: 'meetup',
      count: 4,
      specificEventId: '1234567890',
    };

    expect(
      getParamsFromRequest({
        httpMethod: 'GET',
        queryStringParameters,
      }),
    ).toEqual(queryStringParameters);
  });
});
