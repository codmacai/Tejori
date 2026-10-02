import { IconSparkle } from "./Icons";

const items = [
  "Sulphate-free",
  "Silicone-free",
  "Dermatologist tested",
  "Vegan & cruelty-free",
  "Colour-safe",
  "Ayurvedic actives",
  "Made in India",
  "Recyclable packaging",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-bone py-5" aria-label="Formula standards">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[15px] font-medium text-ink md:text-lg">
            <span className={i % 2 ? "serif-accent text-[1.15em]" : "display tracking-[-0.02em]"}>{t}</span>
            <IconSparkle className="h-4 w-4 text-copper" />
          </span>
        ))}
      </div>
    </div>
  );
}
