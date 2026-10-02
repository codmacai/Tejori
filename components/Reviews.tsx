import { IconCheck, Stars } from "./Icons";
import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "Ananya K.",
    city: "Mumbai",
    hair: "Wavy · Hair fall",
    product: "Root Revival Serum",
    title: "My shower drain finally looks normal.",
    body: "Postpartum shedding had me in tears. Six weeks in and the clumps are gone — I can see baby hairs along my hairline.",
    tone: "bg-sage",
  },
  {
    name: "Marcus R.",
    city: "Dubai",
    hair: "Straight · Thinning",
    product: "Scalp Elixir",
    title: "The only oil I don’t hate using.",
    body: "Absorbs in 20 minutes, smells like a spa, and my crown honestly looks denser in photos.",
    tone: "bg-blush",
  },
  {
    name: "Sana L.",
    city: "London",
    hair: "Curly · Frizz",
    product: "Silk Seal Conditioner",
    title: "Humidity-proof curls. In monsoon.",
    body: "Silicone-free and still this slippy? My curls clump and stay defined for three days.",
    tone: "bg-mist",
  },
  {
    name: "Priya J.",
    city: "Bengaluru",
    hair: "Coily · Dryness",
    product: "Vault Mask",
    title: "Worth every rupee.",
    body: "Overnight under a silk bonnet and my ends feel brand new. A jar lasts me two months.",
    tone: "bg-sand",
  },
  {
    name: "Rhea T.",
    city: "Singapore",
    hair: "Straight · Damage",
    product: "Bond Wash",
    title: "Bleached hair, rescued.",
    body: "Three rounds of balayage later and my stylist asked what I changed. This. Just this.",
    tone: "bg-[#f3e6c8]",
  },
  {
    name: "Dev P.",
    city: "Delhi",
    hair: "Wavy · Dandruff",
    product: "Clarify",
    title: "Flakes gone in two washes.",
    body: "No harsh tingle, no dryness after. My scalp finally feels calm.",
    tone: "bg-sage",
  },
];

const bars = [
  { s: 5, p: 89 },
  { s: 4, p: 8 },
  { s: 3, p: 2 },
  { s: 2, p: 1 },
  { s: 1, p: 0 },
];

export function Reviews() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="eyebrow text-copper">Loved worldwide</p>
          <h2 className="display mt-4 text-[2.7rem] text-ink-deep md:text-[3.6rem]">
            14,200+
            <br />
            <span className="serif-accent text-[1.08em] text-ink">good hair days.</span>
          </h2>
          <div className="mt-8 rounded-[24px] bg-bone p-6">
            <div className="flex items-end gap-3">
              <span className="display text-6xl text-ink-deep">4.9</span>
              <div className="pb-2">
                <Stars value={4.9} className="text-copper" />
                <p className="mt-1 text-[12.5px] text-ink-deep/55">Verified buyers</p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {bars.map((b) => (
                <div key={b.s} className="flex items-center gap-3 text-[12px] text-ink-deep/60">
                  <span className="w-3">{b.s}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                    <span className="block h-full rounded-full bg-ink" style={{ width: `${b.p}%` }} />
                  </span>
                  <span className="w-8 text-right">{b.p}%</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="columns-1 gap-5 sm:columns-2 lg:col-span-8 [&>*]:mb-5">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 100} className="break-inside-avoid">
              <figure className="rounded-[24px] border border-line bg-white/60 p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(27,42,44,.35)]">
                <div className="flex items-center justify-between">
                  <Stars value={5} className="text-copper" />
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink">
                    <IconCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
                <blockquote className="mt-4">
                  <p className="display-sm text-[1.3rem] text-ink-deep">“{r.title}”</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-deep/70">{r.body}</p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className={`grid h-10 w-10 place-items-center rounded-full text-[12px] font-bold text-ink ${r.tone}`}>
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="text-[13px] leading-tight">
                    <span className="block font-semibold text-ink-deep">
                      {r.name} <span className="font-normal text-ink-deep/50">· {r.city}</span>
                    </span>
                    <span className="block text-ink-deep/55">
                      {r.hair} · used <span className="serif-accent text-[14px] text-ink">{r.product}</span>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
