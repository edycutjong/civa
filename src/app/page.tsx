"use client";

import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { ComparisonSplitScreen } from "@/components/ComparisonSplitScreen";
import { OrderCreator } from "@/components/OrderCreator";
import { LiquidityBoard } from "@/components/LiquidityBoard";
import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Shield, Lock, Zap, EyeOff } from "lucide-react";

function FeatureCard({ children, className = "", highlight = "rgba(6,182,212,0.15)" }: { children: React.ReactNode, className?: string, highlight?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${highlight},
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)" }} className="w-full h-full relative">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <StatusBar />

      {/* Hero — Wow Factor Landing */}
      <HeroSection />

      {/* Dashboard Section */}
      <main
        id="dashboard"
        className="min-h-screen p-4 md:p-8 space-y-12 max-w-7xl mx-auto"
      >
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800"
        >
          <div>
            <h2 className="font-orbitron text-2xl font-bold tracking-widest text-white flex items-center gap-3">
              <span className="text-cyan-500">DARK POOL</span>
              <span className="text-gray-600 font-light">|</span>
              <span className="text-lg text-gray-400 font-sans tracking-normal">
                Trading Terminal
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-mono uppercase">
              Encrypted Order Matching • Atomic Settlement
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              DEVNET CONNECTED
            </div>
            <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-bold uppercase tracking-wider px-6 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all text-sm">
              Connect Wallet
            </button>
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-1">
            <OrderCreator />
          </div>
          <div className="lg:col-span-2">
            <LiquidityBoard />
          </div>
        </motion.div>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 space-y-6"
        >
          <div className="flex justify-between items-end">
            <h2 className="font-orbitron text-2xl text-white tracking-wider flex items-center gap-3">
              <Shield className="w-6 h-6 text-cyan-400" />
              THE PRIVACY GAP
            </h2>
            <div className="hidden md:flex text-xs font-mono text-gray-500 uppercase items-center gap-2">
              <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded">
                Adevar Audited
              </span>
              <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                Powered by Encrypt &amp; Ika
              </span>
            </div>
          </div>
          <ComparisonSplitScreen />
        </motion.section>

        {/* Architecture Overview with Tilt and Feature Cards */}
        <section className="pt-16 space-y-8 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="font-orbitron text-2xl text-white tracking-wider">HOW IT WORKS</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <Lock className="w-6 h-6 text-cyan-400" />,
                title: "Encrypt Order",
                desc: "Maker deposits SOL/USDC. Trade params encrypted via Encrypt SDK.",
                color: "cyan",
                highlight: "rgba(6,182,212,0.15)"
              },
              {
                step: "02",
                icon: <EyeOff className="w-6 h-6 text-purple-400" />,
                title: "Blind Match",
                desc: "Taker submits encrypted intent. On-chain compatibility check.",
                color: "purple",
                highlight: "rgba(168,85,247,0.15)"
              },
              {
                step: "03",
                icon: <Zap className="w-6 h-6 text-green-400" />,
                title: "Atomic Settle",
                desc: "Ika custody executes simultaneous asset swap. Zero custodial risk.",
                color: "green",
                highlight: "rgba(34,197,94,0.15)"
              },
              {
                step: "04",
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                title: "Private Close",
                desc: "Settlement reveals only net transfer. Identity and size hidden.",
                color: "cyan",
                highlight: "rgba(6,182,212,0.15)"
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <FeatureCard 
                    className="glass-card rounded-2xl p-6 h-full border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                    highlight={item.highlight}
                  >
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${
                        item.color === "cyan"
                          ? "from-cyan-500/50 to-cyan-500/0"
                          : item.color === "purple"
                          ? "from-purple-500/50 to-purple-500/0"
                          : "from-green-500/50 to-green-500/0"
                      }`}
                    />
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                        {item.icon}
                      </div>
                      <div
                        className={`font-orbitron text-4xl font-black ${
                          item.color === "cyan"
                            ? "text-cyan-500/20"
                            : item.color === "purple"
                            ? "text-purple-500/20"
                            : "text-green-500/20"
                        }`}
                      >
                        {item.step}
                      </div>
                    </div>

                    <h3 className="font-orbitron text-lg font-bold text-white tracking-wider mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-mono leading-relaxed">
                      {item.desc}
                    </p>
                  </FeatureCard>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
