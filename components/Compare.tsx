import { IconCheck, IconClose } from "./Icons";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

const rows = [
  { k: "Clinically studied actives at effective %", t: true, o: false },
  { k: "Cold-processed Ayurvedic botanicals", t: true, o: false },
  { k: "Free from sulphates, silicones & parabens", t: true, o: false },
  { k: "Safe for colour-treated & keratin hair", t: true, o: true },
  { k: "Formulated for Indian water & humidity", t: true, o: false },
  { k: "60-day money-back promise", t: true, o: false },
];

export function Compare() {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-copper">The difference</p>
          <h2 className="display mt-4 text-[2.5rem] text-ink-deep md:text-[3.6rem]">
            Not all haircare is
            <span className="serif-accent text-[1.08em] text-ink"> created equal.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-line bg-cream">
          <div className="grid grid-cols-[1fr_88px_88px] items-center border-b border-line px-5 py-5 md:grid-cols-[1fr_160px_160px] md:px-8">
            <span className="text-[13px] font-medium text-ink-deep/50">What you get</span>
            <span className="grid justify-items-center">
              <Logo className="text-xl md:text-2xl" />
            </span>
            <span className="text-center text-[12px] font-medium leading-tight text-ink-deep/50 md:text-[13px]">
              Typical salon brands
            </span>
          </div>
          {rows.map((r) => (
            <div
              key={r.k}
              className="grid grid-cols-[1fr_88px_88px] items-center border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1fr_160px_160px] md:px-8"
            >
              <span className="pr-3 text-[14px] font-medium text-ink-deep md:text-[15px]">{r.k}</span>
              <span className="relative grid justify-items-center">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-bone">
                  <IconCheck className="h-4 w-4" />
                </span>
              </span>
              <span className="grid justify-items-center">
                {r.o ? (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 text-ink">
                    <IconCheck className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-full text-ink-deep/30">
                    <IconClose className="h-4 w-4" />
                  </span>
                )}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
