import { Assurances } from "@/components/Assurances";
import { CartDrawer } from "@/components/CartDrawer";
import { ComboFeature } from "@/components/ComboFeature";
import { Concerns } from "@/components/Concerns";
import { CustomerResults } from "@/components/CustomerResults";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { Products } from "@/components/Products";
import { StickyCta } from "@/components/StickyCta";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <Assurances />
        <Concerns />
        <Products />
        <ComboFeature />
        <CustomerResults />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <CartDrawer />
      <StickyCta />
    </>
  );
}
