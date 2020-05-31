import { render as rtlRender } from '@testing-library/react';
import AppProviders from '../src/client/AppProviders';

export const render = (ui, ...rest) => {
  return rtlRender(ui, { wrapper: AppProviders, ...rest });
};
