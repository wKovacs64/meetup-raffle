import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from '@testing-library/react';
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

  const fillOutForm = ({ getByLabelText }) => {
    // find elements
    const meetupInput = getByLabelText(/Meetup name/);
    const countInput = getByLabelText('Number of winners:');

    // fill out form
    fireEvent.change(meetupInput, { target: { value: params.meetup } });
    fireEvent.change(countInput, { target: { value: params.count } });
  };

  const submitForm = async ({ getByText }) => {
    const drawButton = getByText('Draw');

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
      parseInt(firstRender.getByLabelText(/Number of winners/i).value, 10),
    ).not.toBe(5);
    firstRender.unmount();
    localStorage.setItem('count', 5);
    const secondRender = render(<RaffleContainer />);
    expect(
      parseInt(secondRender.getByLabelText(/Number of winners/i).value, 10),
    ).toBe(5);
  });

  it('submits and persists data to localStorage (if available)', async () => {
    const { getByLabelText, getByText } = render(<RaffleContainer />);
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { winners: mockWinners } }),
    );

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(localStorage.getItem('count')).toBeNull();

    fillOutForm({ getByLabelText });
    await submitForm({ getByText });

    await wait(() => {
      const countInStorage = localStorage.getItem('count');
      expect(countInStorage).toBe(params.count);
      expect(mockAxios.get).toHaveBeenCalledWith(expect.any(String), {
        params,
      });
    });
  });

  it('shows an error message on error', async () => {
    const { getByLabelText, getByText } = render(<RaffleContainer />);
    const errorMessage = 'garbage';
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(errorMessage));

    fillOutForm({ getByLabelText });
    await submitForm({ getByText });

    await waitForElement(() => getByText(/Malformed response/));
  });

  it('resets the form on reset button click', async () => {
    const { getByLabelText, getByText } = render(<RaffleContainer />);
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { winners: mockWinners } }),
    );

    fillOutForm({ getByLabelText });
    await submitForm({ getByText });

    await waitForElement(() => getByText(mockWinners[0].name));
    fireEvent.click(getByText('Reset'));

    // wait for the reset to resolve, then assert
    await wait(() => {
      expect(() => getByText(mockWinners[0].name)).toThrow();
    });
  });

  it('selects current meetup input text on focus', () => {
    const { getByLabelText } = render(<RaffleContainer />);
    const meetupInput = getByLabelText(/Meetup name/);

    expect(meetupInput.selectionStart).toBe(0);
    expect(meetupInput.selectionEnd).toBe(0);

    fillOutForm({ getByLabelText });
    fireEvent.focus(meetupInput);

    expect(meetupInput.selectionStart).toBe(0);
    expect(meetupInput.selectionEnd).toBe(meetupInput.value.length);
  });
});
