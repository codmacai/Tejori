import type { StaticImageData } from "next/image";
import oilImg from "@/public/images/cut-oil.png";
import shampooImg from "@/public/images/cut-shampoo.png";
import comboImg from "@/public/images/cut-combo.png";
import oilLifestyle from "@/public/images/oil-lifestyle.jpg";
import shampooLifestyle from "@/public/images/shampoo-lifestyle.jpg";
import comboLifestyle from "@/public/images/hero-combo.jpg";
import duoImg from "@/public/images/duo-packshot.jpg";
import ugcImg from "@/public/images/ugc-1.jpg";

export type Concern = "Hair growth" | "Anti dandruff" | "Dry hair";
export type IconKey = "leaf" | "roots" | "shine" | "shield" | "hair" | "drop" | "tag";

export type GalleryImage = {
  src: StaticImageData;
  alt: string;
  /** contain = packshot on the card colour, cover = full-bleed photo */
  fit: "contain" | "cover";
  focus?: string;
};

export type ProductDetails = {
  gallery: GalleryImage[];
  why: { icon: IconKey; title: string; copy: string }[];
  howTo: { title: string; copy: string }[];
  /** Hero ingredients. Replace/extend with the full list from the pack. */
  ingredients: { name: string; latin?: string; copy: string }[];
  /** How this product is described inside the "pair it with" card */
  pair: { role: string; summary: string; points: string[] };
  /** Product shown next to this one in the pairing section */
  pairWith?: string;
};

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
  /** Background used behind product cut-outs */
  tint: string;
  description: string;
  benefits: string[];
  concerns: Concern[];
  details: ProductDetails;
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
    tint: "#dce0c5",
    description:
      "A traditional Neelayamari and coconut hair oil that nourishes from the roots for stronger, shinier hair.",
    benefits: ["100% natural ingredients", "Nourishes hair roots", "Stronger & shinier hair", "For all hair types"],
    concerns: ["Hair growth", "Dry hair"],
    details: {
      gallery: [
        { src: oilImg, alt: "Tejori Neelayamari Hair Oil, 200 ml", fit: "contain" },
        { src: oilLifestyle, alt: "Neelayamari Hair Oil with coconut and leaves", fit: "cover", focus: "30% 50%" },
        { src: duoImg, alt: "Hair Oil with the Anti-Dandruff Shampoo", fit: "contain" },
      ],
      why: [
        { icon: "roots", title: "Nourishes from the root", copy: "Massaged into the scalp, it feeds the roots so hair feels stronger wash after wash." },
        { icon: "leaf", title: "100% natural ingredients", copy: "Neelayamari and coconut — the way Kerala has cared for hair for generations." },
        { icon: "shine", title: "Stronger, shinier hair", copy: "Softens the lengths and brings back natural shine." },
        { icon: "hair", title: "For all hair types", copy: "Straight, wavy or curly — gentle enough for regular use." },
      ],
      howTo: [
        { title: "Apply", copy: "Part your hair and apply the oil directly to the scalp with the comb applicator." },
        { title: "Massage", copy: "Massage gently with your fingertips for 3–5 minutes to work it through the roots." },
        { title: "Leave & wash", copy: "Leave on for at least an hour, or overnight, then wash with the Anti-Dandruff Shampoo." },
      ],
      ingredients: [
        { name: "Neelayamari", latin: "Indigofera tinctoria", copy: "A herb used in traditional Kerala hair oils to nourish the scalp and roots." },
        { name: "Coconut oil", latin: "Cocos nucifera", copy: "A classic base oil that conditions hair and helps lock in moisture." },
      ],
      pair: {
        role: "The Oil",
        summary: "Feeds the scalp and helps roots feel stronger.",
        points: ["Nourishes hair roots", "Stronger & shinier hair", "100% natural ingredients"],
      },
      pairWith: "neelayamari-anti-dandruff-shampoo",
    },
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
    tint: "#dce0c5",
    description:
      "A gentle everyday cleanser that clears flakes while it strengthens roots and nourishes every lock.",
    benefits: ["Removes dandruff", "Strengthens hair roots", "Nourishes hair locks", "100% organic"],
    concerns: ["Anti dandruff"],
    details: {
      gallery: [
        { src: shampooImg, alt: "Tejori Neelayamari Anti-Dandruff Shampoo, 200 ml", fit: "contain" },
        { src: shampooLifestyle, alt: "Anti-Dandruff Shampoo among leaves", fit: "cover" },
        { src: ugcImg, alt: "Customer holding the shampoo and hair oil", fit: "cover" },
      ],
      why: [
        { icon: "shield", title: "Removes dandruff", copy: "Clears away flakes for a scalp that looks and feels clean." },
        { icon: "roots", title: "Strengthens hair roots", copy: "Cleanses without stripping, so roots stay cared for." },
        { icon: "hair", title: "Nourishes hair locks", copy: "Leaves the lengths soft and manageable after every wash." },
        { icon: "leaf", title: "100% organic", copy: "Made with Neelayamari for a gentle, natural clean." },
      ],
      howTo: [
        { title: "Wet", copy: "Wet your hair thoroughly with lukewarm water." },
        { title: "Lather", copy: "Work a small amount into the scalp and massage for 2–3 minutes." },
        { title: "Rinse", copy: "Rinse well. For best results, use after the Neelayamari Hair Oil." },
      ],
      ingredients: [
        { name: "Neelayamari", latin: "Indigofera tinctoria", copy: "The heart of the Tejori range — traditionally used to care for the scalp and roots." },
      ],
      pair: {
        role: "The Shampoo",
        summary: "Cleanses the scalp and clears away flakes.",
        points: ["Removes dandruff", "Strengthens hair roots", "Nourishes hair locks"],
      },
      pairWith: "neelayamari-hair-oil",
    },
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
    tint: "#dce0c5",
    description:
      "The complete Neelayamari ritual — oil to nourish, shampoo to cleanse. Everything your scalp needs, together.",
    benefits: ["Oil + shampoo ritual", "Removes dandruff", "Nourishes hair roots", "For all hair types"],
    concerns: ["Anti dandruff", "Hair growth", "Dry hair"],
    details: {
      gallery: [
        { src: comboImg, alt: "Tejori Anti-Dandruff Combo — hair oil and shampoo", fit: "contain" },
        { src: comboLifestyle, alt: "Shampoo and hair oil in soft morning light", fit: "cover", focus: "60% 60%" },
        { src: ugcImg, alt: "Customer holding the combo", fit: "cover" },
      ],
      why: [
        { icon: "drop", title: "The complete ritual", copy: "Oil to nourish, shampoo to cleanse — designed to work together." },
        { icon: "shield", title: "Removes dandruff", copy: "Clears flakes for a clean, calm scalp." },
        { icon: "roots", title: "Nourishes hair roots", copy: "Feeds the scalp for stronger-feeling hair." },
        { icon: "tag", title: "Better value", copy: "Save Rs. 199 compared with buying both separately." },
      ],
      howTo: [
        { title: "Oil", copy: "Massage the Hair Oil into your scalp. Leave on for an hour, or overnight." },
        { title: "Wash", copy: "Wash with the Anti-Dandruff Shampoo, massaging the scalp before rinsing." },
        { title: "Repeat", copy: "Follow the ritual two to three times a week." },
      ],
      ingredients: [
        { name: "Neelayamari", latin: "Indigofera tinctoria", copy: "Found in both the oil and the shampoo — traditionally used to care for scalp and roots." },
        { name: "Coconut oil", latin: "Cocos nucifera", copy: "The conditioning base of the hair oil." },
      ],
      pair: { role: "The Combo", summary: "", points: [] },
    },
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const COMBO_ID = "anti-dandruff-combo";

export const savePct = (p: Pick<Product, "price" | "compareAt">) =>
  p.compareAt ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : 0;

/** Matches the store's "Rs. 499.00" format */
export const formatPrice = (n: number) =>
  `Rs. ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Set to null to hide the free-shipping progress bar in the bag. Confirm with your store policy. */
export const FREE_SHIPPING_AT: number | null = 999;
