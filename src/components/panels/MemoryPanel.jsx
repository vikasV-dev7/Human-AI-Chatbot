import React from "react";
import { Plus, Trash2 } from "lucide-react";

const MemoryPanel = ({ memories, setMemories, isDark }) => {
  const bgItem = isDark ? "bg-gray-700 text-gray-200" : "bg-purple-50 text-gray-700";

  const addMemory = () => {
    const newMemory = prompt("Add a memory:");
    if (newMemory && newMemory.trim()) {
      setMemories((prev) => [...prev, newMemory.trim()]);
    }
  };

  const removeMemory = (index) => {
    setMemories((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-80 border-r h-full overflow-y-auto p-6 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Things I Remember</h3>
        <button onClick={addMemory}>
          <Plus />
        </button>
      </div>

      {memories.length === 0 ? (
        <p className="text-sm text-gray-500">
          We’re just getting to know each other…
        </p>
      ) : (
        <ul className="space-y-2">
          {memories.map((memory, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-lg flex justify-between ${bgItem}`}
            >
              <span className="flex-1">{memory}</span>
              <button onClick={() => removeMemory(idx)}>
                <Trash2 className="text-red-500 w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryPanel;
