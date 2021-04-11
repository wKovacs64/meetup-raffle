import React from 'react';
import { server, rest } from '../../../mocks/server';
import { render, screen, user } from '../../../test/utils';
import Raffle from '../Raffle';

const drawUrl = '/.netlify/functions/draw';
const params = { meetup: 'foo', count: '2' };

describe('Raffle', () => {
  const { localStorage } = global.window;

  function fillOutForm() {
    // find elements
    const meetupInput = screen.getByLabelText(/meetup name/i);
    const countInput = screen.getByLabelText(/number of winners/i);

    // fill out form
    user.type(meetupInput, params.meetup);
    user.type(countInput, params.count);
  }

  function submitForm() {
    const drawButton = screen.getByRole('button', { name: 'Draw' });

    // submit form
    user.click(drawButton);
  }

  beforeEach(() => {
    jest.clearAllMocks();
    global.window.localStorage.clear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    render(<Raffle />);

    expect(
      screen.getByRole('textbox', { name: /meetup name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /number of winners/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /decrement/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /increment/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Draw' })).toBeInTheDocument();
  });

  it('restores data from localStorage (if available)', () => {
    const { unmount } = render(<Raffle />);
    expect(
      parseInt(screen.getByLabelText(/Number of winners/i).value, 10),
    ).not.toBe(5);
    unmount();

    localStorage.setItem('count', 5);
    render(<Raffle />);

    expect(
      parseInt(screen.getByLabelText(/Number of winners/i).value, 10),
    ).toBe(5);
  });

  it('submits and persists data to localStorage (if available)', () => {
    render(<Raffle />);

    expect(localStorage.getItem('count')).toBeNull();

    fillOutForm();
    submitForm();

    const countInStorage = localStorage.getItem('count');
    expect(countInStorage).toBe(params.count);
  });

  it('shows an error message on malformed response', async () => {
    server.use(
      rest.get(drawUrl, (_, res, ctx) => {
        return res.once(ctx.json({ garbage: 'json' }));
      }),
    );
    render(<Raffle />);

    fillOutForm();
    submitForm();

    await screen.findByText(/malformed response/i);
  });

  it('shows API-provided error messages', async () => {
    server.use(
      rest.get(drawUrl, (_, res, ctx) => {
        return res.once(
          ctx.status(404),
          ctx.json({ error: { message: 'Sorry, something went awry.' } }),
        );
      }),
    );
    render(<Raffle />);

    fillOutForm();
    submitForm();

    await screen.findByText(/awry/i);
  });

  it('resets the form on reset button click', async () => {
    render(<Raffle />);

    fillOutForm();
    submitForm();

    user.click(await screen.findByRole('button', { name: 'Start Over' }));

    expect(
      screen.queryByRole('button', { name: 'Start Over' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Draw' })).toBeInTheDocument();
  });

  it('draws again on retry button click', async () => {
    render(<Raffle />);

    fillOutForm();
    submitForm();

    user.click(await screen.findByRole('button', { name: 'Draw Again' }));

    await screen.findByTestId('RingLoader');
    expect(
      await screen.findByRole('button', { name: 'Draw Again' }),
    ).toBeInTheDocument();
  });

  it('selects current meetup input text on focus', () => {
    render(<Raffle />);
    const meetupInput = screen.getByLabelText(/meetup name/i);

    expect(meetupInput.selectionStart).toBe(0);
    expect(meetupInput.selectionEnd).toBe(0);

    fillOutForm();
    user.click(meetupInput);

    expect(meetupInput.selectionStart).toBe(0);
    expect(meetupInput.selectionEnd).toBe(meetupInput.value.length);
  });

  it('disables the Draw button while the inputs are invalid', () => {
    render(<Raffle />);
    const meetupInput = screen.getByLabelText(/meetup name/i);
    const countInput = screen.getByLabelText(/number of winners/i);
    const drawButton = screen.getByRole('button', { name: 'Draw' });

    // meetup: invalid, count: valid
    user.clear(meetupInput);
    user.type(countInput, params.count);
    expect(meetupInput).not.toHaveValue();
    expect(countInput).toHaveValue(params.count);
    expect(drawButton).toBeDisabled();

    // meetup: valid, count: invalid
    user.type(meetupInput, params.meetup);
    user.clear(countInput);
    expect(meetupInput).toHaveValue(params.meetup);
    expect(countInput).not.toHaveValue();
    expect(drawButton).toBeDisabled();

    // meetup: valid, count: valid
    fillOutForm();
    expect(meetupInput).toHaveValue(params.meetup);
    expect(countInput).toHaveValue(params.count);
    expect(drawButton).toBeEnabled();
  });
});
