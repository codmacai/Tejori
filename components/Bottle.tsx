import { useId } from "react";
import type { BottleShape } from "@/lib/products";

type Props = {
  shape: BottleShape;
  body: string;
  cap: string;
  label: string;
  text: string;
  name: string;
  size?: string;
  className?: string;
};

/**
 * Illustrated packshot. Every product renders as crisp vector packaging,
 * so the page needs no photography to look finished — swap for real
 * renders later by replacing this component.
 */
export function Bottle({
  shape,
  body,
  cap,
  label,
  text,
  name,
  size,
  className,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const sheen = `sheen-${uid}`;
  const capSheen = `cap-${uid}`;
  const s = `url(#${sheen})`;
  const cs = `url(#${capSheen})`;

  const Label = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={label} />
      <text
        x={x + w / 2}
        y={y + h * 0.3}
        textAnchor="middle"
        fill={text}
        style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.04em" }}
        fontSize={Math.min(w * 0.24, 20)}
      >
        Tejori
      </text>
      <line
        x1={x + w * 0.3}
        x2={x + w * 0.7}
        y1={y + h * 0.42}
        y2={y + h * 0.42}
        stroke={text}
        strokeOpacity={0.35}
        strokeWidth={0.75}
      />
      <text
        x={x + w / 2}
        y={y + h * 0.6}
        textAnchor="middle"
        fill={text}
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        fontSize={Math.min(w * 0.14, 13)}
      >
        {name}
      </text>
      {size && (
        <text
          x={x + w / 2}
          y={y + h * 0.86}
          textAnchor="middle"
          fill={text}
          fillOpacity={0.7}
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.14em", fontWeight: 600 }}
          fontSize={6.5}
        >
          {size.toUpperCase()}
        </text>
      )}
    </g>
  );

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label={`Tejori ${name}`}
    >
      <defs>
        <linearGradient id={sheen} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.14" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.24" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="0.34" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="0.88" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={capSheen} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.3" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {shape === "dropper" && (
        <g>
          {/* bulb */}
          <rect x="84" y="22" width="32" height="74" rx="16" fill={cap} />
          <rect x="84" y="22" width="32" height="74" rx="16" fill={cs} />
          {/* collar */}
          <rect x="72" y="88" width="56" height="44" rx="6" fill={cap} />
          <rect x="72" y="88" width="56" height="44" rx="6" fill={cs} />
          <rect x="72" y="100" width="56" height="1.2" fill="#000" opacity="0.15" />
          <rect x="72" y="106" width="56" height="1.2" fill="#000" opacity="0.15" />
          {/* body */}
          <path d="M60 150 Q60 132 82 132 H118 Q140 132 140 150 V292 Q140 304 128 304 H72 Q60 304 60 292 Z" fill={body} />
          <path d="M60 150 Q60 132 82 132 H118 Q140 132 140 150 V292 Q140 304 128 304 H72 Q60 304 60 292 Z" fill={s} />
          <Label x={68} y={180} w={64} h={92} />
        </g>
      )}

      {shape === "pump" && (
        <g>
          {/* actuator */}
          <path d="M36 44 H124 Q132 44 132 52 V60 H60 V54 H40 Q36 54 36 50 Z" fill={cap} />
          <path d="M36 44 H124 Q132 44 132 52 V60 H60 V54 H40 Q36 54 36 50 Z" fill={cs} />
          <rect x="93" y="60" width="14" height="26" fill={cap} />
          <rect x="93" y="60" width="14" height="26" fill={cs} />
          {/* collar */}
          <rect x="76" y="84" width="48" height="24" rx="4" fill={cap} />
          <rect x="76" y="84" width="48" height="24" rx="4" fill={cs} />
          {/* body */}
          <path d="M50 134 Q50 108 78 108 H122 Q150 108 150 134 V286 Q150 304 132 304 H68 Q50 304 50 286 Z" fill={body} />
          <path d="M50 134 Q50 108 78 108 H122 Q150 108 150 134 V286 Q150 304 132 304 H68 Q50 304 50 286 Z" fill={s} />
          <Label x={62} y={160} w={76} h={104} />
        </g>
      )}

      {shape === "tube" && (
        <g>
          {/* body (standing on its cap) */}
          <path d="M42 36 H158 L134 250 H66 Z" fill={body} />
          <path d="M42 36 H158 L134 250 H66 Z" fill={s} />
          {/* crimp */}
          <rect x="40" y="28" width="120" height="14" rx="2" fill={body} />
          <rect x="40" y="28" width="120" height="14" rx="2" fill="#000" opacity="0.12" />
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x={46 + i * 8} y="30" width="1.2" height="10" fill="#000" opacity="0.18" />
          ))}
          {/* cap */}
          <rect x="66" y="250" width="68" height="54" rx="8" fill={cap} />
          <rect x="66" y="250" width="68" height="54" rx="8" fill={cs} />
          <Label x={70} y={96} w={60} h={100} />
        </g>
      )}

      {shape === "jar" && (
        <g>
          {/* lid */}
          <rect x="34" y="160" width="132" height="40" rx="10" fill={cap} />
          <rect x="34" y="160" width="132" height="40" rx="10" fill={cs} />
          {Array.from({ length: 22 }).map((_, i) => (
            <rect key={i} x={40 + i * 5.6} y="166" width="1" height="28" fill="#000" opacity="0.12" />
          ))}
          {/* body */}
          <path d="M40 204 H160 V286 Q160 304 142 304 H58 Q40 304 40 286 Z" fill={body} />
          <path d="M40 204 H160 V286 Q160 304 142 304 H58 Q40 304 40 286 Z" fill={s} />
          <Label x={58} y={214} w={84} h={80} />
        </g>
      )}

      {shape === "oil" && (
        <g>
          {/* cap */}
          <rect x="82" y="20" width="36" height="62" rx="6" fill={cap} />
          <rect x="82" y="20" width="36" height="62" rx="6" fill={cs} />
          {/* neck + shoulders + body (amber glass) */}
          <path d="M88 82 H112 V104 Q138 112 138 140 V290 Q138 304 124 304 H76 Q62 304 62 290 V140 Q62 112 88 104 Z" fill={body} />
          <path d="M88 82 H112 V104 Q138 112 138 140 V290 Q138 304 124 304 H76 Q62 304 62 290 V140 Q62 112 88 104 Z" fill={s} />
          {/* liquid line */}
          <rect x="62" y="132" width="76" height="1.5" fill="#fff" opacity="0.25" />
          <Label x={68} y={170} w={64} h={100} />
        </g>
      )}
    </svg>
  );
}
