// src/components/AIchatbot.jsx

import React, { useState, useEffect, useRef } from "react";

import SetupStage from "./setup/SetupStage";
import ChatStage from "./chat/ChatStage";

import { sendToOpenAI } from "../api/openai";
import { themes } from "../config/themes";

import { extractMemory, extractLike } from "../utils/extractors";
import { buildSystemPrompt } from "../utils/buildSystemPrompt";

/* ======================================================
   MAIN COMPONENT
====================================================== */

const AIchatbot = () => {
  /* ---------------- CORE STATE ---------------- */

  const [stage, setStage] = useState("setup");

  const [personality, setPersonality] = useState({
    role: "",
    gender: "",
    shyConfident: 50,
    calmExpressive: 50,
    logicalEmotional: 50,
    customPrompt: "",
  });

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [showMemory, setShowMemory] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [memories, setMemories] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [relationshipLevel, setRelationshipLevel] = useState(0);

  const [theme, setTheme] = useState("purple");
  const [companionName, setCompanionName] = useState("");

  const messagesEndRef = useRef(null);
  const conversationHistory = useRef([]);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const currentTheme = themes[theme];
  const isDark = theme === "dark";

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ======================================================
     SEND MESSAGE (PERSONALITY-ENFORCED)
  ====================================================== */

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    /* -------- USER MESSAGE -------- */

    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    conversationHistory.current.push({
      role: "user",
      content: inputValue,
    });

    /* -------- MEMORY EXTRACTION -------- */

    const memory = extractMemory(inputValue, memories);
    if (memory) {
      setMemories((prev) => [...prev, memory]);
    }

    const like = extractLike(inputValue, userLikes);
    if (like) {
      setUserLikes((prev) => [...prev, like]);
    }

    setInputValue("");
    setIsTyping(true);

    try {
      /* -------- BUILD STRONG SYSTEM PROMPT -------- */

      const systemPrompt = buildSystemPrompt({
        personality,
        role: personality.role,
        companionName,
        memories,
        userLikes,
        relationshipLevel,
      });

      /* -------- SEND TO OPENAI -------- */

      const aiText = await sendToOpenAI({
        apiKey,
        systemPrompt,
        messages: conversationHistory.current,
      });

      const aiMessage = {
        role: "assistant",
        content: aiText || "Sorry, I had trouble responding.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      conversationHistory.current.push({
        role: "assistant",
        content: aiMessage.content,
      });

      setRelationshipLevel((prev) => Math.min(100, prev + 2));
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry… *pauses* I had trouble connecting just now. Could you try again?",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  /* ======================================================
     STAGE SWITCH
  ====================================================== */

  if (stage === "setup") {
    return (
      <SetupStage
        personality={personality}
        setPersonality={setPersonality}
        setStage={setStage}
        theme={currentTheme}
        isDark={isDark}
        companionName={companionName}
        setCompanionName={setCompanionName}
        showThemes={showThemes}
        setShowThemes={setShowThemes}
        setTheme={setTheme}
      />
    );
  }

  return (
    <ChatStage
      theme={currentTheme}
      isDark={isDark}
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isTyping={isTyping}
      handleSendMessage={handleSendMessage}
      messagesEndRef={messagesEndRef}
      companionName={companionName}
      personality={personality}
      showMemory={showMemory}
      setShowMemory={setShowMemory}
      showThemes={showThemes}
      setShowThemes={setShowThemes}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      memories={memories}
      setMemories={setMemories}
      userLikes={userLikes}
      setUserLikes={setUserLikes}
      relationshipLevel={relationshipLevel}
      setRelationshipLevel={setRelationshipLevel}
      themeKey={theme}
      setTheme={setTheme}
    />
  );
};

export default AIchatbot;
