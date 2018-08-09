import React from 'react';
import { render, fireEvent, waitForElement, wait } from 'react-testing-library';
import { mount } from 'enzyme';
import mockAxios from 'axios';
import RaffleContainer from './RaffleContainer';

const mockWinners = Array.from(Array(2), (_, idx) => ({
  name: `Pickle Rick ${idx}`,
  photoURL: `https://i.imgur.com/3VhMoBD.png?i=${idx}`,
  profileURL: `https://en.wikipedia.org/wiki/Pickle_Rick?i=${idx}`,
}));

const params = {
  meetup: 'foo',
  count: 2,
  specificEventId: '',
  meetupApiKey: '',
};

describe('RaffleContainer', () => {
  const mockLocalStorage = global.window.localStorage; // from setupTests.js

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
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const { container } = render(<RaffleContainer />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("doesn't crash if localStorage is unavailable", () => {
    // Remove localStorage temporarily
    global.window.localStorage = undefined;
    // Prevent React from logging errors thrown in RaffleContainer
    jest.spyOn(console, 'error');
    global.console.error.mockImplementation(() => {});

    expect(() => {
      // test localStorage.getItem
      const wrapper = mount(<RaffleContainer />);
      // test localStorage.setItem
      wrapper.instance().preserve({ key: 'value' });
    }).not.toThrow();

    // Restore React error logging
    global.console.error.mockRestore();
    // Restore localStorage
    global.window.localStorage = mockLocalStorage;
  });

  it('restores data from localStorage (if available)', () => {
    expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
    render(<RaffleContainer />);
    expect(mockLocalStorage.getItem).toHaveBeenCalled();
  });

  it('submits and persists data to localStorage (if available)', async () => {
    const { getByLabelText, getByText } = render(<RaffleContainer />);
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { winners: mockWinners } }),
    );

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();

    fillOutForm({ getByLabelText });
    await submitForm({ getByText });

    await wait(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
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
    expect(() => getByText(mockWinners[0].name)).toThrow();
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

  it('toggles advanced options section', () => {
    const { getByTestId } = render(<RaffleContainer />);
    const advancedButton = getByTestId('advanced-button');
    const advancedButtonIcon = getByTestId('advanced-button-icon');

    // This test isn't great. It would be better to somehow test visibility of
    // the advanced options, but because of how the Collapse component from
    // react-css-collapse works, they are in the DOM all the time and the only
    // thing that changes is the height of the containing element. At this time,
    // I haven't found a good way to assert true visibility.
    const collapsedIcon = advancedButtonIcon.textContent;
    fireEvent.click(advancedButton);
    const expandedIcon = advancedButtonIcon.textContent;

    expect(collapsedIcon).not.toBe(expandedIcon);
  });

  it('selects current specific event ID input text on focus', () => {
    const { getByLabelText } = render(<RaffleContainer />);
    const specificEventIdInput = getByLabelText(/Specific event ID/);

    expect(specificEventIdInput.selectionStart).toBe(0);
    expect(specificEventIdInput.selectionEnd).toBe(0);

    fireEvent.change(specificEventIdInput, { target: { value: '12345' } });
    fireEvent.focus(specificEventIdInput);

    expect(specificEventIdInput.selectionStart).toBe(0);
    expect(specificEventIdInput.selectionEnd).toBe(
      specificEventIdInput.value.length,
    );
  });

  it('selects current Meetup API key input text on focus', () => {
    const { getByLabelText } = render(<RaffleContainer />);
    const meetupApiKeyInput = getByLabelText(/Meetup API key/);

    expect(meetupApiKeyInput.selectionStart).toBe(0);
    expect(meetupApiKeyInput.selectionEnd).toBe(0);

    fireEvent.change(meetupApiKeyInput, { target: { value: '6a7b8c9d0e' } });
    fireEvent.focus(meetupApiKeyInput);

    expect(meetupApiKeyInput.selectionStart).toBe(0);
    expect(meetupApiKeyInput.selectionEnd).toBe(meetupApiKeyInput.value.length);
  });
});
