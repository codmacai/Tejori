"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "./Icons";

const announcements = [
  "Free express shipping on orders over ₹999",
  "Build a 3-step ritual & save 20%",
  "60-day “love your hair” money-back promise",
];

const nav = [
  { href: "#shop", label: "Shop" },
  { href: "#ritual", label: "Build a ritual" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#results", label: "Results" },
  { href: "#quiz", label: "Hair quiz" },
];

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [msg, setMsg] = useState(0);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setMsg((m) => (m + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      <div className="bg-ink-deep text-bone">
        <div className="container-x flex h-9 items-center justify-center overflow-hidden text-[12px] tracking-wide">
          <p key={msg} className="animate-[fadeUp_.6s_var(--ease-out-expo)]">
            {announcements[msg]}
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-10">
            <button
              className="-ml-2 p-2 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <IconMenu className="h-6 w-6" />
            </button>
            <a href="#top" aria-label="Tejori home">
              <Logo className="text-[1.9rem] md:text-[2.2rem]" />
            </a>
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="group relative text-[14px] font-medium text-ink-deep/80 transition-colors hover:text-ink-deep"
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="hidden rounded-full p-2.5 transition hover:bg-ink/5 md:inline-flex" aria-label="Search">
              <IconSearch className="h-5 w-5" />
            </button>
            <button className="hidden rounded-full p-2.5 transition hover:bg-ink/5 md:inline-flex" aria-label="Account">
              <IconUser className="h-5 w-5" />
            </button>
            <button
              onClick={open}
              className="relative flex items-center gap-2 rounded-full bg-ink py-2 pl-3.5 pr-4 text-bone transition hover:bg-ink-deep"
              aria-label={`Open bag, ${count} items`}
            >
              <IconBag className="h-[18px] w-[18px]" />
              <span className="text-[13px] font-semibold">Bag</span>
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full bg-bone px-1 text-[11px] font-bold text-ink transition-transform ${
                  bump ? "scale-125" : "scale-100"
                }`}
              >
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menu ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menu}
      >
        <div
          className={`absolute inset-0 bg-ink-deep/40 backdrop-blur-sm transition-opacity duration-500 ${menu ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenu(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] ${
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
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="display border-b border-line py-4 text-3xl"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#quiz" onClick={() => setMenu(false)} className="btn btn-primary mt-auto">
            Find my ritual in 60 sec
          </a>
        </div>
      </div>
    </>
  );
}
