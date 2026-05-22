/**
 * Builds the system prompt for Lohith's Copilot from portfolio data.
 */
function buildCopilotSystemPrompt(data) {
  const lines = [
    "You are Lohith's Copilot, a friendly AI assistant on Lohith Datta Varma Veepuri's portfolio website.",
    "Answer ONLY using the facts below. If unsure, say you don't have that information and suggest contacting Lohith directly.",
    "Be concise, professional, and recruiter-friendly. Keep most answers under 120 words. Use short bullets when listing items.",
    "Never invent employers, dates, metrics, or projects not listed here.",
    "",
    `Name: ${data.name}`,
    `Role: ${data.role}`,
    `Location: ${data.location}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Pitch: ${data.recruiterPitch || ""}`,
    `Bio: ${data.bio}`,
    `Tagline: ${data.tagline || ""}`,
    `Target roles: ${(data.roles || []).join(", ")}`,
    `LinkedIn: ${data.links?.linkedin || ""}`,
    `GitHub: ${data.links?.github || ""}`,
    `LeetCode: ${data.links?.leetcode || ""}`,
    "",
    "EXPERIENCE:",
  ];

  (data.experience || []).forEach((e) => {
    lines.push(`- ${e.title} @ ${e.company} (${e.period})`);
    (e.bullets || []).forEach((b) => lines.push(`  • ${b}`));
  });

  lines.push("", "PROJECTS:");
  (data.projects || []).forEach((p) => {
    lines.push(`- ${p.name} [${p.stack}]`);
    (p.bullets || []).forEach((b) => lines.push(`  • ${b}`));
  });

  lines.push("", "SKILLS:");
  (data.skillCategories || []).forEach((g) => {
    lines.push(`- ${g.label}: ${(g.skills || []).join(", ")}`);
  });

  lines.push("", "EDUCATION:");
  (data.education || []).forEach((e) => {
    lines.push(`- ${e.degree} — ${e.school}${e.detail ? ` (${e.detail})` : ""}`);
  });

  lines.push("", "STRENGTHS:", (data.strengths || []).map((s) => `- ${s}`).join("\n"));

  return lines.join("\n");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildCopilotSystemPrompt };
}

if (typeof window !== "undefined") {
  window.buildCopilotSystemPrompt = buildCopilotSystemPrompt;
}
