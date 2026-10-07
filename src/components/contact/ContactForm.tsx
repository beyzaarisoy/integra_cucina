"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { finishes } from "@/lib/finishes";
import { products } from "@/lib/products";
import { Arrow } from "../layout/Arrow";

const ease = [0.22, 1, 0.36, 1] as const;

const showroomOptions = ["New York", "Miami", "Los Angeles", "Chicago", "Virtual"];
const projectOptions = ["New build", "Renovation", "Architect / Trade"];
const budgetOptions = ["$50k – $100k", "$100k – $200k", "$200k +"];

function Field({ label, name, type = "text", required, autoComplete, defaultValue }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string; defaultValue?: string }) {
  return (
    <label className="group relative block">
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder=" "
        className="peer w-full border-b border-ink/20 bg-transparent pb-3 pt-7 text-lg outline-none transition-colors duration-500 focus:border-ink"
      />
      <span className="pointer-events-none absolute left-0 top-7 origin-left text-stone transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.7rem] peer-focus:tracking-[0.18em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:uppercase">
        {label}
        {required && " *"}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 peer-focus:scale-x-100" />
    </label>
  );
}

function Chips({ label, name, options, value, onChange }: { label: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="eyebrow text-[0.6rem] text-stone">{label}</legend>
      <input type="hidden" name={name} value={value} />
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => onChange(o === value ? "" : o)}
            aria-pressed={o === value}
            className={clsx(
              "border px-4 py-2.5 text-sm transition-colors duration-500",
              o === value ? "border-ink bg-ink text-ivory" : "border-ink/15 hover:border-ink/50",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const product = products.find((p) => p.slug === params.get("product"));
  const finish = finishes.find((f) => f.id === params.get("finish"));
  const [showroom, setShowroom] = useState("New York");
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const prefill = [product && `I'm interested in ${product.name}`, finish && `${product ? "in" : "I'd like a sample of"} ${finish.name}`]
    .filter(Boolean)
    .join(" ");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease }}
            className="flex min-h-[480px] flex-col justify-center"
          >
            <p className="eyebrow text-bronze">Request received</p>
            <p className="display mt-6 text-5xl md:text-7xl">
              Grazie. <em>We&rsquo;ll be in touch.</em>
            </p>
            <p className="mt-8 max-w-md text-stone">
              A designer from our {showroom === "Virtual" ? "studio" : showroom} team will contact you within one business day to arrange your
              consultation.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease }}
            className="grid gap-10"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="First name" name="firstName" required autoComplete="given-name" />
              <Field label="Last name" name="lastName" required autoComplete="family-name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Field label="ZIP code" name="zip" autoComplete="postal-code" />
              <Field label="City" name="city" autoComplete="address-level2" />
            </div>
            <Chips label="Preferred showroom" name="showroom" options={showroomOptions} value={showroom} onChange={setShowroom} />
            <Chips label="Project" name="project" options={projectOptions} value={project} onChange={setProject} />
            <Chips label="Estimated investment" name="budget" options={budgetOptions} value={budget} onChange={setBudget} />
            <label className="block">
              <span className="eyebrow text-[0.6rem] text-stone">Tell us about your space</span>
              <textarea
                name="message"
                rows={4}
                defaultValue={prefill ? `${prefill}. ` : ""}
                className="mt-4 w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-lg outline-none transition-colors duration-500 focus:border-ink"
              />
            </label>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex max-w-sm items-start gap-3 text-xs text-stone">
                <input type="checkbox" name="consent" required className="mt-0.5 accent-[#1b1a18]" />
                I agree to be contacted about my project. We never share your details.
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center justify-center gap-4 bg-ink px-8 py-5 eyebrow text-[0.64rem] text-ivory transition-opacity disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Request consultation"}
                <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
            {status === "error" && (
              <p className="text-sm text-[#9b3b2f]">
                Something went wrong. Please call us at +1 (212) 555-0198 or email studio@integracucina.com.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
