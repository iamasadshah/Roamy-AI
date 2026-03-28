"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900 px-4 pb-20 pt-28 text-cream sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-500/40 blur-[180px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[520px] w-[520px] rounded-full bg-cream/10 blur-[200px]" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-24 bg-gradient-to-b from-transparent to-cream" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-3 rounded-full border border-cream/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/90 backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          AI Travel Planning for Modern Explorers
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-display font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl"
        >
          AI-powered itineraries to replace
          <span className="block text-cream/70">daily planning stress</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base text-cream/80 sm:text-lg"
        >
          Roamy AI designs and delivers personalized travel plans that automate logistics,
          highlight local gems, and keep every day flowing with purpose.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/plan"
            className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900 shadow-[0_18px_40px_rgba(6,71,137,0.4)] transition hover:bg-cream/90"
          >
            Start planning
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-white/5 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:border-cream/60 hover:bg-white/10"
          >
            See how it works
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-cream/70"
        >
          <div className="flex items-center gap-1 text-brand-500">
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
          </div>
          <span className="h-4 w-px bg-cream/30" />
          <span>Trusted by 10K+ travelers planning smarter trips</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
