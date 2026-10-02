import { products } from "@/lib/products";
import { Bottle } from "./Bottle";
import { IconArrow, IconLeaf, IconSparkle, Stars } from "./Icons";

const [serum, shampoo, elixir] = products;

const avatars = [
  { i: "AK", c: "#c49a72" },
  { i: "MR", c: "#9fb09a" },
  { i: "SL", c: "#ddb5a4" },
  { i: "JP", c: "#4d6466" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* flowing strands */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-ink/[0.09]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            className="strand"
            style={{ animationDelay: `${i * 120}ms` }}
            d={`M-40 ${620 + i * 22} C 320 ${420 + i * 30}, 560 ${820 - i * 18}, 860 ${560 + i * 14} S 1320 ${300 + i * 26}, 1500 ${360 + i * 20}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
          />
        ))}
      </svg>

      <div className="container-x relative grid items-center gap-12 pb-16 pt-8 md:pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur animate-[fadeUp_.9s_var(--ease-out-expo)_both]">
            <IconSparkle className="h-3.5 w-3.5 text-copper" />
            Ayurveda × Hair science · Clinically tested
          </p>

          <h1 className="display mt-6 text-[3.4rem] text-ink-deep sm:text-[4.6rem] lg:text-[5.4rem] xl:text-[6.4rem] animate-[fadeUp_1s_var(--ease-out-expo)_.08s_both]">
            Hair, kept
            <br />
            like{" "}
            <span className="serif-accent relative inline-block pr-2 text-[1.12em] text-copper">
              treasure.
              <svg className="absolute -bottom-1 left-0 w-full text-copper/50" viewBox="0 0 300 14" fill="none" aria-hidden>
                <path className="strand" d="M2 10 C 80 2, 200 2, 298 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-relaxed text-ink-deep/70 md:text-lg animate-[fadeUp_1s_var(--ease-out-expo)_.16s_both]">
            <em className="not-italic font-medium text-ink-deep">Tejori</em> means
            “the vault”. We fill ours with India’s most treasured botanicals —
            bhringraj, amla, rosemary — decoded by modern trichology for results
            you can see in 8 weeks.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-[fadeUp_1s_var(--ease-out-expo)_.24s_both]">
            <a href="#shop" className="btn btn-primary group">
              Shop bestsellers
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href="#quiz" className="btn btn-ghost">
              Take the 60-sec hair quiz
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 animate-[fadeUp_1s_var(--ease-out-expo)_.32s_both]">
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <span
                  key={a.i}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-cream text-[11px] font-bold text-white"
                  style={{ background: a.c }}
                >
                  {a.i}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2 text-copper">
                <Stars value={4.9} />
                <span className="font-semibold text-ink-deep">4.9/5</span>
              </div>
              <p className="text-ink-deep/60">from 14,200+ verified reviews</p>
            </div>
          </div>
        </div>

        {/* Composition */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
            <div className="grain absolute inset-x-[6%] bottom-0 top-0 overflow-hidden rounded-t-[999px] rounded-b-[40px] bg-ink">
              <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_42%,#5f7d7f_0%,transparent_70%)]" />
              <svg className="absolute inset-0 h-full w-full text-bone/15" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
                {Array.from({ length: 9 }).map((_, i) => (
                  <path
                    key={i}
                    className="strand"
                    style={{ animationDelay: `${300 + i * 90}ms` }}
                    d={`M${-20 + i * 6} ${80 + i * 40} C 120 ${20 + i * 45}, 260 ${200 + i * 30}, 420 ${120 + i * 42}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                ))}
              </svg>
              {/* plinth */}
              <div className="absolute inset-x-[14%] bottom-[9%] h-[14%] rounded-[50%] bg-[#3d5658] shadow-[inset_0_8px_20px_rgba(255,255,255,.08)]" />
              <div className="absolute inset-x-[14%] bottom-[2%] h-[14%] rounded-b-[50%] bg-ink-deep/60" />
            </div>

            {/* bottles */}
            <div className="absolute bottom-[14%] left-[14%] w-[30%] animate-[fadeUp_1.2s_var(--ease-out-expo)_.5s_both]">
              <Bottle {...elixir.palette} shape={elixir.shape} name={elixir.label} size="100 ml" className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,.35)]" />
            </div>
            <div className="absolute bottom-[14%] right-[13%] w-[32%] animate-[fadeUp_1.2s_var(--ease-out-expo)_.6s_both]">
              <Bottle {...shampoo.palette} shape={shampoo.shape} name={shampoo.label} size="250 ml" className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,.35)]" />
            </div>
            <div className="absolute bottom-[11%] left-1/2 w-[38%] -translate-x-1/2">
              <div className="animate-float">
                <Bottle {...serum.palette} body="#f6f2eb" label="#2e4345" text="#f6f2eb" shape={serum.shape} name={serum.label} size="50 ml" className="w-full drop-shadow-[0_40px_40px_rgba(0,0,0,.45)]" />
              </div>
            </div>

            {/* rotating seal */}
            <div className="absolute -left-1 top-[9%] h-28 w-28 md:h-32 md:w-32">
              <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow text-ink-deep" aria-hidden>
                <defs>
                  <path id="seal-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
                </defs>
                <circle cx="60" cy="60" r="58" fill="var(--color-bone)" />
                <text fontSize="10.5" letterSpacing="3.2" fontWeight="600" fill="currentColor">
                  <textPath href="#seal-circle">CLEAN · VEGAN · MADE IN INDIA ·</textPath>
                </text>
              </svg>
              <span className="serif-accent absolute inset-0 grid place-items-center text-3xl text-copper">8w</span>
            </div>

            {/* results card */}
            <div className="absolute -right-1 top-[4%] w-40 rounded-2xl sm:top-[22%] sm:w-48 bg-cream/90 p-4 shadow-[0_30px_60px_-20px_rgba(27,42,44,.45)] backdrop-blur md:-right-4 md:w-56 animate-[fadeUp_1s_var(--ease-out-expo)_.9s_both]">
              <p className="eyebrow text-ink/60">Hair-fall reduction</p>
              <div className="mt-3 hidden h-20 items-end gap-2 sm:flex">
                {[
                  { h: 30, l: "2w" },
                  { h: 52, l: "4w" },
                  { h: 74, l: "6w" },
                  { h: 100, l: "8w" },
                ].map((b, i) => (
                  <div key={b.l} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full origin-bottom rounded-md bg-ink animate-[grow_1.2s_var(--ease-out-expo)_both]"
                      style={{ height: `${b.h * 0.58}px`, animationDelay: `${1100 + i * 120}ms`, opacity: 0.35 + i * 0.2 }}
                    />
                    <span className="text-[10px] text-ink/60">{b.l}</span>
                  </div>
                ))}
              </div>
              <p className="display mt-2 text-3xl text-ink-deep sm:mt-3">−74%</p>
              <p className="text-[11px] leading-snug text-ink/60">in an 8-week consumer study*</p>
            </div>

            {/* ingredient chip */}
            <div className="absolute bottom-[3%] -left-2 flex sm:bottom-[30%] items-center gap-3 rounded-full bg-cream/95 py-2 pl-2 pr-5 shadow-[0_20px_40px_-18px_rgba(27,42,44,.5)] backdrop-blur md:-left-6 animate-[fadeUp_1s_var(--ease-out-expo)_1.1s_both]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sage text-ink">
                <IconLeaf className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-ink-deep">Bhringraj</span>
                <span className="serif-accent block text-[13px] text-ink/60">Eclipta alba</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
