import { useState, useEffect, useRef } from "react";

// ── Font injection ─────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ── Global styles ───────────────────────────────────────────────────────────
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #060609;
    color: #e2e8f0;
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #060609; }
  ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.3); }
    50%       { box-shadow: 0 0 40px rgba(37,99,235,0.7); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes scanline {
    from { background-position: 0 0; }
    to   { background-position: 0 100%; }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }
  @keyframes rotate-border {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes count-up {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes dot-pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50%       { transform: scale(1.5); opacity: 1; }
  }

  .animate-fade-up   { animation: fadeUp 0.7s ease forwards; }
  .animate-fade-in   { animation: fadeIn 0.6s ease forwards; }
  .animate-slide-r   { animation: slideRight 0.7s ease forwards; }
  .animate-float     { animation: float 4s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }

  .nav-link {
    position: relative; color: #94a3b8; text-decoration: none;
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    letter-spacing: 0.05em; transition: color 0.3s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 1px; background: #2563eb; transition: width 0.3s;
  }
  .nav-link:hover { color: #60a5fa; }
  .nav-link:hover::after { width: 100%; }

  .card-hover {
    transition: transform 0.35s cubic-bezier(.25,.8,.25,1),
                box-shadow 0.35s cubic-bezier(.25,.8,.25,1),
                border-color 0.35s;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.3);
    border-color: rgba(37,99,235,0.4) !important;
  }

  .skill-pill:hover {
    background: rgba(37,99,235,0.2);
    border-color: rgba(37,99,235,0.6);
    color: #60a5fa;
    transform: translateY(-2px) scale(1.04);
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: #2563eb; color: #fff;
    padding: 12px 28px; border-radius: 8px; font-weight: 500;
    font-family: 'Outfit', sans-serif; font-size: 14px;
    border: none; cursor: pointer; letter-spacing: 0.02em;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    text-decoration: none;
  }
  .btn-primary:hover {
    background: #1d4ed8; transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.45);
  }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #94a3b8;
    padding: 11px 24px; border-radius: 8px; font-weight: 400;
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    border: 1px solid rgba(148,163,184,0.2); cursor: pointer;
    letter-spacing: 0.05em; transition: all 0.25s;
    text-decoration: none;
  }
  .btn-outline:hover {
    border-color: rgba(37,99,235,0.5); color: #60a5fa;
    background: rgba(37,99,235,0.06); transform: translateY(-2px);
  }

  .gradient-text {
    background: linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .shimmer-text {
    background: linear-gradient(90deg, #60a5fa, #38bdf8, #818cf8, #60a5fa);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; animation: shimmer 3s linear infinite;
  }

  .noise-bg::before {
    content: ''; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.04; pointer-events: none; z-index: 0;
  }

  .dot-grid {
    background-image: radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  section { opacity: 0; }
  section.visible { animation: fadeUp 0.8s ease forwards; }
`;

// ── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ words, speed = 90, pause = 1800 }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(() => {
      if (!del) {
        setTxt(word.slice(0, txt.length + 1));
        if (txt.length + 1 === word.length) setTimeout(() => setDel(true), pause);
      } else {
        setTxt(word.slice(0, txt.length - 1));
        if (txt.length - 1 === 0) { setDel(false); setIdx((idx + 1) % words.length); }
      }
    }, del ? 45 : speed);
    return () => clearTimeout(timer);
  }, [txt, del, idx, words, speed, pause]);

  return (
    <span>
      <span className="shimmer-text">{txt}</span>
      <span style={{ animation: "blink 1s step-end infinite", color: "#2563eb" }}>|</span>
    </span>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5%",
      background: scrolled ? "rgba(6,6,9,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(37,99,235,0.12)" : "1px solid transparent",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 68,
    }}>
      {/* Logo */}
      <a href="#hero" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            overflow: "hidden",
            border: "2px solid rgba(37,99,235,0.5)",
          }}>
            <img src="data:image/jpeg;base64,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" alt="Amir" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
            color: "#e2e8f0", letterSpacing: "0.02em",
          }}>Amir Omran</span>
        </div>
      </a>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
        <a
          href="mailto:amir@example.com"
          className="btn-primary"
          style={{ padding: "9px 20px", fontSize: 13 }}
        >Hire Me</a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", padding: 6, color: "#e2e8f0",
        }}
        className="hamburger"
      >
        <div style={{
          width: 22, height: 2, background: "#e2e8f0", marginBottom: 5,
          transition: "transform 0.3s",
          transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
        }} />
        <div style={{
          width: 22, height: 2, background: "#e2e8f0", marginBottom: 5,
          opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s",
        }} />
        <div style={{
          width: 22, height: 2, background: "#e2e8f0",
          transition: "transform 0.3s",
          transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
        }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0,
          background: "rgba(6,6,9,0.98)", backdropFilter: "blur(20px)",
          padding: "24px 5% 32px", display: "flex", flexDirection: "column", gap: 20,
          borderBottom: "1px solid rgba(37,99,235,0.15)",
          animation: "fadeUp 0.3s ease forwards",
        }}>
          {links.map(l => (
            <a
              key={l} href={`#${l.toLowerCase()}`}
              className="nav-link"
              style={{ fontSize: 16 }}
              onClick={() => setMenuOpen(false)}
            >{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", opacity: 1,
        padding: "120px 5% 80px",
      }}
    >
      {/* Background layers */}
      <div className="dot-grid" style={{
        position: "absolute", inset: 0, zIndex: 0,
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "-5%", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-10%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
      }} className="hero-grid">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 32,
            animation: "fadeIn 0.6s ease forwards",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#22c55e",
              animation: "dot-pulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "#60a5fa", letterSpacing: "0.08em",
            }}>Available for opportunities</span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 1.05,
            color: "#f8fafc", marginBottom: 12,
            animation: "fadeUp 0.7s 0.1s ease both",
          }}>
            Amir<br />
            <span className="gradient-text">Omran</span>
          </h1>

          {/* Typewriter role */}
          <div style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 2.5vw, 26px)",
            fontWeight: 600, marginBottom: 24, minHeight: 38,
            animation: "fadeUp 0.7s 0.2s ease both",
          }}>
            <Typewriter words={[
              "Backend Developer",
              ".NET Architect",
              "API Engineer",
              "Systems Builder",
            ]} />
          </div>

          {/* Bio */}
          <p style={{
            color: "#64748b", fontSize: 16, lineHeight: 1.75, maxWidth: 480,
            marginBottom: 40, fontWeight: 300,
            animation: "fadeUp 0.7s 0.3s ease both",
          }}>
            I craft{" "}
            <span style={{ color: "#94a3b8" }}>scalable backend systems</span>{" "}
            and{" "}
            <span style={{ color: "#94a3b8" }}>high-performance APIs</span>{" "}
            with .NET — turning complex business logic into elegant, maintainable code.
            Based in Egypt, building for the world.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            animation: "fadeUp 0.7s 0.4s ease both",
          }}>
            <a href="#projects" className="btn-primary">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Get in Touch →
            </a>
          </div>

          {/* Social row */}
          <div style={{
            display: "flex", gap: 16, marginTop: 40, alignItems: "center",
            animation: "fadeUp 0.7s 0.5s ease both",
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155" }}>
              FIND ME ON
            </span>
            {[
              {
                label: "GitHub", icon: (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                ),
                href: "https://github.com/dfhhgh/dfhfgh",
              },
              {
                label: "LinkedIn", icon: (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                href: "https://www.linkedin.com/in/amir-omran-76245631a",
              },
            ].map(s => (
              <a
                key={s.label} href={s.href} target="_blank" rel="noreferrer"
                title={s.label}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  border: "1px solid rgba(148,163,184,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#64748b", transition: "all 0.25s", textDecoration: "none",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#60a5fa";
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)";
                  e.currentTarget.style.background = "rgba(37,99,235,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.transform = "none";
                }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Right: Photo + Terminal card */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          {/* Profile Photo */}
          <div style={{
            position: "relative",
            animation: "fadeUp 0.7s 0.2s ease both",
          }}>
            <div style={{
              width: 180, height: 180, borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(37,99,235,0.5)",
              boxShadow: "0 0 0 6px rgba(37,99,235,0.08), 0 24px 48px rgba(0,0,0,0.5)",
              animation: "pulse-glow 2.5s ease-in-out infinite",
            }}>
              <img
                src="data:image/jpeg;base64,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"
                alt="Amir Omran"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: 10, right: 10,
              width: 20, height: 20, borderRadius: "50%",
              background: "#22c55e",
              border: "3px solid #060609",
              boxShadow: "0 0 10px rgba(34,197,94,0.6)",
            }} />
          </div>
          <TerminalCard />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function TerminalCard() {
  return (
    <div
      className="animate-float"
      style={{
        width: "100%", maxWidth: 440,
        background: "rgba(13,14,20,0.9)",
        border: "1px solid rgba(37,99,235,0.2)",
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.08), inset 0 0 80px rgba(37,99,235,0.02)",
      }}
    >
      {/* Terminal header */}
      <div style={{
        background: "rgba(255,255,255,0.03)", padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />
        ))}
        <span style={{
          marginLeft: 8, fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: "#475569", letterSpacing: "0.05em",
        }}>amir@portfolio ~ %</span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: "20px 20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.8 }}>
        {[
          { prompt: "$ cat", rest: " about.json", delay: 0 },
        ].map((line, i) => (
          <div key={i} style={{ marginBottom: 4, animation: `fadeIn 0.3s ${i * 0.1}s both` }}>
            <span style={{ color: "#22c55e" }}>{line.prompt}</span>
            <span style={{ color: "#94a3b8" }}>{line.rest}</span>
          </div>
        ))}

        <div style={{
          marginTop: 12, background: "rgba(37,99,235,0.06)",
          borderRadius: 8, padding: "14px 16px",
          border: "1px solid rgba(37,99,235,0.12)",
          animation: "fadeUp 0.5s 0.4s both",
        }}>
          {[
            ['"name"',      '"Amir Omran"'],
            ['"role"',      '"Backend Developer (.NET)"'],
            ['"location"',  '"Egypt 🇪🇬"'],
            ['"focus"',     '"Scalable APIs & Systems"'],
            ['"status"',    '"Open to work ✅"'],
          ].map(([k, v], i) => (
            <div key={i} style={{ animation: `fadeIn 0.3s ${0.5 + i * 0.08}s both` }}>
              <span style={{ color: "#818cf8" }}>{k}</span>
              <span style={{ color: "#475569" }}>: </span>
              <span style={{ color: "#34d399" }}>{v}</span>
              {i < 4 && <span style={{ color: "#475569" }}>,</span>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, animation: "fadeIn 0.3s 1.1s both" }}>
          <span style={{ color: "#22c55e" }}>$ </span>
          <span style={{ color: "#94a3b8" }}>npm run </span>
          <span style={{ color: "#60a5fa" }}>hire-amir</span>
          <span style={{ animation: "blink 1s step-end infinite", color: "#2563eb" }}> ▋</span>
        </div>
      </div>
    </div>
  );
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useInView();

  const stats = [
    { num: "2+", label: "Years Building" },
    { num: "10+", label: "Projects Shipped" },
    { num: "5+", label: "Tech Mastered" },
    { num: "∞", label: "Coffee Consumed" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className={visible ? "visible" : ""}
      style={{ padding: "120px 5%", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel label="01 — ABOUT ME" />

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, alignItems: "start", marginTop: 56,
        }} className="about-grid">
          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1,
              color: "#f1f5f9", marginBottom: 28,
            }}>
              Backend engineer<br />
              <span className="gradient-text">with a system-first mindset</span>
            </h2>

            <p style={{ color: "#64748b", lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>
              I'm a <span style={{ color: "#94a3b8", fontWeight: 400 }}>Backend Developer specializing in .NET</span>,
              focused on designing and building backend systems that scale cleanly and perform reliably.
              My work lives in the layers that users never see — and that's exactly where I like to be.
            </p>
            <p style={{ color: "#64748b", lineHeight: 1.85, marginBottom: 36, fontWeight: 300 }}>
              From architecting REST APIs to designing SQL Server schemas, I care deeply about code
              quality, clean architecture, and solutions that don't break under pressure.
              I believe great software is built on <span style={{ color: "#94a3b8" }}>clear thinking</span>,
              not clever hacks.
            </p>

            {/* Stats grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, padding: "20px 24px",
                  transition: "border-color 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
                >
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32,
                    color: "#60a5fa", lineHeight: 1,
                  }}>{s.num}</div>
                  <div style={{ color: "#475569", fontSize: 12, marginTop: 6, letterSpacing: "0.05em", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info card */}
          <div style={{
            background: "rgba(13,14,20,0.8)",
            border: "1px solid rgba(37,99,235,0.15)",
            borderRadius: 20, padding: "36px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
              paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                overflow: "hidden",
                border: "2px solid rgba(37,99,235,0.4)",
                flexShrink: 0,
              }}>
                <img src="data:image/jpeg;base64,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" alt="Amir Omran" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#f1f5f9" }}>Amir Omran</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#60a5fa", marginTop: 2 }}>Backend Developer (.NET)</div>
              </div>
            </div>

            {[
              { icon: "📍", label: "Location", value: "Egypt" },
              { icon: "💼", label: "Focus", value: "Backend Systems & APIs" },
              { icon: "🛠", label: "Primary Stack", value: ".NET + SQL Server" },
              { icon: "🌐", label: "Languages", value: "C#, Python, SQL" },
              { icon: "✉️", label: "Email", value: "amir@example.com" },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "10px 0",
                borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{row.icon}</span>
                <span style={{ color: "#475569", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", width: 110 }}>{row.label}</span>
                <span style={{ color: "#94a3b8", fontSize: 14, fontWeight: 300 }}>{row.value}</span>
              </div>
            ))}

            <a href="#contact" className="btn-primary" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
              Let's Work Together
            </a>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

// ── Skills ──────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "C#", icon: "⚙️", level: 92, cat: "Language" },
  { name: ".NET Web API", icon: "🔷", level: 90, cat: "Framework" },
  { name: "SQL Server", icon: "🗄️", level: 87, cat: "Database" },
  { name: "Python", icon: "🐍", level: 78, cat: "Language" },
  { name: "REST APIs", icon: "🔗", level: 93, cat: "Architecture" },
  { name: "Entity Framework", icon: "📦", level: 85, cat: "ORM" },
  { name: "Git & GitHub", icon: "📂", level: 88, cat: "DevOps" },
  { name: "Clean Architecture", icon: "🏗️", level: 82, cat: "Pattern" },
  { name: "LINQ", icon: "🔍", level: 86, cat: ".NET" },
  { name: "Docker", icon: "🐳", level: 70, cat: "DevOps" },
  { name: "JWT Auth", icon: "🔐", level: 84, cat: "Security" },
  { name: "Postman", icon: "📮", level: 89, cat: "Tools" },
];

function SkillBar({ level, visible }) {
  return (
    <div style={{
      height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 10, overflow: "hidden",
    }}>
      <div style={{
        height: "100%", borderRadius: 2,
        background: "linear-gradient(90deg, #2563eb, #38bdf8)",
        width: visible ? `${level}%` : "0%",
        transition: "width 1.2s cubic-bezier(.25,.8,.25,1)",
        boxShadow: "0 0 8px rgba(37,99,235,0.5)",
      }} />
    </div>
  );
}

function Skills() {
  const [ref, visible] = useInView();

  return (
    <section
      id="skills"
      ref={ref}
      className={visible ? "visible" : ""}
      style={{ padding: "120px 5%", background: "rgba(255,255,255,0.01)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel label="02 — SKILLS" />

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 56, flexWrap: "wrap", gap: 20,
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 3.5vw, 42px)", color: "#f1f5f9", lineHeight: 1.1,
          }}>
            Tools I wield<br />
            <span className="gradient-text">with confidence</span>
          </h2>
          <p style={{ color: "#475569", maxWidth: 340, fontWeight: 300, lineHeight: 1.7 }}>
            Technologies I use daily to build production-grade backend systems.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {SKILLS.map((sk, i) => (
            <div
              key={sk.name}
              className="card-hover"
              style={{
                background: "rgba(13,14,20,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14, padding: "22px 24px",
                animationDelay: `${i * 0.06}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ${i * 0.05}s, transform 0.5s ${i * 0.05}s`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{sk.icon}</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: "#e2e8f0" }}>{sk.name}</div>
                    <div style={{ fontSize: 11, color: "#334155", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{sk.cat}</div>
                  </div>
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: "#60a5fa", fontWeight: 500,
                }}>{sk.level}%</span>
              </div>
              <SkillBar level={sk.level} visible={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01",
    title: "Hospital Management System",
    description:
      "A comprehensive system for managing doctors, patients, and appointments in hospital environments. Features intelligent double-booking prevention, patient history tracking, and an advanced scheduling engine.",
    stack: [".NET Web API", "C#", "SQL Server", "Entity Framework", "JWT Auth"],
    highlights: ["Doctor & Patient Management", "Anti-double-booking logic", "Appointment scheduling engine", "Secure REST API"],
    github: "https://github.com/dfhhgh/Hospital-System",
    accent: "#2563eb",
    badge: "Healthcare",
  },
  {
    num: "02",
    title: "Appointment Booking API",
    description:
      "A smart, production-ready appointment booking REST API with intelligent time slot management. Built for scalability and reliability, supporting multiple service types and providers with conflict resolution.",
    stack: ["REST API", "C#", ".NET", "SQL Server", "LINQ"],
    highlights: ["Smart time slot handling", "Conflict resolution", "Multi-provider support", "Clean Architecture"],
    github: "https://github.com/dfhhgh/bookapp",
    accent: "#0ea5e9",
    badge: "SaaS",
  },
  {
    num: "03",
    title: "Tariqi",
    description:
      "A backend system designed to help users navigate and manage routes or pathways efficiently. Built with a clean architecture approach, exposing reliable REST API endpoints for seamless client integration.",
    stack: ["C#", ".NET", "REST API", "SQL Server", "Clean Architecture"],
    highlights: ["Route & path management", "Scalable API design", "Clean Architecture pattern", "Efficient data handling"],
    github: "https://github.com/dfhhgh/tariqi",
    accent: "#8b5cf6",
    badge: "Navigation",
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.1);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(13,14,20,0.9)",
        border: `1px solid ${hovered ? `${project.accent}55` : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20, overflow: "hidden",
        transition: "all 0.4s cubic-bezier(.25,.8,.25,1)",
        transform: visible ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.15}s`,
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}33`
          : "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Project visual header */}
      <div style={{
        height: 200, position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, rgba(13,14,20,1) 0%, rgba(30,32,48,0.9) 100%)`,
      }}>
        {/* Decorative grid */}
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

        {/* Glow blob */}
        <div style={{
          position: "absolute", width: 300, height: 300,
          background: `radial-gradient(circle, ${project.accent}22 0%, transparent 70%)`,
          top: "-50%", right: "-10%",
          transition: "transform 0.5s",
          transform: hovered ? "scale(1.3)" : "scale(1)",
        }} />

        {/* Project number large */}
        <div style={{
          position: "absolute", bottom: 0, right: 24,
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 100, lineHeight: 1, color: "rgba(255,255,255,0.03)",
          userSelect: "none",
        }}>{project.num}</div>

        {/* Badge */}
        <div style={{
          position: "absolute", top: 20, left: 20,
          background: `${project.accent}22`,
          border: `1px solid ${project.accent}44`,
          borderRadius: 6, padding: "4px 12px",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: project.accent, letterSpacing: "0.08em",
        }}>{project.badge}</div>

        {/* API mockup lines */}
        <div style={{ position: "absolute", top: "50%", left: 24, transform: "translateY(-50%)" }}>
          {[
            { method: "GET", path: "/api/patients", color: "#22c55e" },
            { method: "POST", path: "/api/appointments", color: "#f59e0b" },
            { method: "DELETE", path: "/api/bookings/{id}", color: "#ef4444" },
          ].map((line, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              opacity: hovered ? 0.9 : 0.5, transition: `opacity 0.3s ${i * 0.06}s`,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
            }}>
              <span style={{ color: line.color, fontWeight: 600, minWidth: 48 }}>{line.method}</span>
              <span style={{ color: "#475569" }}>{line.path}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "28px 28px 32px" }}>
        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: 20, color: "#f1f5f9", marginBottom: 12, lineHeight: 1.2,
        }}>{project.title}</h3>

        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>
          {project.description}
        </p>

        {/* Highlights */}
        <div style={{ marginBottom: 22 }}>
          {project.highlights.map((h, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 6, fontSize: 13, color: "#64748b",
            }}>
              <span style={{ color: project.accent, fontSize: 10 }}>▸</span>
              {h}
            </div>
          ))}
        </div>

        {/* Tech stack pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.stack.map(t => (
            <span key={t} className="skill-pill" style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6, padding: "4px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: "#475569",
              transition: "all 0.2s", cursor: "default",
            }}>{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href={project.github} target="_blank" rel="noreferrer"
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center", background: project.accent }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, visible] = useInView();

  return (
    <section
      id="projects"
      ref={ref}
      className={visible ? "visible" : ""}
      style={{ padding: "120px 5%", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel label="03 — PROJECTS" />

        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20,
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 3.5vw, 42px)", color: "#f1f5f9", lineHeight: 1.1,
          }}>
            What I've<br />
            <span className="gradient-text">built & shipped</span>
          </h2>
          <a href="https://github.com/dfhhgh/dfhfgh" target="_blank" rel="noreferrer" className="btn-outline">
            All repos on GitHub →
          </a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 24,
        }} className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 560px) { .projects-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={visible ? "visible" : ""}
      style={{ padding: "120px 5% 100px", position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 800, height: 800,
        background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <SectionLabel label="04 — CONTACT" />

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, marginTop: 56, alignItems: "start",
        }} className="contact-grid">
          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "#f1f5f9",
              lineHeight: 1.1, marginBottom: 24,
            }}>
              Let's build<br />
              <span className="gradient-text">something great</span>
            </h2>
            <p style={{ color: "#64748b", lineHeight: 1.85, marginBottom: 40, fontWeight: 300 }}>
              Have a backend challenge? Need a reliable .NET developer? I'm open to full-time
              roles, freelance projects, and interesting collaborations.
            </p>

            {[
              { icon: "📧", label: "Email", value: "amir@example.com", link: "mailto:amir@example.com" },
              { icon: "📍", label: "Location", value: "Egypt — Open to remote", link: null },
              {
                icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                ), label: "GitHub", value: "github.com/dfhhgh/dfhfgh", link: "https://github.com/dfhhgh/dfhfgh",
              },
              {
                icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ), label: "LinkedIn", value: "linkedin.com/in/amir-omran-76245631a", link: "https://www.linkedin.com/in/amir-omran-76245631a",
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                  color: "#60a5fa",
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: "#334155", fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{item.label}</div>
                  {item.link
                    ? <a href={item.link} style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                      onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                    >{item.value}</a>
                    : <span style={{ color: "#94a3b8", fontSize: 14 }}>{item.value}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div style={{
            background: "rgba(13,14,20,0.8)",
            border: "1px solid rgba(37,99,235,0.15)",
            borderRadius: 20, padding: "36px",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#f1f5f9", marginBottom: 12 }}>
                  Message sent!
                </h3>
                <p style={{ color: "#64748b" }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: 18, color: "#f1f5f9", marginBottom: 24,
                }}>Send a message</h3>

                {[
                  { key: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                  { key: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: 18 }}>
                    <label style={{
                      display: "block", fontSize: 12, color: "#475569",
                      fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: "0.05em",
                    }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 10, padding: "12px 16px",
                        color: "#e2e8f0", fontSize: 14, fontFamily: "'Outfit', sans-serif",
                        outline: "none", transition: "border-color 0.25s",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    display: "block", fontSize: 12, color: "#475569",
                    fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: "0.05em",
                  }}>Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, padding: "12px 16px",
                      color: "#e2e8f0", fontSize: 14, fontFamily: "'Outfit', sans-serif",
                      outline: "none", resize: "vertical", transition: "border-color 0.25s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>

                <button onClick={handleSubmit} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "32px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#1e293b" }}>
        © 2025 Amir Omran — Built with React & passion
      </span>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { label: "GitHub", href: "https://github.com/dfhhgh/dfhfgh" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/amir-omran-76245631a" },
          { label: "Email", href: "mailto:amir@example.com" },
        ].map(l => (
          <a key={l.label} href={l.href} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: "#1e293b", textDecoration: "none", transition: "color 0.25s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
            onMouseLeave={e => e.currentTarget.style.color = "#1e293b"}
          >{l.label}</a>
        ))}
      </div>
    </footer>
  );
}

// ── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: "#2563eb", letterSpacing: "0.12em", fontWeight: 500,
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(37,99,235,0.15)", maxWidth: 120 }} />
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontLoader />
      <style>{globalCSS}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}