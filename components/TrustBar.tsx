import { IconDrop, IconLeaf, IconRoots, IconSparkle } from "./Icons";

const items = [
  { icon: IconLeaf, title: "100% natural", copy: "Ayurveda-inspired ingredients" },
  { icon: IconRoots, title: "Nourishes roots", copy: "For stronger, shinier hair" },
  { icon: IconSparkle, title: "Removes dandruff", copy: "Clean, calm scalp" },
  { icon: IconDrop, title: "All hair types", copy: "Straight to curly" },
];

export function TrustBar() {
  return (
    <section className="border-b border-line bg-white" aria-label="Why Tejori">
      <div className="container-x grid grid-cols-2 md:grid-cols-4">
        {items.map(({ icon: I, title, copy }, n) => (
          <div
            key={title}
            className={`flex items-center gap-4 py-6 md:justify-center md:py-8 ${n % 2 ? "pl-4 md:pl-0" : ""} ${
              n > 1 ? "border-t border-line md:border-t-0" : ""
            } ${n > 0 ? "md:border-l md:border-line" : ""}`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mint text-ink">
              <I className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-medium text-ink">{title}</span>
              <span className="mt-0.5 block text-[13px] text-muted">{copy}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
