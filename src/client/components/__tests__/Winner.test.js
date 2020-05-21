import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../../test/utils';
import Winner from '../Winner';

const winner = {
  name: 'Pickle Rick',
  photoURL: 'https://i.imgur.com/3VhMoBD.png',
  profileURL: 'https://en.wikipedia.org/wiki/Pickle_Rick',
};

describe('Winner', () => {
  it("includes the winner's name in a link", () => {
    render(<Winner winner={winner} />);

    expect(screen.getByRole('link', { name: winner.name })).toBeInTheDocument();
  });
});
