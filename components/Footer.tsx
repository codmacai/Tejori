"use client";

import { useState } from "react";
import { IconArrow, IconCheck, IconRefresh, IconShield, IconTruck, IconLeaf } from "./Icons";
import { Logo } from "./Logo";

const promises = [
  { icon: IconTruck, t: "Free express shipping", s: "On orders over ₹999" },
  { icon: IconRefresh, t: "60-day promise", s: "Love it or get a full refund" },
  { icon: IconShield, t: "Secure checkout", s: "UPI, cards, COD & EMI" },
  { icon: IconLeaf, t: "Clean & vegan", s: "Never tested on animals" },
];

const cols = [
  { h: "Shop", l: ["Bestsellers", "Rituals & sets", "Hair fall", "Frizz control", "Scalp care", "Gift cards"] },
  { h: "Discover", l: ["Our story", "Ingredients", "Clinical results", "Hair quiz", "Journal"] },
  { h: "Help", l: ["Track order", "Shipping", "Returns", "Contact us", "FAQs"] },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-ink-deep text-bone">
      {/* promises */}
      <div className="border-b border-bone/10">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {promises.map(({ icon: I, t, s }) => (
            <div key={t} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-bone/10">
                <I className="h-5 w-5 text-clay" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold">{t}</span>
                <span className="block text-[12.5px] text-bone/55">{s}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* newsletter */}
      <div className="container-x grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow text-clay">Join the vault</p>
          <h2 className="display mt-4 text-[2.6rem] md:text-[4rem]">
            Get 15% off
            <br />
            <span className="serif-accent text-[1.08em] text-clay">your first ritual.</span>
          </h2>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
            className="flex items-center gap-2 rounded-full bg-bone/10 p-1.5 pl-6 ring-1 ring-bone/15 focus-within:ring-clay"
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
              className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-bone placeholder:text-bone/40 focus:outline-none"
            />
            <button type="submit" className="btn btn-light h-12 shrink-0 px-5" disabled={sent}>
              {sent ? <IconCheck className="h-5 w-5" /> : <>Unlock 15% <IconArrow className="hidden h-4 w-4 sm:block" /></>}
            </button>
          </form>
          <p className="mt-3 px-6 text-[12.5px] text-bone/50">
            {sent
              ? "Welcome to the vault — your code is on its way."
              : "Hair rituals, early access & member-only offers. Unsubscribe anytime."}
          </p>
        </div>
      </div>

      {/* links */}
      <div className="container-x grid grid-cols-3 gap-x-6 gap-y-10 border-t border-bone/10 py-14 md:grid-cols-12">
        <div className="col-span-3 md:col-span-5">
          <Logo tone="light" className="text-[3.2rem]" />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-bone/55">
            The vault of India’s most treasured botanicals, decoded by modern
            hair science.
          </p>
          <div className="mt-6 flex gap-2">
            {["Instagram", "YouTube", "Pinterest"].map((s) => (
              <a key={s} href="#" className="rounded-full border border-bone/15 px-4 py-2 text-[12.5px] text-bone/70 transition hover:border-bone/40 hover:text-bone">
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h} className="md:col-span-2">
            <p className="eyebrow text-bone/40">{c.h}</p>
            <ul className="mt-4 space-y-2.5">
              {c.l.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[14px] text-bone/75 transition hover:text-bone">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-x flex flex-col justify-between gap-3 border-t border-bone/10 py-6 pb-24 text-[12px] text-bone/40 md:flex-row md:pb-6">
        <p>© {new Date().getFullYear()} Tejori. All rights reserved.</p>
        <p className="flex gap-5">
          <a href="#" className="hover:text-bone">Privacy</a>
          <a href="#" className="hover:text-bone">Terms</a>
          <a href="#" className="hover:text-bone">Cookies</a>
        </p>
      </div>
    </footer>
  );
}
