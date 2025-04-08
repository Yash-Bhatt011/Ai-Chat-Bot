import React, { useState } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import { Boticon } from './components/ChatbotIcon';
import Chatform from './components/Chatform';
import ChatMessage from './components/ChatMessage';

export const App = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi! How can I help you?' },
  ]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="container">
      <div className="iphone-16-frame">
        <div className="iphone-bezel">
          <div className="chatbot-popup">
            <div className="chat-header">
              <div className="header-info">
                <Boticon />
                <div className="logo-text">
                  <h3>Chatbot</h3>
                </div>
                <button className="minimize-button">
                  <span className="material-symbols-rounded">keyboard_arrow_down</span>
                </button>
              </div>
            </div>
            <div className="chat-body">
              {messages.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>
            <div className="chat-footer">
              <Chatform addMessage={addMessage} />
            </div>
          </div>
        </div>
        <div className="dynamic-island">
          <div className="sensor-light"></div>
        </div>
        <div className="volume-buttons"></div>
        <div className="power-button"></div>
        <div className="home-indicator"></div>
      </div>
    </div>
  );
};

export default App;