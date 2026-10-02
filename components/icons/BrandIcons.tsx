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

/** Natural — a drop holding a leaf, with a highlight */
export const IconNatural = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M48 10 C 44 20, 22 40, 22 62 A 26 26 0 0 0 74 62 C 74 40, 52 20, 48 10 Z" />
    <path {...ns} d="M48 74 C 38 68, 36 55, 48 40 C 60 55, 58 68, 48 74 Z" />
    <path {...ns} d="M48 74 V 50" />
    <path {...ns} d="M58 81 A 20 20 0 0 0 68 71" />
  </Base>
);

/** Roots — a sprout above the soil line, roots below, held in a circle */
export const IconRoots = (p: P) => (
  <Base {...p}>
    <circle {...ns} cx="48" cy="48" r="38" />
    <path {...ns} d="M26 54 H 70" />
    <path {...ns} d="M48 54 V 34" />
    <path {...ns} d="M48 44 C 42 44, 36 40, 34 32 C 42 32, 47 37, 48 44 Z" />
    <path {...ns} d="M48 38 C 52 32, 57 29, 64 29 C 62 36, 56 39, 48 38 Z" />
    <path {...ns} d="M48 54 V 72" />
    <path {...ns} d="M48 60 C 45 64, 41 66, 37 71" />
    <path {...ns} d="M48 63 C 51 67, 55 69, 59 74" />
    <path {...ns} d="M48 72 L 45 77" />
  </Base>
);

/** Shine — flowing strands with a four-point sparkle */
export const IconShine = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M34 84 C 28 66, 44 54, 36 32 C 34 24, 36 18, 40 14" />
    <path {...ns} d="M47 86 C 41 68, 57 56, 49 34 C 47 26, 49 20, 53 16" />
    <path {...ns} d="M60 84 C 54 70, 66 58, 60 42" />
    <path {...ns} d="M74 12 C 75 19, 77 21, 84 22 C 77 23, 75 25, 74 32 C 73 25, 71 23, 64 22 C 71 21, 73 19, 74 12 Z" />
    <circle {...ns} cx="82" cy="38" r="1.6" />
  </Base>
);

/** Clear scalp — a shield with a check that breaks out of its edge */
export const IconClearScalp = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M48 12 L 76 22 V 46 C 76 66, 64 78, 48 86 C 32 78, 20 66, 20 46 V 22 Z" />
    <path {...ns} d="M34 50 L 44 60 L 84 22" />
    <path {...ns} d="M28 30 V 44" />
  </Base>
);

/** Every hair type — straight, wavy and curly strands in a circle */
export const IconHairTypes = (p: P) => (
  <Base {...p}>
    <circle {...ns} cx="48" cy="48" r="38" />
    <path {...ns} d="M34 24 V 72" />
    <path {...ns} d="M48 22 C 54 30, 42 38, 48 46 S 54 62, 48 72" />
    <path
      {...ns}
      d="M62 22 c 7 3, 6 10, -1 10 c -5 0, -4 -5, 1 -4 c 7 3, 6 10, -1 10 c -5 0, -4 -5, 1 -4 c 7 3, 6 10, -1 10 c -5 0, -4 -5, 1 -4 c 7 3, 6 10, -1 10 c -5 0, -4 -5, 1 -4 c 7 3, 6 10, -1 10"
    />
  </Base>
);

/** Ritual — a dropper releasing a single drop */
export const IconRitual = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M42 30 V 18 A 6 6 0 0 1 54 18 V 30" />
    <path {...ns} d="M37 30 H 59 V 37 H 37 Z" />
    <path {...ns} d="M43 37 V 60 L 48 68 L 53 60 V 37" />
    <path {...ns} d="M48 76 C 46 80, 43 82, 43 86 A 5 5 0 0 0 53 86 C 53 82, 50 80, 48 76 Z" />
    <path {...ns} d="M47 46 V 56" />
  </Base>
);

/** Value — a tag with a percent mark */
export const IconValue = (p: P) => (
  <Base {...p}>
    <path {...ns} d="M18 50 L 48 20 H 76 V 48 L 46 78 Z" />
    <circle {...ns} cx="66" cy="30" r="4" />
    <path {...ns} d="M68 26 C 70 16, 78 10, 86 14" />
    <circle {...ns} cx="40" cy="48" r="3" />
    <circle {...ns} cx="52" cy="60" r="3" />
    <path {...ns} d="M38 62 L 54 46" />
  </Base>
);
