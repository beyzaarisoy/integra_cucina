import type { Metadata } from "next";
import { AboutHero, AboutStory, Quote, Timeline, Values } from "@/components/about/AboutSections";
import { Process } from "@/components/home/Story";
import { BeforeAfter } from "@/components/home/BeforeAfter";

export const metadata: Metadata = {
  title: "About Us",
  description: "Since 1968, Integra Cucina has designed and crafted Italian kitchens. Today our studio serves homeowners and architects across the United States.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <Timeline />
      <Values />
      <Process />
      <Quote />
      <div className="pt-28 md:pt-40">
        <BeforeAfter />
      </div>
    </>
  );
}
