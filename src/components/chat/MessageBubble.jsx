import React from "react";

const MessageBubble = ({ message, theme, isDark }) => {
  const isUser = message.role === "user";

  const messageBg = isUser
    ? `bg-gradient-to-r ${theme.primary} text-white`
    : isDark
    ? "bg-gray-700 text-gray-100"
    : "bg-white text-gray-800";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
          isUser ? "rounded-br-sm" : "rounded-bl-sm"
        } ${messageBg}`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
