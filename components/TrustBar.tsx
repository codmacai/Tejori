import Image from "next/image";
import comboImg from "@/public/images/cut-combo.png";
import { IconDrop, IconLeaf, IconRoots, IconSparkle } from "./Icons";
import { Reveal } from "./Reveal";

const features = [
  { icon: IconLeaf, title: "Natural ingredients", copy: "Neelayamari and coconut, nothing you don’t need." },
  { icon: IconRoots, title: "Nourishes roots", copy: "Cares for the scalp for stronger-feeling hair." },
  { icon: IconSparkle, title: "Removes dandruff", copy: "Clears flakes for a clean, calm scalp." },
  { icon: IconDrop, title: "Every hair type", copy: "Straight, wavy or curly — gentle for regular use." },
];

export function TrustBar() {
  return (
    <section className="pt-16 md:pt-24" aria-label="Why Tejori">
      <div className="container-x">
        <Reveal className="relative mx-auto max-w-[1200px]">
          {/* sage dome with the products rising out of it */}
          <div className="relative mx-auto flex aspect-[2/1] w-[78%] max-w-[600px] items-end justify-center overflow-hidden rounded-t-full bg-card">
            <div className="relative h-[128%] w-[60%] translate-y-[20%]">
              <Image src={comboImg} alt="Tejori Neelayamari Hair Oil and Anti-Dandruff Shampoo" fill sizes="320px" className="object-contain object-bottom" />
            </div>
          </div>

          {/* brand-gradient feature box */}
          <div className="stage relative z-10 -mt-[7%] rounded-[32px] px-5 py-10 text-white md:-mt-16 md:rounded-[44px] md:px-10 md:py-14">
            <p className="eyebrow text-center text-white/55">The Tejori promise</p>

            <ul className="mt-8 grid grid-cols-2 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-y-0">
              {features.map(({ icon: I, title, copy }, i) => (
                <li
                  key={title}
                  className={`flex flex-col items-center px-3 text-center md:px-8 ${i % 2 ? "border-l border-white/10" : ""} ${
                    i === 2 ? "md:border-l md:border-white/10" : ""
                  }`}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/[0.08] text-card ring-1 ring-white/15">
                    <I className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[17px] font-medium tracking-[-0.01em] text-card md:text-[20px]">{title}</h3>
                  <p className="mt-2 max-w-[220px] text-[13.5px] leading-relaxed text-white/60 md:text-[14.5px]">{copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
