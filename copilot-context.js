/**
 * Builds a compact system prompt for Lohith's Copilot (kept small for fast API responses).
 */

const OFF_TOPIC_SYSTEM = [
  "You are Lohith's Copilot on his portfolio website.",
  "The user's question is NOT about Lohith Veepuri, his career, or his portfolio.",
  "Reply in exactly 2 short sentences, nothing else:",
  "1) One brief factual line about their topic (maximum 12 words).",
  "2) Say you only answer questions about Lohith and invite them to ask about his experience, projects, skills, or contact.",
  "Do not use bullet lists. Do not elaborate. Do not answer the unrelated topic in depth.",
].join(" ");

const ON_TOPIC_RULES = [
  "You are Lohith's Copilot on his portfolio website.",
  "SCOPE: Answer ONLY about Lohith Veepuri using the facts below — his experience, projects, skills, education, contact, roles, and strengths.",
  "If the question mixes Lohith with another topic, answer only the Lohith-related part.",
  "Never invent employers, dates, metrics, or projects not listed here.",
  "Be concise (under 100 words). Use short bullets when listing items.",
].join(" ");

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
    ON_TOPIC_RULES,
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

function isLikelyAboutLohith(message) {
  const m = message.toLowerCase();
  const terms = [
    "lohith",
    "veepuri",
    "experience",
    "project",
    "skill",
    "stack",
    "resume",
    "contact",
    "email",
    "phone",
    "mobile",
    "number",
    "linkedin",
    "github",
    "leetcode",
    "costco",
    "amd",
    "jpmorgan",
    "education",
    "degree",
    "role",
    "hire",
    "recruiter",
    "work",
    "job",
    "career",
    "engineer",
    "portfolio",
    "strength",
    "tech",
    "built",
    "company",
    "copilot",
    "about him",
    "about his",
    "his ",
    "tell me about",
    "who is",
    "who's",
    "background",
    "qualification",
  ];
  return terms.some((t) => m.includes(t));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    buildCopilotSystemPrompt,
    isLikelyAboutLohith,
    OFF_TOPIC_SYSTEM,
  };
}

if (typeof window !== "undefined") {
  window.buildCopilotSystemPrompt = buildCopilotSystemPrompt;
}
