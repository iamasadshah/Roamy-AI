"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Solo Traveler",
    image: "/images/sara-profile.webp",
    text: "Roamy AI made planning my solo trip to Japan effortless. The AI understood exactly what I was looking for and created the perfect balance of culture and adventure.",
    rating: 5,
  },
  {
    name: "Michael & Emma",
    role: "Couple",
    image: "/images/couple.webp",
    text: "We used Roamy AI for our honeymoon in Greece, and it exceeded our expectations. The romantic dinner recommendations were spot-on!",
    rating: 5,
  },
  {
    name: "The Anderson Family",
    role: "Family of Four",
    image: "/images/family-profile.webp",
    text: "Planning a family trip can be overwhelming, but Roamy AI made it simple. The kid-friendly activities and convenient logistics made our vacation stress-free.",
    rating: 5,
  },
];

const stats = [
  { number: "10K+", label: "Trips designed" },
  { number: "50+", label: "Countries covered" },
  { number: "98%", label: "Plan satisfaction" },
  { number: "24/7", label: "AI support" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900 backdrop-blur">
            Customer stories
          </span>
          <h2 className="mt-6 text-3xl font-display text-brand-900 sm:text-4xl md:text-5xl">
            Travelers who planned with calm
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-900/70 sm:text-lg">
            Real people, real trips, and the kind of itinerary flow that removes stress from planning.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={item}
              className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-[0_18px_40px_rgba(6,71,137,0.12)] backdrop-blur"
            >
              <div className="flex items-center gap-1 text-brand-500">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <FaStar key={index} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-sm text-brand-900/70">{testimonial.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full border border-white/60 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-900">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 rounded-3xl border border-white/60 bg-white/70 p-6 text-center shadow-[0_18px_40px_rgba(6,71,137,0.12)] backdrop-blur md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={item}>
              <p className="text-2xl font-display text-brand-900 md:text-3xl">
                {stat.number}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
