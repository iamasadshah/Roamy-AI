"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const sampleItineraries = [
  {
    id: 1,
    destination: "Paris, France",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    price: "$3,499",
    season: "Spring",
    highlights: [
      "Morning visit to the Eiffel Tower",
      "Private tour of the Louvre Museum",
      "Luxury dinner cruise on the Seine",
      "Day trip to Versailles Palace",
    ],
    image: "/images/paris.webp",
    tags: ["Romantic", "Cultural", "Gourmet"],
  },
  {
    id: 2,
    destination: "Santorini, Greece",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    price: "$4,199",
    season: "Summer",
    highlights: [
      "Sunset yacht cruise around the caldera",
      "Private wine tasting tour",
      "Luxury spa day in Oia",
      "Traditional cooking class",
    ],
    image: "/images/santorni.webp",
    tags: ["Luxury", "Beach", "Romantic"],
  },
  {
    id: 3,
    destination: "Dubai, UAE",
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    price: "$3,899",
    season: "Winter",
    highlights: [
      "Desert safari with luxury camping",
      "VIP tour of Burj Khalifa",
      "Private yacht tour of Dubai Marina",
      "Helicopter tour of Palm Jumeirah",
    ],
    image: "/images/dubai.webp",
    tags: ["Adventure", "Luxury", "Modern"],
  },
];

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35 },
};

export default function ItineraryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const currentItinerary = sampleItineraries[currentIndex];

  const handleNavigate = (direction: number) => {
    setCurrentIndex((prev) =>
      (prev + direction + sampleItineraries.length) % sampleItineraries.length
    );
  };

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(66,122,161,0.18),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900 backdrop-blur">
            Travel inspiration
          </span>
          <h2 className="mt-6 text-3xl font-display text-brand-900 sm:text-4xl md:text-5xl">
            Preview a trip built by Roamy AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-900/70 sm:text-lg">
            Explore sample itineraries to see how the schedule flows, from experiences to logistics.
          </p>
        </div>

        <div
          className="relative mt-14"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div key={currentItinerary.id} {...fade}>
              <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-[0_30px_70px_rgba(6,71,137,0.2)] backdrop-blur-2xl">
                <div className="grid gap-0 lg:grid-cols-[1.1fr,0.9fr]">
                  <div className="relative min-h-[320px] lg:min-h-[520px]">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
                    <Image
                      src={currentItinerary.image}
                      alt={currentItinerary.destination}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 text-cream">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/80">
                        <FaMapMarkerAlt />
                        {currentItinerary.destination.split(",")[0]}
                      </div>
                      <h3 className="mt-2 text-2xl font-display sm:text-3xl">
                        {currentItinerary.destination}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-cream/80">
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-cream/70" />
                          {currentItinerary.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaStar className="text-cream" />
                          {currentItinerary.rating}
                        </span>
                        <span className="rounded-full bg-cream/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
                          {currentItinerary.season}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                          Highlights
                        </p>
                        <h4 className="mt-2 text-xl font-semibold text-brand-900">
                          A balanced, premium arc
                        </h4>
                      </div>
                      <span className="rounded-full border border-brand-900/10 bg-brand-900/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-900">
                        {currentItinerary.price}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm text-brand-900/70">
                      {currentItinerary.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {currentItinerary.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brand-900/10 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/plan"
                      className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-900 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[0_18px_40px_rgba(6,71,137,0.35)] transition hover:bg-brand-900/90"
                    >
                      Build my itinerary
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => handleNavigate(-1)}
            className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-white/70 p-3 text-brand-900 shadow-[0_12px_30px_rgba(6,71,137,0.18)] backdrop-blur transition ${
              isHovered ? "opacity-100" : "opacity-0 lg:opacity-100"
            }`}
            aria-label="Previous itinerary"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => handleNavigate(1)}
            className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-white/70 p-3 text-brand-900 shadow-[0_12px_30px_rgba(6,71,137,0.18)] backdrop-blur transition ${
              isHovered ? "opacity-100" : "opacity-0 lg:opacity-100"
            }`}
            aria-label="Next itinerary"
          >
            <FaChevronRight />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {sampleItineraries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-brand-900"
                    : "w-3 bg-brand-900/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
