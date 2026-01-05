'use client';

import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

export default function GaslessTx() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState('');

  const handleGaslessTransfer = async () => {
    if (!smartWalletPubkey) return;
    setLoading(true);
    setTxSig('');

    try {
      // 1. Создаем инструкцию (например, перевод 0.01 SOL самому себе)
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: smartWalletPubkey, // Отправляем самому себе для теста
        lamports: 0.01 * LAMPORTS_PER_SOL,
      });

      // 2. Отправляем через Lazorkit
      // SDK автоматически использует Paymaster, указанный в Provider
      const signature = await signAndSendTransaction({
        instructions: [instruction],
        // Опционально: настройки транзакции
        // transactionOptions: { feeToken: 'USDC' } 
      });

      setTxSig(signature);
      console.log('Gasless Tx Success:', signature);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. See console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">⚡ Gasless Transaction</h3>
      <p className="text-sm text-slate-400 mb-6">
        This transaction is sponsored. You won't pay any SOL for gas.
      </p>
      
      <button
        onClick={handleGaslessTransfer}
        disabled={loading}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg font-semibold transition flex justify-center items-center gap-2"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Send 0.01 SOL (Free Gas)'
        )}
      </button>

      {txSig && (
        <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded text-center">
          <p className="text-xs text-green-400">Success! View on Explorer:</p>
          <a
            href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline break-all"
          >
            {txSig}
          </a>
        </div>
      )}
    </div>
  );
}