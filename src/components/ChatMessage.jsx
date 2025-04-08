import React, { useEffect, useRef } from 'react';

const ChatMessage = ({ chat }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }, [chat]);

  return (
    <div className={`message ${chat.isBot ? 'bot-message' : 'user-message'}`} ref={messageRef}>
      <div className="message-text">{chat.text}</div>
    </div>
  );
};

export default ChatMessage;
