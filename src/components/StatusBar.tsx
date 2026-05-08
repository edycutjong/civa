import React from "react";

export function StatusBar() {
  return (
    <div className="w-full border-b border-gray-800/50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Devnet Live
          </span>
          <span className="hidden md:inline text-gray-700">|</span>
          <span className="hidden md:inline">
            Solana • Encrypt • Ika • Adevar
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Next.js 16 • React 19 • Tailwind v4</span>
        </div>
      </div>
    </div>
  );
}
