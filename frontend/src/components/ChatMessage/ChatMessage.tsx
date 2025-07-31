import { TypeAnimation } from 'react-type-animation';

type CallbackFunction = (value: boolean) => void;

export interface ChatMessageProps {
    message: string;
    user: boolean;
    author?: string;
    timestamp?: number;
    completed?: CallbackFunction;
}

interface AuthorAndDateProps {
    author?: string;
    timestamp?: number;
}

const AuthorAndDate = ({ author, timestamp }: AuthorAndDateProps) => (
    <div className="flex items-center mt-1 pl-1">
        <div className="chat-message-author text-xxs text-slate opacity-50 mr-2">{author}</div>
        <div className="chat-message-timestamp text-xxs text-slate opacity-30">
            {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
        </div>
    </div>
);

const ChatMessage = (props: ChatMessageProps) => (
    !props.user ? (
        <div className="mb-2 mr-40 sm:mr-0 sm:w-full">
            <div className="chat-message bg-blue-accent p-3 rounded-md mr-auto sm:mr-0 sm:w-full">
                <div className="chat-message-text text-white font-thin text-sm">
                    <TypeAnimation
                        sequence={[
                            props.message,
                            () => {
                                if (props.completed) props.completed(true);
                            }
                        ]}
                        speed={70}
                        cursor={false}
                        repeat={0}
                        wrapper="p"
                    />
                </div>
            </div>
            <AuthorAndDate author={props.author} timestamp={props.timestamp} />
        </div>
    ) : (
        <div className="mb-2 ml-40 flex flex-col items-end sm:ml-0 sm:w-full">
            <div className="chat-message bg-gray-300 p-3 rounded-md sm:w-full">
                <div className="chat-message-text font-thin text-right text-sm">
                    <p>
                        {props.message}
                    </p>
                </div>
            </div>
            <AuthorAndDate author={props.author} timestamp={props.timestamp} />
        </div>
    )
);

export default ChatMessage;

