import React from 'react';
import { render } from 'react-testing-library';
import ErrorMessage from './ErrorMessage';

const errorProps = {
  title: 'Test error title',
  subtitle: 'Test error subtitle',
  problemText: 'Test error problem text',
};

describe('ErrorMessage', () => {
  const { container, getByTestId } = render(<ErrorMessage />);

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it('renders defaults', () => {
    render(<ErrorMessage />, { container });
    expect(getByTestId('title')).toBeTruthy();
    expect(getByTestId('subtitle')).toBeTruthy();
    expect(getByTestId('problemText')).toBeTruthy();
  });

  it('renders overrides', () => {
    render(<ErrorMessage {...errorProps} />, { container });
    expect(getByTestId('title').textContent).toBe(errorProps.title);
    expect(getByTestId('subtitle').textContent).toBe(errorProps.subtitle);
    expect(getByTestId('problemText').textContent).toBe(errorProps.problemText);
  });
});
