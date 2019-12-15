import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './Results';

jest.mock('./Winner', () =>
  jest.fn(({ winner }) => <span>{winner.name}</span>),
);

const winners = Array.from(Array(2), (_, idx) => ({
  name: `Pickle Rick ${idx}`,
  photoURL: `https://i.imgur.com/3VhMoBD.png?i=${idx}`,
  profileURL: `https://en.wikipedia.org/wiki/Pickle_Rick?i=${idx}`,
}));

describe('Results', () => {
  it('renders', () => {
    const { container } = render(<Results winners={winners} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('contains all winners', () => {
    render(<Results winners={winners} />);
    winners.forEach(winner => {
      expect(() => screen.getByText(winner.name)).not.toThrow();
    });
  });
});
