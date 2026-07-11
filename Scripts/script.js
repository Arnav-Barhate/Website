// -----------------------------
// Nav toggle (mobile)
// -----------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// -----------------------------
// Lightweight UI config
// -----------------------------
const HYB_UI = {
  revealRootMargin: "0px 0px -8% 0px",
  defaultFocus: "what-we-do",
  focusContent: {
    "what-we-do": {
      title: "Quality control",
      text: "We help organisations deliver reliable, secure, high-quality technology solutions with confidence.",
      image: "https://placehold.co/1200x800/0b1220/a5f0f0?text=Quality+control",
      points: [
        "Test strategy and test management",
        "Functional, integration, and release testing",
        "Quality control and quality assurance support"
      ]
    },
    "what-we-help-with": {
      title: "Quality assurance",
      text: "We cover the broader assurance work that keeps delivery steady, compliant, and ready for release.",
      image: "https://placehold.co/1200x800/111827/68f5a3?text=Quality+assurance",
      points: [
        "Performance testing",
        "Security testing",
        "Accessibility and compliance support"
      ]
    },
    "how-we-work": {
      title: "How we work",
      text: "We build quality into every stage of the project: discover the problem, plan the approach, execute with excellence, and support continuous improvement.",
      image: "https://placehold.co/1200x800/111827/8a7cff?text=How+we+work",
      points: [
        "Discover and understand",
        "Plan and design",
        "Execute with excellence"
      ]
    }
  },
  email: {
    endpoint: "/api/contact",
    fallbackRecipient: "aybarhate12@gmail.com",
    minSecondsToSubmit: 3,
    maxMessageLength: 3000
  }
};

function initFocusSwitcher() {
  const switcher = document.querySelector("[data-focus-switcher]");
  const title = document.querySelector("[data-focus-title]");
  const text = document.querySelector("[data-focus-text]");
  const image = document.querySelector("[data-focus-image]");
  const points = document.querySelector("[data-focus-points]");
  const cards = document.querySelectorAll("[data-focus-option]");

  if (!switcher || !title || !text || !image || !points || !cards.length) {
    return;
  }

  const setFocus = (key) => {
    const content = HYB_UI.focusContent[key] || HYB_UI.focusContent[HYB_UI.defaultFocus];

    title.textContent = content.title;
    text.textContent = content.text;
    image.src = content.image;
    image.alt = content.title;
    points.innerHTML = content.points.map((point) => `<li>${point}</li>`).join("");

    cards.forEach((card) => {
      card.classList.toggle("active", card.getAttribute("data-focus-option") === key);
      card.setAttribute("aria-pressed", card.getAttribute("data-focus-option") === key ? "true" : "false");
    });
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => setFocus(card.getAttribute("data-focus-option")));
  });

  setFocus(HYB_UI.defaultFocus);
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: HYB_UI.revealRootMargin });

  items.forEach((item) => observer.observe(item));
}

// -----------------------------
// Tabs logic
// -----------------------------
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");

    tabs.forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");

    panels.forEach((p) => {
      p.classList.toggle("active", p.getAttribute("data-panel") === target);
    });
  });
});

// -----------------------------
// Plotly theme helpers
// -----------------------------
function baseDarkLayout(titleText, xTitle, yTitle, isHero = false) {
  return {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 50, r: 20, t: 50, b: 50 },
    title: {
      text: titleText,
      x: 0.03,
      font: {
        family: "Dongle, system-ui, sans-serif",
        size: isHero ? 34 : 28
      }
    },
    font: {
      family: "Dongle, system-ui, sans-serif",
      size: isHero ? 24 : 20,
      color: "rgba(255,255,255,0.88)"
    },
    xaxis: {
      title: { text: xTitle, standoff: 10 },
      gridcolor: "rgba(255,255,255,0.08)",
      zerolinecolor: "rgba(255,255,255,0.12)",
      tickfont: { size: isHero ? 22 : 18 }
    },
    yaxis: {
      title: { text: yTitle, standoff: 10 },
      gridcolor: "rgba(255,255,255,0.08)",
      zerolinecolor: "rgba(255,255,255,0.12)",
      tickfont: { size: isHero ? 22 : 18 }
    },
    legend: {
      x: 1,
      y: 1,
      xanchor: "right",
      yanchor: "top",
      bgcolor: "rgba(10,12,18,0.55)",
      bordercolor: "rgba(255,255,255,0.10)",
      borderwidth: 1,
      font: { size: isHero ? 20 : 18 }
    }
  };
}

// -----------------------------
// Placeholder charts (swap later with real JSON/data)
// For now these just prove the layout + interactivity.
// -----------------------------
function renderPlaceholderCharts() {
  if (!window.Plotly) {
    return;
  }

  // Hero chart
  if (!document.getElementById("heroChart")) {
    return;
  }

  const heroX = [];
  const heroY = [];
  const startYear = 1985;
  for (let i = 0; i < 120; i++) {
    const year = startYear + i * 0.33;
    heroX.push(year);
    heroY.push(90 + 25 * Math.sin(i / 8) + (Math.random() - 0.5) * 18);
  }

  const heroTrace = {
    type: "scatter",
    mode: "lines",
    x: heroX,
    y: heroY,
    line: { width: 4 }, // thickness here
    name: "GPR (demo)"
  };

  const breakpoint = {
    type: "line",
    x0: 2020, x1: 2020,
    y0: Math.min(...heroY), y1: Math.max(...heroY),
    line: { width: 2, dash: "dash", color: "rgba(255,77,109,0.9)" }
  };

  Plotly.newPlot("heroChart", [heroTrace], {
    ...baseDarkLayout("Global GPR (preview)", "Year", "GPR", true),
    shapes: [breakpoint]
  }, { displayModeBar: false, responsive: true });

  // Inline volatility
  const volX = heroX.slice();
  const volY = volX.map((_, i) => 10 + 5 * Math.abs(Math.sin(i / 10)) + (Math.random() - 0.5) * 1.5);

  Plotly.newPlot("inlineVolatilityChart", [{
    type: "scatter",
    mode: "lines",
    x: volX,
    y: volY,
    line: { width: 3 },
    name: "Rolling std (demo)"
  }], baseDarkLayout("Rolling volatility (preview)", "Year", "Std dev"), { displayModeBar: false, responsive: true });

  // Inline extremes
  const extX = [];
  const extY = [];
  for (let y = 1985; y <= 2025; y++) {
    extX.push(y);
    extY.push(Math.max(0, 10 + (Math.random() * 25 - 10) + (y >= 2020 ? 8 : 0)));
  }

  Plotly.newPlot("inlineExtremesChart", [{
    type: "scatter",
    mode: "lines+markers",
    x: extX,
    y: extY,
    line: { width: 3 },
    marker: { size: 6 },
    name: "Extreme months % (demo)"
  }], baseDarkLayout("Extreme frequency (preview)", "Year", "% months"), { displayModeBar: false, responsive: true });
}

document.addEventListener("DOMContentLoaded", renderPlaceholderCharts);
document.addEventListener("DOMContentLoaded", initFocusSwitcher);
document.addEventListener("DOMContentLoaded", initRevealAnimations);
document.addEventListener("DOMContentLoaded", initContactForm);