import Image from "next/image";
import growth from "@/public/images/concern-growth.jpg";
import dandruff from "@/public/images/concern-dandruff.jpg";
import dry from "@/public/images/concern-dry.jpg";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const concerns = [
  { title: "Hair Growth", copy: "Nourish weak roots", image: growth, href: "#neelayamari-hair-oil" },
  { title: "Anti Dandruff", copy: "Clear, calm scalp", image: dandruff, href: "#anti-dandruff-combo" },
  { title: "Dry Hair", copy: "Softness & shine", image: dry, href: "#neelayamari-hair-oil" },
];

export function Concerns() {
  return (
    <section id="concerns" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading title="Shop by concern" />
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {concerns.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <a
                href={c.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[24px] md:aspect-square md:rounded-[28px]"
              >
                <Image
                  src={c.image}
                  alt={`${c.title} concern`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors duration-700 group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h3 className="heading text-[2rem] md:text-[2.4rem]">{c.title}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-[15px] text-white/85 opacity-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:max-h-8 group-hover:opacity-100">
                    {c.copy}
                  </p>
                  <span className="mt-4 rounded-full border border-white/50 bg-white/10 px-6 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-500 group-hover:border-ink group-hover:bg-ink">
                    Shop
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
