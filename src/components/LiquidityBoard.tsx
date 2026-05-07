import React from 'react';

export function LiquidityBoard() {
  const orders = [
    { id: 'ORD-001', asset: 'SOL', band: '$1M - $5M', type: 'SELL', expiry: '+4h', status: 'ACTIVE' },
    { id: 'ORD-002', asset: 'USDC', band: '$5M+', type: 'SELL', expiry: '+24h', status: 'ACTIVE' },
    { id: 'ORD-003', asset: 'SOL', band: '$100K - $1M', type: 'BUY', expiry: '+1h', status: 'ACTIVE' },
  ];

  return (
    <div className="border border-gray-800 bg-[#0a0a0a] rounded-lg p-6 shadow-xl">
      <h3 className="font-orbitron tracking-wider text-lg text-gray-300 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        DARK POOL LIQUIDITY
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm text-left">
          <thead className="text-gray-500 text-xs uppercase border-b border-gray-800">
            <tr>
              <th className="pb-3 font-normal">Order ID</th>
              <th className="pb-3 font-normal">Type</th>
              <th className="pb-3 font-normal">Asset</th>
              <th className="pb-3 font-normal">Visible Band (ZKP)</th>
              <th className="pb-3 font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-300">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-900/50 transition-colors group cursor-pointer">
                <td className="py-4 font-bold text-gray-400 group-hover:text-cyan-400">{order.id}</td>
                <td className={`py-4 ${order.type === 'SELL' ? 'text-red-400' : 'text-green-400'}`}>{order.type}</td>
                <td className="py-4">{order.asset}</td>
                <td className="py-4">{order.band}</td>
                <td className="py-4 text-right">
                  <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs border border-gray-700">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
