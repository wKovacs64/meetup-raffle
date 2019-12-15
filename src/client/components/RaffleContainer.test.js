import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import mockAxios from 'axios';
import RaffleContainer from './RaffleContainer';

const mockWinners = Array.from(Array(2), (_, idx) => ({
  name: `Pickle Rick ${idx}`,
  photoURL: `https://i.imgur.com/3VhMoBD.png?i=${idx}`,
  profileURL: `https://en.wikipedia.org/wiki/Pickle_Rick?i=${idx}`,
}));

const params = {
  meetup: 'foo',
  count: '2',
};

describe('RaffleContainer', () => {
  const { localStorage } = global.window;

  const fillOutForm = () => {
    // find elements
    const meetupInput = screen.getByLabelText(/Meetup name/);
    const countInput = screen.getByLabelText('Number of winners:');

    // fill out form
    fireEvent.change(meetupInput, { target: { value: params.meetup } });
    fireEvent.change(countInput, { target: { value: params.count } });
  };

  const submitForm = async () => {
    const drawButton = screen.getByText('Draw');

    // submit form
    fireEvent.click(drawButton);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.window.localStorage.clear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const { container } = render(<RaffleContainer />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('restores data from localStorage (if available)', () => {
    const firstRender = render(<RaffleContainer />);
    expect(
      parseInt(screen.getByLabelText(/Number of winners/i).value, 10),
    ).not.toBe(5);
    firstRender.unmount();

    localStorage.setItem('count', 5);
    render(<RaffleContainer />);
    expect(
      parseInt(screen.getByLabelText(/Number of winners/i).value, 10),
    ).toBe(5);
  });

  it('submits and persists data to localStorage (if available)', async () => {
    render(<RaffleContainer />);
    mockAxios.get.mockResolvedValueOnce({ data: { winners: mockWinners } });

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(localStorage.getItem('count')).toBeNull();

    fillOutForm();
    await submitForm();

    await wait(() => {
      const countInStorage = localStorage.getItem('count');
      expect(countInStorage).toBe(params.count);
      expect(mockAxios.get).toHaveBeenCalledWith(expect.any(String), {
        params,
      });
    });
  });

  it('shows an error message on error', async () => {
    render(<RaffleContainer />);
    mockAxios.get.mockResolvedValueOnce('garbage');

    fillOutForm();
    await submitForm();

    await screen.findByText(/Malformed response/);
  });

  it('resets the form on reset button click', async () => {
    render(<RaffleContainer />);
    mockAxios.get.mockResolvedValueOnce({ data: { winners: mockWinners } });

    fillOutForm();
    await submitForm();

    await screen.findByText(mockWinners[0].name);
    fireEvent.click(screen.getByText('Reset'));

    // wait for the reset to resolve, then assert
    await wait(() => {
      expect(screen.queryByText(mockWinners[0].name)).toBeNull();
    });
  });

  it('selects current meetup input text on focus', async () => {
    render(<RaffleContainer />);
    const meetupInput = screen.getByLabelText(/Meetup name/);

    expect(meetupInput.selectionStart).toBe(0);
    expect(meetupInput.selectionEnd).toBe(0);

    fillOutForm();
    fireEvent.focus(meetupInput);

    // wait for Formik to settle, then assert
    await wait(() => {
      expect(meetupInput.selectionStart).toBe(0);
      expect(meetupInput.selectionEnd).toBe(meetupInput.value.length);
    });
  });
});
