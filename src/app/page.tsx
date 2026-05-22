import { BusinessCta } from "@/components/BusinessCta";
import { Categories } from "@/components/Categories";
import { GoGreen } from "@/components/GoGreen";
import { Hero } from "@/components/Hero";
import { PackagingServicesMarquee } from "@/components/PackagingServicesMarquee";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Products } from "@/components/sections/Products";
import { Testimonials } from "@/components/Testimonials";
import { TopBar } from "@/components/TopBar";
import { Reveal } from "@/components/animations/Reveal";

export default function Home() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero has its own internal framer-motion animations */}
        <Hero />

        {/* Marquee strip — just fade in, it scrolls itself */}
        <Reveal variant="fade-in" duration={0.8} delay={0.05}>
          <PackagingServicesMarquee />
        </Reveal>

        {/* Categories — slide in from left */}
        <Reveal variant="slide-left" duration={0.78} amount={0.1}>
          <Categories />
        </Reveal>

        {/* Services cards — blur-up for a premium feel */}
        <Reveal variant="blur-up" duration={0.8} amount={0.08}>
          <ServicesSection />
        </Reveal>

        {/* Products grid — scale up */}
        <Reveal variant="scale-up" duration={0.75} amount={0.08}>
          <Products />
        </Reveal>

        {/* Go Green — slide from right */}
        <Reveal variant="slide-right" duration={0.78} amount={0.1}>
          <GoGreen />
        </Reveal>

        {/* Testimonials — flip up for distinction */}
        <Reveal variant="flip-up" duration={0.72} amount={0.1}>
          <Testimonials />
        </Reveal>

        {/* CTA banner — scale up from slightly smaller */}
        <Reveal variant="scale-up" duration={0.7} y={20} amount={0.12}>
          <BusinessCta />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
