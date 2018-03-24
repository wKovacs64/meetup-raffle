import { validateStatus } from './validateStatus';

describe('validateStatus', () => {
  it('should consider status 204 valid', () => {
    expect(validateStatus(204)).toBe(true);
  });

  it('should consider status 404 valid', () => {
    expect(validateStatus(404)).toBe(true);
  });

  it('should consider status 302 invalid', () => {
    expect(validateStatus(302)).toBe(false);
  });

  it('should consider status 500 invalid', () => {
    expect(validateStatus(500)).toBe(false);
  });
});
