import React from 'react';

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  avatar?: string;
}

export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ role, content, timestamp, avatar, ...props }, ref) => {
    const isUser = role === 'user';

    return (
      <div
        ref={ref}
        className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}
        {...props}
      >
        {avatar && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {avatar}
          </div>
        )}
        <div className={`flex-1 max-w-xs ${isUser ? 'text-right' : ''}`}>
          <div
            className={`
              inline-block px-4 py-2 rounded-lg text-sm
              ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}
            `}
          >
            {content}
          </div>
          {timestamp && (
            <p className="text-xs text-gray-500 mt-1">
              {timestamp.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';
