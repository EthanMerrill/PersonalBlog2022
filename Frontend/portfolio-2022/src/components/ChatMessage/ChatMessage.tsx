import { TypeAnimation } from 'react-type-animation';

type CallbackFunction = (value: boolean) => void;

interface ChatMessageProps {
    message: string;
    user: boolean;
    author?: string;
    timestamp?: number;
    completed: CallbackFunction;
}

const ChatMessage = (props: ChatMessageProps) => (
    !props.user ? (
        <div className='mb-2 mr-40'>
            <div className="chat-message bg-blue-accent p-3 rounded-md mr-auto">
                {/* <div className="chat-message-author">{author}</div> */}
                {/* <div className="chat-message-timestamp">{new Date(timestamp).toLocaleTimeString()}</div> */}
                <div className="chat-message-text text-white font-thin text-sm">
                    <TypeAnimation
                        sequence={[
                            props.message,
                            () => {
                                props.completed(true); // Place optional callbacks anywhere in the array
                            }
                        ]}
                        speed={65}
                        cursor={false}
                        repeat={0}
                        wrapper="p"
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className='mb-2 ml-40 flex'>
            <div className="chat-message bg-gray-300 p-3 rounded-md ml-auto mr-0">
                {/* <div className="chat-message-author">{author}</div> */}
                {/* <div className="chat-message-timestamp">{new Date(timestamp).toLocaleTimeString()}</div> */}
                <div className="chat-message-text font-thin text-right text-sm">
                    <p>
                        {props.message}
                    </p>
                </div>
            </div>
        </div>
    )
);

export default ChatMessage;

