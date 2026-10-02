"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "./Icons";

const nav = [
  { href: "#shop", label: "Shop" },
  { href: "#concerns", label: "Concerns" },
  { href: "#combo", label: "Combo" },
  { href: "#reviews", label: "Reviews" },
];

export function Header() {
  const { count, open } = useCart();
  const [menu, setMenu] = useState(false);
  const [bump, setBump] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <div className="fixed inset-x-0 top-0 z-40">
        {/* announcement */}
        <div
          className={`overflow-hidden bg-ink text-white transition-[height] duration-500 ease-[var(--ease-out-expo)] ${
            scrolled ? "h-0" : "h-9"
          }`}
        >
          <p className="container-x flex h-9 items-center justify-center text-[12.5px]">
            Anti-Dandruff Combo — save Rs. 199 this week
          </p>
        </div>

        <header
          className={`transition-colors duration-500 ${
            scrolled ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[76px]">
            <div className="flex items-center gap-1 md:gap-8">
              <button className="-ml-2 p-2 md:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
                <IconMenu className="h-6 w-6" />
              </button>
              <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
                {nav.map((n) => (
                  <a key={n.label} href={n.href} className="group relative text-[15px] font-medium text-ink">
                    {n.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                  </a>
                ))}
              </nav>
            </div>

            <a href="#top" aria-label="Tejori home" className="justify-self-center">
              <Logo className="text-[1.9rem] md:text-[2.4rem]" />
            </a>

            <div className="flex items-center justify-end gap-2 text-ink md:gap-5">
              <button className="hidden p-1 md:block" aria-label="Search">
                <IconSearch className="h-[21px] w-[21px]" />
              </button>
              <button className="hidden p-1 md:block" aria-label="Account">
                <IconUser className="h-[22px] w-[22px]" />
              </button>
              <button onClick={open} className="relative p-1" aria-label={`Open bag, ${count} items`}>
                <IconBag className="h-[23px] w-[23px]" />
                {count > 0 && (
                  <span
                    className={`absolute -right-1 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white transition-transform ${
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
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 md:hidden ${menu ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!menu}>
        <div
          className={`absolute inset-0 bg-ink-deep/30 backdrop-blur-sm transition-opacity duration-500 ${menu ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenu(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-paper p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] ${
            menu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo className="text-3xl" />
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="p-2">
              <IconClose className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col">
            {nav.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenu(false)} className="heading border-b border-line py-5 text-[2rem] text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#combo" onClick={() => setMenu(false)} className="btn btn-ink mt-auto">
            Shop the combo
          </a>
        </div>
      </div>
    </>
  );
}
