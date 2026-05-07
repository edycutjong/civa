import React from 'react';

export function ComparisonSplitScreen() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 p-4 font-mono text-sm h-[600px]">
      {/* Solscan Public View */}
      <div className="flex-1 border border-red-500/30 bg-[#0a0a0a] rounded-lg overflow-hidden flex flex-col shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <div className="bg-red-500/10 border-b border-red-500/30 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-400 font-bold tracking-wider text-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            PUBLIC EXPLORER (ARBI/SOLSCAN)
          </div>
          <div className="text-xs text-red-500/50">Tx: 5KjY...9aB2</div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <div className="text-gray-500 text-xs uppercase">Program Invocation</div>
            <div className="text-gray-300">Civa Vault Program (Encrypted)</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500 text-xs uppercase">Instruction</div>
            <div className="text-red-400 blur-[2px] select-none">Execute Settlement</div>
          </div>
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <div className="text-gray-500 text-xs uppercase">Account Changes</div>
            <div className="bg-gray-900 p-3 rounded text-gray-400 break-all font-mono text-xs border border-gray-800">
              [ENCRYPTED_STATE_BLOB]<br/><br/>
              0x8f2a9b4c7d...<br/>
              (64 bytes gibberish)
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <div className="text-gray-500 text-xs uppercase">Visible Band (ZKP)</div>
            <div className="text-gray-300">Liquidity Band: $1M - $5M</div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center text-red-500/30">
            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <span className="text-xs uppercase tracking-widest text-center">Zero-Knowledge<br/>Proof Verified</span>
          </div>
        </div>
      </div>

      {/* Civa Private View */}
      <div className="flex-1 border border-green-500/30 bg-[#0a0a0a] rounded-lg overflow-hidden flex flex-col shadow-[0_0_15px_rgba(34,197,94,0.1)] relative">
        <div className="bg-green-500/10 border-b border-green-500/30 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-400 font-bold tracking-wider text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            CIVA DARK DESK (DECRYPTED)
          </div>
          <div className="text-xs text-green-500/50">Authorized View</div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <div className="text-gray-500 text-xs uppercase">Counterparties</div>
            <div className="flex justify-between items-center text-gray-300 bg-green-500/5 p-2 rounded border border-green-500/20">
              <span className="text-green-400">Maker Alpha (Fund)</span>
              <span className="text-xs text-gray-500">→</span>
              <span className="text-green-400">Taker Delta (Whale)</span>
            </div>
          </div>
          <div className="space-y-1 pt-2">
            <div className="text-gray-500 text-xs uppercase">Exact Order Flow</div>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm border border-green-500/20 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Action:</span>
                <span className="text-white">SELL 12,000 SOL</span>
              </div>
              <div className="flex justify-between">
                <span>Execution Price:</span>
                <span className="text-white">$175.50</span>
              </div>
              <div className="flex justify-between">
                <span>Total Value:</span>
                <span className="text-white">$2,106,000.00 USDC</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <div className="text-gray-500 text-xs uppercase">Settlement Execution</div>
            <div className="text-gray-300">
              Atomic Match via Ika SDK. <span className="text-green-400">0.9ms Latency.</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center justify-center text-green-500/30 relative">
            <div className="absolute inset-0 bg-green-500/5 blur-xl rounded-full"></div>
            <svg className="w-8 h-8 mb-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs uppercase tracking-widest text-center text-green-500 relative z-10">Compliance Payload<br/>Decrypted Locally</span>
          </div>
        </div>
      </div>
    </div>
  );
}
