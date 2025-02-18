"use client";

import { motion } from "framer-motion";
import { Brain, Timer, DollarSign, MapPin, Layers, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    desc: "Your itinerary is crafted based on your interests, ensuring a unique and tailored experience.",
    color: "text-blue-500",
  },
  {
    icon: Timer,
    title: "Instant Plan Generation",
    desc: "No more endless research! Get fully planned itineraries within seconds.",
    color: "text-green-500",
  },
  {
    icon: DollarSign,
    title: "Smart Budgeting",
    desc: "Choose between luxury or budget-friendly recommendations based on your spending preference.",
    color: "text-yellow-500",
  },
  {
    icon: MapPin,
    title: "Real-Time Location Insights",
    desc: "Receive live updates on destinations, weather, and local events.",
    color: "text-red-500",
  },
  {
    icon: Layers,
    title: "Customizable Plans",
    desc: "Easily edit and fine-tune your itinerary to match your evolving needs.",
    color: "text-purple-500",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    desc: "Plan trips together with friends and family, sharing and modifying itineraries in real time.",
    color: "text-orange-500",
  },
];

const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-12 mt-20" // Added mt-20 for spacing
    >
      <h1 className="text-5xl font-bold text-center mb-10">Key Features</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map(({ icon: Icon, title, desc, color }, index) => (
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

export default Features;
