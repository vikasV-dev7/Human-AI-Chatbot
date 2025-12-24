import React from "react";
import { X, Palette } from "lucide-react";
import { themes } from "../../config/themes";

const ThemePanel = ({ themeKey, setTheme, isDark, onClose }) => {
  const bg = isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800";

  return (
    <div className={`absolute top-16 right-4 w-64 rounded-xl shadow-2xl p-4 z-50 ${bg}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          <h3 className="font-semibold">Choose Theme</h3>
        </div>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="space-y-2">
        {Object.entries(themes).map(([key, t]) => (
          <button
            key={key}
            onClick={() => {
              setTheme(key);
              onClose();
            }}
            className={`w-full p-3 rounded-lg text-left transition-all ${
              key === themeKey
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
  );
};

export default ThemePanel;
