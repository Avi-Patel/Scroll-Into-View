import App from '../App';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

console.warn = () => null;

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const scrollToMock = jest.fn();
window.HTMLElement.prototype.scrollTo = scrollToMock;

afterEach(() => {
  jest.clearAllMocks();
});

describe('Scroll last chat message into view', async () => {
  test('Should scroll the last message in to the view', async () => {
    const { container } = render(<App />);

    document.body.style.display = 'block';
    document.body.style.position = 'relative';

    // Check if candidate has not changed initial state of chat messages
    const listContainer = container.querySelector('#list-container');
    expect(Array.from(listContainer.childNodes).length).toEqual(20);

    // Mock scrollHeight & clientHeight for scrollContainer
    const scrollContainer = container.querySelector('#scroll-container');
    Object.defineProperty(scrollContainer, 'scrollHeight', {
      value: 1500,
      configurable: true,
    });
    Object.defineProperty(scrollContainer, 'clientHeight', {
      value: 1000,
      configurable: true,
    });

    // Add Chat message
    const incrementor = container.querySelector('#increment-button');
    userEvent.click(incrementor);

    // if candidate use scrollTo to scroll to bottom
    if (scrollToMock.mock.calls.length > 0) {
      if (scrollToMock.mock.calls[0][1]) {
        expect(scrollToMock.mock.calls[0][1]).toBeGreaterThanOrEqual(
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        );
      } else {
        expect(scrollToMock.mock.calls[0][0].top).toBeGreaterThanOrEqual(
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        );
      }
    } else {
      expect(scrollIntoViewMock.mock.calls.length > 0).toBe(true);
    }
  });

  test('Should not scroll the last message in to the view if user has make manual scrolls', async () => {
    const { container } = render(<App />);

    document.body.style.display = 'block';
    document.body.style.position = 'relative';

    // Check if candidate has not changed initial state of chat messages
    const listContainer = container.querySelector('#list-container');
    expect(Array.from(listContainer.childNodes).length).toEqual(20);

    const scrollContainer = container.querySelector('#scroll-container');

    // trigger scroll event
    act(() => {
      fireEvent.scroll(scrollContainer);
    });

    // Add Chat message
    const incrementor = container.querySelector('#increment-button');
    userEvent.click(incrementor);

    expect(
      scrollIntoViewMock.mock.calls.length === 0 &&
        scrollToMock.mock.calls.length === 0
    ).toBe(true);
  });

  test('Should scroll the last message in to the view if user has make manual scrolls and clicked on scroll to bottom', async () => {
    const { container } = render(<App />);

    document.body.style.display = 'block';
    document.body.style.position = 'relative';

    // Check if candidate has not changed initial state of chat messages
    const listContainer = container.querySelector('#list-container');
    expect(Array.from(listContainer.childNodes).length).toEqual(20);

    const scrollContainer = container.querySelector('#scroll-container');
    // Mock scrollHeight & clientHeight for scrollContainer
    Object.defineProperty(scrollContainer, 'scrollHeight', {
      value: 1500,
      configurable: true,
    });
    Object.defineProperty(scrollContainer, 'clientHeight', {
      value: 1000,
      configurable: true,
    });

    // trigger scroll event
    act(() => {
      fireEvent.scroll(scrollContainer);
    });

    // Trigger scroll to bottom
    const scrollToBottomButton = container.querySelector('#scroll-to-bottom');
    userEvent.click(scrollToBottomButton);

    await wait(300);

    // Add Chat message
    const incrementor = container.querySelector('#increment-button');
    userEvent.click(incrementor);

    if (scrollToMock.mock.calls.length > 0) {
      if (scrollToMock.mock.calls[0][1]) {
        expect(scrollToMock.mock.calls[0][1]).toBeGreaterThanOrEqual(
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        );
      } else {
        expect(scrollToMock.mock.calls[0][0].top).toBeGreaterThanOrEqual(
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        );
      }
    } else {
      expect(scrollIntoViewMock.mock.calls.length > 0).toBe(true);
    }
  });
});
