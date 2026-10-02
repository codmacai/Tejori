"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/products";

/**
 * Swipeable product gallery. On mobile it sits sticky behind the detail
 * sheet and gently recedes as the sheet is dragged up over it.
 */
export function Gallery({ images, tint, saveLabel }: { images: GalleryImage[]; tint: string; saveLabel?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onScroll = () => {
      if (!mq.matches) {
        el.style.transform = "";
        el.style.opacity = "";
        return;
      }
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.55));
      el.style.transform = `scale(${1 - 0.06 * p})`;
      el.style.opacity = String(1 - 0.45 * p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div ref={frame} className="origin-top will-change-transform">
      <div className="relative h-[58svh] min-h-[380px] overflow-hidden rounded-[32px] md:aspect-square md:h-auto md:min-h-0 md:rounded-[40px]" style={{ background: tint }}>
        <div
          ref={track}
          onScroll={(e) => {
            const el = e.currentTarget;
            setIdx(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((g, i) => (
            <div key={i} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={g.src}
                alt={g.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={g.fit === "contain" ? "object-contain p-[12%]" : "object-cover"}
                style={{ objectPosition: g.focus }}
              />
            </div>
          ))}
        </div>

        {saveLabel && (
          <span className="absolute left-5 top-5 rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] text-ink backdrop-blur">{saveLabel}</span>
        )}

        {/* dots (mobile) */}
        <div className="absolute inset-x-0 bottom-12 flex justify-center gap-1.5 md:bottom-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-6 bg-ink" : "w-1.5 bg-ink/30"}`}
            />
          ))}
        </div>
      </div>

      {/* thumbnails (desktop) */}
      <div className="mt-4 hidden gap-3 md:flex">
        {images.map((g, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}`}
            className={`relative h-20 w-20 overflow-hidden rounded-[18px] transition-all duration-300 ${
              i === idx ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100"
            }`}
            style={{ background: tint }}
          >
            <Image src={g.src} alt="" fill sizes="80px" className={g.fit === "contain" ? "object-contain p-2" : "object-cover"} style={{ objectPosition: g.focus }} />
          </button>
        ))}
      </div>
    </div>
  );
}
