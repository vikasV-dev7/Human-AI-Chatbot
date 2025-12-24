import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({
  value,
  onChange,
  onSend,
  isDark,
  theme,
}) => {
  const inputBg = isDark
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300";

  return (
    <div className="border-t p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Type a message..."
          className={`flex-1 px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-purple-500 ${inputBg}`}
        />

        <button
          onClick={onSend}
          disabled={!value.trim()}
          className={`p-3 rounded-2xl bg-gradient-to-r ${theme.primary} text-white shadow-lg disabled:opacity-50`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
