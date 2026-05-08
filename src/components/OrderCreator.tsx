"use client";
import React, { useState } from 'react';
import { adevarService } from '@/lib/adevar';

export function OrderCreator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState("ENCRYPT & SUBMIT");
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatusText("GENERATING ZK PROOF...");
    const orderId = await adevarService.submitEncryptedOrder("SOL", "12,000", "$1M - $5M");
    setStatusText(`SUBMITTED: ${orderId}`);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusText("ENCRYPT & SUBMIT");
    }, 3000);
  };
  return (
    <div className="border border-gray-800 bg-[#0a0a0a] rounded-lg p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <h3 className="font-orbitron tracking-wider text-lg text-cyan-400 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        NEW OTC OFFER
      </h3>
      
      <div className="space-y-4 font-mono text-sm">
        <div>
          <label className="block text-gray-500 text-xs uppercase mb-1">Asset</label>
          <div className="flex bg-gray-900 border border-gray-800 rounded">
            <span className="p-3 text-gray-400 border-r border-gray-800">SELL</span>
            <input type="text" className="bg-transparent w-full p-3 text-white outline-none" defaultValue="SOL" />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-500 text-xs uppercase mb-1">Amount (Encrypted on-chain)</label>
          <input type="text" className="bg-gray-900 border border-gray-800 rounded w-full p-3 text-white outline-none focus:border-cyan-500 transition-colors" defaultValue="12,000" />
        </div>
        
        <div>
          <label className="block text-gray-500 text-xs uppercase mb-1">Visible Liquidity Band (ZKP)</label>
          <select className="bg-gray-900 border border-gray-800 rounded w-full p-3 text-white outline-none appearance-none" defaultValue="$1M - $5M">
            <option>$100K - $1M</option>
            <option>$1M - $5M</option>
            <option>$5M - $10M</option>
            <option>$10M+</option>
          </select>
        </div>
        
        <div className="pt-4">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 p-3 rounded tracking-widest uppercase font-bold transition-all relative overflow-hidden group disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            {statusText}
          </button>
        </div>
      </div>
    </div>
  );
}
