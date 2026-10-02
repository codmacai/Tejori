import type { IconKey } from "@/lib/products";
import {
  IconClearScalp,
  IconHairTypes,
  IconRitual,
  IconRoots,
  IconShine,
  IconValue,
} from "./icons/BrandIcons";
import { IconNaturalLeaf } from "./icons/LeafArt";

/** Tejori hairline brand icons, keyed by feature. */
const map: Record<IconKey, typeof IconRoots> = {
  leaf: IconNaturalLeaf,
  roots: IconRoots,
  shine: IconShine,
  shield: IconClearScalp,
  hair: IconHairTypes,
  drop: IconRitual,
  tag: IconValue,
};

export function FeatureIcon({ name, className = "h-6 w-6" }: { name: IconKey; className?: string }) {
  const I = map[name];
  return <I className={className} />;
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
