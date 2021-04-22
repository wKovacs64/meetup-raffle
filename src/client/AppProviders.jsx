import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'theme-ui';
import { theme } from './theme';

function AppProviders({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

AppProviders.displayName = 'AppProviders';

export default AppProviders;
