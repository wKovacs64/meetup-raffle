/* global vi */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetButtons from '../ResetButtons';

describe('ResetButtons', () => {
  const onReset = vi.fn();
  const onRetry = vi.fn();

  it('renders', () => {
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(
      screen.getByRole('button', { name: 'Start Over' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Draw Again' }),
    ).toBeInTheDocument();
  });

  it('calls onReset appropriately', async () => {
    const user = userEvent.setup();
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(onReset).toHaveBeenCalledTimes(0);
    await user.click(screen.getByRole('button', { name: 'Start Over' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onRetry appropriately', async () => {
    const user = userEvent.setup();
    render(<ResetButtons onReset={onReset} onRetry={onRetry} />);

    expect(onRetry).toHaveBeenCalledTimes(0);
    await user.click(screen.getByRole('button', { name: 'Draw Again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
