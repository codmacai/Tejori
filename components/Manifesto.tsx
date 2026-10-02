import { IconDrop, IconLeaf, IconRoots, IconSparkle } from "./Icons";
import { Reveal } from "./Reveal";

const values = [
  { icon: IconLeaf, label: "100% natural ingredients" },
  { icon: IconRoots, label: "Nourishes hair roots" },
  { icon: IconSparkle, label: "Removes dandruff" },
  { icon: IconDrop, label: "For all hair types" },
];

export function Manifesto() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-muted">The Tejori way</p>
          <p className="mt-8 text-[1.9rem] font-light leading-[1.2] tracking-[-0.03em] text-ink md:text-[3.4rem]">
            Neelayamari, coconut and nothing you don’t need — hair care the way it was always meant to be.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 border-t border-line md:mt-24 md:grid-cols-4">
          {values.map(({ icon: I, label }, n) => (
            <Reveal
              key={label}
              delay={n * 80}
              className={`flex flex-col items-center gap-4 px-4 py-10 text-center ${n % 2 === 1 ? "border-l border-line" : ""} ${
                n === 2 ? "md:border-l" : ""
              } ${n > 1 ? "border-t border-line md:border-t-0" : ""}`}
            >
              <I className="h-6 w-6 text-ink" />
              <span className="text-[14px] text-ink">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
