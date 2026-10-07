import { Hero } from "@/components/home/Hero";
import { ExpandingImage, Intro } from "@/components/home/Intro";
import { Bestsellers, Collections } from "@/components/home/Collections";
import { Configurator } from "@/components/home/Configurator";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Craft, MaterialMarquee, Process, Showrooms, Testimonials } from "@/components/home/Story";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ExpandingImage />
      <Collections />
      <Bestsellers />
      <Configurator id="configurator" />
      <BeforeAfter />
      <MaterialMarquee />
      <Process />
      <Craft />
      <Testimonials />
      <Showrooms />
    </>
  );
}
