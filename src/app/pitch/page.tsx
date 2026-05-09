"use client";

import React, { useState, useEffect, useCallback } from "react";

/* ===== Slide data ===== */
const slides = [
  {
    id: "title",
    badge: "COLOSSEUM FRONTIER 2026",
    title: "CIVA",
    subtitle: "CipherVault Protocol",
    body: "Encrypted OTC Dark Pool for Institutional Crypto Trading on Solana",
    footer: "Zero MEV · Hidden Identity · Atomic Settlement · Adevar Audited",
    gradient: "from-cyan-500/20 via-transparent to-purple-500/10",
  },
  {
    id: "problem",
    badge: "THE PROBLEM",
    title: "$1.4B Lost to MEV",
    subtitle: "in 2025 alone",
    bullets: [
      { icon: "🎯", text: "Every large trade is a broadcast to MEV bots — front-running within 400ms" },
      { icon: "📉", text: "A $2M sell on a public AMM moves price 2-5%, costing tens of thousands" },
      { icon: "👁️", text: "On-chain analysis links wallets to real identities — competitors see your positions" },
      { icon: "⏳", text: "Traditional OTC desks are custodial, slow (T+1), and KYC-gated" },
    ],
    stat: { value: "$100B+", label: "Annual OTC market with NO privacy-preserving protocol on Solana" },
    gradient: "from-red-500/15 via-transparent to-orange-500/10",
  },
  {
    id: "solution",
    badge: "THE SOLUTION",
    title: "Trade in the Dark",
    subtitle: "Civa Protocol",
    steps: [
      { num: "01", title: "Encrypt", desc: "Maker deposits SOL → order params encrypted via Encrypt SDK", color: "cyan" },
      { num: "02", title: "Match", desc: "Taker browses liquidity bands → blind compatibility check", color: "purple" },
      { num: "03", title: "Settle", desc: "Ika atomic custody → simultaneous swap, zero custodial risk", color: "green" },
      { num: "04", title: "Private", desc: "Solscan sees nothing. Civa sees everything. That's the point.", color: "cyan" },
    ],
    gradient: "from-cyan-500/15 via-transparent to-green-500/10",
  },
  {
    id: "how-it-works",
    badge: "ARCHITECTURE",
    title: "How It Works",
    subtitle: "End-to-end encrypted flow",
    flow: [
      { label: "Maker", detail: "Encrypts order parameters", icon: "🔒" },
      { label: "Encrypt SDK", detail: "Confidential Token Standard", icon: "🛡️" },
      { label: "Vault PDA", detail: "Assets locked on-chain", icon: "🏦" },
      { label: "Blind Match", detail: "ZKP compatibility check", icon: "🔍" },
      { label: "Ika Custody", detail: "Atomic settlement", icon: "⚡" },
      { label: "Complete", detail: "Private settlement < 10s", icon: "✅" },
    ],
    gradient: "from-blue-500/15 via-transparent to-cyan-500/10",
  },
  {
    id: "sponsor-fit",
    badge: "WHY ADEVAR",
    title: "Audit = Go-to-Market",
    subtitle: "Security isn't optional — it's the product",
    threats: [
      { threat: "Front-running", mitigation: "All order params encrypted via Encrypt SDK", severity: "critical" },
      { threat: "Vault drainage", mitigation: "Multi-sig admin + timelock on upgrades", severity: "critical" },
      { threat: "Double-spend", mitigation: "Atomic escrow — both sides lock first", severity: "high" },
      { threat: "Timeout exploit", mitigation: "Auto-refund after configurable timeout", severity: "high" },
      { threat: "Admin key compromise", mitigation: "MPC signing — no single key access", severity: "critical" },
    ],
    bottomLine: "No institutional user deposits $1M+ into an unaudited protocol. The audit IS the product.",
    gradient: "from-amber-500/15 via-transparent to-red-500/10",
  },
  {
    id: "tech-stack",
    badge: "TECH STACK",
    title: "Built for Production",
    subtitle: "Not a hackathon throwaway",
    stack: [
      { layer: "Frontend", tech: "Next.js 16 · React 19 · Tailwind v4", icon: "🖥️" },
      { layer: "Privacy", tech: "Encrypt SDK — Confidential Tokens + ZKP", icon: "🔐" },
      { layer: "Settlement", tech: "Ika Custody — Bridgeless Atomic Swap", icon: "⚡" },
      { layer: "Chain", tech: "Solana Devnet → Mainnet (post-audit)", icon: "🔗" },
      { layer: "Testing", tech: "72 tests · 10 suites · CI pipeline", icon: "✅" },
      { layer: "Audit", tech: "Adevar Labs Security Review", icon: "🛡️" },
    ],
    gradient: "from-purple-500/15 via-transparent to-cyan-500/10",
  },
  {
    id: "demo",
    badge: "LIVE DEMO",
    title: "See It In Action",
    subtitle: "frontier-adevar.vercel.app",
    features: [
      { name: "Encrypted Order Creation", desc: "Create OTC offers with ZK proof generation" },
      { name: "Dark Pool Liquidity Board", desc: "Browse anonymized liquidity bands" },
      { name: "Split-Screen Privacy Gap", desc: "Public explorer vs Civa decrypted view" },
      { name: "Real-time Settlement", desc: "Atomic execution in under 10 seconds" },
    ],
    gradient: "from-green-500/15 via-transparent to-cyan-500/10",
  },
  {
    id: "closing",
    badge: "THE ASK",
    title: "Fund the Audit",
    subtitle: "Ship the Protocol",
    body: "Civa is live on devnet with 72 tests and reproducible benchmarks. We need Adevar Labs' audit to take this to mainnet safely.",
    links: [
      { label: "Live App", url: "frontier-adevar.vercel.app" },
      { label: "GitHub", url: "github.com/edycutjong/frontier-adevar" },
      { label: "Twitter", url: "x.com/edycutjong" },
    ],
    signoff: "Built solo by Edy Cu Tjong · @edycutjong",
    gradient: "from-cyan-500/20 via-transparent to-purple-500/20",
  },
];

/* ===== Pitch Deck Component ===== */
export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setDirection(index > current ? "next" : "prev");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 300);
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden select-none">
      {/* Background gradient */}
      <div
        className={`fixed inset-0 bg-linear-to-br ${slide.gradient} transition-all duration-700 pointer-events-none`}
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <span className="font-orbitron text-xs text-cyan-400 font-bold">C</span>
          </div>
          <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
            Civa Pitch Deck
          </span>
        </div>
        <div className="font-mono text-xs text-gray-600">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-900">
        <div
          className="h-full bg-linear-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div
        className={`min-h-screen flex items-center justify-center px-8 py-20 transition-all duration-300 ${
          isAnimating
            ? direction === "next"
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
            : "opacity-100 translate-x-0"
        }`}
      >
        <div className="w-full max-w-5xl">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gray-700/50 bg-gray-800/30 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black tracking-wide text-white mb-3">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="font-mono text-lg md:text-xl text-gray-400 mb-8">{slide.subtitle}</p>
          )}

          {/* Body text */}
          {slide.body && (
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed mb-8">
              {slide.body}
            </p>
          )}

          {/* Footer */}
          {"footer" in slide && slide.footer && (
            <p className="font-mono text-sm text-gray-500 mt-6">{slide.footer}</p>
          )}

          {/* Bullets */}
          {"bullets" in slide && slide.bullets && (
            <div className="space-y-4 mb-8">
              {slide.bullets.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-800/50 backdrop-blur-sm"
                >
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-gray-300 text-lg">{b.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Stat */}
          {"stat" in slide && slide.stat && (
            <div className="mt-8 p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="font-orbitron text-4xl font-bold text-red-400 mb-2">
                {slide.stat.value}
              </div>
              <div className="font-mono text-sm text-gray-400">{slide.stat.label}</div>
            </div>
          )}

          {/* Steps */}
          {"steps" in slide && slide.steps && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {slide.steps.map((s, i) => {
                const colorMap: Record<string, string> = {
                  cyan: "border-cyan-500/30 text-cyan-400",
                  purple: "border-purple-500/30 text-purple-400",
                  green: "border-green-500/30 text-green-400",
                };
                return (
                  <div
                    key={i}
                    className={`p-6 rounded-xl bg-gray-800/20 border ${colorMap[s.color] || colorMap.cyan} backdrop-blur-sm`}
                  >
                    <div className="font-orbitron text-xs tracking-[0.3em] text-gray-500 mb-2">
                      STEP {s.num}
                    </div>
                    <div className={`font-orbitron text-xl font-bold mb-2 ${colorMap[s.color]?.split(" ")[1]}`}>
                      {s.title}
                    </div>
                    <p className="text-gray-400 text-sm">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Flow */}
          {"flow" in slide && slide.flow && (
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {slide.flow.map((f, i) => (
                <React.Fragment key={i}>
                  <div className="shrink-0 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 text-center min-w-[130px]">
                    <div className="text-2xl mb-1">{f.icon}</div>
                    <div className="font-mono text-xs font-bold text-cyan-400">{f.label}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{f.detail}</div>
                  </div>
                  {i < slide.flow.length - 1 && (
                    <div className="text-gray-600 text-lg">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Threats table */}
          {"threats" in slide && slide.threats && (
            <div className="mt-4 space-y-3">
              {slide.threats.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-800/50"
                >
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                      t.severity === "critical"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {t.severity}
                  </span>
                  <div className="flex-1">
                    <span className="text-white font-medium">{t.threat}</span>
                    <span className="text-gray-500 mx-2">→</span>
                    <span className="text-gray-400">{t.mitigation}</span>
                  </div>
                </div>
              ))}
              {"bottomLine" in slide && slide.bottomLine && (
                <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-amber-400 font-mono text-sm">{slide.bottomLine}</p>
                </div>
              )}
            </div>
          )}

          {/* Stack */}
          {"stack" in slide && slide.stack && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {slide.stack.map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                      {s.layer}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{s.tech}</p>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          {"features" in slide && slide.features && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {slide.features.map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-gray-800/20 border border-green-500/20 backdrop-blur-sm"
                >
                  <div className="font-mono text-sm font-bold text-green-400 mb-1">{f.name}</div>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {"links" in slide && slide.links && (
            <div className="flex flex-wrap gap-4 mt-8">
              {slide.links.map((l, i) => (
                <a
                  key={i}
                  href={`https://${l.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-sm text-cyan-400 hover:bg-cyan-500/20 transition-all"
                >
                  {l.label} →
                </a>
              ))}
            </div>
          )}

          {/* Signoff */}
          {"signoff" in slide && slide.signoff && (
            <p className="font-mono text-sm text-gray-500 mt-12">{slide.signoff}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          onClick={prev}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 font-mono text-xs text-gray-400 hover:text-white hover:border-gray-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          ← Prev
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-cyan-400 w-6"
                  : "bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 font-mono text-xs text-gray-400 hover:text-white hover:border-gray-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          Next →
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-4 right-8 z-50 font-mono text-[10px] text-gray-600">
        ← → or Space to navigate
      </div>
    </div>
  );
}
