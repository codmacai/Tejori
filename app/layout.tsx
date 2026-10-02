import type { Metadata, Viewport } from "next";
import { Inter_Tight, Manrope } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Used only for the wordmark
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
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${interTight.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
