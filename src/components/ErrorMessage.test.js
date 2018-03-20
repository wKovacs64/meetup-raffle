import React from 'react';
import { render } from 'react-testing-library';
import ErrorMessage from './ErrorMessage';

const errorProps = {
  title: 'Test error title',
  subtitle: 'Test error subtitle',
  problemText: 'Test error problem text',
};

describe('ErrorMessage', () => {
  const { container, queryByTestId } = render(<ErrorMessage />);

  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it('renders defaults', () => {
    render(<ErrorMessage />, { container });
    expect(queryByTestId('title')).toBeTruthy();
    expect(queryByTestId('subtitle')).toBeTruthy();
    expect(queryByTestId('problemText')).toBeTruthy();
  });

  it('renders overrides', () => {
    render(<ErrorMessage {...errorProps} />, { container });
    expect(queryByTestId('title').textContent).toBe(errorProps.title);
    expect(queryByTestId('subtitle').textContent).toBe(errorProps.subtitle);
    expect(queryByTestId('problemText').textContent).toBe(
      errorProps.problemText,
    );
  });
});
