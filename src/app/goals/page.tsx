"use client";

import { motion } from "framer-motion";
import { Target, Rocket, Lightbulb } from "lucide-react";

const goals = [
  {
    icon: Target,
    title: "Revolutionizing Travel Planning",
    desc: "Making travel hassle-free with AI-driven, data-backed recommendations.",
    color: "text-blue-500",
  },
  {
    icon: Rocket,
    title: "Global Expansion",
    desc: "Aiming to integrate with travel agencies, airlines, and hotels for seamless bookings.",
    color: "text-green-500",
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Future",
    desc: "Enhancing our AI with deep learning to predict and suggest travel experiences.",
    color: "text-yellow-500",
  },
];

const Goal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-12 mt-20" // Added mt-20 for spacing
    >
      <h1 className="text-5xl font-bold text-center mb-10">
        Our Vision & Goals
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {goals.map(({ icon: Icon, title, desc, color }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-xl rounded-xl border"
          >
            <Icon className={`${color} w-12 h-12 mb-4`} />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-lg text-gray-600 mt-2">{desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Goal;
