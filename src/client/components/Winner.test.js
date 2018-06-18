import React from 'react';
import { render } from 'react-testing-library';
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
    const { getByTestId } = render(<Winner winner={winner} />);
    expect(getByTestId('name').textContent).toBe(winner.name);
  });
});
