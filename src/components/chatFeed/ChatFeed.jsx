import { useState, useCallback } from 'react';

import { Message } from './components/message';

import { getNewMessage,  } from './utils';

export const ChatFeed = () => {
  // Do not change this state and it's initial value
  const [messages, setMessages] = useState(
    Array.from({ length: 20 }).map(() => getNewMessage())
  );

  const handleAddMessage = useCallback(() => {
    setMessages((prev) => [...prev, getNewMessage()]);

    // implement scroll into view for last message
  }, []);

  const handleScrollToBottom = useCallback(() => {
    // implement scroll to bottom
  }, []);

  /* 
    Do not change id attached on any html element below. They are required for test cases
  */

  return (
    <div
      className="relative flex flex-col h-full w-full overflow-y-auto"
      id="scroll-container"
    >
      <div
        style={{
          zIndex: 10,
        }}
        className="sticky top-0 py-4 w-full flex justify-center gap-4 bg-gray-300"
      >
        <button
          onClick={handleAddMessage}
          className="rounded-xl border-gray-700 border-solid border-2 px-3 py-2 bg-white"
          id="increment-button"
        >
          Add Message
        </button>
        <button
          onClick={handleScrollToBottom}
          className="rounded-xl border-gray-700 border-solid border-2 px-3 py-2 bg-white"
          id="scroll-to-bottom"
        >
          Scroll To Bottom
        </button>
      </div>
      <div
        className="flex-1 p-4 flex flex-col w-full gap-6 justify-end"
        id="list-container"
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};
