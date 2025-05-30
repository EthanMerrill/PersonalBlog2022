import React, { useEffect, useRef, useState } from 'react';
import ChatMessage, { ChatMessageProps } from '../ChatMessage/ChatMessage';

interface AboutMeSectionProps {
    width?: number;
    breakpoint?: number;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {

    // introductory set of messages to be used
    const initialMessages: ChatMessageProps[] = [
        { message: "Hi! I'm a software engineer based in Boston. I'm currently working CapTech Consulting. I'm passionate about web development, and am always looking for new opportunities to learn and grow.", author: "Ethan's Assistant", timestamp: Date.now(), user: false },
        { message: "I'm currently working on a few personal projects, including this website. I'm using it as a platform to showcase my work and share my thoughts on various topics.", author: "Ethan's Assistant", timestamp: Date.now(), user: false },
        { message: "If you have any questions you can ask them here, or drop me a line directly!", author: "Ethan's Assistant", timestamp: Date.now(), user: false },
    ];

    // The about me section is going to be this chat app. It will contain all the state and logic to handle the chat
    const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);
    const [messageQueue, setMessageQueue] = useState<ChatMessageProps[]>([...initialMessages]);
    const [input, setInput] = useState("");
    const [completed, setCompleted] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // event handler to handle submitting a new message
    const handleSubmit = () => {
        setChatMessages([...chatMessages, {
            message: input,
            timestamp: Date.now(),
            user: true,
            author: "You"
        }]);
        setInput("");
    };

    // Scroll to bottom on chatMessages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    // add an event listener to the input to handle submitting a new message when the user presses enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    // Display messages with a delay to simulate a conversation
    // We're going to have two arrays, a queue of messages to be displayed and a list of messages that have already been displayed
    useEffect(() => {
        console.log(chatMessages)
        // if there is a message in the queue and the current message has completed typing, display the next message
        if (messageQueue.length > 0 && completed) {
            // create a copy of the messageQueue array
            const updatedMessageQueue = [...messageQueue];
            // add the first message from the queue to the list of displayed messages
            setChatMessages([...chatMessages, updatedMessageQueue[0]]);
            // remove the first message from the queue and update the messageQueue state
            console.log("Updated Messages:", updatedMessageQueue.slice(1))
            setMessageQueue(updatedMessageQueue.slice(1));
            setCompleted(false);
        }
    }, [chatMessages, messageQueue, completed, setCompleted]);

    return (
        <div className="flex flex-col h-96 mb-10 mx-auto px-10 max-w-6xl">
            <div className="flex-grow rounded-t-lg">
                {/* Chat messages */}

                <div ref={chatContainerRef} className="flex flex-col justify-end overflow-scroll h-96">

                    {chatMessages.map((message, i) => (
                        <ChatMessage
                            key={i}
                            message={message.message}
                            user={message.user}
                            author={message.author}
                            timestamp={message.timestamp}
                            completed={setCompleted}
                        />
                    ))}
                </div>

            </div>
            <div className=" rounded-b-lg">
                {/* Chat input */}
                <div className="flex">
                    <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-l-lg p-2"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="bg-blue-500 text-white rounded-r-lg p-2 ml-2" onClick={handleSubmit}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutMeSection;