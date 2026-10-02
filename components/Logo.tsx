export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <span
      className={`font-display font-bold leading-none tracking-[-0.055em] ${
        tone === "ink" ? "text-ink" : "text-bone"
      } ${className}`}
    >
      Tejori
    </span>
  );
}
