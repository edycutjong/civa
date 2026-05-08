import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-800/50 bg-black/30 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-orbitron text-cyan-400 font-bold tracking-wider">
            CIVA
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-500 font-mono text-xs">
            CipherVault Protocol
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-gray-500">
          <Link
            href="/about"
            className="hover:text-cyan-400 transition-colors"
          >
            About
          </Link>
          <a
            href="https://github.com/edycutjong/frontier-adevar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/edycutjong"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            @edycutjong
          </a>
        </div>

        <div className="text-[10px] font-mono text-gray-600 tracking-wider uppercase">
          Built for Colosseum Frontier 2026
        </div>
      </div>
    </footer>
  );
}
