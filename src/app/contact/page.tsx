import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Faq, ShowroomCards } from "@/components/contact/ContactSections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a private design consultation at an Integra Cucina showroom in New York, Miami, Los Angeles or Chicago — or online.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Let’s begin\n*your kitchen.*"}
        intro="Book a complimentary consultation with one of our designers — in a showroom, at your home or online. We usually reply within one business day."
      />
      <section id="consultation" className="scroll-mt-24 bg-ivory pb-28 md:pb-40">
        <div className="container-lux grid gap-16 border-t border-line pt-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-stone">Speak with the studio</p>
              <dl className="mt-10 space-y-8">
                <div>
                  <dt className="eyebrow text-[0.56rem] text-stone">Phone</dt>
                  <dd className="mt-2 font-serif text-3xl">
                    <a href="tel:+12125550198" className="link-underline">+1 (212) 555-0198</a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.56rem] text-stone">Email</dt>
                  <dd className="mt-2 font-serif text-3xl">
                    <a href="mailto:studio@integracucina.com" className="link-underline">studio@integracucina.com</a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.56rem] text-stone">Trade & architects</dt>
                  <dd className="mt-2 text-stone">
                    <a href="mailto:trade@integracucina.com" className="link-underline">trade@integracucina.com</a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.56rem] text-stone">Studio hours</dt>
                  <dd className="mt-2 text-stone">Monday – Saturday, 9am – 7pm ET</dd>
                </div>
              </dl>
            </Reveal>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.15}>
              <Suspense>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>
      <ShowroomCards />
      <Faq />
    </>
  );
}
