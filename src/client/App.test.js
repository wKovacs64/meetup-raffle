import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toMatchSnapshot();
});
