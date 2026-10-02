import type { StaticImageData } from "next/image";
import oilImg from "@/public/images/cut-oil.png";
import shampooImg from "@/public/images/cut-shampoo.png";
import comboImg from "@/public/images/cut-combo.png";

export type Concern = "Hair growth" | "Anti dandruff" | "Dry hair";

export type Product = {
  id: string;
  name: string;
  short: string;
  /** One-line promise shown on cards */
  tagline: string;
  size: string;
  price: number;
  compareAt?: number;
  badge?: { label: string; tone: "sage" | "ink" };
  image: StaticImageData;
  /** object-position for the card crop */
  focus?: string;
  /** Background used behind small thumbnails */
  tint: string;
  description: string;
  benefits: string[];
  concerns: Concern[];
};

export const products: Product[] = [
  {
    id: "neelayamari-hair-oil",
    name: "Tejori Neelayamari Hair Oil",
    short: "Neelayamari Hair Oil",
    tagline: "Stronger, shinier hair — from the root.",
    size: "200 ml",
    price: 499,
    compareAt: 699,
    badge: { label: "Best seller", tone: "sage" },
    image: oilImg,
    focus: "50% 50%",
    tint: "#dce0c5",
    description:
      "A traditional Neelayamari and coconut hair oil that nourishes from the roots for stronger, shinier hair.",
    benefits: ["100% natural ingredients", "Nourishes hair roots", "Stronger & shinier hair", "For all hair types"],
    concerns: ["Hair growth", "Dry hair"],
  },
  {
    id: "neelayamari-anti-dandruff-shampoo",
    name: "Tejori Neelayamari Anti-Dandruff Shampoo",
    short: "Anti-Dandruff Shampoo",
    tagline: "A clean, calm, flake-free scalp.",
    size: "200 ml",
    price: 599,
    badge: { label: "Best seller", tone: "ink" },
    image: shampooImg,
    focus: "50% 50%",
    tint: "#dce0c5",
    description:
      "A gentle everyday cleanser that clears flakes while it strengthens roots and nourishes every lock.",
    benefits: ["Removes dandruff", "Strengthens hair roots", "Nourishes hair locks", "100% organic"],
    concerns: ["Anti dandruff"],
  },
  {
    id: "anti-dandruff-combo",
    name: "Tejori Anti-Dandruff Combo",
    short: "Anti-Dandruff Combo",
    tagline: "The complete ritual. Better together.",
    size: "Hair Oil + Shampoo",
    price: 899,
    compareAt: 1098,
    badge: { label: "Best value", tone: "sage" },
    image: comboImg,
    focus: "50% 50%",
    tint: "#dce0c5",
    description:
      "The complete Neelayamari ritual — oil to nourish, shampoo to cleanse. Everything your scalp needs, together.",
    benefits: ["Oil + shampoo ritual", "Removes dandruff", "Nourishes hair roots", "For all hair types"],
    concerns: ["Anti dandruff", "Hair growth", "Dry hair"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const savePct = (p: Pick<Product, "price" | "compareAt">) =>
  p.compareAt ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : 0;

/** Matches the store's "Rs. 499.00" format */
export const formatPrice = (n: number) =>
  `Rs. ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Set to null to hide the free-shipping progress bar in the bag. Confirm with your store policy. */
export const FREE_SHIPPING_AT: number | null = 999;
