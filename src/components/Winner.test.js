import React from 'react';
import { render } from 'react-testing-library';
import Winner from './Winner';

const winner = {
  name: 'Pickle Rick',
  photoURL: 'https://i.imgur.com/3VhMoBD.png',
  profileURL: 'https://en.wikipedia.org/wiki/Pickle_Rick',
};

describe('Winner', () => {
  const { container, queryByTestId } = render(<Winner winner={winner} />);

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it("includes the winner's name", () => {
    expect(queryByTestId('name').textContent).toBe(winner.name);
  });
});
