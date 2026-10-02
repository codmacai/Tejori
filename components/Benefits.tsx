import { IconDrop, IconLeaf, IconRoots, IconSparkle, IconWaves } from "./Icons";

const items = [
  { icon: IconLeaf, label: "100% natural ingredients" },
  { icon: IconRoots, label: "Nourishes hair roots" },
  { icon: IconWaves, label: "Stronger & shinier hair" },
  { icon: IconSparkle, label: "Removes dandruff" },
  { icon: IconDrop, label: "Suitable for all hair types" },
];

export function Benefits() {
  const row = [...items, ...items];
  return (
    <section className="mt-10 overflow-hidden border-y border-line bg-white py-6 md:mt-14" aria-label="Why Tejori">
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map(({ icon: I, label }, n) => (
          <span key={n} className="flex items-center gap-3 text-[15px] text-ink" aria-hidden={n >= items.length}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mint">
              <I className="h-[18px] w-[18px]" />
            </span>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
