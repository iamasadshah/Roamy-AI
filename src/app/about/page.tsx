"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "200+", label: "Destinations" },
    { number: "98%", label: "Satisfaction Rate" },
    // ... (add more stats)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-slate-900">
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Roamy AI</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your intelligent travel companion, designed to create personalized
            travel experiences that match your unique preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-white/80 mb-6">
              We envision a world where travel planning is effortless,
              personalized, and intelligent. Roamy AI combines cutting-edge
              artificial intelligence with human wanderlust to create
              unforgettable journeys.
            </p>
            <ul className="space-y-4">
              {[
                "Personalized travel experiences",
                "AI-powered recommendations",
                "Real-time travel insights",
                "Cultural understanding",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center text-white/80"
                >
                  <span className="text-gold mr-2">✦</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/about-hero.jpg"
              alt="Travel Planning"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Innovation",
              description:
                "Cutting-edge AI technology for smart travel planning",
              icon: "🚀",
            },
            {
              title: "Personalization",
              description:
                "Tailored recommendations for your unique preferences",
              icon: "🎯",
            },
            {
              title: "Reliability",
              description:
                "Trusted by travelers worldwide for memorable experiences",
              icon: "⭐",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/80">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Add company story */}
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              {/* Add stats content */}
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Add team section */}
        </motion.div>
      </div>
    </div>
  );
}
