<div align="center">
  <img src="docs/assets/readme-hero.png" alt="Civa (CipherVault) Hero" width="100%">
  
  <p><em>Encrypted OTC Dark Pool for Institutional Crypto Trading</em></p>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://adevar.vercel.app)
  [![Pitch Video](https://img.shields.io/badge/Pitch-Video-red.svg)](https://youtube.com/your-video)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/edycutjong/frontier-adevar)
</div>

---

## 📸 See it in Action
*(Demo GIF and UI screenshots can be found in the `docs/assets` directory)*

<div align="center">
  <img src="docs/assets/og-image.png" alt="App Demo" width="800">
</div>

## 💡 The Problem & Solution
A DeFi fund manager watches $80,000 evaporate in a single quarter — not from bad trades, but from MEV bots that front-run every large swap within 400ms.

**Civa (CipherVault)** solves this by providing: 
Encrypted OTC dark pool on Solana. Hide trade amounts + identity using Encrypt. Settle atomically via Ika custody. Zero MEV. Institutional grade.

**Key Features:**
- ⚡ **High Performance:** Seamless integration and optimized workflows.
- 🔒 **Secure by Design:** Verifiable on-chain actions and robust data protection.
- 🎨 **Intuitive UX:** Beautiful, user-centric interface built for scale.

## 🏗️ Architecture & Tech Stack
We built the frontend using **Next.js 16** and **Tailwind CSS v4**.

*(Check the architecture directory for detailed system diagrams)*
See the [Architecture Document](docs/ARCHITECTURE.md) and [Product Requirements Document](docs/PRD.md) for full system specifications.

## 🏆 Sponsor Tracks Targeted
* **Sponsor Integration**: Encrypt & Ika — Bridgeless + Encrypted Capital Markets ($15,000)
* **Sponsor Integration**: Adevar Labs — Security Audit Credits ($50,000)
* **Sponsor Integration**: 100xDevs — General Track ($10,000)

## 🚀 Run it Locally (For Judges)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/edycutjong/frontier-adevar.git
   cd frontier-adevar
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:** 
   Rename `.env.example` to `.env.local` and add your keys.
4. **Run the app:**
   ```bash
   npm run dev
   ```

> **Note for Judges:** 
> Detailed submission materials, demo scripts, and sponsor defenses are located in the `docs/` directory.
> Read `docs/SUBMISSION.md` for the complete pitch and `docs/SPONSOR_DEFENSE.md` for technical implementation details.
