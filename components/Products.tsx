"use client";

import { useCallback, useState } from "react";
import { products, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { QuickView } from "./QuickView";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Products() {
  const [quick, setQuick] = useState<Product | null>(null);
  const close = useCallback(() => setQuick(null), []);

  return (
    <section id="shop" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Bestsellers" title="Our products" sub="Three essentials. One simple ritual." />
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-8 pt-2 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="flex w-[84%] shrink-0 snap-start sm:w-[58%] md:w-auto">
              <ProductCard product={p} onLearnMore={setQuick} />
            </Reveal>
          ))}
        </div>
      </div>
      <QuickView product={quick} onClose={close} />
    </section>
  );
}
