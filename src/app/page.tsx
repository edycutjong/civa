import { HeroSection } from "@/components/HeroSection";
import { ComparisonSplitScreen } from "@/components/ComparisonSplitScreen";
import { OrderCreator } from "@/components/OrderCreator";
import { LiquidityBoard } from "@/components/LiquidityBoard";
import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StatusBar />

      {/* Hero — Wow Factor Landing */}
      <HeroSection />

      {/* Dashboard Section */}
      <main
        id="dashboard"
        className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto"
      >
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
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
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <OrderCreator />
          </div>
          <div className="lg:col-span-2">
            <LiquidityBoard />
          </div>
        </div>

        <section className="pt-8 space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-orbitron text-xl text-white">THE PRIVACY GAP</h2>
            <div className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
              <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded">
                Adevar Audited
              </span>
              <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                Powered by Encrypt &amp; Ika
              </span>
            </div>
          </div>
          <ComparisonSplitScreen />
        </section>

        {/* Architecture Overview */}
        <section className="pt-8 space-y-6 pb-16">
          <h2 className="font-orbitron text-xl text-white">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Encrypt Order",
                desc: "Maker deposits SOL/USDC. Trade params encrypted via Encrypt SDK.",
                color: "cyan",
              },
              {
                step: "02",
                title: "Blind Match",
                desc: "Taker submits encrypted intent. On-chain compatibility check.",
                color: "purple",
              },
              {
                step: "03",
                title: "Atomic Settle",
                desc: "Ika custody executes simultaneous asset swap. Zero custodial risk.",
                color: "green",
              },
              {
                step: "04",
                title: "Private Close",
                desc: "Settlement reveals only net transfer. Identity and size hidden.",
                color: "cyan",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-card rounded-xl p-5 relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${
                    item.color === "cyan"
                      ? "from-cyan-500/50 to-cyan-500/0"
                      : item.color === "purple"
                      ? "from-purple-500/50 to-purple-500/0"
                      : "from-green-500/50 to-green-500/0"
                  }`}
                />
                <div
                  className={`font-orbitron text-3xl font-black mb-3 ${
                    item.color === "cyan"
                      ? "text-cyan-500/20"
                      : item.color === "purple"
                      ? "text-purple-500/20"
                      : "text-green-500/20"
                  } group-hover:${
                    item.color === "cyan"
                      ? "text-cyan-500/40"
                      : item.color === "purple"
                      ? "text-purple-500/40"
                      : "text-green-500/40"
                  } transition-colors`}
                >
                  {item.step}
                </div>
                <h3 className="font-orbitron text-sm font-bold text-white tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
