export type BottleShape = "dropper" | "pump" | "tube" | "jar" | "oil";

export type Concern =
  | "Hair fall"
  | "Frizz"
  | "Dandruff"
  | "Damage"
  | "Thinning"
  | "Dryness";

export type Product = {
  id: string;
  name: string;
  /** Short name printed on the bottle label */
  label: string;
  tagline: string;
  concern: Concern;
  step: { n: string; name: "Prep" | "Cleanse" | "Treat" | "Seal" };
  shape: BottleShape;
  sizes: { label: string; price: number; compareAt?: number }[];
  rating: number;
  reviews: number;
  badge?: string;
  result: { value: string; copy: string };
  heroIngredients: string[];
  /** Colour story for the card stage + bottle */
  palette: {
    stage: string;
    stageDeep: string;
    body: string;
    cap: string;
    label: string;
    text: string;
  };
};

export const products: Product[] = [
  {
    id: "root-revival-serum",
    name: "Bhringraj Root Revival Serum",
    label: "Root Revival",
    tagline: "A weightless daily serum that wakes up dormant follicles.",
    concern: "Hair fall",
    step: { n: "03", name: "Treat" },
    shape: "dropper",
    sizes: [
      { label: "30 ml", price: 1150 },
      { label: "50 ml", price: 1590, compareAt: 1890 },
    ],
    rating: 4.9,
    reviews: 3182,
    badge: "Bestseller",
    result: { value: "−74%", copy: "hair fall in 8 weeks*" },
    heroIngredients: ["Bhringraj", "Redensyl", "Caffeine"],
    palette: {
      stage: "#c9d3c4",
      stageDeep: "#9fb09a",
      body: "#2e4345",
      cap: "#c49a72",
      label: "#f6f2eb",
      text: "#2e4345",
    },
  },
  {
    id: "bond-shampoo",
    name: "Amla & Rice Protein Bond Shampoo",
    label: "Bond Wash",
    tagline: "Sulphate-free lather that rebuilds strength wash after wash.",
    concern: "Damage",
    step: { n: "02", name: "Cleanse" },
    shape: "pump",
    sizes: [
      { label: "250 ml", price: 895 },
      { label: "500 ml", price: 1490, compareAt: 1790 },
    ],
    rating: 4.8,
    reviews: 2410,
    badge: "Editor's pick",
    result: { value: "3.1×", copy: "stronger strands*" },
    heroIngredients: ["Amla", "Rice protein", "Ceramides"],
    palette: {
      stage: "#ece0cd",
      stageDeep: "#d9c6a6",
      body: "#f6f2eb",
      cap: "#2e4345",
      label: "#2e4345",
      text: "#f6f2eb",
    },
  },
  {
    id: "rosemary-elixir",
    name: "Rosemary Scalp Elixir",
    label: "Scalp Elixir",
    tagline: "A pre-wash oil ritual for a denser, healthier-looking crown.",
    concern: "Thinning",
    step: { n: "01", name: "Prep" },
    shape: "oil",
    sizes: [
      { label: "100 ml", price: 1195 },
      { label: "200 ml", price: 1995, compareAt: 2390 },
    ],
    rating: 4.9,
    reviews: 1876,
    badge: "New",
    result: { value: "+38%", copy: "visible density*" },
    heroIngredients: ["Rosemary", "Onion seed", "Brahmi"],
    palette: {
      stage: "#2e4345",
      stageDeep: "#1b2a2c",
      body: "#b8743f",
      cap: "#1b2a2c",
      label: "#f6f2eb",
      text: "#2e4345",
    },
  },
  {
    id: "silk-conditioner",
    name: "Hibiscus Silk Conditioner",
    label: "Silk Seal",
    tagline: "Melts frizz and seals the cuticle for mirror-like shine.",
    concern: "Frizz",
    step: { n: "04", name: "Seal" },
    shape: "tube",
    sizes: [
      { label: "200 ml", price: 845 },
      { label: "400 ml", price: 1450, compareAt: 1690 },
    ],
    rating: 4.8,
    reviews: 1594,
    result: { value: "96%", copy: "saw less frizz*" },
    heroIngredients: ["Hibiscus", "Shea", "Squalane"],
    palette: {
      stage: "#efd6cb",
      stageDeep: "#ddb5a4",
      body: "#a8673f",
      cap: "#f6f2eb",
      label: "#f6f2eb",
      text: "#a8673f",
    },
  },
  {
    id: "neem-clarifier",
    name: "Neem & Tea Tree Scalp Clarifier",
    label: "Clarify",
    tagline: "Calms flakes and itch without stripping the scalp barrier.",
    concern: "Dandruff",
    step: { n: "02", name: "Cleanse" },
    shape: "pump",
    sizes: [
      { label: "250 ml", price: 925 },
      { label: "500 ml", price: 1550, compareAt: 1850 },
    ],
    rating: 4.7,
    reviews: 1122,
    result: { value: "−89%", copy: "visible flakes*" },
    heroIngredients: ["Neem", "Tea tree", "Piroctone"],
    palette: {
      stage: "#dde6e4",
      stageDeep: "#b8cac6",
      body: "#4d6466",
      cap: "#f6f2eb",
      label: "#f6f2eb",
      text: "#4d6466",
    },
  },
  {
    id: "vault-mask",
    name: "The Vault Overnight Mask",
    label: "Vault Mask",
    tagline: "An overnight treasure for parched, over-styled lengths.",
    concern: "Dryness",
    step: { n: "04", name: "Seal" },
    shape: "jar",
    sizes: [
      { label: "100 g", price: 995 },
      { label: "200 g", price: 1695, compareAt: 1990 },
    ],
    rating: 4.9,
    reviews: 2048,
    badge: "Award winner",
    result: { value: "12h", copy: "of deep hydration*" },
    heroIngredients: ["Kokum butter", "Saffron", "Peptides"],
    palette: {
      stage: "#f3e6c8",
      stageDeep: "#e3c98e",
      body: "#f6f2eb",
      cap: "#c49a72",
      label: "#2e4345",
      text: "#f6f2eb",
    },
  },
];

export const concerns: Concern[] = [
  "Hair fall",
  "Thinning",
  "Damage",
  "Frizz",
  "Dandruff",
  "Dryness",
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatPrice = (n: number) => inr.format(n);

export const FREE_SHIPPING_AT = 999;
