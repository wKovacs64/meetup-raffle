import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../test/utils';
import Winners from '../Winners';

const winners = Array.from(Array(2), (_, idx) => ({
  name: `Pickle Rick ${idx}`,
  photoURL: `https://i.imgur.com/3VhMoBD.png?i=${idx}`,
  profileURL: `https://en.wikipedia.org/wiki/Pickle_Rick?i=${idx}`,
}));

describe('Winners', () => {
  it('renders all winners', () => {
    render(<Winners winners={winners} />);

    winners.forEach((winner) => {
      expect(
        screen.getByRole('link', { name: winner.name }),
      ).toBeInTheDocument();
    });
  });
});
