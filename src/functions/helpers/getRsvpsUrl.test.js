import { getRsvpsUrl } from './getRsvpsUrl';

describe('getRsvpsUrl', () => {
  it('should return a string given an API key', () => {
    expect(getRsvpsUrl('https://...', 'foo123', 'bar456')).toEqual(
      expect.any(String),
    );
  });

  it('should return null if no API key is provided', () => {
    expect(getRsvpsUrl('https://...', 'foo123')).toBeNull();
  });
});
