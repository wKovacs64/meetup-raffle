import { parseEventsResponse } from './parseEventsResponse';

const RES_404 = {
  status: 404,
};
const RES_MULTI = {
  data: [
    {
      foo: 42,
    },
    {
      bar: 24,
    },
  ],
};
const RES_MULTI_EMPTY = { data: [] };
const RES_SINGLE = {
  data: {
    id: 'foo123',
    visibility: 'public',
  },
};

describe('parseEventsResponse', () => {
  it('should throw on 404 status', () => {
    expect(() => {
      parseEventsResponse(RES_404);
    }).toThrowError(Error);
  });

  it('should return the first of multiple events', () => {
    expect(parseEventsResponse(RES_MULTI)).toEqual(RES_MULTI.data[0]);
  });

  it('should return the event data when parsing a single event', () => {
    expect(parseEventsResponse(RES_SINGLE)).toEqual(RES_SINGLE.data);
  });

  it('should throw on an empty array of events', () => {
    expect(() => {
      parseEventsResponse(RES_MULTI_EMPTY);
    }).toThrowError(Error);
  });
});
