import { CartDrawer } from "@/components/CartDrawer";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Ingredients } from "@/components/Ingredients";
import { Marquee } from "@/components/Marquee";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { Reviews } from "@/components/Reviews";
import { RitualBuilder } from "@/components/RitualBuilder";
import { Shop } from "@/components/Shop";
import { StickyCta } from "@/components/StickyCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Shop />
        <RitualBuilder />
        <Ingredients />
        <Results />
        <Quiz />
        <Reviews />
        <Compare />
        <Faq />
      </main>
      <Footer />
      <CartDrawer />
      <StickyCta />
    </>
  );
}
