import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={`mx-auto max-w-3xl text-center ${light ? "text-white" : "text-ink"}`}>
      {eyebrow && <p className="eyebrow opacity-80">{eyebrow}</p>}
      <h2 className="heading mt-5 text-[2.5rem] md:text-[4rem]">{title}</h2>
      {sub && <p className={`mx-auto mt-5 max-w-xl text-[16px] leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{sub}</p>}
    </Reveal>
  );
}
