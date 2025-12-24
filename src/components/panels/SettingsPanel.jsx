import React from "react";
import { Plus, Trash2, Download, X } from "lucide-react";

const SettingsPanel = ({
  isDark,
  relationshipLevel,
  userLikes,
  setUserLikes,
  onClose,
  onExport,
  onReset,
}) => {
  const bg = isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800";
  const muted = isDark ? "text-gray-400" : "text-gray-600";

  const addLike = () => {
    const like = prompt("Add something you like:");
    if (like && like.trim()) {
      setUserLikes((prev) => [...prev, like.trim()]);
    }
  };

  const removeLike = (index) => {
    setUserLikes((prev) => prev.filter((_, i) => i !== index));
  };

  const getRelationshipStage = () => {
    if (relationshipLevel < 25) return "Stranger";
    if (relationshipLevel < 50) return "Acquaintance";
    if (relationshipLevel < 75) return "Familiar";
    return "Close";
  };

  return (
    <div className={`absolute top-16 right-4 w-80 rounded-xl shadow-2xl p-6 z-50 ${bg}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Settings</h3>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Relationship */}
      <div className="mb-6 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
        <div className="flex justify-between mb-2">
          <span className="text-sm">{getRelationshipStage()}</span>
          <span className="font-semibold">{relationshipLevel}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-purple-500 rounded-full transition-all"
            style={{ width: `${relationshipLevel}%` }}
          />
        </div>
      </div>

      {/* Likes */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium">Things You Like</h4>
          <button onClick={addLike}>
            <Plus />
          </button>
        </div>

        {userLikes.length === 0 ? (
          <p className={`text-sm ${muted}`}>No likes recorded</p>
        ) : (
          <ul className="space-y-2">
            {userLikes.map((like, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-2 rounded bg-gray-100 dark:bg-gray-700"
              >
                <span>{like}</span>
                <button onClick={() => removeLike(idx)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onExport}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Companion
        </button>

        <button
          onClick={onReset}
          className="w-full p-3 rounded-lg bg-red-500 text-white"
        >
          Reset Everything
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
