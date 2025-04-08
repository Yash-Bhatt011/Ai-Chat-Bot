import { useState } from 'react';

const ChatForm = ({ addMessage }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getChatbotResponse = async (message) => {
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        console.log('Using API Key:', API_KEY);
        console.log('Sending message:', message);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY} `, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            });

            console.log('API Response Status:', response.status);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error Response:', errorData);
                throw new Error(errorData.error?.message || 'API request failed');
            }

            const data = await response.json();
            console.log('API Response Data:', data);
            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Unexpected API response format');
            }
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error details:', error);
            return "Sorry, I couldn't process your request. Error: " + error.message;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const inputField = event.target.querySelector('.chat-input');
        const message = inputField.value.trim();
        console.log();
        
        
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