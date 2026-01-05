'use client';

import { useWallet } from '@lazorkit/wallet';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { useState, useEffect, useCallback } from 'react';

export default function GaslessTx() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState('');

  // Создаем подключение к RPC
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!, 'confirmed');

  // Функция для обновления баланса
  const refreshBalance = useCallback(async () => {
    if (smartWalletPubkey) {
      const bal = await connection.getBalance(smartWalletPubkey);
      setBalance(bal / LAMPORTS_PER_SOL);
    }
  }, [smartWalletPubkey]);

  useEffect(() => {
    refreshBalance();
    // Обновляем баланс каждые 10 секунд
    const interval = setInterval(refreshBalance, 10000);
    return () => clearInterval(interval);
  }, [refreshBalance]);

  // Функция для запроса Airdrop (чтобы было что отправлять)
  const requestAirdrop = async () => {
    if (!smartWalletPubkey) return;
    setLoading(true);
    try {
      const signature = await connection.requestAirdrop(smartWalletPubkey, LAMPORTS_PER_SOL);
      await connection.confirmTransaction(signature);
      await refreshBalance();
      alert("Airdrop successful! 1 SOL received.");
    } catch (error) {
      console.error(error);
      alert("Airdrop failed. Devnet faucet might be busy.");
    } finally {
      setLoading(false);
    }
  };

  const handleGaslessTransfer = async () => {
    if (!smartWalletPubkey || (balance || 0) < 0.01) {
      alert("Not enough balance! Please click Airdrop first.");
      return;
    }
    setLoading(true);
    setTxSig('');

    try {
      // Инструкция: отправка 0.01 SOL самому себе (для теста)
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: smartWalletPubkey,
        lamports: 0.01 * LAMPORTS_PER_SOL,
      });

      // SDK Lazorkit отправит это через Paymaster
      const signature = await signAndSendTransaction({
        instructions: [instruction],
      });

      setTxSig(signature);
      await refreshBalance();
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Your Balance</p>
          <p className="text-2xl font-mono font-bold text-white">
            {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
          </p>
        </div>
        <button 
          onClick={requestAirdrop}
          disabled={loading}
          className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition"
        >
          Get Free SOL
        </button>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGaslessTransfer}
          disabled={loading || balance === 0}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            '🚀 Execute Gasless TX'
          )}
        </button>

        <p className="text-[10px] text-center text-slate-500">
          Fees are covered by Lazorkit Paymaster. You don't need SOL for gas!
        </p>
      </div>

      {txSig && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg animate-pulse">
          <p className="text-xs text-green-400 font-semibold mb-1">Transaction Confirmed!</p>
          <a
            href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-blue-400 hover:underline break-all block font-mono"
          >
            {txSig}
          </a>
        </div>
      )}
    </div>
  );
}