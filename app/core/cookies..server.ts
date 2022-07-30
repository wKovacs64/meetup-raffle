import { createCookie } from '@remix-run/node';

export const userSettingsCookie = createCookie('userSettings', {
  // Note to self: don't set `expires` here, set when serializing or committing
  sameSite: 'lax',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
});

export interface UserSettings {
  meetup: string;
  count: string;
}
