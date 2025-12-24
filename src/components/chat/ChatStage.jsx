import React from "react";
import {
  Heart,
  Palette,
  BookOpen,
  Settings,
} from "lucide-react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import MemoryPanel from "../panels/MemoryPanel";
import SettingsPanel from "../panels/SettingsPanel";
import ThemePanel from "../panels/ThemePanel";

const ChatStage = ({
  theme,
  isDark,
  messages,
  inputValue,
  setInputValue,
  isTyping,
  handleSendMessage,
  messagesEndRef,
  companionName,
  personality,

  showMemory,
  setShowMemory,
  showThemes,
  setShowThemes,
  showSettings,
  setShowSettings,

  memories,
  setMemories,
  userLikes,
  setUserLikes,
  relationshipLevel,
  setRelationshipLevel,

  themeKey,
  setTheme,
}) => {
  const bgClass = isDark ? "bg-gray-800" : "bg-white";
  const textClass = isDark ? "text-gray-100" : "text-gray-800";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const borderClass = isDark ? "border-gray-700" : "border-gray-200";

  const getPersonalityDescription = () => {
    const traits = [];
    if (personality.shyConfident < 40) traits.push("reserved");
    else if (personality.shyConfident > 60) traits.push("confident");
    else traits.push("balanced");

    if (personality.calmExpressive > 60) traits.push("expressive");
    if (personality.logicalEmotional > 60) traits.push("empathetic");

    return traits.join(", ");
  };

  return (
    <div className={`h-screen bg-gradient-to-br ${theme.gradient} flex`}>
      {/* Memory Panel */}
      {showMemory && (
        <MemoryPanel
          memories={memories}
          setMemories={setMemories}
          isDark={isDark}
        />
      )}

      {/* Theme Panel */}
      {showThemes && (
        <ThemePanel
          themeKey={themeKey}
          setTheme={setTheme}
          isDark={isDark}
          onClose={() => setShowThemes(false)}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          isDark={isDark}
          relationshipLevel={relationshipLevel}
          setRelationshipLevel={setRelationshipLevel}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`${bgClass} border-b ${borderClass} p-4 flex justify-between items-center`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.primary} flex items-center justify-center`}
            >
              <Heart className="text-white w-5 h-5" />
            </div>
            <div>
              <div className={`font-semibold ${textClass}`}>
                {companionName || "Your Companion"}
              </div>
              <div className={`text-xs ${textMuted}`}>
                {getPersonalityDescription()}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Palette />
            </button>
            <button
              onClick={() => setShowMemory(!showMemory)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <BookOpen />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings />
            </button>
          </div>
        </div>

        {/* Messages */}
        <MessageList
          messages={messages}
          isTyping={isTyping}
          theme={theme}
          isDark={isDark}
          messagesEndRef={messagesEndRef}
        />

        {/* Input */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          isDark={isDark}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ChatStage;
