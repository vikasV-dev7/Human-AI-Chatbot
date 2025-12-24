import React from "react";

const TypingIndicator = ({ isDark }) => {
  const dotColor = isDark ? "bg-gray-400" : "bg-gray-400";

  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-2xl shadow-md bg-white dark:bg-gray-700">
        <div className="flex space-x-2">
          <div
            className={`w-2 h-2 rounded-full animate-bounce ${dotColor}`}
            style={{ animationDelay: "0ms" }}
          />
          <div
            className={`w-2 h-2 rounded-full animate-bounce ${dotColor}`}
            style={{ animationDelay: "150ms" }}
          />
          <div
            className={`w-2 h-2 rounded-full animate-bounce ${dotColor}`}
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
