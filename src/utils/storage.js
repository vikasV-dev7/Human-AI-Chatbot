// src/utils/storage.js

export function exportCompanion({
  personality,
  memories,
  userLikes,
  relationshipLevel,
  theme,
  messages,
  companionName,
  conversationHistory,
}) {
  const data = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    companionName,
    personality,
    memories,
    userLikes,
    relationshipLevel,
    theme,
    messages,
    conversationHistory,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `companion-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importCompanion(file, onSuccess) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.personality?.role) {
        alert("Invalid companion file.");
        return;
      }
      onSuccess(data);
    } catch {
      alert("Error reading companion file.");
    }
  };
  reader.readAsText(file);
}
