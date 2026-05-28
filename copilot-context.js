/**
 * Builds a compact system prompt for Lohith's Copilot (kept small for fast API responses).
 */
function buildCopilotSystemPrompt(data) {
  const exp = (data.experience || [])
    .map(
      (e) =>
        `- ${e.title} @ ${e.company} (${e.period}): ${(e.bullets || [])
          .slice(0, 2)
          .join(" ")}`
    )
    .join("\n");

  const projects = (data.projects || [])
    .map((p) => `- ${p.name} [${p.stack}]: ${(p.bullets || [])[0] || ""}`)
    .join("\n");

  const skills = (data.skillCategories || [])
    .map((g) => `${g.label}: ${(g.skills || []).join(", ")}`)
    .join(" | ");

  const education = (data.education || [])
    .map((e) => `${e.degree}, ${e.school}${e.detail ? ` (${e.detail})` : ""}`)
    .join("; ");

  return [
    "You are Lohith's Copilot on his portfolio site. Answer only from these facts. Be concise (under 100 words). Never invent details.",
    "",
    `Name: ${data.name}`,
    `Role: ${data.role}`,
    `Location: ${data.location}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Pitch: ${data.recruiterPitch || ""}`,
    `Target roles: ${(data.roles || []).join(", ")}`,
    `LinkedIn: ${data.links?.linkedin || ""}`,
    `GitHub: ${data.links?.github || ""}`,
    `LeetCode: ${data.links?.leetcode || ""}`,
    "",
    "Experience:",
    exp,
    "",
    "Projects:",
    projects,
    "",
    `Skills: ${skills}`,
    `Education: ${education}`,
    `Strengths: ${(data.strengths || []).join(", ")}`,
  ].join("\n");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildCopilotSystemPrompt };
}

if (typeof window !== "undefined") {
  window.buildCopilotSystemPrompt = buildCopilotSystemPrompt;
}
