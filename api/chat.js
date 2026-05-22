const { PORTFOLIO_DATA } = require("../portfolio-data.js");
const { buildCopilotSystemPrompt } = require("../copilot-context.js");
const { COPILOT_DAILY_LIMIT } = require("../copilot-config.js");

const COOKIE_NAME = "lohit_copilot";
const MAX_PER_DAY = COPILOT_DAILY_LIMIT;
const MAX_HISTORY = 6;
const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "moonshotai/kimi-k2.6";

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function parseUsage(cookieHeader) {
  const raw = (cookieHeader || "")
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!raw) return { date: todayUtc(), count: 0 };

  const value = decodeURIComponent(raw.slice(COOKIE_NAME.length + 1));
  const [date, countStr] = value.split("|");
  const today = todayUtc();
  if (date !== today) return { date: today, count: 0 };
  return { date: today, count: Math.max(0, parseInt(countStr, 10) || 0) };
}

function usageCookieHeader(usage) {
  return `${COOKIE_NAME}=${usage.date}|${usage.count}; Path=/; Max-Age=86400; SameSite=Lax; HttpOnly`;
}

function json(res, status, body, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  Object.entries(extraHeaders).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

function toChatMessages(systemPrompt, history, message) {
  const messages = [{ role: "system", content: systemPrompt }];
  const recent = (history || []).slice(-MAX_HISTORY);
  for (const msg of recent) {
    if (!msg?.content?.trim()) continue;
    const role = msg.role === "assistant" ? "assistant" : "user";
    messages.push({ role, content: msg.content.trim() });
  }
  messages.push({ role: "user", content: message.trim() });
  return messages;
}

function extractReply(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string" && content.trim()) return content.trim();
  return "I couldn't generate a response. Please try again.";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    json(res, 500, { error: "Copilot is not configured. Missing NVIDIA_API_KEY." });
    return;
  }

  let body;
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    body = req.body;
  } else {
    let rawBody = req.body;
    if (Buffer.isBuffer(rawBody)) rawBody = rawBody.toString("utf8");
    if (typeof rawBody !== "string") rawBody = "";
    if (!rawBody && req.readable) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      rawBody = Buffer.concat(chunks).toString("utf8");
    }
    try {
      body = JSON.parse(rawBody || "{}");
    } catch {
      json(res, 400, { error: "Invalid JSON body" });
      return;
    }
  }

  const message = (body.message || "").trim();
  if (!message) {
    json(res, 400, { error: "Message is required" });
    return;
  }

  if (message.length > 2000) {
    json(res, 400, { error: "Message is too long" });
    return;
  }

  const usage = parseUsage(req.headers.cookie);
  if (usage.count >= MAX_PER_DAY) {
    json(
      res,
      429,
      {
        error: `Daily limit reached (${MAX_PER_DAY} messages). Try again tomorrow or contact Lohith directly.`,
        remaining: 0,
        limit: MAX_PER_DAY,
      },
      { "Set-Cookie": usageCookieHeader(usage) }
    );
    return;
  }

  const systemPrompt = buildCopilotSystemPrompt(PORTFOLIO_DATA);

  try {
    const llmRes = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: toChatMessages(systemPrompt, body.history, message),
        max_tokens: 512,
        temperature: 0.5,
        top_p: 0.9,
        stream: false,
        chat_template_kwargs: { thinking: false },
      }),
    });

    const data = await llmRes.json();

    if (!llmRes.ok) {
      const msg =
        data?.error?.message ||
        (typeof data?.error === "string" ? data.error : null) ||
        data?.message ||
        "NVIDIA API request failed";
      json(res, llmRes.status >= 500 ? 502 : 400, { error: msg });
      return;
    }

    const reply = extractReply(data);
    const nextUsage = { date: todayUtc(), count: usage.count + 1 };
    json(
      res,
      200,
      {
        reply,
        remaining: Math.max(0, MAX_PER_DAY - nextUsage.count),
        limit: MAX_PER_DAY,
      },
      { "Set-Cookie": usageCookieHeader(nextUsage) }
    );
  } catch {
    json(res, 500, { error: "Copilot service error. Please try again later." });
  }
};
