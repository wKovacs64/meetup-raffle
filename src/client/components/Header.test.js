import React from 'react';
import { render } from 'react-testing-library';
import Header from './Header';

describe('Header', () => {
  const { container } = render(<Header />);

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });
});
