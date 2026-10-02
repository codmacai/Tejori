import Image from "next/image";
import comboImg from "@/public/images/cut-combo.png";
import { Reveal } from "./Reveal";

/* Hand-drawn accents, stroked in the packaging sage */
const Circle = () => (
  <svg viewBox="0 0 220 90" preserveAspectRatio="none" className="pointer-events-none absolute -left-5 -top-3 h-[calc(100%+1.5rem)] w-[calc(100%+2.5rem)]" aria-hidden>
    <path
      d="M24 60 C 4 30, 70 6, 125 8 C 190 10, 222 36, 206 58 C 190 82, 100 88, 50 78 C 22 72, 14 58, 34 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const Squiggle = () => (
  <svg viewBox="0 0 160 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-4 w-full" aria-hidden>
    <path d="M3 12 C 13 2, 23 2, 33 11 S 53 20, 63 10 S 83 1, 93 10 S 113 19, 123 10 S 143 2, 157 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const Swoosh = () => (
  <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-4 -left-2 h-5 w-[110%]" aria-hidden>
    <path d="M4 20 C 60 6, 130 2, 196 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const Sprig = () => (
  <svg viewBox="0 0 40 40" className="mr-2 inline-block h-8 w-8 -translate-y-1 md:h-10 md:w-10" aria-hidden>
    <path d="M8 34 C 14 24, 22 16, 34 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M17 24 C 12 20, 10 15, 11 10 M24 17 C 24 12, 26 8, 29 5 M20 21 C 25 21, 29 23, 31 27" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const features = [
  { word: "Natural", tail: "ingredients", mark: "circle" },
  { word: "Roots", tail: "nourished", mark: "squiggle" },
  { word: "Dandruff", tail: "removing", mark: "swoosh" },
  { word: "Every", tail: "hair type", mark: "sprig" },
] as const;

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

          {/* gradient feature box */}
          <div className="stage relative z-10 -mt-[7%] overflow-hidden rounded-[32px] px-6 py-12 text-card md:-mt-16 md:rounded-[44px] md:px-16 md:py-16">
            <ul className="relative mx-auto flex max-w-[980px] flex-col items-center gap-y-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-16 md:gap-x-20 md:gap-y-12">
              {features.map((f, i) => (
                <li
                  key={f.word}
                  className={`flex flex-wrap items-baseline justify-center ${i === 0 ? "gap-x-6" : "gap-x-3"} ${i === 1 ? "sm:-translate-y-3" : ""} ${i === 2 ? "sm:translate-x-8" : ""}`}
                >
                  <span className="relative inline-block text-[2.6rem] font-medium leading-none tracking-[-0.03em] md:text-[3.6rem]">
                    {f.mark === "sprig" && <Sprig />}
                    {f.word}
                    {f.mark === "circle" && <Circle />}
                    {f.mark === "squiggle" && <Squiggle />}
                    {f.mark === "swoosh" && <Swoosh />}
                  </span>
                  <span
                    className={`font-light text-white/75 ${
                      f.mark === "swoosh" ? "text-[1rem] uppercase tracking-[0.12em] md:text-[1.15rem]" : "text-[1.2rem] md:text-[1.5rem]"
                    }`}
                  >
                    {f.tail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
