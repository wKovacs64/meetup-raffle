import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders defaults', () => {
    render(<ErrorMessage />);

    expect(
      screen.getByText(ErrorMessage.defaultProps.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(ErrorMessage.defaultProps.subtitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(ErrorMessage.defaultProps.problemText),
    ).toBeInTheDocument();
  });

  it('renders overrides', () => {
    const errorProps = {
      title: 'Test error title',
      subtitle: 'Test error subtitle',
      problemText: 'Test error problem text',
    };
    render(<ErrorMessage {...errorProps} />);

    expect(screen.getByText(errorProps.title)).toBeInTheDocument();
    expect(screen.getByText(errorProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(errorProps.problemText)).toBeInTheDocument();
  });
});
