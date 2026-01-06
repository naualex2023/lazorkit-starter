# Lazorkit Next.js Starter

A production-ready starter template for building Passkey-native Solana apps using [Lazorkit SDK](https://docs.lazorkit.com/). This project demonstrates authentication and gasless transactions.

## 📺 Live Demo Video

> "Eliminating the friction from Web3 onboarding through biometrics and sponsored transactions."

### [**Watch the Demo on Vimeo →**](https://vimeo.com/1151937616?share=copy)
---
### 🔍 Key Highlights of the Demo:

* **Instant Onboarding**: Creating a non-custodial Solana Smart Wallet in under 2 seconds using native device biometrics—no seed phrases, no extensions.
* **WebAuthn Sync**: Demonstrating a secure cross-device login by scanning a QR code on Desktop to authorize via a Smartphone's secure enclave.
* **Zero-Fee UX**: Executing a live transaction on the Solana Devnet where the network fee is fully sponsored by the **LazorKit Paymaster**, requiring zero SOL from the user.
---
## 🚀 Live Experience

Experience the seamless onboarding flow live on Vercel:

### 🔗 [**Launch App: lazorkit-starter-six.vercel.app**](https://lazorkit-starter-six.vercel.app/)

---

### 💡 Tester's Guide

To fully appreciate the Smart Wallet capabilities, we recommend the following flow:

1.  **Mobile First**: Open the link on your smartphone to create a wallet using FaceID or TouchID. It’s the fastest way to experience "Seedless" onboarding.
2.  **Desktop Sync**: Open the link on your PC and use the **Sign In** feature. Scan the QR code with your phone to see the cross-device Passkey authentication in action.
3.  **Gasless Execution**: Once logged in, click **"Execute Gasless TX"**. Even if your new wallet has 0 SOL, the transaction will succeed thanks to our integrated Paymaster sponsorship.

> **Note for Linux Users**: If testing on a desktop environment without configured biometrics, please enable the **Virtual Authenticator** in Chrome DevTools (`F12` -> `More tools` -> `WebAuthn`) to simulate the Passkey flow.

### 🛠️ Built With
* **Framework**: Next.js 15+ (Turbopack)
* **Auth**: WebAuthn / Passkeys (Secp256r1)
* **Infrastructure**: LazorKit SDK & Paymaster
* **Network**: Solana Devnet

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
NEXT_PUBLIC_PORTAL_URL=[https://portal.lazor.sh](https://portal.lazor.sh)
NEXT_PUBLIC_PAYMASTER_URL=[https://kora.devnet.lazorkit.com](https://kora.devnet.lazorkit.com)
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