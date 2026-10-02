import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const tabs: Record<string, string | undefined> = {
  "neelayamari-anti-dandruff-shampoo": "Pairs perfectly with the Hair Oil",
};

export function Products() {
  return (
    <section id="shop" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Bestsellers" title="Our Products" />
        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 md:mx-auto md:mt-16 md:grid md:max-w-[1240px] md:grid-cols-3 md:gap-7 md:overflow-visible md:px-0">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="flex w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <ProductCard product={p} tab={tabs[p.id]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
