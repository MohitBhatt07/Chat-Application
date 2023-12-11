import React, { useState, useRef, useEffect } from 'react';

const Message = ({ text }) => (
  <div className="mb-2">
    <div className="bg-gray-300 p-2 rounded-md">{text}</div>
  </div>
);

const ChatWindow = ({ messages }) => {
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto p-4"
      style={{ height: '400px' }}
    >
      {messages.map((message, index) => (
        <Message key={index} text={message.text} />
      ))}
    </div>
  );
};

const Chatframe= () => {
  const [messages, setMessages] = useState([
    { text: 'Hello' },
    { text: 'How are you?' },
    { text: 'I am fine, thank you!' },
  ]);

  const handleNewMessage = () => {
    const newMessage = prompt('Enter a new message:');
    if (newMessage) {
      setMessages([...messages, { text: newMessage }]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatWindow messages={messages} />
      <div className="p-4">
        <button onClick={handleNewMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Chatframe;