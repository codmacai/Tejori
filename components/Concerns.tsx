import Image from "next/image";
import growth from "@/public/images/concern-growth.jpg";
import dandruff from "@/public/images/concern-dandruff.jpg";
import dry from "@/public/images/concern-dry.jpg";
import { IconArrow } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const concerns = [
  { title: "Hair growth", copy: "Neelayamari Hair Oil", image: growth, href: "/products/neelayamari-hair-oil" },
  { title: "Anti dandruff", copy: "Anti-Dandruff Combo", image: dandruff, href: "/products/anti-dandruff-combo" },
  { title: "Dry hair", copy: "Neelayamari Hair Oil", image: dry, href: "/products/neelayamari-hair-oil" },
];

export function Concerns() {
  return (
    <section id="concerns" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Find your fit" title="Shop by concern" />
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {concerns.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <a href={c.href} className="group relative block aspect-[4/3] overflow-hidden rounded-[36px] md:aspect-square">
                <Image
                  src={c.image}
                  alt={`${c.title} concern`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white md:p-7">
                  <div>
                    <h3 className="text-[26px] font-medium tracking-[-0.025em] md:text-[30px]">{c.title}</h3>
                    <p className="mt-1 text-[14px] text-white/75">{c.copy}</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-rotate-45">
                    <IconArrow className="h-5 w-5" />
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
