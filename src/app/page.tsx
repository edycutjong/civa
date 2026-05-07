import { ComparisonSplitScreen } from "@/components/ComparisonSplitScreen";
import { OrderCreator } from "@/components/OrderCreator";
import { LiquidityBoard } from "@/components/LiquidityBoard";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="font-orbitron text-3xl font-bold tracking-widest text-white flex items-center gap-3">
            <span className="text-cyan-500">CIVA</span>
            <span className="text-gray-600 font-light">|</span>
            <span className="text-lg text-gray-400 font-sans tracking-normal">CipherVault</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-mono uppercase">Institutional OTC Dark Pool on Solana</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            DEVNET CONNECTED
          </div>
          <button className="bg-white text-black font-bold uppercase tracking-wider px-6 py-2 rounded hover:bg-gray-200 transition-colors text-sm">
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
              Powered by Encrypt & Ika
            </span>
          </div>
        </div>
        <ComparisonSplitScreen />
      </section>
    </main>
  );
}
