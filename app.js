(function () {
  const D = window.PORTFOLIO_DATA;
  const I = window.PORTFOLIO_ICONS;
  if (!D || !I) return;

  const $ = (sel) => document.querySelector(sel);

  function esc(s) {
    const el = document.createElement("span");
    el.textContent = s ?? "";
    return el.innerHTML;
  }

  function companyInitials(name) {
    return name
      .split(/[\s-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  function isCurrentRole(period) {
    return /present/i.test(period);
  }

  function statPillsHtml() {
    return D.stats
      .map(
        (s) => `
      <div class="highlight-pill">
        <strong>${esc(s.value)}</strong>
        <span>${esc(s.label)}</span>
      </div>`
      )
      .join("");
  }

  function badgeClasses(item, compact) {
    return [
      item.custom && `tech-badge--${item.custom}`,
      item.label === "AWS" && !compact && "tech-badge--wide-logo",
      !item.logo && !item.custom && "tech-badge--brand-tile",
      item.logoStyle && `tech-badge--logo-${item.logoStyle}`,
      compact && "tech-badge--compact",
    ]
      .filter(Boolean)
      .join(" ");
  }

  function renderBannerBadge(item, compact) {
    const glow = item.glow || item.brand || "#0a66c2";
    const brand = item.brand || glow;
    const cls = badgeClasses(item, compact);
    const icon = I.bannerTechIconHtml(item);
    const style = `--badge-glow:${glow};--badge-brand:${brand}`;

    if (compact) {
      return `
      <div class="tech-badge ${cls}" style="${style}" title="${esc(item.label)}">
        <span class="tech-badge-icon">${icon}</span>
        <span class="tech-badge-label">${esc(item.label)}</span>
      </div>`;
    }

    const tag = item.tag ? `<span class="tech-badge-tag">${esc(item.tag)}</span>` : "";
    return `
      <div class="tech-badge ${cls}" style="${style}">
        <span class="tech-badge-icon">${icon}</span>
        <span class="tech-badge-copy">
          <span class="tech-badge-label">${esc(item.label)}</span>
          ${tag}
        </span>
      </div>`;
  }

  function fillBorderTrack(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html + html;
  }

  function renderBanner() {
    const b = D.banner;
    if (!b) return;
    I.resetCustomSvgIds?.();

    $("#banner-headline").textContent = b.headline;
    $("#banner-subline").innerHTML = `
      <span class="banner-name">${esc(b.subline)}</span>
      <span class="banner-sep" aria-hidden="true"> | </span>
      <a class="banner-email" href="mailto:${esc(D.email)}">${esc(D.email)}</a>`;

    const tech = D.bannerTech;
    if (!tech?.length) return;

    const full = tech.map((t) => renderBannerBadge(t, false)).join("");
    const compact = tech.map((t) => renderBannerBadge(t, true)).join("");

    fillBorderTrack("#border-top", full);
    fillBorderTrack("#border-bottom", full);
    fillBorderTrack("#border-right", compact);
    fillBorderTrack("#border-left", compact);
  }

  function renderHighlights() {
    const bar = $("#highlights-bar");
    if (bar) bar.innerHTML = statPillsHtml();
  }

  function renderProfile() {
    $("#profile-name").textContent = D.name;
    $("#profile-headline").textContent = D.role;
    $("#profile-location").innerHTML = `
      ${esc(D.location)}
      <br />
      <a href="mailto:${esc(D.email)}" class="profile-email-link">${esc(D.email)}</a>`;
    $("#about-text").textContent = D.bio;

    const pitch = $("#recruiter-pitch");
    if (pitch && D.recruiterPitch) pitch.textContent = D.recruiterPitch;

    const tagline = $("#profile-tagline");
    if (tagline) tagline.textContent = D.tagline;

    $("#profile-actions").innerHTML = `
      <a class="btn btn-primary btn-block" href="${D.resumePdf}" download>Download Resume</a>
      <a class="btn btn-outline btn-block" href="${D.links.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
      <a class="btn btn-ghost btn-block" href="mailto:${esc(D.email)}">Email</a>`;

    $("#role-tags").innerHTML = D.roles.map((r) => `<li>${esc(r)}</li>`).join("");
    $("#exp-count").textContent = `${D.experience.length} roles · ${D.projects.length} projects`;

    const avatar = $("#avatar img");
    if (avatar && D.profileImage) {
      avatar.src = D.profileImage;
      avatar.alt = D.name;
    }
  }

  function renderCompanyLogo(e) {
    const initials = companyInitials(e.company);
    const accent = e.brandColor ? ` style="--logo-accent:${e.brandColor}"` : "";
    const sources = I.companyLogoSources(e);

    if (!sources.length) {
      return `<div class="exp-logo exp-logo-fallback"${accent} aria-hidden="true"><span>${esc(initials)}</span></div>`;
    }

    return `
      <div class="exp-logo${e.logo ? " exp-logo--brand" : ""}"${accent} data-logo-fallbacks="${esc(sources.slice(1).join("|"))}">
        <img class="exp-logo-img" src="${sources[0]}" alt="${esc(e.company)} logo" width="56" height="56" loading="lazy" decoding="async" />
        <span class="exp-logo-fallback-text" hidden>${esc(initials)}</span>
      </div>`;
  }

  function initCompanyLogos() {
    document.querySelectorAll(".exp-logo-img").forEach((img) => {
      img.addEventListener("error", function handleLogoError() {
        const wrap = this.closest(".exp-logo");
        if (!wrap || wrap.classList.contains("exp-logo-fallback")) return;

        const fallbacks = (wrap.dataset.logoFallbacks || "").split("|").filter(Boolean);
        if (fallbacks.length) {
          wrap.dataset.logoFallbacks = fallbacks.slice(1).join("|");
          this.src = fallbacks[0];
          return;
        }

        wrap.classList.add("exp-logo-fallback");
        this.remove();
        const text = wrap.querySelector(".exp-logo-fallback-text");
        if (text) text.hidden = false;
      });
    });
  }

  function renderExperience() {
    $("#experience-list").innerHTML = D.experience
      .map(
        (e) => `
      <article class="exp-item">
        ${renderCompanyLogo(e)}
        <div class="exp-body">
          <div class="exp-head">
            <div>
              <h3>${esc(e.title)}</h3>
              <div class="exp-company">${esc(e.company)}</div>
            </div>
            <div class="exp-meta">
              ${isCurrentRole(e.period) ? '<span class="exp-badge">Current</span>' : ""}
              <span class="exp-period">${esc(e.period)}</span>
            </div>
          </div>
          <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        </div>
      </article>`
      )
      .join("");
  }

  function renderProjects() {
    $("#projects-grid").innerHTML = D.projects
      .map((p, i) => {
        const key = I.projectIcon(p.icon);
        const theme = I.projectTheme(key);
        return `
      <article class="project-card" style="--project-accent:${theme.accent}">
        <div class="project-card-head">
          <div class="project-icon" style="--icon-bg:${theme.bg};--icon-fg:${theme.fg};--icon-accent:${theme.accent}">
            ${I.projectIconSvg(key)}
          </div>
          <div class="project-card-title">
            <span class="project-num">Project ${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(p.name)}</h3>
          </div>
        </div>
        <p class="project-stack">${esc(p.stack)}</p>
        <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </article>`;
      })
      .join("");
  }

  function renderSkills() {
    $("#skills-cloud").innerHTML = D.skillCategories
      .map(
        (g) => `
      <div class="skill-group">
        <h3>${esc(g.label)}</h3>
        <div class="skill-tags">${g.skills.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join("")}</div>
      </div>`
      )
      .join("");
  }

  function renderEducation() {
    $("#education-list").innerHTML = D.education
      .map(
        (e) => `
      <article class="edu-item">
        <h3>${esc(e.school)}</h3>
        <p>${esc(e.degree)}</p>
        ${e.detail ? `<span class="edu-gpa">${esc(e.detail)}</span>` : ""}
      </article>`
      )
      .join("");
  }

  function renderContact() {
    const tel = D.phone.replace(/\D/g, "");

    $("#contact-primary").innerHTML = `
      <a class="contact-email-card" href="mailto:${esc(D.email)}">
        <span class="contact-email-icon" aria-hidden="true">${I.contactIconSvg("email")}</span>
        <span class="contact-email-body">
          <span class="contact-email-label">Email</span>
          <span class="contact-email-address">${esc(D.email)}</span>
          <span class="contact-email-hint">Best for recruiters — quick reply</span>
        </span>
      </a>
      <a class="contact-phone-card" href="tel:${tel}">
        <span class="contact-email-icon contact-phone-icon" aria-hidden="true">${I.contactIconSvg("phone")}</span>
        <span class="contact-email-body">
          <span class="contact-email-label">Phone</span>
          <span class="contact-email-address">${esc(D.phone)}</span>
          <span class="contact-email-hint">Available for calls</span>
        </span>
      </a>`;

    const social = D.social || [];
    $("#contact-links").innerHTML = `
      <p class="contact-links-heading">Professional profiles</p>
      <div class="contact-links-grid">
        ${social
          .map(
            (l) => `
          <a class="contact-social contact-social--${esc(l.icon)}" href="${D.links[l.hrefKey]}" target="_blank" rel="noreferrer">
            <span class="contact-social-icon">${I.socialIconSvg(l.icon)}</span>
            <span class="contact-social-text">
              <span class="contact-social-label">${esc(l.label)}</span>
              <span class="contact-social-value">${esc(l.value)}</span>
            </span>
          </a>`
          )
          .join("")}
      </div>`;

    $("#footer-contact").innerHTML = `
      <a class="footer-email" href="mailto:${esc(D.email)}">${esc(D.email)}</a>
      <span class="footer-divider" aria-hidden="true">·</span>
      <a class="footer-phone" href="tel:${tel}">${esc(D.phone)}</a>`;
  }

  function renderRail() {
    $("#rail-strengths").innerHTML = D.strengths.map((s) => `<li>${esc(s)}</li>`).join("");
    $("#rail-facts").innerHTML = D.stats
      .map((s) => `<li><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong></li>`)
      .join("");
  }

  function initReveal() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
  }

  function initNav() {
    const toggle = $(".menu-toggle");
    const nav = $(".nav-links");
    const backdrop = $("#nav-backdrop");
    const header = $(".top-nav");
    if (!toggle || !nav) return;

    if (!nav.querySelector(".nav-mobile-cta")) {
      const link = document.createElement("a");
      link.className = "btn btn-primary btn-block nav-mobile-cta";
      link.href = D.resumePdf;
      link.setAttribute("download", "");
      link.textContent = "Download Resume";
      nav.appendChild(link);
    }

    const setMenuOpen = (open) => {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      if (backdrop) backdrop.hidden = !open;
    };

    toggle.addEventListener("click", () => setMenuOpen(!nav.classList.contains("open")));
    backdrop?.addEventListener("click", () => setMenuOpen(false));
    nav.querySelectorAll("a:not(.nav-mobile-cta)").forEach((a) => {
      a.addEventListener("click", () => setMenuOpen(false));
    });

    window.addEventListener(
      "scroll",
      () => header?.classList.toggle("nav-scrolled", window.scrollY > 8),
      { passive: true }
    );
  }

  function initScrollSpy() {
    const ids = ["about", "experience", "projects", "skills", "education", "contact"];
    const links = document.querySelectorAll(".nav-links a[href^='#']");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  function init() {
    renderBanner();
    renderHighlights();
    renderProfile();
    renderExperience();
    initCompanyLogos();
    renderProjects();
    renderSkills();
    renderEducation();
    renderContact();
    renderRail();
    initReveal();
    initNav();
    initScrollSpy();
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  init();
})();
