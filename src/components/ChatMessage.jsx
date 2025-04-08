import React from 'react';
import ChatbotIcon from './ChatbotIcon';

const ChatMessage = ({ chat }) => (
  <div className={`message ${chat.isBot ? 'bot-message' : 'user-message'}`}>
    <div className="message-text">{chat.text}</div>
  </div>
);

export default ChatMessage;
