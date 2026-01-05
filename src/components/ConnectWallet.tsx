'use client';

import { useWallet } from '@lazorkit/wallet';
import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const { connect, disconnect, isConnected, smartWalletPubkey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (isConnected && smartWalletPubkey) {
    return (
      <div className="flex flex-col gap-2 items-center p-6 bg-slate-800 rounded-xl border border-slate-700">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
          🔑
        </div>
        <h2 className="text-xl font-bold text-green-400">Wallet Connected</h2>
        <p className="text-sm text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded">
          {smartWalletPubkey.toBase58()}
          {/* {smartWalletPubkey.toBase58().slice(0, 6)}...
          {smartWalletPubkey.toBase58().slice(-6)} */}
        </p>
        <button
          onClick={disconnect}
          className="mt-4 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center p-10 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
      <h1 className="text-2xl font-bold">Lazorkit Starter</h1>
      <p className="text-slate-400 text-center max-w-xs">
        Login securely with your biometrics. No seed phrases required.
      </p>
      <button
        onClick={() => connect()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition shadow-blue-500/20 shadow-lg"
      >
        Login with Passkey
      </button>
    </div>
  );
}