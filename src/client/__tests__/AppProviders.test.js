import React from 'react';
import { render, screen } from '@testing-library/react';
import AppProviders from '../AppProviders';

test('renders children', () => {
  render(
    <AppProviders>
      <div>There is content here!</div>
    </AppProviders>,
  );

  expect(screen.getByText(/content/i)).toBeInTheDocument();
});
