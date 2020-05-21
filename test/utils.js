/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { render as rtlRender } from '@testing-library/react';
import theme from '../src/client/theme';

export const render = (ui, ...rest) => {
  return rtlRender(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, ...rest);
};
