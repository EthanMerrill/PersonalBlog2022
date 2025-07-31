import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ChatMessage, { ChatMessageProps } from '../ChatMessage/ChatMessage';
import { secretsService } from '../../services/secretsService';

interface AboutMeSectionProps {
    width?: number;
    breakpoint?: number;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
    const [isSecretsServiceReady, setIsSecretsServiceReady] = useState(false);
    const [isProcessingAI, setIsProcessingAI] = useState(false);

    // Memoize initial messages to prevent recreation on each render
    const initialMessages: ChatMessageProps[] = useMemo(() => [
        { message: "Hi! I'm a software engineer based in Boston. I'm currently working CapTech Consulting. I'm passionate about web development, and am always looking for new opportunities to learn and grow.", author: "Ethan's Assistant", timestamp: Date.now(), user: false },
        { message: "I'm currently working on a few personal projects, including this website. I'm using it as a platform to showcase my work and share my thoughts on various topics.", author: "Ethan's Assistant", timestamp: Date.now(), user: false },
        { message: "If you have any questions you can ask them here, or drop me a line directly!", author: "Ethan's Assistant", timestamp: Date.now(), user: false },
    ], []);

    // Chat state
    const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);
    const [messageQueue, setMessageQueue] = useState<ChatMessageProps[]>(() => [...initialMessages]);
    const [input, setInput] = useState("");
    const [completed, setCompleted] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // 1. Secrets service initialization - runs ONLY once on mount
    useEffect(() => {
        let isMounted = true; // Cleanup flag

        const initializeService = async () => {
            try {
                console.log('Initializing secrets service...');

                // Check if service is healthy
                const isHealthy = await secretsService.healthCheck();
                if (!isHealthy || !isMounted) {
                    console.warn('Secrets service is not available');
                    return;
                }

                // Auto-authenticate if not already authenticated
                if (!secretsService.isAuthenticated()) {
                    const success = await secretsService.authenticate({
                        username: import.meta.env.VITE_SECRETS_SERVICE_USERNAME || 'VITE_SECRETS_SERVICE_USERNAME not set!',
                        password: import.meta.env.VITE_SECRETS_SERVICE_PASSWORD || 'VITE_SECRETS_SERVICE_PASSWORD not set!'
                    });

                    if (!success || !isMounted) {
                        console.error('Failed to authenticate with secrets service');
                        return;
                    }
                }

                if (isMounted) {
                    setIsSecretsServiceReady(true);
                    console.log('Secrets service ready!');
                }
            } catch (error) {
                console.error('Failed to initialize secrets service:', error);
            }
        };

        initializeService();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array - runs only once

    // 2. AI response function - memoized to prevent recreation
    const getAIResponse = useCallback(async (message: string): Promise<string> => {
        try {
            // Call backend /api/chat endpoint instead of OpenAI directly
            const token = secretsService.getToken();
            const response = await fetch(import.meta.env.VITE_SECRETS_SERVICE_URL + '/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`Backend chat API error: ${response.status}`);
            }

            const data = await response.json();
            if (data.response) {
                return data.response;
            } else if (data.error) {
                throw new Error(data.error);
            } else {
                return 'Sorry, I couldn\'t process that request.';
            }
        } catch (error) {
            console.error('AI response error:', error);
            throw error;
        }
    }, []); // No dependencies - function is stable

    // 3. Enhanced submit handler with AI integration
    const handleSubmit = useCallback(async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessageProps = {
            message: input,
            timestamp: Date.now(),
            user: true,
            author: "You"
        };

        setChatMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setIsProcessingAI(true);

        // Only attempt AI response if secrets service is ready
        if (isSecretsServiceReady) {
            try {
                const aiResponse = await getAIResponse(currentInput);

                const aiMessage: ChatMessageProps = {
                    message: aiResponse,
                    timestamp: Date.now(),
                    user: false,
                    author: "Ethan's Assistant"
                };

                setChatMessages(prev => [...prev, aiMessage]);
            } catch (error) {
                console.error('AI response failed:', error);

                const errorMessage: ChatMessageProps = {
                    message: "Sorry, I'm having trouble connecting to my AI assistant right now. Feel free to reach out to me directly!",
                    timestamp: Date.now(),
                    user: false,
                    author: "Ethan's Assistant"
                };

                setChatMessages(prev => [...prev, errorMessage]);
            }
        } else {
            // Fallback when secrets service isn't available
            const fallbackMessage: ChatMessageProps = {
                message: "Thanks for your message! The AI assistant is currently offline, but feel free to contact me directly.",
                timestamp: Date.now(),
                user: false,
                author: "Ethan's Assistant"
            };

            setChatMessages(prev => [...prev, fallbackMessage]);
        }

        setIsProcessingAI(false);
    }, [input, isSecretsServiceReady, getAIResponse]);

    // 4. Auto-scroll effect - optimized
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    // 5. Key press handler - memoized
    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isProcessingAI) {
            handleSubmit();
        }
    }, [handleSubmit, isProcessingAI]);

    // 6. Message queue effect - optimized with proper dependencies
    useEffect(() => {
        if (messageQueue.length > 0 && completed) {
            const timer = setTimeout(() => {
                setChatMessages(prev => [...prev, messageQueue[0]]);
                setMessageQueue(prev => prev.slice(1));
                setCompleted(false);
            }, 100); // Small delay for better UX

            return () => clearTimeout(timer);
        }
    }, [messageQueue.length, completed]); // Only depend on length and completed status

    // Remove the console.log that calls getOpenAIKey() on every render
    // console.log("AI KEY: ", secretsService.getOpenAIKey()) // This was causing issues

    return (
        <div className="flex flex-col h-96 mb-10 mx-auto px-10 max-w-6xl">
            <div className="flex-grow rounded-t-lg">
                <div ref={chatContainerRef} className="flex flex-col justify-end overflow-scroll h-96">
                    {chatMessages.map((message, i) => (
                        <ChatMessage
                            key={`${message.timestamp}-${i}`} // Better key for performance
                            message={message.message}
                            user={message.user}
                            author={message.author}
                            timestamp={message.timestamp}
                            completed={setCompleted}
                        />
                    ))}
                    {isProcessingAI && (
                        <div className="text-gray-500 italic p-2">
                            Ethan's Assistant is thinking...
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-b-lg">
                <div className="flex">
                    <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-l-lg p-2"
                        placeholder="Ask me anything about Ethan..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isProcessingAI}
                    />
                    <button
                        className="bg-blue-500 text-white rounded-r-lg p-2 ml-2 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={isProcessingAI || !input.trim()}
                    >
                        {isProcessingAI ? 'Thinking...' : 'Send'}
                    </button>
                </div>
                {!isSecretsServiceReady && (
                    <div className="text-sm text-amber-600 mt-1">
                        ⚠️ AI assistant offline - messages will receive static responses
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutMeSection;