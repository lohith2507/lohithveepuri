(function () {
  const D = window.PORTFOLIO_DATA;
  const LIMIT = window.COPILOT_DAILY_LIMIT || 9;
  const STORAGE_KEY = "lohit_copilot_usage";

  const DEFAULT_PROMPTS = [
    "Tell me about Lohith?",
    "What projects has Lohith built?",
    "Tell me about his work experience",
    "What's his tech stack?",
    "How can I contact Lohith?",
  ];

  const els = {
    root: document.getElementById("copilot-root"),
    toggle: document.getElementById("copilot-toggle"),
    panel: document.getElementById("copilot-panel"),
    close: document.getElementById("copilot-close"),
    messages: document.getElementById("copilot-messages"),
    prompts: document.getElementById("copilot-prompts"),
    form: document.getElementById("copilot-form"),
    input: document.getElementById("copilot-input"),
    send: document.getElementById("copilot-send"),
    quota: document.getElementById("copilot-quota"),
    newChat: document.getElementById("copilot-new-chat"),
  };

  if (!els.root || !D) return;

  let open = false;
  let loading = false;
  let history = [];
  let remaining = LIMIT;

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function readLocalUsage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { date: todayKey(), count: 0 };
      const parsed = JSON.parse(raw);
      if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
      return { date: todayKey(), count: parsed.count || 0 };
    } catch {
      return { date: todayKey(), count: 0 };
    }
  }

  function writeLocalUsage(count) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: todayKey(), count })
    );
  }

  function syncQuotaDisplay() {
    const left = Math.max(0, remaining);
    if (els.quota) {
      els.quota.textContent =
        left === 0
          ? "No messages left today"
          : `${left} of ${LIMIT} messages left today`;
    }
    const disabled = left <= 0 || loading;
    if (els.input) els.input.disabled = disabled;
    if (els.send) els.send.disabled = disabled || !els.input?.value.trim();
    els.prompts?.querySelectorAll("button").forEach((btn) => {
      btn.disabled = disabled;
    });
  }

  function setOpen(next) {
    open = next;
    els.panel.hidden = !open;
    els.toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      els.input?.focus();
      if (!els.messages.querySelector(".copilot-msg")) renderWelcome();
    }
  }

  function escapeHtml(s) {
    const el = document.createElement("div");
    el.textContent = s;
    return el.innerHTML;
  }

  function formatText(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  }

  function appendMessage(role, content, streaming) {
    const wrap = document.createElement("div");
    wrap.className = `copilot-msg copilot-msg--${role}${streaming ? " copilot-msg--typing" : ""}`;
    wrap.innerHTML = `<div class="copilot-msg-bubble">${formatText(content)}</div>`;
    els.messages.appendChild(wrap);
    els.messages.scrollTop = els.messages.scrollHeight;
    return wrap;
  }

  function renderWelcome() {
    els.messages.innerHTML = "";
    appendMessage(
      "assistant",
      `Hi! I'm Lohith's Copilot 👋\n\nI only answer questions about Lohith — his experience, projects, skills, education, and contact info. Ask away!`
    );
    renderPrompts();
  }

  function renderPrompts() {
    if (!els.prompts) return;
    els.prompts.innerHTML = DEFAULT_PROMPTS.map(
      (p) => `<button type="button" class="copilot-prompt-chip">${escapeHtml(p)}</button>`
    ).join("");

    els.prompts.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (remaining <= 0 || loading) return;
        els.input.value = btn.textContent;
        syncQuotaDisplay();
        sendMessage(btn.textContent);
      });
    });
    syncQuotaDisplay();
  }

  async function sendMessage(text) {
    const message = (text || els.input.value).trim();
    if (!message || loading || remaining <= 0) return;

    loading = true;
    els.prompts.innerHTML = "";
    appendMessage("user", message);
    els.input.value = "";
    syncQuotaDisplay();

    const typingEl = appendMessage("assistant", "…", true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: history.slice(-6),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        remaining = 0;
        writeLocalUsage(LIMIT);
        typingEl.querySelector(".copilot-msg-bubble").innerHTML = formatText(
          data.error || "Daily message limit reached."
        );
        typingEl.classList.remove("copilot-msg--typing");
        syncQuotaDisplay();
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      const reply = data.reply || "Sorry, I could not answer that.";
      remaining =
        typeof data.remaining === "number" ? data.remaining : remaining - 1;
      writeLocalUsage(LIMIT - remaining);

      typingEl.querySelector(".copilot-msg-bubble").innerHTML = formatText(reply);
      typingEl.classList.remove("copilot-msg--typing");

      history.push({ role: "user", content: message });
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      typingEl.querySelector(".copilot-msg-bubble").innerHTML = formatText(
        err.message || "Something went wrong. Please try again."
      );
      typingEl.classList.remove("copilot-msg--typing");
    } finally {
      loading = false;
      syncQuotaDisplay();
      if (history.length === 0) renderPrompts();
    }
  }

  function resetChat() {
    history = [];
    renderWelcome();
  }

  function init() {
    const local = readLocalUsage();
    remaining = Math.max(0, LIMIT - local.count);
    syncQuotaDisplay();

    els.toggle.addEventListener("click", () => setOpen(!open));
    els.close?.addEventListener("click", () => setOpen(false));
    els.newChat?.addEventListener("click", resetChat);

    els.form?.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage();
    });

    els.input?.addEventListener("input", syncQuotaDisplay);
    els.input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    });
  }

  init();
})();
