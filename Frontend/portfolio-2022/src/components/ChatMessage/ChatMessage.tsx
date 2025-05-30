import { TypeAnimation } from 'react-type-animation';

type CallbackFunction = (value: boolean) => void;

export interface ChatMessageProps {
    message: string;
    user: boolean;
    author?: string;
    timestamp?: number;
    completed?: CallbackFunction;
}

const ChatMessage = (props: ChatMessageProps) => (

    !props.user ? (
        <div className='mb-2 mr-40'>
            <div className="chat-message bg-blue-accent p-3 rounded-md mr-auto">
                <div className="chat-message-text text-white font-thin text-sm">
                    <TypeAnimation
                        sequence={[
                            props.message,
                            () => {
                                if (props.completed) props.completed(true); // Call completed callback if it exists
                            }
                        ]}
                        speed={70}
                        cursor={false}
                        repeat={0}
                        wrapper="p"
                    />
                </div>
            </div>
            <div className="flex items-center mt-1 pl-1">
                <div className="chat-message-author text-xs text-slate opacity-80 mr-2">{props.author}</div>
                <div className="chat-message-timestamp text-xs text-slate opacity-60">{props.timestamp ? new Date(props.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
            </div>
        </div>
    ) : (
        <div className='mb-2 ml-40 flex flex-col items-end'>
            <div className="chat-message bg-gray-300 p-3 rounded-md">
                <div className="chat-message-text font-thin text-right text-sm">
                    <p>
                        {props.message}
                    </p>
                </div>
            </div>
            <div className="flex items-center mt-1 pr-1">
                <div className="chat-message-timestamp text-xs text-slate opacity-60 mr-2">{props.timestamp ? new Date(props.timestamp).toLocaleTimeString() : ''}</div>
                <div className="chat-message-author text-xs text-slate opacity-80">{props.author}</div>
            </div>
        </div>
    )
);

export default ChatMessage;

