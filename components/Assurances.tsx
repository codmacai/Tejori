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
    <section className="bg-paper pb-2 pt-12 md:pb-4 md:pt-20" aria-label="Our standards">
      <div className="container-x">
        <ul className="mx-auto grid max-w-[1100px] grid-cols-3">
          {items.map(({ icon: I, label }, i) => (
            <Reveal
              as="li"
              key={label.join(" ")}
              delay={i * 90}
              className={`flex flex-col items-center px-1 py-4 text-center text-ink md:py-6 ${i > 0 ? "border-l border-line" : ""}`}
            >
              <I className="h-14 w-14 sm:h-20 sm:w-20 md:h-[104px] md:w-[104px]" />
              <p className="label-mono mt-5 text-[11px] sm:text-[14px] md:mt-10 md:text-[20px]">
                {label[0]}
                <br />
                {label[1]}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
