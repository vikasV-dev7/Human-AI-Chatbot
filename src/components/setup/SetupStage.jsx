import React, { useRef } from "react";
import { Palette, Sparkles, Upload } from "lucide-react";
import { roles, genders } from "../../config/roles";
import { themes } from "../../config/themes";

/* ---------------- HELPERS ---------------- */

const getTraitWord = (value, low, high) => {
  if (value <= 30) return low;
  if (value >= 70) return high;
  return "balanced";
};

const roleDescriptions = {
  friend: "a supportive friend",
  teacher: "a patient teacher",
  consultant: "a strategic consultant",
  partner: "a warm, affectionate partner",
  mentor: "a guiding mentor",
  custom: "a custom companion",
};

/* ---------------- COMPONENT ---------------- */

const SetupStage = ({
  personality,
  setPersonality,
  setStage,
  theme,
  isDark,
  companionName,
  setCompanionName,
  showThemes,
  setShowThemes,
  setTheme,
}) => {
  const fileInputRef = useRef(null);

  const bgClass = isDark ? "bg-gray-800" : "bg-white";
  const textClass = isDark ? "text-gray-100" : "text-gray-800";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const borderClass = isDark ? "border-gray-700" : "border-gray-200";
  const inputBg = isDark
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300";

  const startChat = () => {
    if (!personality.role || !personality.gender) return;
    setStage("chat");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} p-4 flex items-center justify-center relative`}
    >
      {/* Theme Selector */}
      {showThemes && (
        <div
          className={`absolute top-16 right-4 ${bgClass} rounded-xl shadow-2xl p-4 w-64 z-50`}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5" />
            <h3 className={`font-semibold ${textClass}`}>Choose Theme</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => {
                  setTheme(key);
                  setShowThemes(false);
                }}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  theme.name === t.name
                    ? `bg-gradient-to-r ${t.primary} text-white`
                    : isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Theme Button */}
      <button
        onClick={() => setShowThemes(!showThemes)}
        className={`absolute top-4 right-4 p-3 ${bgClass} rounded-xl shadow-lg`}
      >
        <Palette />
      </button>

      {/* Card */}
      <div className={`max-w-2xl w-full ${bgClass} rounded-3xl shadow-2xl p-8`}>
        <div className="text-center mb-8">
          <Sparkles className={`w-12 h-12 mx-auto mb-4 ${theme.textAccent}`} />
          <h1 className={`text-3xl font-bold ${textClass}`}>
            Create Your AIchatbot
          </h1>
          <p className={textMuted}>
            Design a personality that feels right for you
          </p>
        </div>

        {/* Companion Name */}
        <label className={`block text-sm font-medium ${textClass} mb-2`}>
          Companion Name (Optional)
        </label>
        <input
          value={companionName}
          onChange={(e) => setCompanionName(e.target.value)}
          placeholder="Give your Chatbot a name..."
          className={`w-full p-3 border rounded-xl mb-6 ${inputBg}`}
        />

        {/* Roles */}
        <h3 className={`text-sm font-medium ${textClass} mb-3`}>
          Choose a Role
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() =>
                setPersonality((p) => ({ ...p, role: r.id }))
              }
              className={`p-4 rounded-xl border-2 ${
                personality.role === r.id
                  ? "border-purple-500 bg-purple-50"
                  : borderClass
              }`}
            >
              <div className="text-3xl">{r.icon}</div>
              <div className={`font-semibold ${textClass}`}>
                {r.label}
              </div>
              <div className={`text-xs ${textMuted}`}>{r.desc}</div>
            </button>
          ))}
        </div>

        {/* Gender */}
        <h3 className={`text-sm font-medium ${textClass} mb-3`}>
          Choose Gender / Style
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {genders.map((g) => (
            <button
              key={g.id}
              onClick={() =>
                setPersonality((p) => ({ ...p, gender: g.id }))
              }
              className={`p-4 rounded-xl border-2 ${
                personality.gender === g.id
                  ? "border-purple-500 bg-purple-50"
                  : borderClass
              }`}
            >
              <div className="text-3xl">{g.icon}</div>
              <div className={`font-semibold ${textClass}`}>
                {g.label}
              </div>
              <div className={`text-xs ${textMuted}`}>{g.desc}</div>
            </button>
          ))}
        </div>

        {/* Personality Traits */}
        <h3 className={`text-sm font-medium ${textClass} mb-4`}>
          Personality Traits
        </h3>

        {/* Shy ↔ Confident */}
        <div className="mb-4">
          <div className={`flex justify-between text-sm ${textMuted}`}>
            <span>Shy</span>
            <span>Confident</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={personality.shyConfident}
            onChange={(e) =>
              setPersonality((p) => ({
                ...p,
                shyConfident: Number(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>

        {/* Calm ↔ Expressive */}
        <div className="mb-4">
          <div className={`flex justify-between text-sm ${textMuted}`}>
            <span>Calm</span>
            <span>Expressive</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={personality.calmExpressive}
            onChange={(e) =>
              setPersonality((p) => ({
                ...p,
                calmExpressive: Number(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>

        {/* Logical ↔ Emotional */}
        <div className="mb-6">
          <div className={`flex justify-between text-sm ${textMuted}`}>
            <span>Logical</span>
            <span>Emotional</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={personality.logicalEmotional}
            onChange={(e) =>
              setPersonality((p) => ({
                ...p,
                logicalEmotional: Number(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>

        {/* 🔥 Personality Preview */}
        <div
          className={`mb-6 p-4 rounded-xl border ${borderClass}`}
        >
          <p className={`text-sm ${textMuted} mb-1`}>
            Personality Preview
          </p>
          <p className={`text-sm font-medium ${textClass}`}>
            {personality.role
              ? `This companion will feel like ${
                  roleDescriptions[personality.role]
                } who is ${getTraitWord(
                  personality.shyConfident,
                  "shy",
                  "confident"
                )}, ${getTraitWord(
                  personality.calmExpressive,
                  "calm",
                  "expressive"
                )}, and ${getTraitWord(
                  personality.logicalEmotional,
                  "logical",
                  "emotionally attuned"
                )}.`
              : "Select a role and adjust traits to preview the personality."}
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={startChat}
          disabled={!personality.role || !personality.gender}
          className={`w-full py-4 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold`}
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default SetupStage;
