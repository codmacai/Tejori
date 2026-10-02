import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

export function Products() {
  return (
    <section id="shop" className="stage relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      {/* oversized faded wordmark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-logo text-[34vw] font-bold leading-none tracking-[-0.06em] text-white/[0.06]"
      >
        Tejori
      </span>

      <div className="container-x relative">
        <Reveal className="text-center text-white">
          <p className="eyebrow text-white/60">Bestsellers</p>
          <h2 className="heading mt-4 text-[2.5rem] md:text-[4rem]">Our products</h2>
        </Reveal>

        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-10 pt-4 md:mx-auto md:mt-16 md:grid md:max-w-[1200px] md:grid-cols-3 md:gap-7 md:overflow-visible md:px-0">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="flex w-[80%] shrink-0 snap-center sm:w-[55%] md:w-auto">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
