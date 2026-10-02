import Image from "next/image";
import type { Product } from "@/lib/products";
import { FeatureIcon } from "../FeatureIcon";
import { Reveal } from "../Reveal";

/** Product rising from a sage dome above a brand-gradient box of features. */
export function FeatureBox({ product: p }: { product: Product }) {
  return (
    <section className="pt-20 md:pt-32" aria-label={`Why you’ll love ${p.short}`}>
      <div className="container-x">
        <Reveal className="relative mx-auto max-w-[1200px]">
          <div className="relative mx-auto flex aspect-[2/1] w-[78%] max-w-[560px] items-end justify-center overflow-hidden rounded-t-full bg-card">
            <div className="relative h-[124%] w-[60%] translate-y-[20%]">
              <Image src={p.image} alt={p.name} fill sizes="320px" className="object-contain object-bottom" />
            </div>
          </div>

          <div className="stage relative z-10 -mt-[7%] rounded-[32px] px-5 py-12 text-white md:-mt-14 md:rounded-[44px] md:px-10 md:py-16">
            <div className="text-center">
              <p className="eyebrow text-white/55">Why choose it</p>
              <h2 className="heading mt-3 text-[2rem] md:text-[3rem]">Why you’ll love it</h2>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-y-0">
              {p.details.why.map((w, i) => (
                <li
                  key={w.title}
                  className={`flex flex-col items-center px-3 text-center md:px-7 md:py-2 ${i % 2 ? "border-l border-white/10" : ""} ${
                    i === 2 ? "md:border-l md:border-white/10" : ""
                  }`}
                >
                  <FeatureIcon name={w.icon} className="h-16 w-16 text-card md:h-[88px] md:w-[88px]" />
                  <h3 className="label-mono mt-6 max-w-[200px] text-[13px] text-white md:mt-8 md:text-[15px]">{w.title}</h3>
                  <p className="mt-3 max-w-[230px] text-[13.5px] leading-relaxed text-white/55 md:text-[14.5px]">{w.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
