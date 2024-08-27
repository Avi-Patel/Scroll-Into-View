import App from '../App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

console.warn = () => null;

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const scrollToMock = jest.fn();
window.HTMLElement.prototype.scrollTo = scrollToMock;

test('Should scroll the last message in to the view', async () => {
  const { container } = render(<App />);

  document.body.style.display = 'block';
  document.body.style.position = 'relative';

  const listContainer = container.querySelector('#list-container');
  expect(Array.from(listContainer.childNodes).length).toEqual(20);

  const scrollContainer = container.querySelector('#scroll-container');
  Object.defineProperty(scrollContainer, 'scrollHeight', {
    value: 1500,
    configurable: true,
  });
  Object.defineProperty(scrollContainer, 'clientHeight', {
    value: 1000,
    configurable: true,
  });

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
