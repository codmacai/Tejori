import type { SVGProps } from "react";

/**
 * Tejori brand icons — hairline, single-colour, 96×96 grid.
 * Strokes use `non-scaling-stroke` so lines stay hair-thin at any size.
 */
type P = SVGProps<SVGSVGElement> & { stroke?: string };

function Base({ children, strokeWidth = 1.25, ...p }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      {children}
    </svg>
  );
}

const ns = { vectorEffect: "non-scaling-stroke" as const };

/** Scientifically proven — a lab flask with a leaf growing from its neck (science × nature) */
export const IconScience = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M30 82 H 66 A 6 6 0 0 0 71 73 L 56 46 V 26 H 40 V 46 L 25 73 A 6 6 0 0 0 30 82 Z" />
    <path {...ns} d="M33 64 C 40 60, 46 68, 52 64 S 61 60, 64 64 L 70 74 A 4 4 0 0 1 66 79 H 30 A 4 4 0 0 1 26 74 Z" fill="currentColor" fillOpacity="0.18" stroke="none" />
    <path {...ns} d="M33 64 C 40 60, 46 68, 52 64 S 61 60, 64 64" />
    <path {...ns} d="M37 26 H 59" />
    <path {...ns} d="M48 26 V 12" />
    <path {...ns} d="M48 18 C 52 12, 58 10, 64 11 C 63 17, 57 21, 48 18 Z" fill="currentColor" fillOpacity="0.18" />
    <circle {...ns} cx="42" cy="73" r="2" />
    <circle {...ns} cx="54" cy="71" r="1.4" />
  </Base>
);

/** Dermatologist tested — a lens over layered skin, with a check seal */
export const IconDermTested = (p: P) => (
  <Base {...p}>
    <circle {...ns} cx="42" cy="44" r="25" fill="currentColor" fillOpacity="0.12" />
    <path {...ns} d="M60 62 L 80 82" strokeWidth={3.5} />
    <path {...ns} d="M24 40 C 32 36, 38 44, 46 40 S 56 36, 60 40" />
    <path {...ns} d="M22 49 C 30 45, 38 53, 46 49 S 56 45, 62 49" />
    <path {...ns} d="M26 58 C 33 55, 39 61, 46 58 S 54 55, 58 58" />
    <circle {...ns} cx="72" cy="22" r="10" />
    <path {...ns} d="M67 22 L 71 26 L 78 18" />
  </Base>
);

/** Cruelty free — a rabbit with a small leaf */
export const IconCrueltyFree = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M40 40 C 34 30, 33 16, 38 12 C 43 10, 46 24, 46 37" />
    <path {...ns} d="M56 40 C 62 30, 63 16, 58 12 C 53 10, 50 24, 50 37" />
    <path {...ns} d="M40 34 C 38 26, 38 20, 39 17" />
    <path {...ns} d="M56 34 C 58 26, 58 20, 57 17" />
    <path {...ns} d="M48 37 C 34 37, 28 46, 28 56 C 28 67, 37 74, 48 74 C 59 74, 68 67, 68 56 C 68 46, 62 37, 48 37 Z" />
    <circle {...ns} cx="40" cy="54" r="1.8" fill="currentColor" />
    <circle {...ns} cx="56" cy="54" r="1.8" fill="currentColor" />
    <path {...ns} d="M46 61 L 48 63 L 50 61" />
    <path {...ns} d="M48 63 V 66" />
    <path {...ns} d="M70 80 C 72 72, 78 68, 86 68 C 85 76, 79 80, 70 80 Z" />
    <path {...ns} d="M70 80 L 79 73" />
  </Base>
);
