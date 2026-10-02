import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejori — Hair, kept like treasure",
  description:
    "Clinically tested haircare built on India's most treasured botanicals. Shop serums, shampoos, scalp elixirs and masks for hair fall, frizz, dandruff and damage.",
  openGraph: {
    title: "Tejori — Hair, kept like treasure",
    description:
      "Ayurvedic botanicals, decoded by modern hair science. Visible results in 8 weeks.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2e4345",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${instrument.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
