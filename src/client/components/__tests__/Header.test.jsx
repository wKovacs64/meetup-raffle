import * as React from 'react';
import { render, screen } from '../../../../test/utils';
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
