import React from 'react';
import { render, screen } from '@testing-library/react';
import Winners from '../Winners';

jest.mock('../Winner', () =>
  jest.fn(({ winner }) => <span>{winner.name}</span>),
);

const winners = Array.from(Array(2), (_, idx) => ({
  name: `Pickle Rick ${idx}`,
  photoURL: `https://i.imgur.com/3VhMoBD.png?i=${idx}`,
  profileURL: `https://en.wikipedia.org/wiki/Pickle_Rick?i=${idx}`,
}));

describe('Winners', () => {
  it('renders all winners', () => {
    render(<Winners winners={winners} />);

    winners.forEach((winner) => {
      expect(() => screen.getByText(winner.name)).not.toThrow();
    });
  });
});
