'use client';

import ConnectWallet from '@/components/ConnectWallet';
import GaslessTx from '@/components/GaslessTx';
import { useWallet } from '@lazorkit/wallet';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isConnected } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <ConnectWallet />
      {isConnected && <GaslessTx />}
    </div>
  );
}