import { render, screen } from '@testing-library/react';
import Header from '../header';

describe('Header', () => {
  it('renders', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /meetup-raffle/i }),
    ).toBeInTheDocument();
  });
});
