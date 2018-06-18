import React from 'react';
import { render } from 'react-testing-library';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders', () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders defaults', () => {
    const { getByText } = render(<ErrorMessage />);
    expect(getByText(ErrorMessage.defaultProps.title)).toBeTruthy();
    expect(getByText(ErrorMessage.defaultProps.subtitle)).toBeTruthy();
    expect(getByText(ErrorMessage.defaultProps.problemText)).toBeTruthy();
  });

  it('renders overrides', () => {
    const errorProps = {
      title: 'Test error title',
      subtitle: 'Test error subtitle',
      problemText: 'Test error problem text',
    };
    const { getByText } = render(<ErrorMessage {...errorProps} />);
    expect(getByText(errorProps.title)).toBeTruthy();
    expect(getByText(errorProps.subtitle)).toBeTruthy();
    expect(getByText(errorProps.problemText)).toBeTruthy();
  });
});
