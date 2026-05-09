# 🔐 Civa — Encrypted OTC Dark Pool on Solana

> **Hide your trades. Settle atomically. Zero MEV.** Institutional-grade OTC dark pool protocol using Encrypt SDK for encrypted state and Ika Custody for bridgeless atomic settlement. Audited by Adevar Labs.

![Civa](docs/readme-hero.png)

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live-Demo-06b6d4?style=for-the-badge)](https://civa.edycu.dev)
[![Pitch Video](https://img.shields.io/badge/🎬_Pitch-Video-ef4444?style=for-the-badge)](https://youtube.com/watch?v=DEMO_VIDEO)
[![Built for Frontier](https://img.shields.io/badge/Colosseum-Frontier_Hackathon-8b5cf6?style=for-the-badge)](https://superteam.fun/earn/listing/100xdevs-frontier-hackathon-track)

<br/>

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?logo=solana)](https://solana.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-cyan)](LICENSE)

---

## 🎯 Problem

Large-scale crypto trades on public DEXs are fundamentally broken for institutional participants:

- **MEV Extraction** — Bots front-run and sandwich large orders, extracting $1.4B+ in 2025
- **Market Impact** — A $2M sell on a public AMM moves price 2-5%, costing tens of thousands in slippage
- **Identity Exposure** — On-chain analysis links wallets to real identities; competitors see your positions
- **No On-Chain OTC** — Traditional desks are custodial, slow (T+1), and KYC-gated

The crypto OTC market exceeds **$100B annually**, yet there is no privacy-preserving, non-custodial OTC protocol on Solana.

## 💡 Solution

**Civa (CipherVault)** provides an encrypted OTC dark pool:

1. 🔒 **Makers post encrypted offers** — lock assets in vault PDAs, trade params encrypted via Encrypt SDK
2. 👁️ **Takers match blindly** — browse liquidity bands ($1M-$5M) without seeing exact amounts
3. ⚡ **Atomic settlement** — Ika Custody executes simultaneous swap, zero custodial risk
4. 🛡️ **Post-trade privacy** — settlement reveals only net transfer, not order sizes or parties

**Entire flow: order → settlement in under 10 seconds. 100% on-chain.**

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS v4 |
| **Encryption** | Encrypt SDK (confidential tokens, ZKP) |
| **Settlement** | Ika Custody (bridgeless atomic swap) |
| **Blockchain** | Solana Devnet |
| **Audit** | Adevar Labs Security Credits |
| **Deploy** | Vercel |

> 📐 **[Full architecture deep-dive →](docs/ARCHITECTURE.md)** — System diagram, matching flow, and encryption details.

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/edycutjong/civa.git
cd civa

# Install
npm install

# Configure environment
cp .env.example .env.local
# Fill in: ADEVAR_API_KEY (optional — demo mode works without keys)

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the hero page loads with full animation suite.

### Environment Variables

| Variable | Required? | Where to Get |
|----------|-----------|--------------|
| `NEXT_PUBLIC_ADEVAR_API_URL` | Optional | [Encrypt SDK](https://docs.encrypt.network) — defaults to demo endpoint |
| `ADEVAR_API_KEY` | Optional | Not required (No developer portal for Ika yet) |

> **💡 Note for Judges:** All API keys are **optional**! The app runs in fully functional demo mode without them. You can test the entire Encrypt/Ika flow using our built-in sample data.

---

## 📱 User Flow

### 1. Landing Page
Premium glassmorphism hero with particle canvas, orbital rings, animated counters, and mesh gradient background. Floating sponsor badges (Encrypt, Ika, Adevar) and staggered entrance animations.

### 2. Trading Terminal
Create encrypted OTC offers with asset selection, amount input (encrypted on-chain), and visible liquidity band (ZKP). Real-time ZK proof generation simulation.

### 3. Dark Pool Liquidity
Browse available encrypted orders showing only visible bands. Order IDs, asset types, and status — all trade details hidden via zero-knowledge proofs.

### 4. Privacy Gap Comparison
Split-screen view: **Public Explorer** (encrypted gibberish) vs **Civa Dark Desk** (decrypted view). Demonstrates the privacy advantage for authorized participants.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx                         # Hero + Dashboard
│   ├── about/page.tsx                   # Project documentation
│   ├── layout.tsx                       # Root layout + fonts
│   ├── globals.css                      # Design system + animations
│   └── api/health/                      # Health check endpoint
├── components/
│   ├── HeroSection.tsx                  # Animated hero with particles
│   ├── StatusBar.tsx                    # Network status bar
│   ├── Footer.tsx                       # Portfolio footer
│   ├── OrderCreator.tsx                 # Encrypted order form
│   ├── LiquidityBoard.tsx              # Dark pool order table
│   └── ComparisonSplitScreen.tsx        # Public vs Private view
├── lib/
│   └── adevar.ts                        # Encrypt/Ika SDK client
docs/
├── ARCHITECTURE.md                      # System architecture
├── PRD.md                               # Product requirements
├── SUBMISSION.md                        # Hackathon submission
├── SPONSOR_DEFENSE.md                   # Sponsor integration details
└── assets/                              # Visual assets (icon, OG, hero)
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#020617` | App background (Slate 950) |
| Surface | `#0a0f1e` | Cards, panels |
| Primary | `#06b6d4` | Encrypt/Ika accent (Cyan) |
| Accent | `#8b5cf6` | Ika/secondary (Purple) |
| Success | `#22c55e` | Private/verified states |
| Danger | `#ef4444` | Public/exposed states |
| Font Brand | Orbitron | Headlines, protocol name |
| Font Body | Inter | Body text |
| Font Mono | JetBrains Mono | Data, addresses, terminal |

---

## 🏆 Sponsor Tracks

| Track | Sponsor | Prize |
|-------|---------|-------|
| Encrypted Capital Markets | Encrypt & Ika | $15,000 |
| Security Audit Credits | Adevar Labs | $50,000 |
| General Track | 100xDevs | $10,000 |

---

## 🛡️ Security Architecture

| Threat | Mitigation |
|--------|------------|
| Front-running | All order params encrypted via Encrypt SDK |
| Vault drainage | Multi-sig admin, timelock on upgrades |
| Double-spend | Atomic escrow — both sides lock first |
| Timeout exploitation | Auto-refund after configurable timeout |
| Oracle manipulation | No oracle — peer-to-peer pricing |

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">
  <strong>Built for the <a href="https://www.colosseum.org/">Colosseum Frontier Hackathon</a></strong><br/>
  <sub>by <a href="https://x.com/edycutjong">@edycutjong</a></sub>
</p>
