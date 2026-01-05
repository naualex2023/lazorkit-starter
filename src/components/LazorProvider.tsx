'use client';

import { LazorkitProvider } from '@lazorkit/wallet';
import { ReactNode } from 'react';

export default function LazorProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl={process.env.NEXT_PUBLIC_RPC_URL!}
      portalUrl={process.env.NEXT_PUBLIC_PORTAL_URL!}
      paymasterConfig={{
        paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL,
        // Здесь можно добавить настройки для токенов (например, USDC), если нужно
      }}
    >
      {children}
    </LazorkitProvider>
  );
}