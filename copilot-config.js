/** Shared Copilot limits (browser + api/chat.js). */
const COPILOT_DAILY_LIMIT = 9;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { COPILOT_DAILY_LIMIT };
}

if (typeof window !== "undefined") {
  window.COPILOT_DAILY_LIMIT = COPILOT_DAILY_LIMIT;
}
