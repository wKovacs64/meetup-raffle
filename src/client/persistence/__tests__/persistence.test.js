import { restore, preserve } from '../persistence';

const { localStorage } = global.window;

test("persistence functions don't crash if localStorage is unavailable", () => {
  // Remove localStorage temporarily
  delete global.window.localStorage;
  expect(global.window.localStorage).toBeUndefined();

  expect(() => {
    preserve({ key: 'value' });
    restore('key');
  }).not.toThrow();

  // Restore localStorage
  global.window.localStorage = localStorage;
  expect(global.window.localStorage).toBeDefined();
});
