import { getIdFromEvent } from '../get-id-from-event';

const EVENT_PUB = {
  id: 'foo123',
  visibility: 'public',
};

const EVENT_LTD = {
  id: 'bar456',
  visibility: 'public_limited',
};

describe('getIdFromEvent', () => {
  it('should return the ID from a publicly visible event', () => {
    expect(getIdFromEvent(EVENT_PUB)).toBe(EVENT_PUB.id);
  });

  it('should throw on non-public events', () => {
    expect(() => {
      getIdFromEvent(EVENT_LTD);
    }).toThrowError(Error);
  });
});
