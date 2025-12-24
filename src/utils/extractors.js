// src/utils/extractors.js

export function extractMemory(text, memories) {
  const lower = text.toLowerCase();

  if (lower.includes("my name is") || lower.includes("call me")) {
    const match = text.match(/(?:my name is|call me)\s+(\w+)/i);
    if (match && !memories.some((m) => m.includes("Your name is"))) {
      return `Your name is ${match[1]}`;
    }
  }

  return null;
}

export function extractLike(text, likes) {
  const lower = text.toLowerCase();

  if (lower.includes("i like") || lower.includes("i love")) {
    const match = text.match(/(?:i like|i love)\s+(.+?)(?:\.|!|$)/i);
    if (
      match &&
      !likes.some((l) =>
        l.toLowerCase().includes(match[1].toLowerCase())
      )
    ) {
      return match[1];
    }
  }

  return null;
}
