/**
 * Local dev server: static portfolio + /api/chat (same handler as Vercel).
 * Run: npm run dev  (requires .env.local with NVIDIA_API_KEY)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const chatHandler = require("./api/chat.js");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function loadEnvFile(filename) {
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) return false;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
  return true;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function serveStatic(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = err.code === "ENOENT" ? 404 : 500;
      res.end(err.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", type);
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/api/chat") {
    try {
      const raw = await readBody(req);
      req.body = raw.length ? JSON.parse(raw.toString("utf8")) : {};
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid JSON body" }));
      return;
    }
    await chatHandler(req, res);
    return;
  }

  let filePath = path.join(ROOT, pathname === "/" ? "index.html" : pathname);
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  serveStatic(filePath, res);
});

const hasEnv = loadEnvFile(".env.local") || loadEnvFile(".env");

server.listen(PORT, () => {
  console.log("");
  console.log("  Portfolio dev server");
  console.log(`  → http://localhost:${PORT}`);
  console.log("");
  if (!process.env.NVIDIA_API_KEY) {
    console.log("  ⚠  NVIDIA_API_KEY missing — Copilot will not work.");
    console.log("     Copy .env.example to .env.local and add your key.");
  } else if (!hasEnv) {
    console.log("  ✓  NVIDIA_API_KEY loaded from environment");
  } else {
    console.log("  ✓  NVIDIA_API_KEY loaded from .env.local");
  }
  console.log("");
  console.log("  Press Ctrl+C to stop");
  console.log("");
});
