import { useState } from 'react';

const ChatForm = ({ addMessage }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getChatbotResponse = async (message) => {
        const API_URL = import.meta.env.VITE_API_URL;
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }]
                })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error:', error);
            return "Sorry, I'm having trouble connecting right now.";
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const inputField = event.target.querySelector('.chat-input');
        const message = inputField.value.trim();
        
        if (!message) return;
        
        inputField.value = '';
        
        // Add user message
        addMessage({
            isBot: false,
            text: message
        });

        // Show bot is typing
        setIsLoading(true);

        // Get bot response
        const botResponse = await getChatbotResponse(message);
        
        // Add bot message
        addMessage({
            isBot: true,
            text: botResponse
        });

        setIsLoading(false);
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input
                type="text"
                className="chat-input"
                placeholder={isLoading ? "Bot is typing..." : "Type your message here..."}
                required
                disabled={isLoading}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
                <span className="material-symbols-rounded">send</span>
            </button>
        </form>
    );
};

export default ChatForm;