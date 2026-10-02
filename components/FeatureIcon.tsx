import type { Icon } from "@phosphor-icons/react";
import {
  Drop,
  Leaf,
  Plant,
  ShieldCheck,
  Sparkle,
  Tag,
  Waves,
} from "@phosphor-icons/react/dist/ssr";
import type { IconKey } from "@/lib/products";

/** Refined light-weight line icons used for product features and benefits. */
const map: Record<IconKey, Icon> = {
  leaf: Leaf,
  roots: Plant,
  shine: Sparkle,
  shield: ShieldCheck,
  hair: Waves,
  drop: Drop,
  tag: Tag,
};

export function FeatureIcon({ name, className = "h-6 w-6" }: { name: IconKey; className?: string }) {
  const I = map[name];
  return <I weight="light" className={className} aria-hidden />;
}

/** Picks an icon for a free-text benefit label. */
export function benefitKey(label: string): IconKey {
  const l = label.toLowerCase();
  if (l.includes("natural") || l.includes("organic")) return "leaf";
  if (l.includes("root")) return "roots";
  if (l.includes("dandruff")) return "shield";
  if (l.includes("shin") || l.includes("stronger")) return "shine";
  if (l.includes("ritual")) return "drop";
  return "hair";
}
