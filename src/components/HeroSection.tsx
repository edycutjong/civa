"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ===== Animated Counter ===== */
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, value]);

  return (
    <div className="text-center">
      <div className="font-orbitron text-3xl md:text-4xl font-bold text-white">
        {display.toLocaleString()}
        <span className="text-cyan-400">{suffix}</span>
      </div>
      <div className="text-xs font-mono text-gray-500 uppercase mt-1 tracking-wider">
        {label}
      </div>
    </div>
  );
}

/* ===== Particle Canvas ===== */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const createParticles = () => {
      const count = Math.min(80, Math.floor(canvas.offsetWidth / 15));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ===== Orbital Ring ===== */
function OrbitalRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] relative animate-orbital opacity-[0.07]">
        <div className="absolute inset-0 rounded-full border border-cyan-400/30" />
        <div className="absolute inset-8 rounded-full border border-purple-400/20" />
        <div className="absolute inset-16 rounded-full border border-cyan-400/10" />
        {/* Orbital dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-green-400" />
      </div>
    </div>
  );
}

/* ===== Main Hero ===== */
export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-gradient">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid animate-grid-pulse" />
      <ParticleField />
      <OrbitalRing />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-px bg-linear-to-r from-transparent via-cyan-400/20 to-transparent animate-scanline" />
      </div>

      {/* Floating mesh blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cyan-500/10 animate-mesh-1 animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-500/8 animate-mesh-2 animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-green-500/5 animate-mesh-3" />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-2xl bg-cyan-400/20 rounded-full scale-150" />
            <Image
              src="/icon.svg"
              alt="Civa"
              width={80}
              height={80}
              className="relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-700 delay-200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-widest text-white mb-2">
            CIVA
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-cyan-400/50" />
            <span className="font-mono text-sm text-gray-400 tracking-[0.3em] uppercase">
              CipherVault Protocol
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-cyan-400/50" />
          </div>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-700 delay-500 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-3 leading-relaxed">
            Encrypted OTC Dark Pool for{" "}
            <span className="text-cyan-400 font-semibold">Institutional</span>{" "}
            Crypto Trading on{" "}
            <span className="text-purple-400 font-semibold">Solana</span>
          </p>
          <p className="text-sm font-mono text-gray-500 max-w-xl mx-auto">
            Zero MEV. Hidden Identity. Atomic Settlement. Audited by Adevar.
          </p>
        </div>

        {/* Sponsor badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mt-8 mb-10 transition-all duration-700 delay-700 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="glass-card px-4 py-2 rounded-full text-xs font-mono text-cyan-400 animate-float-badge">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block mr-2" />
            Encrypt SDK
          </span>
          <span className="glass-card px-4 py-2 rounded-full text-xs font-mono text-purple-400 animate-float-badge delay-200">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block mr-2" />
            Ika Custody
          </span>
          <span className="glass-card px-4 py-2 rounded-full text-xs font-mono text-green-400 animate-float-badge delay-300">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2" />
            Adevar Audited
          </span>
        </div>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-1000 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#dashboard"
            className="group relative px-8 py-3.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 hover:border-cyan-400 rounded-lg font-orbitron text-sm tracking-widest text-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden"
          >
            <span className="relative z-10">ENTER DARK POOL</span>
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </a>
          <a
            href="/about"
            className="px-8 py-3.5 border border-gray-700 hover:border-gray-500 rounded-lg font-mono text-sm text-gray-400 hover:text-white transition-all duration-300"
          >
            Documentation →
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto mt-16 px-6 transition-all duration-700 delay-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <AnimatedStat
              value={100}
              suffix="B+"
              label="OTC Market Size"
              delay={1200}
            />
            <AnimatedStat
              value={0}
              suffix=""
              label="MEV Extracted"
              delay={1400}
            />
            <AnimatedStat
              value={10}
              suffix="s"
              label="Settlement Time"
              delay={1600}
            />
            <AnimatedStat
              value={100}
              suffix="%"
              label="On-Chain Privacy"
              delay={1800}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
