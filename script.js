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
  // Hero chart
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