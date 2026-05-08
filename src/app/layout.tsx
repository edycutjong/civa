import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Civa — Encrypted OTC Dark Pool on Solana",
  description:
    "Institutional-grade encrypted OTC dark pool protocol. Zero MEV, hidden identity, atomic settlement via Encrypt SDK and Ika Custody. Audited by Adevar.",
  keywords: [
    "OTC",
    "dark pool",
    "Solana",
    "DeFi",
    "privacy",
    "encrypted trading",
    "institutional crypto",
    "MEV protection",
  ],
  authors: [{ name: "Edy Cu", url: "https://x.com/edycutjong" }],
  openGraph: {
    title: "Civa — Encrypted OTC Dark Pool on Solana",
    description:
      "Zero MEV. Hidden Identity. Atomic Settlement. The encrypted OTC protocol for institutional crypto trading.",
    images: ["/docs/assets/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civa — Encrypted OTC Dark Pool",
    description: "Institutional-grade privacy for crypto trading on Solana.",
    images: ["/docs/assets/og-image.png"],
    creator: "@edycutjong",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} dark antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-screen bg-[#020617] text-gray-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
