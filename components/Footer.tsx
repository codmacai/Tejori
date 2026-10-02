"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrow, IconCheck } from "./Icons";
import { Logo } from "./Logo";


const cols = [
  {
    h: "Shop",
    l: [
      { t: "Neelayamari Hair Oil", href: "/products/neelayamari-hair-oil" },
      { t: "Anti-Dandruff Shampoo", href: "/products/neelayamari-anti-dandruff-shampoo" },
      { t: "Anti-Dandruff Combo", href: "/products/anti-dandruff-combo" },
    ],
  },
  {
    h: "Concerns",
    l: [
      { t: "Hair growth", href: "/products/neelayamari-hair-oil" },
      { t: "Anti dandruff", href: "/products/anti-dandruff-combo" },
      { t: "Dry hair", href: "/products/neelayamari-hair-oil" },
    ],
  },
  { h: "Help", l: ["Track order", "Shipping", "Returns", "Contact us"].map((t) => ({ t, href: "#" })) },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="border-t border-line">
      {/* newsletter */}
      <div className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-ink/80">Join the Tejori family</p>
          <h2 className="heading mt-5 text-[2.5rem] text-ink md:text-[3.6rem]">Hair tips & early offers</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
            className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 pl-6 shadow-[inset_0_0_0_1px_var(--color-line)] focus-within:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
          >
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={sent}
              className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink placeholder:text-muted focus:outline-none"
            />
            <button type="submit" className="btn btn-ink h-12 shrink-0 px-6" disabled={sent} aria-label="Subscribe">
              {sent ? <IconCheck className="h-5 w-5" /> : <>Subscribe <IconArrow className="hidden h-4 w-4 sm:block" /></>}
            </button>
          </form>
          <p className="mt-4 text-[13px] text-muted">
            {sent ? "Thank you — you’re on the list." : "No spam. Unsubscribe anytime."}
          </p>
        </div>
      </div>

      {/* links */}
      <div className="bg-ink text-white">
        <div className="container-x grid grid-cols-3 gap-x-6 gap-y-10 py-16 md:grid-cols-12">
          <div className="col-span-3 md:col-span-5">
            <Logo tone="light" className="text-[3rem]" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/65">
              Natural Neelayamari hair care for stronger roots and a healthy scalp.
            </p>
            <div className="mt-6 flex gap-2">
              {["Instagram", "Facebook", "YouTube"].map((s) => (
                <a key={s} href="#" className="rounded-full border border-white/20 px-4 py-2 text-[13px] text-white/75 transition hover:border-white/60 hover:text-white">
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="md:col-span-2 lg:col-span-2">
              <p className="eyebrow text-[11px] text-white/45">{c.h}</p>
              <ul className="mt-5 space-y-3">
                {c.l.map((l) => (
                  <li key={l.t}>
                    <Link href={l.href} className="text-[14px] text-white/80 transition hover:text-white">{l.t}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container-x flex flex-col justify-between gap-3 border-t border-white/10 py-6 pb-24 text-[12px] text-white/45 md:flex-row md:pb-6">
          <p>© {new Date().getFullYear()} Tejori. All rights reserved.</p>
          <p className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Refund policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
