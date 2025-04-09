import { useState } from 'react';
import TypingIndicator from './TypingIndicator';

const ChatForm = ({ addMessage }) => {
    const [message, setMessage] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        addMessage({
            isBot: false,
            text: message.trim()
        });

        setMessage(''); // Clear input
        setIsLoading(true);

        try {
            const botResponse = await getChatbotResponse(message);
            addMessage({
                isBot: true,
                text: botResponse
            });
        } catch (error) {
            console.error('Error:', error);
            addMessage({
                isBot: true,
                text: "Sorry, I couldn't process your request."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
            />
            <button 
                type="submit" 
                className="send-button" 
                disabled={isLoading || !message.trim()}
            >
                <span className="material-symbols-rounded">send</span>
            </button>
            {isLoading && <TypingIndicator />}
        </form>
    );
};

export default ChatForm;