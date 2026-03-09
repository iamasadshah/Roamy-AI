"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-cream py-20">
      <div className="absolute inset-0">
        <div className="absolute bottom-[-30%] right-[-10%] h-80 w-80 rounded-full bg-brand-500/25 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-[32px] border border-white/60 bg-white/75 p-8 text-center shadow-[0_30px_70px_rgba(6,71,137,0.2)] backdrop-blur-2xl md:p-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900 backdrop-blur">
            Ready to go
          </span>
          <h2 className="mt-6 text-3xl font-display text-brand-900 sm:text-4xl md:text-5xl">
            Turn inspiration into a plan you can trust
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-900/70 sm:text-lg">
            Let Roamy AI orchestrate every detail, then fine-tune with your crew. Your next trip is
            a few clicks away.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/plan"
              className="inline-flex items-center justify-center rounded-full bg-brand-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[0_18px_40px_rgba(6,71,137,0.35)] transition hover:bg-brand-900/90"
            >
              Get my itinerary
              <FaPaperPlane className="ml-3" />
            </Link>
            <Link
              href="https://github.com/iamasadshah/RoamyAi-documentation.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-900/15 bg-white/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900 backdrop-blur transition hover:border-brand-900/30"
            >
              View documentation
              <FaGithub className="ml-3" />
              <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-500">
            Currently in beta - Feedback shapes what we build next
          </p>
        </motion.div>
      </div>
    </section>
  );
}
