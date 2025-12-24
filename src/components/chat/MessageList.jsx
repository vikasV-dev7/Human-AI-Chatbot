import React from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const MessageList = ({
  messages,
  isTyping,
  theme,
  isDark,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, idx) => (
        <MessageBubble
          key={idx}
          message={msg}
          theme={theme}
          isDark={isDark}
        />
      ))}

      {isTyping && <TypingIndicator isDark={isDark} />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
