import React from 'react';
import { render } from 'react-testing-library';
import ErrorMessage from './ErrorMessage';

const errorProps = {
  title: 'Test error title',
  subtitle: 'Test error subtitle',
  problemText: 'Test error problem text',
};

describe('ErrorMessage', () => {
  const { container, getByText } = render(<ErrorMessage />);

  it('renders', () => {
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders defaults', () => {
    render(<ErrorMessage />, { container });
    expect(getByText(ErrorMessage.defaultProps.title)).toBeTruthy();
    expect(getByText(ErrorMessage.defaultProps.subtitle)).toBeTruthy();
    expect(getByText(ErrorMessage.defaultProps.problemText)).toBeTruthy();
  });

  it('renders overrides', () => {
    render(<ErrorMessage {...errorProps} />, { container });
    expect(getByText(errorProps.title)).toBeTruthy();
    expect(getByText(errorProps.subtitle)).toBeTruthy();
    expect(getByText(errorProps.problemText)).toBeTruthy();
  });
});
