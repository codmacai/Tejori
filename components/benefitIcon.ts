import { IconDrop, IconLeaf, IconRoots, IconSparkle, IconWaves } from "./Icons";

/** Picks a line icon for a benefit label. */
export function benefitIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("natural") || l.includes("organic")) return IconLeaf;
  if (l.includes("root")) return IconRoots;
  if (l.includes("dandruff")) return IconSparkle;
  if (l.includes("shin") || l.includes("lock") || l.includes("stronger")) return IconWaves;
  return IconDrop;
}
