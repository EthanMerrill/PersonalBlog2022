import React, {useCallback, useEffect, useRef, useState} from "react";
import ChatMessage, {ChatMessageProps} from "../ChatMessage/ChatMessage";
import {healthCheck, sendChatMessage} from "../../services/chatService";
import "./ChatWidget.scss";

const AUTHOR = "Ethan's Assistant";
const PANEL_ID = "chat-widget-panel";
const LABEL = "Chat with Ethan's assistant";

const INTRO_MESSAGES: string[] = ["Hi! I'm Ethan's assistant. Ask me anything about his work and projects.", "If you'd rather reach out directly, feel free to drop him a line!"];

const makeAssistantMessage = (message: string): ChatMessageProps => ({message, author: AUTHOR, timestamp: Date.now(), user: false});

const ChatIcon = () => (
	<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
		<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" />
	</svg>
);

const ChatWidget: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [hasOpened, setHasOpened] = useState(false);
	const [isChatServiceReady, setIsChatServiceReady] = useState(false);
	const [isProcessingAI, setIsProcessingAI] = useState(false);
	const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);
	const [messageQueue, setMessageQueue] = useState<ChatMessageProps[]>([]);
	const [input, setInput] = useState("");
	const [completed, setCompleted] = useState(true);

	const bubbleRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	// First open only: health check and intro messages.
	useEffect(() => {
		if (!hasOpened) return;
		let isMounted = true;
		setMessageQueue(INTRO_MESSAGES.map(makeAssistantMessage));
		(async () => {
			const healthy = await healthCheck();
			if (!isMounted) return;
			if (!healthy) {
				console.warn("Chat service is not available");
				return;
			}
			setIsChatServiceReady(true);
		})();
		return () => {
			isMounted = false;
		};
	}, [hasOpened]);

	// Play queued intro messages one at a time.
	useEffect(() => {
		if (messageQueue.length > 0 && completed) {
			const timer = setTimeout(() => {
				setChatMessages((prev) => [...prev, messageQueue[0]]);
				setMessageQueue((prev) => prev.slice(1));
				setCompleted(false);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [messageQueue, completed]);

	useEffect(() => {
		if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
	}, [chatMessages, isProcessingAI]);

	// Autofocus input on open.
	useEffect(() => {
		if (isOpen) inputRef.current?.focus();
	}, [isOpen]);

	const open = () => {
		setHasOpened(true);
		setIsOpen(true);
	};

	const close = useCallback(() => {
		setIsOpen(false);
		bubbleRef.current?.focus();
	}, []);

	const handleSubmit = useCallback(async () => {
		if (!input.trim() || isProcessingAI) return;

		const userMessage: ChatMessageProps = {message: input, timestamp: Date.now(), user: true, author: "You"};
		const currentInput = input;
		setChatMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsProcessingAI(true);

		let reply: string;
		if (isChatServiceReady) {
			try {
				reply = await sendChatMessage(currentInput);
			} catch (error) {
				console.error("AI response failed:", error);
				// Surface the rate-limit message; use a generic fallback otherwise.
				reply = error instanceof Error && error.message.includes("too quickly") ? error.message : "Sorry, I'm having trouble connecting to my AI assistant right now. Feel free to reach out to Ethan directly!";
			}
		} else {
			reply = "Thanks for your message! The AI assistant is currently offline, but feel free to contact Ethan directly.";
		}

		setChatMessages((prev) => [...prev, makeAssistantMessage(reply)]);
		setIsProcessingAI(false);
	}, [input, isProcessingAI, isChatServiceReady]);

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isProcessingAI) handleSubmit();
	};

	// Escape closes from anywhere while the panel is open.
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [isOpen, close]);

	return (
		<div className="fixed bottom-4 right-4 z-50 sm:bottom-0 sm:right-0 sm:w-full pointer-events-none flex flex-col items-end sm:items-stretch">
			{hasOpened && (
				<div id={PANEL_ID} role="dialog" aria-label={LABEL} hidden={!isOpen} className="chat-widget-panel pointer-events-auto mb-3 flex flex-col bg-white shadow-xl border border-gray-200 rounded-lg w-[360px] h-[480px] max-h-[calc(100vh-6rem)] sm:w-full sm:mb-0 sm:h-[70vh] sm:max-h-none sm:rounded-b-none">
					<div className="flex items-center justify-between px-3 py-2 bg-blue-accent text-white rounded-t-lg">
						<span className="text-sm font-medium">Ethan's assistant</span>
						<button type="button" onClick={close} aria-label="Close chat" className="px-2 text-lg leading-none">
							&times;
						</button>
					</div>
					<div ref={listRef} className="flex-grow overflow-y-auto p-3 flex flex-col" aria-live="polite">
						<div className="mt-auto" />
						{chatMessages.map((m, i) => (
							<ChatMessage key={`${m.timestamp}-${i}`} message={m.message} user={m.user} author={m.author} timestamp={m.timestamp} completed={setCompleted} />
						))}
						{isProcessingAI && <div className="text-gray-500 italic p-2 text-sm">Ethan's assistant is thinking...</div>}
					</div>
					<div className="p-3 border-t border-gray-200">
						<div className="flex">
							<input ref={inputRef} type="text" aria-label="Message" className="flex-grow min-w-0 border border-gray-300 rounded-l-lg p-2 text-sm" placeholder="Ask me anything about Ethan..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleInputKeyDown} disabled={isProcessingAI} />
							<button type="button" className="bg-blue-accent text-white rounded-r-lg px-3 text-sm disabled:opacity-50" onClick={handleSubmit} disabled={isProcessingAI || !input.trim()}>
								Send
							</button>
						</div>
						{!isChatServiceReady && <div className="text-xs text-amber-600 mt-1">AI assistant offline - messages will receive static responses</div>}
					</div>
				</div>
			)}
			<button
				ref={bubbleRef}
				type="button"
				aria-label={LABEL}
				aria-expanded={isOpen}
				aria-controls={PANEL_ID}
				onClick={() => (isOpen ? close() : open())}
				className={`pointer-events-auto flex items-center justify-center w-[52px] h-[52px] rounded-full bg-blue-accent text-white shadow-md hover:shadow-lg transition-shadow sm:mr-4 sm:mb-4 sm:self-end ${isOpen ? "sm:hidden" : ""}`}
			>
				<ChatIcon />
			</button>
		</div>
	);
};

export default ChatWidget;
