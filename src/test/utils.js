/* eslint-disable import/no-extraneous-dependencies */
import { render as rtlRender } from '@testing-library/react';
import AppProviders from '../client/AppProviders';

export * from '@testing-library/react';
export { default as user } from '@testing-library/user-event';

export const render = (ui, ...rest) => {
  return rtlRender(ui, { wrapper: AppProviders, ...rest });
};
