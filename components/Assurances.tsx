import { IconCrueltyFree, IconDermTested, IconScience } from "./icons/BrandIcons";
import { Reveal } from "./Reveal";

// Only display claims you can substantiate (test reports / certification).
const items = [
  { icon: IconScience, label: ["Scientifically", "proven"] },
  { icon: IconDermTested, label: ["Dermatologist", "tested"] },
  { icon: IconCrueltyFree, label: ["Cruelty", "free"] },
];

export function Assurances() {
  return (
    <section className="pt-12 md:pt-20" aria-label="Our standards">
      <div className="container-x">
        <Reveal className="stage relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] px-3 py-10 md:rounded-[44px] md:px-10 md:py-16">
          {/* soft light bloom behind the row */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(220,224,197,0.12),transparent_70%)]" />

          <ul className="relative grid grid-cols-3">
            {items.map(({ icon: I, label }, i) => (
              <li
                key={label.join(" ")}
                className={`flex flex-col items-center px-1 text-center ${i > 0 ? "border-l border-white/10" : ""}`}
              >
                <span className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 sm:h-24 sm:w-24 md:h-[136px] md:w-[136px]">
                  <I className="h-11 w-11 text-card sm:h-14 sm:w-14 md:h-[92px] md:w-[92px]" strokeWidth={1.4} />
                </span>
                <p className="label-mono mt-5 text-[10.5px] text-white sm:text-[13px] md:mt-8 md:text-[17px]">
                  {label[0]}
                  <br />
                  {label[1]}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
