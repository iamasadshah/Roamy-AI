"use client";

import { motion, Variants } from "framer-motion";
import {
  FaBolt,
  FaMapMarkedAlt,
  FaRoute,
  FaWallet,
  FaShareAlt,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    title: "Adaptive itinerary engine",
    description:
      "Swap, drag, and remix days. Roamy AI re-balances timing and routes automatically.",
    icon: <FaBolt className="h-5 w-5" />,
    tag: "Smart pacing",
    span: "lg:col-span-3",
  },
  {
    title: "Map-first routing",
    description:
      "Every stop is sequenced to reduce backtracking, keep energy high, and save transit time.",
    icon: <FaRoute className="h-5 w-5" />,
    tag: "Distance aware",
    span: "lg:col-span-3",
  },
  {
    title: "Local taste layer",
    description:
      "Blend iconic moments with hidden favorites curated by local signals.",
    icon: <FaStar className="h-5 w-5" />,
    tag: "Authentic picks",
    span: "lg:col-span-2",
  },
  {
    title: "Budget modes",
    description:
      "Slide between boutique, balanced, or budget without losing trip quality.",
    icon: <FaWallet className="h-5 w-5" />,
    tag: "Spend control",
    span: "lg:col-span-2",
  },
  {
    title: "Share in seconds",
    description:
      "Invite your crew, vote on swaps, and align the plan in real time.",
    icon: <FaShareAlt className="h-5 w-5" />,
    tag: "Collaborative",
    span: "lg:col-span-2",
  },
  {
    title: "Interactive map cards",
    description:
      "Pin, preview, and navigate from one clean itinerary view.",
    icon: <FaMapMarkedAlt className="h-5 w-5" />,
    tag: "Visual planning",
    span: "lg:col-span-3",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export default function Features() {
  return (
    <section id="features" className="relative bg-cream py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute right-[-10%] top-20 h-64 w-64 rounded-full bg-brand-900/15 blur-[120px]" />
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
            Signature features
          </span>
          <h2 className="mt-6 text-3xl font-display text-brand-900 sm:text-4xl md:text-5xl">
            Everything you need to travel with flow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-900/70 sm:text-lg">
            Every tool in Roamy AI is designed to keep your itinerary elegant, flexible, and richly personal.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-6 lg:grid-cols-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className={`group relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_18px_40px_rgba(6,71,137,0.12)] backdrop-blur ${feature.span}`}
            >
              <div className="flex items-center gap-3 text-brand-900">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900">
                  {feature.icon}
                </span>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-4 text-sm text-brand-900/70">{feature.description}</p>
              <div className="mt-6 h-px bg-brand-500/20" />
              <span className="mt-4 inline-flex items-center rounded-full bg-brand-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900">
                {feature.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
