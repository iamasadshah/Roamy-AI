"use client";

import { motion } from "framer-motion";
import { Briefcase, Globe, Compass, Users } from "lucide-react";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-12 mt-20" // Added mt-20 for spacing
    >
      <h1 className="text-5xl font-bold text-center mb-10">About Roamy AI</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {[
          {
            Icon: Briefcase,
            title: "Our Mission",
            color: "text-blue-500",
            desc: "To revolutionize travel planning with AI, ensuring hassle-free and personalized itineraries for every traveler.",
          },
          {
            Icon: Globe,
            title: "Global Reach",
            color: "text-green-500",
            desc: "Roamy AI caters to travelers worldwide, providing real-time insights on destinations, attractions, and events.",
          },
          {
            Icon: Compass,
            title: "Personalized Itineraries",
            color: "text-red-500",
            desc: "No generic plans—Roamy AI tailors trips based on your interests, preferences, and budget.",
          },
          {
            Icon: Users,
            title: "Community & Support",
            color: "text-yellow-500",
            desc: "Join a growing community of travelers, share experiences, and get AI-powered travel assistance anytime.",
          },
        ].map(({ Icon, title, color, desc }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
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

export default About;
