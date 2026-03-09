"use client";

import { motion, Variants } from "framer-motion";
import { FaQuestionCircle, FaMagic, FaPaperPlane } from "react-icons/fa";

const steps = [
  {
    step: "01",
    label: "Signal",
    title: "Tell us your travel vibe",
    description:
      "Share dates, pace, and priorities. Roamy AI understands your style in seconds.",
    icon: <FaQuestionCircle className="h-5 w-5" />,
  },
  {
    step: "02",
    label: "Craft",
    title: "AI composes the flow",
    description:
      "We map your days with smart timing, local context, and minimal backtracking.",
    icon: <FaMagic className="h-5 w-5" />,
  },
  {
    step: "03",
    label: "Launch",
    title: "Tune, share, and go",
    description:
      "Adjust with your crew, lock in bookings, and keep the itinerary on your phone.",
    icon: <FaPaperPlane className="h-5 w-5" />,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900 backdrop-blur">
            How it works
          </span>
          <h2 className="mt-6 text-3xl font-display text-brand-900 sm:text-4xl md:text-5xl">
            A calm, three-step flow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-900/70 sm:text-lg">
            You shape the preferences. We handle the orchestration, so your trip feels intentional.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-14 grid gap-6 md:grid-cols-3"
        >
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-brand-500/25 md:block" />
          {steps.map((step) => (
            <motion.div
              key={step.step}
              variants={item}
              className="relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_18px_40px_rgba(6,71,137,0.12)] backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                  {step.label}
                </span>
                <span className="rounded-full bg-brand-900 px-3 py-1 text-xs font-semibold text-cream">
                  {step.step}
                </span>
              </div>
              <div className="mt-6 flex items-center gap-3 text-brand-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-900/10">
                  {step.icon}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="mt-4 text-sm text-brand-900/70">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
