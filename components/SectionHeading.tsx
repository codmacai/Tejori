import { IconArrow } from "./Icons";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  action,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: { label: string; href: string };
  center?: boolean;
}) {
  return (
    <Reveal
      className={`flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow text-muted">{eyebrow}</p>}
        <h2 className="heading mt-4 text-[2.25rem] text-ink md:text-[3.25rem]">{title}</h2>
        {sub && <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted">{sub}</p>}
      </div>
      {action && (
        <a href={action.href} className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-ink">
          <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">{action.label}</span>
          <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </a>
      )}
    </Reveal>
  );
}
