import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders', () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders defaults', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(ErrorMessage.defaultProps.title)).toBeTruthy();
    expect(screen.getByText(ErrorMessage.defaultProps.subtitle)).toBeTruthy();
    expect(
      screen.getByText(ErrorMessage.defaultProps.problemText),
    ).toBeTruthy();
  });

  it('renders overrides', () => {
    const errorProps = {
      title: 'Test error title',
      subtitle: 'Test error subtitle',
      problemText: 'Test error problem text',
    };
    render(<ErrorMessage {...errorProps} />);
    expect(screen.getByText(errorProps.title)).toBeTruthy();
    expect(screen.getByText(errorProps.subtitle)).toBeTruthy();
    expect(screen.getByText(errorProps.problemText)).toBeTruthy();
  });
});
