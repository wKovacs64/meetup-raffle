import { getEventFromResponseData } from '../get-event-from-response-data';

const RES_MULTI = [
  {
    foo: 42,
  },
  {
    bar: 24,
  },
];
const RES_MULTI_EMPTY = [];
const RES_SINGLE = {
  id: 'foo123',
  visibility: 'public',
};

describe('getEventFromResponseData', () => {
  it('returns the first of multiple events', () => {
    expect(getEventFromResponseData(RES_MULTI)).toEqual(RES_MULTI[0]);
  });

  it('returns the event data when parsing a single event', () => {
    expect(getEventFromResponseData(RES_SINGLE)).toEqual(RES_SINGLE);
  });

  it('throws on an empty array of events', () => {
    expect(() => {
      getEventFromResponseData(RES_MULTI_EMPTY);
    }).toThrowError(Error);
  });
});
