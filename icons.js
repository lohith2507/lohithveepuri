(function (global) {
  const PROJECT_SVGS = {
    finance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-9"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`,
    fraud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
    healthcare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    ecommerce: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    sentiment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>`,
    chatbot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M8 21h8"/><path d="M12 17v4"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="15" cy="11" r="1" fill="currentColor"/></svg>`,
    ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>`,
  };

  const PROJECT_THEMES = {
    finance: { bg: "#e8f4fc", fg: "#0a66c2", accent: "#004182" },
    code: { bg: "#f3e8ff", fg: "#6b21a8", accent: "#581c87" },
    fraud: { bg: "#fef3c7", fg: "#b45309", accent: "#92400e" },
    healthcare: { bg: "#dcfce7", fg: "#15803d", accent: "#166534" },
    ecommerce: { bg: "#ffe4e6", fg: "#be123c", accent: "#9f1239" },
    sentiment: { bg: "#e0e7ff", fg: "#4338ca", accent: "#3730a3" },
    chatbot: { bg: "#cffafe", fg: "#0e7490", accent: "#155e75" },
    ai: { bg: "#ede9fe", fg: "#7c3aed", accent: "#5b21b6" },
  };

  const BANNER_CUSTOM = {
    agent: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="url(#ag)"/><path d="M10 22V14a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" stroke="#fff" stroke-width="1.5"/><path d="M16 12V9" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle cx="13" cy="17" r="1" fill="#fff"/><circle cx="19" cy="17" r="1" fill="#fff"/><path d="M7 16h2M23 16h2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><defs><linearGradient id="ag" x1="4" y1="4" x2="28" y2="28"><stop stop-color="#0ea5e9"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs></svg>`,
    llm: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="url(#lm)"/><rect x="9" y="10" width="14" height="12" rx="2" stroke="#fff" stroke-width="1.5"/><path d="M12 14h8M12 17h5M12 20h3" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M16 8v2M16 24v2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><defs><linearGradient id="lm" x1="4" y1="4" x2="28" y2="28"><stop stop-color="#7c3aed"/><stop offset="1" stop-color="#c084fc"/></linearGradient></defs></svg>`,
    kimi: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="url(#km)"/><circle cx="16" cy="15" r="6" stroke="#fff" stroke-width="1.5"/><path d="M12 17c1.2 1.8 6.8 1.8 8 0" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle cx="13.5" cy="13.5" r="1" fill="#fff"/><circle cx="18.5" cy="13.5" r="1" fill="#fff"/><text x="16" y="27" text-anchor="middle" fill="#fff" font-size="5" font-weight="700" font-family="system-ui">K2.5</text><defs><linearGradient id="km" x1="4" y1="4" x2="28" y2="28"><stop stop-color="#db2777"/><stop offset="1" stop-color="#fb7185"/></linearGradient></defs></svg>`,
  };

  const SOCIAL_SVGS = {
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    leetcode: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.102 17.93l-2.697 2.607-.698-.719 1.444-1.389-.746-.765-1.444 1.389-.698-.719 2.697-2.607.698.719-1.444 1.389.746.765 1.444-1.389.698.719zm-4.591-4.44l-1.254 1.389-1.068-1.17 1.254-1.389-1.254-1.389 1.068-1.17 1.254 1.389 1.254-1.389 1.068 1.17-1.254 1.389 1.254 1.389-1.068 1.17-1.254-1.389zM5.412 15.69l-.698-.719 2.697-2.607.698.719-1.444 1.389.746.765 1.444-1.389.698.719-2.697 2.607-.698-.719 1.444-1.389-.746-.765-1.444 1.389zm12.68-10.84h-8.178l1.734 2.604H17.09l-1.734 2.605 1.734 2.604H9.914l-1.734 2.604h8.178l-1.734-2.604h2.915l1.734-2.605-1.734-2.604h2.915l1.734-2.604z"/></svg>`,
  };

  const CONTACT_SVGS = {
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  };

  let _customSvgSeq = 0;

  function uniquifyCustomSvg(svg, key) {
    const uid = `${key}-${++_customSvgSeq}`;
    return svg
      .replace(/\bid="(ag|lm|km)"/g, `id="$1-${uid}"`)
      .replace(/url\(#(ag|lm|km)\)/g, `url(#$1-${uid})`);
  }

  function resetCustomSvgIds() {
    _customSvgSeq = 0;
  }

  function projectIcon(iconKey) {
    return iconKey && PROJECT_SVGS[iconKey] ? iconKey : "ai";
  }

  function projectIconSvg(key) {
    return PROJECT_SVGS[key] || PROJECT_SVGS.ai;
  }

  function projectTheme(key) {
    return PROJECT_THEMES[key] || PROJECT_THEMES.ai;
  }

  function socialIconSvg(key) {
    return SOCIAL_SVGS[key] || "";
  }

  function contactIconSvg(key) {
    return CONTACT_SVGS[key] || CONTACT_SVGS.email;
  }

  function bannerLogoSources(item) {
    const sources = [];
    if (item.logo) sources.push(item.logo);
    if (item.logoAlt) sources.push(item.logoAlt);
    if (item.slug) {
      const color = (item.iconColor || "ffffff").replace("#", "");
      sources.push(`https://cdn.simpleicons.org/${item.slug}/${color}`);
    }
    return sources;
  }

  function bannerLogoUrl(item) {
    const sources = bannerLogoSources(item);
    return sources[0] || null;
  }

  function imgWithFallbacks(sources) {
    const chain = sources.filter(Boolean);
    if (!chain.length) return "";
    const rest = chain.slice(1).join("|");
    const fbAttr = rest
      ? ` data-fallbacks="${rest}" onerror="window.__portfolioImgFallback&&window.__portfolioImgFallback(this)"`
      : "";
    return `<img src="${chain[0]}" alt="" width="32" height="32" loading="eager" decoding="async"${fbAttr} />`;
  }

  function bannerTechIconHtml(item) {
    if (item.custom && BANNER_CUSTOM[item.custom]) {
      return uniquifyCustomSvg(BANNER_CUSTOM[item.custom], item.custom);
    }
    const sources = bannerLogoSources(item);
    if (!sources.length) return "";
    return imgWithFallbacks(sources);
  }

  function companyLogoSources(entry) {
    const sources = [];
    if (entry.logo) sources.push(entry.logo);
    if (entry.logoSlug) {
      const color = (entry.brandColor || "000000").replace("#", "");
      sources.push(`https://cdn.simpleicons.org/${entry.logoSlug}/${color}`);
    }
    if (entry.domain) {
      sources.push(
        `https://www.google.com/s2/favicons?domain=${encodeURIComponent(entry.domain)}&sz=128`
      );
    }
    return sources;
  }

  global.__portfolioImgFallback = function (img) {
    const chain = (img.dataset.fallbacks || "").split("|").filter(Boolean);
    if (!chain.length) {
      img.style.display = "none";
      return;
    }
    img.dataset.fallbacks = chain.slice(1).join("|");
    img.src = chain[0];
  };

  global.PORTFOLIO_ICONS = {
    projectIcon,
    projectIconSvg,
    projectTheme,
    socialIconSvg,
    contactIconSvg,
    companyLogoSources,
    bannerTechIconHtml,
    resetCustomSvgIds,
    BANNER_CUSTOM,
  };
})(typeof window !== "undefined" ? window : globalThis);
