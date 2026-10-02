import type { Metadata, Viewport } from "next";
import { Inter_Tight, Outfit } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

// UI + headings — soft geometric sans
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Wordmark only — matches the Tejori logo
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejori — Neelayamari Hair Care",
  description:
    "Tejori Neelayamari hair oil and anti-dandruff shampoo. Natural, Ayurveda-inspired hair care for stronger roots and a flake-free scalp.",
  openGraph: {
    title: "Tejori — Neelayamari Hair Care",
    description: "Natural Neelayamari hair oil and anti-dandruff shampoo for all hair types.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${interTight.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
