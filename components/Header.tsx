"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "./Icons";

const announcements = [
  "Save 29% on Neelayamari Hair Oil — this week only",
  "Anti-Dandruff Combo: oil + shampoo for Rs. 899",
  "100% natural ingredients · Suitable for all hair types",
];

const nav = [
  { href: "#top", label: "Home" },
  { href: "#shop", label: "Shop" },
  { href: "#concerns", label: "Concerns" },
  { href: "#results", label: "Results" },
];

export function Header() {
  const { count, open } = useCart();
  const [menu, setMenu] = useState(false);
  const [msg, setMsg] = useState(0);
  const [bump, setBump] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setMsg((m) => (m + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      <div className="bg-ink text-white">
        <p
          key={msg}
          className="container-x flex h-9 items-center justify-center text-center text-[12px] tracking-[0.04em] animate-[fadeUp_.6s_var(--ease-out-expo)]"
        >
          {announcements[msg]}
        </p>
      </div>

      <header
        className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled ? "border-transparent shadow-[0_10px_30px_-20px_rgba(31,47,49,.35)]" : "border-line"
        }`}
      >
        <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[88px]">
          <div className="flex items-center gap-1 md:gap-7">
            <button className="-ml-2 p-2 md:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
              <IconMenu className="h-6 w-6" />
            </button>
            <button className="hidden p-1 md:block" aria-label="Search">
              <IconSearch className="h-[22px] w-[22px]" />
            </button>
            <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="group relative text-[16px] text-ink transition-colors hover:text-ink-deep"
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </div>

          <a href="#top" aria-label="Tejori home" className="justify-self-center">
            <Logo className="text-[2rem] md:text-[3rem]" />
          </a>

          <div className="flex items-center justify-end gap-2 md:gap-5">
            <button className="hidden p-1 md:block" aria-label="Account">
              <IconUser className="h-[23px] w-[23px]" />
            </button>
            <button onClick={open} className="relative p-1" aria-label={`Open bag, ${count} items`}>
              <IconBag className="h-6 w-6" />
              {count > 0 && (
                <span
                  className={`absolute -right-1 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-white transition-transform ${
                    bump ? "scale-125" : "scale-100"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${menu ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menu}
      >
        <div
          className={`absolute inset-0 bg-ink-deep/30 backdrop-blur-sm transition-opacity duration-500 ${menu ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenu(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] ${
            menu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo className="text-3xl" />
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="p-2">
              <IconClose className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setMenu(false)}
                className="heading border-b border-line py-4 text-3xl"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#shop" onClick={() => setMenu(false)} className="btn btn-ink mt-auto">
            Shop bestsellers
          </a>
        </div>
      </div>
    </>
  );
}
