import React, { useState, useRef, useEffect } from 'react';
import nlp from 'compromise'; // Import Compromise for NLU
import ChatbotIcon from './components/ChatbotIcon';
import { Boticon } from './components/ChatbotIcon';
import Chatform from './components/Chatform';
import ChatMessage from './components/ChatMessage';
import DarkModeToggle from './components/DarkModeToggle';

export const App = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi!', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chatBodyRef = useRef(null);

  // Function to process user input and generate bot response
  const processMessage = (userMessage) => {
    const doc = nlp(userMessage);

    // Detect intents using Compromise patterns
    if (doc.has('#Greeting')) {
      return 'Hello! How can I assist you today?';
    } else if (doc.has('#Weather')) {
      return 'The weather is sunny today! Anything else I can help with?';
    } else if (doc.has('#Question')) {
      return 'Good question! Could you provide more details so I can assist you better?';
    } else {
      return 'Sorry, I didn’t quite understand that. Can you try again?';
    }
  };

  // Function to add messages to the chat
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, timestamp: new Date().toLocaleTimeString() }]);

    // If the message is from the user, process it and respond
    if (message.role === 'user') {
      const botResponse = processMessage(message.text);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'model', text: botResponse, timestamp: new Date().toLocaleTimeString() },
        ]);
      }, 500); // Add a slight delay for a natural feel
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <div className="iphone-16-frame">
        <div className="iphone-bezel">
          <div className="chatbot-popup">
            <div className="stars-background">
              <div className="stars"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
            </div>
            <div className="chat-header">
              <div className="header-info">
                <Boticon />
                <div className="logo-text">
                  <h3>Arvis 1.0</h3>
                </div>
              </div>
              <div className="header-controls">
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                  <span className="material-symbols-rounded">
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>
                <button className="clear-chat-button" onClick={clearChat}>
                  <span className="material-symbols-rounded">delete_sweep</span>
                </button>
              </div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
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
          <div className="camera"></div>
        </div>
        <div className="volume-buttons"></div>
        <div className="power-button"></div>
        <div className="home-indicator"></div>
      </div>
    </div>
  );
};

export default App;