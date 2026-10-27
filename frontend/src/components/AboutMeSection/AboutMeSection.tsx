import React, {useEffect, useRef, useState, useCallback, useMemo} from "react";
import ChatMessage, {ChatMessageProps} from "../ChatMessage/ChatMessage";
import {healthCheck, sendChatMessage} from "../../services/chatService";

interface AboutMeSectionProps {
	width?: number;
	breakpoint?: number;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => {
	const [isChatServiceReady, setIsChatServiceReady] = useState(false);
	const [isProcessingAI, setIsProcessingAI] = useState(false);
	// Memoize initial messages to prevent recreation on each render
	const initialMessages: ChatMessageProps[] = useMemo(
		() => [
			{message: "Hi! I'm a software engineer based in Boston. I'm currently working CapTech Consulting. I'm passionate about web development, and am always looking for new opportunities to learn and grow.", author: "Ethan's Assistant", timestamp: Date.now(), user: false},
			{message: "I'm currently working on a few personal projects, including this website. I'm using it as a platform to showcase my work and share my thoughts on various topics.", author: "Ethan's Assistant", timestamp: Date.now(), user: false},
			{message: "If you have any questions you can ask them here, or drop me a line directly!", author: "Ethan's Assistant", timestamp: Date.now(), user: false},
		],
		[],
	);

	// Chat state
	const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);
	const [messageQueue, setMessageQueue] = useState<ChatMessageProps[]>(() => [...initialMessages]);
	const [input, setInput] = useState("");
	const [completed, setCompleted] = useState(true);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// 1. Chat service initialization - runs once on mount
	useEffect(() => {
		let isMounted = true; // Cleanup flag

		const initializeService = async () => {
			const isHealthy = await healthCheck();
			if (!isMounted) return;

			if (!isHealthy) {
				console.warn("Chat service is not available");
				return;
			}

			setIsChatServiceReady(true);
		};

		initializeService();

		return () => {
			isMounted = false;
		};
	}, []);

	// 2. AI response function - memoized to prevent recreation
	const getAIResponse = useCallback(async (message: string): Promise<string> => {
		try {
			return await sendChatMessage(message);
		} catch (error) {
			console.error("AI response error:", error);
			throw error;
		}
	}, []);

	// 3. Enhanced submit handler with AI integration
	const handleSubmit = useCallback(async () => {
		if (!input.trim()) return;

		const userMessage: ChatMessageProps = {
			message: input,
			timestamp: Date.now(),
			user: true,
			author: "You",
		};

		setChatMessages((prev) => [...prev, userMessage]);
		const currentInput = input;
		setInput("");
		setIsProcessingAI(true);

		// Only attempt an AI response if the chat service is available
		if (isChatServiceReady) {
			try {
				const aiResponse = await getAIResponse(currentInput);

				const aiMessage: ChatMessageProps = {
					message: aiResponse,
					timestamp: Date.now(),
					user: false,
					author: "Ethan's Assistant",
				};

				setChatMessages((prev) => [...prev, aiMessage]);
			} catch (error) {
				console.error("AI response failed:", error);

				const errorMessage: ChatMessageProps = {
					message: "Sorry, I'm having trouble connecting to my AI assistant right now. Feel free to reach out to me directly!",
					timestamp: Date.now(),
					user: false,
					author: "Ethan's Assistant",
				};

				setChatMessages((prev) => [...prev, errorMessage]);
			}
		} else {
			// Fallback when the chat service isn't available
			const fallbackMessage: ChatMessageProps = {
				message: "Thanks for your message! The AI assistant is currently offline, but feel free to contact me directly.",
				timestamp: Date.now(),
				user: false,
				author: "Ethan's Assistant",
			};

			setChatMessages((prev) => [...prev, fallbackMessage]);
		}

		setIsProcessingAI(false);
	}, [input, isChatServiceReady, getAIResponse]);

	// 4. Auto-scroll effect - optimized
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [chatMessages]);

	// 5. Key press handler - memoized
	const handleKeyPress = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && !isProcessingAI) {
				handleSubmit();
			}
		},
		[handleSubmit, isProcessingAI],
	);

	// 6. Message queue effect - optimized with proper dependencies
	useEffect(() => {
		if (messageQueue.length > 0 && completed) {
			const timer = setTimeout(() => {
				setChatMessages((prev) => [...prev, messageQueue[0]]);
				setMessageQueue((prev) => prev.slice(1));
				setCompleted(false);
			}, 100); // Small delay for better UX

			return () => clearTimeout(timer);
		}
	}, [messageQueue.length, completed]); // Only depend on length and completed status

	// Remove the console.log that calls getOpenAIKey() on every render

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
					{isProcessingAI && <div className="text-gray-500 italic p-2">Ethan's Assistant is thinking...</div>}
				</div>
			</div>
			<div className="rounded-b-lg">
				<div className="flex">
					<input type="text" className="flex-grow border border-gray-300 rounded-l-lg p-2" placeholder="Ask me anything about Ethan..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isProcessingAI} />
					<button className="bg-blue-500 text-white rounded-r-lg p-2 ml-2 disabled:opacity-50" onClick={handleSubmit} disabled={isProcessingAI || !input.trim()}>
						{isProcessingAI ? "Thinking..." : "Send"}
					</button>
				</div>
				{!isChatServiceReady && <div className="text-sm text-amber-600 mt-1">⚠️ AI assistant offline - messages will receive static responses</div>}
			</div>
		</div>
	);
};

export default AboutMeSection;
