# Lazorkit Next.js Starter

A production-ready starter template for building Passkey-native Solana apps using [Lazorkit SDK](https://docs.lazorkit.com/). This project demonstrates authentication and gasless transactions.

## 🚀 Quick Start

### 1. Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd lazorkit-starter
npm install
```

### 2. Configuration

Rename `.env.example` to `.env.local` and add your keys:

```env
NEXT_PUBLIC_RPC_URL=[https://api.devnet.solana.com](https://api.devnet.solana.com)
NEXT_PUBLIC_PORTAL_URL=[https://portal.lazorkit.xyz](https://portal.lazorkit.xyz)
NEXT_PUBLIC_PAYMASTER_URL=[https://paymaster.lazorkit.xyz](https://paymaster.lazorkit.xyz)
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📚 Tutorials

### Tutorial 1: Creating a Passkey Wallet
Lazorkit abstracts away the complexity of key management.

1.  **Wrap your app**: Use `LazorkitProvider` at the root level.
2.  **Connect**: Call the `connect()` function from `useWallet()`.
3.  **Authentication**: The SDK automatically triggers the browser's WebAuthn dialog (FaceID/TouchID).
4.  **Result**: Upon success, `connect()` returns a `WalletAccount` object, and `isConnected` becomes true.

*Code Reference: See `components/ConnectWallet.tsx`*

### Tutorial 2: Triggering a Gasless Transaction
With Lazorkit, you can sponsor user transactions via a Paymaster.

1.  **Config**: Ensure `paymasterConfig` is passed to the `LazorkitProvider`.
2.  **Create Instruction**: Build a standard Solana instruction (e.g., `SystemProgram.transfer`).
3.  **Sign & Send**: Use `signAndSendTransaction({ instructions: [...] })`.
4.  **Magic**: The SDK requests a signature from the user (via Passkey) and then sends the transaction to the Paymaster to cover the fees before broadcasting it to the network.

*Code Reference: See `components/GaslessTx.tsx`*