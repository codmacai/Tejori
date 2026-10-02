import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Products() {
  return (
    <section id="shop" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Bestsellers" title="Our products" action={{ label: "Shop all", href: "#shop" }} />
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="flex w-[80%] shrink-0 snap-start sm:w-[55%] md:w-auto">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
