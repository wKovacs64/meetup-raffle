import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../../test/utils';
import Header from '../Header';

describe('Header', () => {
  it('renders', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /meetup-raffle/i }),
    ).toBeInTheDocument();
  });
});
