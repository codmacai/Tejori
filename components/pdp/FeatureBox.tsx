import Image from "next/image";
import type { Product } from "@/lib/products";
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
            <div className="mx-auto max-w-[1040px]">
              <p className="eyebrow text-white/55">Why choose it</p>
              <h2 className="heading mt-3 text-[2rem] md:text-[3rem]">Why you’ll love it</h2>
            </div>

            <ul className="mx-auto mt-10 grid max-w-[1040px] gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-x-12">
              {p.details.why.map((w, i) => (
                <li key={w.title} className="flex flex-col border-t border-white/20 pt-6">
                  <span className="label-mono text-[13px] text-white/45">0{i + 1}</span>
                  <h3 className="mt-6 text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-card md:mt-10 md:text-[26px]">{w.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60">{w.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
