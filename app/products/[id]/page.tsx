import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductDetail } from "@/components/pdp/ProductDetail";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return {};
  return {
    title: `${p.name} — Tejori`,
    description: p.description,
    openGraph: { title: p.name, description: p.tagline },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
