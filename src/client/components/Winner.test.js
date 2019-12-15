import React from 'react';
import { render, screen } from '@testing-library/react';
import Winner from './Winner';

const winner = {
  name: 'Pickle Rick',
  photoURL: 'https://i.imgur.com/3VhMoBD.png',
  profileURL: 'https://en.wikipedia.org/wiki/Pickle_Rick',
};

describe('Winner', () => {
  it('renders', () => {
    const { container } = render(<Winner winner={winner} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("includes the winner's name", () => {
    render(<Winner winner={winner} />);
    expect(screen.getByTestId('name').textContent).toBe(winner.name);
  });
});
